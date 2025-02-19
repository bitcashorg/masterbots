import { getThread } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'
import { redirect } from 'next/navigation'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })

  if (!thread) {
    throw new Error('The thread shared has not been found.')
  }

  redirect(`/b/${thread.chatbot.name}/${thread.threadId}`)
}
