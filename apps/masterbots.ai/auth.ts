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
    async signIn({ profile, user }) {
      if (!profile) return false

      const adminSecret = process.env.HASURA_ADMIN_SECRET
      if (adminSecret) throw new Error('Admin Secret not found')

      console.log('upsert user')
      const dbUser = await upsertUser({
        email: user.email!,
        profilePicture: user.image || '',
        username: user.name?.replace(/\s/g, '_') || nanoid(),
        password: nanoid(),
        adminSecret: adminSecret as string
      })

      console.log('dbuser', dbUser)
      if (!dbUser) throw new Error('Login Error')

      const hasuraJwt = await getToken({
        user: { account: dbUser.userId, role: 'user' },
        jwtSecret: validateJwtSecret(process.env.AUTH_SECRET)
      })

      if (!hasuraJwt) throw new Error('Login Error')

      user.id = dbUser.userId.toString()
      user.image = dbUser.profilePicture || ''
      // user.hasuraJwt = hasuraJwt

      console.log('user values', {
        id: dbUser.userId.toString(),
        image: dbUser.profilePicture || '',
        hasuraJwt
      })

      return true
    },
    async jwt({ token, user, profile }) {
      console.log('jwt callback', { token, user, profile })
      // if (user) {
      //   token.userId = user.id
      //   token.image = user.image
      //   // Add other token adjustments here
      // }

      return token
    },
    session: async ({ session, token }) => {
      console.log('session callback', token)

      return session
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
