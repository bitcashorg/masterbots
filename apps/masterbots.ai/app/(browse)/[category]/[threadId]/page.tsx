import { getThread } from '@/services/hasura'
import { BrowseThread } from '@/components/browse-thread'
import { ChatPageProps } from '@/app/chat/[chatbot]/[threadId]/page'

export default async function ChatPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })
  return <BrowseThread thread={thread} />
}
