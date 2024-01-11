import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import { getToken, validateJwtSecret } from 'mb-lib'
import { upsertUser } from './services/hasura'
import { nanoid } from './lib/utils'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (!token?.id) throw new Error('Login Error')

      const dbUser = await upsertUser({
        email: token.email!,
        profilePicture: (token.avatar_url || token.picture || '') as string,
        username: token.name?.replace(/\s/g, '_') || nanoid(),
        password: nanoid()
      })

      if (!dbUser) throw new Error('Login Error')

      const hasuraJwt = await getToken({
        user: { account: token.sub!, role: 'user' },
        jwtSecret: validateJwtSecret(process.env.AUTH_SECRET)
      })

      if (!hasuraJwt) throw new Error('Login Error')

      session.user = {
        id: dbUser.userId.toString(),
        image: dbUser.profilePicture || '',
        hasuraJwt
      }

      return session
    },
    async signIn({ profile }) {
      if (!profile) return false
      return false
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      image: string
      hasuraJwt: string
    } & DefaultSession['user']
  }
}
