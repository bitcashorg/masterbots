import { auth } from '@/auth'
import ChatThreadListPanel from '@/components/chat/chat-thread-list-panel'
import ThreadPanel from '@/components/thread-panel'
import { getThreads } from '@/services/hasura'
import { isTokenExpired } from 'mb-lib'
import { redirect } from 'next/navigation'

export default async function IndexPage() {
  const session = await auth()

  // NOTE: maybe we should use same expiration time
  const jwt = session?.user?.hasuraJwt
  if (!jwt || isTokenExpired(jwt)) {
    redirect(`/sign-in`)
  }

  const threads = await getThreads({
    jwt,
    userId: session!.user.id
  })

  return (
    <>
      <ThreadPanel threads={threads} />
      <ChatThreadListPanel />
    </>
  )
}
