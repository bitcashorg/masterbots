import ChatThreadListPanel from '@/components/c/chat-thread-list-panel'
import ThreadPanel from '@/components/c/thread-panel'
import { getThreads } from '@/services/hasura'
import { getUserSession } from '@/services/supabase'
import { isTokenExpired } from 'mb-lib'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function IndexPage() {
  const {
    data: { user }
  } = await getUserSession()
  const jwt = cookies().get('hasuraJwt')?.value || ''

  // NOTE: maybe we should use same expiration time
  if (!jwt || isTokenExpired(jwt) || !user) redirect(`/sign-in`)

  const threads = await getThreads({
    jwt,
    userId: user.id
  })

  return (
    <>
      <ThreadPanel threads={threads} />
      <ChatThreadListPanel />
    </>
  )
}
