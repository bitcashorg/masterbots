import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getErrorMessage } from '@repo/mb-lib'
import { objectToCamel } from 'ts-case-convert'
import { nanoid } from '@/lib/utils'
import { createSupabaseServerClient } from '@/services/supabase'
import { generateUsername } from '@/lib/username'

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

  const identity = user.identities && user.identities[0]

  if (!identity) throw new Error('Login Error')
  const dbUser = await supabase
    .from('user')
    .insert({
      email: user.email,
      avatar: identity.identity_data.picture,
      name: identity.identity_data.name,
      username: generateUsername(identity.identity_data.name),
      password: nanoid()
    })
    .select()
    .single()

  if (dbUser.error) throw new Error(getErrorMessage(dbUser.error))

  // TODO: review if this is really needed
  const cookieHeaders = cookies()
  cookieHeaders.set(
    'userProfile',
    JSON.stringify({
      userId: dbUser.data.user_id,
      username: dbUser.data.username,
      name: dbUser.data.name
    }),
    {
      httpOnly: true,
      maxAge: 2630016,
      path: '/',
      sameSite: 'lax' //  sameSite policy
    }
  )

  if (!error) return NextResponse.redirect(`${origin}${next}`)
}
