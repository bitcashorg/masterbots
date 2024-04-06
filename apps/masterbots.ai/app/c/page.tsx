import ChatThreadListPanel from '@/components/c/chat-thread-list-panel'
import ThreadPanel from '@/components/c/thread-panel'
import { getThreads } from '@/services/hasura'
import { getUserProfile } from '@/services/supabase'
import { isTokenExpired } from 'mb-lib'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function IndexPage() {
  const user = await getUserProfile()
  const jwt = cookies().get('hasuraJwt')?.value || ''

  // NOTE: maybe we should use same expiration time
  if (!jwt || isTokenExpired(jwt) || !user) redirect(`/auth/sign-in`)

  const threads = await getThreads({
    jwt,
    userId: user.userId
  })

  return (
    <>
      <ThreadPanel threads={threads} />
      <ChatThreadListPanel />
    </>
  )
}
