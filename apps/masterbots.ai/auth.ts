import bcrypt from 'bcryptjs'
import { setCookie } from 'cookies-next'
import { decodeToken, getHasuraClient, getToken, toSlug, validateJwtSecret, verify } from 'mb-lib'
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next'
import { NextAuthOptions, getServerSession, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { getUserRoleByEmail } from './services/hasura'


//* NextAuth configuration strategy with multiprovider options
export const authOptions: NextAuthOptions = {
  providers: [
    //* Credentials provider for email and password login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password')
        }

        //* Initialize the Hasura client for interacting with the database based on the environment
        const client = getHasuraClient()
        try {
          const { user } = await client.query({
            user: {
              __args: {
                where: { email: { _eq: credentials.email } }
              },
              userId: true,
              email: true,
              password: true,
              username: true,
              profilePicture: true,
              role:  true,
            }
          })
          if (!user || user.length === 0) {
            console.error(
              'User authentication failed: Invalid or empty user data'
            )
            throw new Error('Invalid credentials')
          }

          //* Verify the password using bcrypt (hash comparison)
          const isValid = bcrypt.compareSync(
            credentials.password,
            user[0].password
          )
          // if (!isValid) {
          //   console.error('User authentication failed: Invalid password')
          //   throw new Error('Invalid credentials')
          // }
          console.log('User authenticated successfully')
          //* Return user details to be attached to the token
          return { id: user[0].userId, email: user[0].email, name: user[0].username, image: user[0].profilePicture, role: ensureString(user[0].role, 'user')  }
        } catch (error) {
          throw new Error('Authentication failed')
        }
      }
    }),
    //* Google provider for Google login
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  session: {
    strategy: 'jwt' //* NextAuth V > 4 needs to specify the session strategy
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {

        if(account?.provider === 'google'){
          const email = user.email;
          const userRoleResult = await getUserRoleByEmail({ email });
          
          if (Array.isArray(userRoleResult)) {
            token.role = userRoleResult[0]?.role || 'user';
          } else {
            console.error('Error fetching user role:', userRoleResult.error);
            token.role = 'user'; // Default to 'user' in case of error
          }
        }else{
          token.role = user.role;
        }

        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.provider = account?.provider || 'credentials';

        //* Validate and prepare the JWT secret for signing tokens
        const jwtSecret = validateJwtSecret(
          process.env.HASURA_GRAPHQL_JWT_SECRET
        )
        if (!jwtSecret) {
          throw new Error('Secret not found')
        }
        
        try {
          //* Generate a JWT for Hasura with custom claims
          const hasuraJwt = await getToken({
            user: {
              account: user.id,
              role: token.role as string
            },
            jwtSecret,
            jwtExpiration: Number(process.env.JWT_TOKEN_EXPIRATION)
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
            sameSite: 'strict' //! Prevent CSRF attacks
          })
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

      console.log(
        'Session created with Hasura JWT 🗝️: ',
        session.user.hasuraJwt ? 'Present' : 'Missing'
      )
      return session
    },
    // @ts-ignore
    async authorized({ auth }) {
      return !!auth?.user
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const client = getHasuraClient();

        let signedUser;

        // Check if user exists, if not, create a new user
        const { user: currentUser } = await client.query({
          user: {
            __args: {
              where: { email: { _eq: user.email } }
            },
            userId: true
          }
        })

        signedUser = currentUser

        if (!signedUser || signedUser.length === 0) {
          const slug = toSlug(user.name as string)
          // Create new user in your database
          const { insertUserOne: newUser } = await client.mutation({
            insertUserOne: {
              __args: {
                object: {
                  slug,
                  email: user.email,
                  username: user.name,
                  profilePicture: user.image,
                  // You might want to generate a random password here
                  password: bcrypt.hashSync(Math.random().toString(36).slice(-8), 10)
                }
              },
              userId: true
            }
          })

          signedUser = [newUser]
        }

        user.id = signedUser[0]?.userId || user.id
      }

      return true
    },
  },
  pages: {
    signIn: '/auth/signin' //* Custom sign-in page
  },
  debug: process.env.NODE_ENV === 'development' //! Enable detailed logging in development mode
}
function ensureString(value: unknown, defaultValue: string): string {
  if (typeof value === 'string') {
    return value
  }
  return defaultValue
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
