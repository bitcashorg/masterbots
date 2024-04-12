import { isTokenExpired } from '@repo/mb-lib'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getBrowseThreads, getUser } from '@/services/hasura'
import { createSupabaseServerClient } from '@/services/supabase'
import { ThreadList } from '@/components/shared/thread-list'

export default async function IndexPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user.email) redirect(`/auth/sign-in`)

  const dbUserProfile = await getUser({
    email: user.email,
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
  })

  if (!dbUserProfile) redirect(`/auth/sign-in`)

  const jwt = cookies().get('hasuraJwt').value || ''

  // NOTE: maybe we should use same expiration time
  if (!jwt || isTokenExpired(jwt) || !user) redirect(`/auth/sign-in`)

  const threads = await getBrowseThreads({
    slug: dbUserProfile.slug,
    limit: 20
  })

  return (
    <ThreadList
        chat
        filter={{ slug: dbUserProfile.slug }}
        initialThreads={threads}
      />
  )
}
