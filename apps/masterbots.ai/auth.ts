import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import { JwtSecret, getToken } from 'mb-lib'
import { upsertUser } from './services/db'
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
    jwt({ token, profile }) {
      if (profile) {
        console.log('google profile', profile)
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      return token
    },
    session: async ({ session, token }) => {
      console.log(token)
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }

      // await upsertUser({
      //   email: token.email!,
      //   profilePicture: token.image as string,
      //   username: token.name?.replace(/\s/g, '_') || nanoid()
      // })

      // const hasuraJwt = await getToken({
      //   user: { account: token.sub!, role: 'user' },
      //   jwtSecret: {
      //     type: 'HS256',
      //     key: '5152fa850c02dc222631cca898ed1485821a70912a6e3649c49076912daa3b62182ba013315915d64f402ddfbb8b58eb5bd11ba225136a6af45bbae07ca872f4',
      //     issuer: 'hasura-auth'
      //   } as JwtSecret
      // })

      // console.log({ hasuraJwt })
      // const dbUser  = {
      //   account: token.sub!,
      //   hasuraJwt
      // }
      // session.user = dbUser
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
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}
