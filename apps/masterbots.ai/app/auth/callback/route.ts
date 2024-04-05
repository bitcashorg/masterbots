import { cookies } from 'next/headers'
import { createSupabaseServerClient } from '@/services/supabase'
import { getToken, validateJwtSecret } from 'mb-lib'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) throw new Error('Login Error')

    const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET
    if (!adminSecret) throw new Error('Admin Secret not found')
    const jwtSecret = process.env.HASURA_GRAPHQL_JWT_SECRET
    if (!jwtSecret) throw new Error('JWT Secret not found')

    const hasuraJwt = await getToken({
      user: {
        account: data.user.id,
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
      // maxAge: Number(process.env.JWT_TOKEN_EXPIRATION),
      path: '/',
      sameSite: 'lax' //  sameSite policy
    })

    // Return the headers with cookies set
    return new Response(null, {
      status: 302,
      statusText: 'Found'
      // headers: { Location: `${origin}${next}` }
    })
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
