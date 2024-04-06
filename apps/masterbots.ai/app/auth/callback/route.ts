import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { getToken, validateJwtSecret } from 'mb-lib'
import { upsertUser } from '@/services/hasura'
import { nanoid } from '@/lib/utils'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options })
        }
      }
    }
  )

  const {
    data: { user },
    error
  } = await supabase.auth.exchangeCodeForSession(code)
  if (error || !user?.email) throw new Error('Login Error')

  const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET
  if (!adminSecret) throw new Error('Admin Secret not found')
  const jwtSecret = process.env.HASURA_GRAPHQL_JWT_SECRET
  if (!jwtSecret) throw new Error('JWT Secret not found')

  const identity = user.identities && user.identities[0]

  if (!identity) throw new Error('Login Error')
  const userProfile = await upsertUser({
    email: user.email,
    profilePicture: identity.identity_data?.picture,
    username:
      identity.identity_data?.name.replace(/\s/g, '_').toLowerCase() ||
      nanoid(),
    password: nanoid(),
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
  })

  const hasuraJwt = await getToken({
    user: {
      account: user.id,
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
      name: identity.identity_data?.name || ''
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
