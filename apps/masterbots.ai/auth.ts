import bcrypt from 'bcryptjs'
import { createMbClient } from 'mb-genql'
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next'
import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { getToken, validateJwtSecret, verify } from 'mb-lib'
import { setCookie } from 'cookies-next'

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
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password')
        }

        //* Initialize the Hasura client for interacting with the database
        const client = createMbClient({ env: 'local', adminSecret: 'lfg' }) // Adjust environment as needed

        try {
          const { user } = await client.query({
            user: {
              __args: {
                where: { email: { _eq: credentials.email } }
              },
              userId: true,
              email: true,
              password: true
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

          if (!isValid) {
            console.error('User authentication failed: Invalid password')
            throw new Error('Invalid credentials')
          }
          console.log('User authenticated successfully')
          //* Return user details to be attached to the token
          return { id: user[0].userId, email: user[0].email }
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email

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
              role: 'user'
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
      //* Attach the user details and JWT to the session object
      session.user = {
        id: token.id as string,
        email: token.email as string,
        hasuraJwt: token.hasuraJwt as string
      }

      console.log(
        'Session created with Hasura JWT:',
        session.user.hasuraJwt ? 'Present' : 'Missing'
      )

      return session
    },
    // @ts-ignore
    async authorized({ auth }) {
      return !!auth?.user
    }
  },
  pages: {
    signIn: '/auth/signin' //* Custom sign-in page
  },
  debug: process.env.NODE_ENV === 'development' //! Enable detailed logging in development mode
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
