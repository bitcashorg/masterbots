import bcrypt from 'bcrypt';
import { createMbClient } from "mb-genql";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from "next-auth/providers/google";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const client = createMbClient({ env: 'prod' }) // Adjust environment as needed

        // Check if user exists
        const { user } = await client.query({
          user: {
            __args: {
              where: {
                email: {
                  _eq: credentials.email
                }
              }
            },
            __scalar: true
          }
        })

        console.log('user', user)

        if (!user || user.length === 0) {
          return null
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user[0].password
        )

        if (!isValid) {
          return null
        }

        // TODO: Check naming convention in hasura. Should be camelCase
        return { id: user[0].userId, email: user[0].email }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.hasuraJwt = token
        // TODO: Hacer upsert aquí? @bfernandez
      }

      // const hasuraJwt = await getToken({
      //   user: {
      //     account: dbUser.userId,
      //     role: 'user'
      //   },
      //   jwtSecret: validateJwtSecret(jwtSecret),
      //   jwtExpiration: Number(process.env.JWT_TOKEN_EXPIRATION)
      // })

      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user = {
          id: token.id,
          email: token.email,
          hasuraJwt: token.hasuraJwt as string
        }
      }
      return session
    },
    // @ts-ignore
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}