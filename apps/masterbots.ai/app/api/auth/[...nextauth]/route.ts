import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { createMbClient } from 'mb-genql'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const client = createMbClient({ env: 'prod' }) // Adjust environment as needed

        // Check if user exists
        const { user } = await client.query({
          user: [
            {
              where: { email: { _eq: credentials.email } }
            },
            {
              user_id: true,
              email: true,
              password: true
            }
          ]
        })

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

        return { id: user[0].userId, email: user[0].email }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
