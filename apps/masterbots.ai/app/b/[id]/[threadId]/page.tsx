import { getThread } from '@/services/hasura'
import { BrowseThread } from '@/components/routes/browse/browse-thread'
import type { ChatPageProps } from '@/types/types'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })
  return <BrowseThread thread={thread} />
}
