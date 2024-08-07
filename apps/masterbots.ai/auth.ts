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
import { getToken, validateJwtSecret } from 'mb-lib'
export const authOptions: NextAuthOptions = {
  providers: [
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

        const client = createMbClient({ env: 'prod' }) // Adjust environment as needed

        // Check if user exists
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
        console.log('user', user)

        if (!user || user.length === 0) {
          throw new Error(
            'User authentication failed: Invalid or empty user data'
          )
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user[0].password
        )

        if (!isValid) {
          throw new Error('User authentication failed: Invalid password')
        }

        return { id: user[0].userId, email: user[0].email }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email

        // Generate Hasura JWT
        const jwtSecret = process.env.HASURA_GRAPHQL_JWT_SECRET
        if (!jwtSecret) throw new Error('JWT Secret not found')

        const hasuraJwt = await getToken({
          user: {
            account: user.id,
            role: 'user'
          },
          jwtSecret: validateJwtSecret(jwtSecret),
          jwtExpiration: Number(process.env.JWT_TOKEN_EXPIRATION)
        })

        if (!hasuraJwt) throw new Error('Login Error')

        token.hasuraJwt = hasuraJwt
      }

      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        hasuraJwt: token.hasuraJwt as string
      }

      return session
    },
    // @ts-ignore
    authorized({ auth }) {
      return !!auth?.user // ensures there is a logged-in user for every request
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}
