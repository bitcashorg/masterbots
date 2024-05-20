import { BrowseThread } from '@/components/browse-thread'
import { ChatPageProps } from '@/app/chat/[chatbot]/[threadId]/page'
import { getThread } from '@/app/actions'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId,
  })
  return <BrowseThread thread={thread} />
}
