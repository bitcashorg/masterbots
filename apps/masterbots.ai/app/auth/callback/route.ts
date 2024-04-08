import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { getToken, validateJwtSecret } from '@repo/mb-lib'
import { upsertUser } from '@/services/hasura'
import { nanoid } from '@/lib/utils'
import { createSupabaseServerClient } from '@/services/supabase'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
    error
  } = await supabase.auth.exchangeCodeForSession(code)
  if (error || !user.email) throw new Error('Login Error')

  const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET
  if (!adminSecret) throw new Error('Admin Secret not found')
  const jwtSecret = process.env.HASURA_GRAPHQL_JWT_SECRET
  if (!jwtSecret) throw new Error('JWT Secret not found')

  const identity = user.identities && user.identities[0]

  if (!identity) throw new Error('Login Error')
  const userProfile = await upsertUser({
    email: user.email,
    profilePicture: identity.identity_data.picture,
    username:
      identity.identity_data.name.replace(/\s/g, '_').toLowerCase() || nanoid(),
    password: nanoid(),
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
  })

  if (!userProfile) throw new Error('Login Error')

  const hasuraJwt = await getToken({
    user: {
      account: userProfile.userId,
      role: 'user'
    },
    jwtSecret: validateJwtSecret(jwtSecret),
    jwtExpiration: Number(process.env.JWT_TOKEN_EXPIRATION)
  })

  if (!hasuraJwt) throw new Error('Login Error')

  // Set the hasuraJwt as a cookie
  const cookieHeaders = cookies()
  cookieHeaders.set('hasuraJwt', hasuraJwt, {
    httpOnly: true,
    maxAge: Number(process.env.JWT_TOKEN_EXPIRATION),
    path: '/',
    sameSite: 'lax' //  sameSite policy
  })
  cookieHeaders.set(
    'userProfile',
    JSON.stringify({
      userId: userProfile.userId,
      username: userProfile.username,
      name: identity.identity_data.name || '',
      email: userProfile.email
    }),
    {
      httpOnly: true,
      maxAge: Number(process.env.JWT_TOKEN_EXPIRATION),
      path: '/',
      sameSite: 'lax' //  sameSite policy
    }
  )

  if (!error) return NextResponse.redirect(`${origin}${next}`)
}
