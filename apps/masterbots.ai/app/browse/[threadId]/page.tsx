import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getThread } from '@/services/hasura'
import { isTokenExpired } from 'mb-lib'
import { BrowseThread } from '@/components/browse-thread'
import { ChatPageProps } from '@/app/(chat)/[chatbot]/[threadId]/page'

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()
  // NOTE: maybe we should use same expiration time
  const jwt = session!.user.hasuraJwt
  if (!jwt || isTokenExpired(jwt)) {
    redirect(`/sign-in`)
  }
  const thread = await getThread({
    threadId: params.threadId,
    jwt: session!.user.hasuraJwt
  })

  //TODO: handle threadId not found

  if (!session) redirect(`/sign-in?next=/browse/${params.threadId}`)

  // format all user prompts and chatgpt 'assistant' messages

  // we always start a new openai chat that why id=nanoid()
  // and we pass our system prompts along with assistant and user messages from our db.
  return <BrowseThread thread={thread} />
}
