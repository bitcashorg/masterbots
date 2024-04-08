import { isTokenExpired } from '@repo/mb-lib'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import ChatThreadListPanel from '@/components/routes/c/chat-thread-list-panel'
import ThreadPanel from '@/components/routes/c/thread-panel'
import { getThreads, getUser } from '@/services/hasura'
import { createSupabaseServerClient } from '@/services/supabase'

export default async function IndexPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user || !user.email) throw new Error('user not found')
  const dbUserProfile = await getUser({
    email: user.email,
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
  })

  if (!dbUserProfile) throw new Error('user not found')

  const jwt = cookies().get('hasuraJwt').value || ''

  // NOTE: maybe we should use same expiration time
  if (!jwt || isTokenExpired(jwt) || !user) redirect(`/auth/sign-in`)

  const threads = await getThreads({
    jwt,
    userId: dbUserProfile.userId
  })

  return (
    <>
      <ThreadPanel threads={threads} />
      <ChatThreadListPanel />
    </>
  )
}
