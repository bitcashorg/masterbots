import { generateUsername } from '@/lib/username'
import bcrypt from 'bcryptjs'
import { setCookie } from 'cookies-next'
import type { User } from 'mb-genql'
import {
	getHasuraClient,
	getToken,
	toSlug,
	validateJwtSecret,
	verify,
} from 'mb-lib'
import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from 'next'
import {
	type NextAuthOptions,
	type User as NextUser,
	getServerSession,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { getUserByEmail, insertPreferencesByUserId } from './services/hasura'

//* NextAuth configuration strategy with multiprovider options
export const authOptions: NextAuthOptions = {
	providers: [
		//* Credentials provider for email and password login
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials): Promise<NextUser | null> => {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Missing email or password')
				}

				//* Initialize the Hasura client for interacting with the database based on the environment

				const client = getHasuraClient()
				try {
					const { user } = await client.query({
						user: {
							__args: {
								where: { email: { _eq: credentials.email } },
							},
							userId: true,
							email: true,
							password: true,
							username: true,
							profilePicture: true,
							role: true,
							slug: true,
						},
					})
					if (!user || user.length === 0) {
						console.error(
							'NextUser authentication failed: Invalid or empty user data',
						)
						throw new Error('Invalid credentials')
					}

					//* Verify the password using bcrypt (hash comparison)
					const isValid = bcrypt.compareSync(
						credentials.password,
						user[0].password,
					)
					if (!isValid) {
						console.error('NextUser authentication failed: Invalid password')
						throw new Error('Invalid credentials')
					}
					console.log('NextUser authenticated successfully')
					//* Return user details to be attached to the token
					return {
						id: user[0].userId,
						email: user[0].email,
						name: user[0].username,
						image: user[0].profilePicture,
						role: user[0].role || 'user',
						slug: user[0].slug || toSlug(user[0].username),
					}
				} catch (error) {
					console.error('Error during authentication:', error)
					throw new Error('Authentication failed')
				}
			},
		}),
		//* Google provider for Google login
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
	],
	session: {
		strategy: 'jwt', //* NextAuth V > 4 needs to specify the session strategy
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				//* Add user role to the token when signing in with Google
				if (account?.provider === 'google') {
					const email = user.email
					const userRoleResult = await getUserByEmail({ email })
					if (userRoleResult.users.length > 0) {
						token.role = userRoleResult.users[0]?.role || 'user'
						token.slug = userRoleResult.users[0]?.slug
					} else {
						console.error('Error fetching user role:', userRoleResult.error)
						token.role = 'user' // Default to 'user' if no user found or in case of error
						token.slug = toSlug(user.name as string)
					}
				} else {
					token.role = user.role // use this for other
					token.slug = user.slug
				}

				token.id = user.id
				token.email = user.email
				token.name = user.name
				token.image = user.image
				token.provider = account?.provider || 'credentials'

				//* Validate and prepare the JWT secret for signing tokens
				const jwtSecret = validateJwtSecret(
					process.env.HASURA_GRAPHQL_JWT_SECRET,
				)
				if (!jwtSecret) {
					throw new Error('Secret not found')
				}

				try {
					//* Generate a JWT for Hasura with custom claims
					const hasuraJwt = await getToken({
						user: {
							account: user.id,
							role: token.role as string,
						},
						jwtSecret,
						jwtExpiration: Number(process.env.JWT_TOKEN_EXPIRATION),
					})

					if (!hasuraJwt) {
						console.error('Failed to generate Hasura JWT')
						throw new Error('Login Error')
					}

					//* Verify the generated JWT to ensure it's valid
					await verify(hasuraJwt, jwtSecret.key)

					token.hasuraJwt = hasuraJwt
					console.log('Hasura JWT generated and verified successfully')

					//* Store the JWT in a cookie for client-side access
					setCookie('token', hasuraJwt, {
						maxAge: Number(process.env.JWT_TOKEN_EXPIRATION),
						httpOnly: true, // Secure the cookie to HTTP only
						secure: process.env.NODE_ENV === 'production', //* Optional secure flag for production
						sameSite: 'strict', //! Prevent CSRF attacks
					})

					//* Ensure user preferences exist in the database
					await ensureUserPreferences(token.id as string)
				} catch (error) {
					console.error('Error generating or verifying Hasura JWT:', error)
					throw error
				}
			}

			return token
		},
		async session({ session, token }) {
			//* Attach the user details and JWT to the session object\
			session.user.id = token.id as string
			session.user.email = token.email as string
			session.user.name = token.name as string
			session.user.image = token.image as string
			session.user.hasuraJwt = token.hasuraJwt as string
			session.user.role = token.role as string
			session.user.slug = token.slug as string

			console.log(
				'Session created with Hasura JWT 🗝️: ',
				session.user.hasuraJwt ? 'Present' : 'Missing',
			)
			return session
		},
		// @ts-ignore
		async authorized({ auth }) {
			return !!auth?.user
		},
		async signIn({ user, account }) {
			if (account?.provider === 'google') {
				const client = getHasuraClient()

				// Check if user exists, if not, create a new user
				let signedUser: Pick<User, 'userId'> | null = await client
					.query({
						user: {
							__args: {
								where: { email: { _eq: user.email } },
							},
							userId: true,
						},
					})
					.then((res) => res.user[0] || null)

				if (!signedUser?.userId) {
					const timestamp = Date.now().toString(36)
					const slug = `${toSlug(user.name as string)}-${timestamp}`
					const username = generateUsername(
						user.email?.split('@')[0] || user.name || '',
					)
					const profilePicture =
						user.image || `https://robohash.org/${username}?bgset=bg2`

					// Create new user in your database
					signedUser = await client
						.mutation({
							insertUserOne: {
								__args: {
									object: {
										slug,
										email: user.email,
										username,
										profilePicture,
										// You might want to generate a random password here
										password: bcrypt.hashSync(
											Math.random().toString(36).slice(-8),
											10,
										),
									},
								},
								userId: true,
							},
						})
						.then((res) => res.insertUserOne)

					if (!signedUser) {
						throw new Error('Failed to register the user to Masterbots')
					}
				}
				user.id = signedUser?.userId || user.id
			}

			//* Ensure user preferences exist in the database
			await ensureUserPreferences(user.id as string)

			return true
		},
	},
	pages: {
		signIn: '/auth/signin', //* Custom sign-in page
	},
	debug: process.env.NODE_ENV === 'development', //! Enable detailed logging in development mode
}

//* Helper function to retrieve the session in server-side contexts
export function auth(
	...args:
		| [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions)
}

async function ensureUserPreferences(userId: string) {
	const preference = await getHasuraClient()
		.query({
			preference: {
				__args: {
					where: { userId: { _eq: userId } },
				},
				userId: true,
			},
		})
		.then((res) => res.preference[0] || null)

	if (!preference) {
		// * Create default user preferences
		const { data: preference, error } = await insertPreferencesByUserId({
			preferencesSet: {
				// * Default preferences
				userId: userId,
				webSearch: false,
				deepExpertise: false,
				preferredComplexity: 'general',
				preferredLength: 'detailed',
				preferredTone: 'neutral',
				preferredType: 'mix',
			},
		})

		if (!error && !preference) {
			console.error('Failed to create your account ——> ', error)
			throw new Error(
				'Failed to create your account, an error occurred while creating your profile.',
			)
		}
		console.log('user profile created: ', preference)
	}
}
