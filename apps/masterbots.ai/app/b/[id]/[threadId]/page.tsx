import { getThread } from '@/services/hasura'
import { BrowseThread } from '@/components/routes/browse/browse-thread'
import { ChatPageProps } from '@/app/c/[category]/[chatbot]/page'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: any) {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })
  return <BrowseThread thread={thread} />
}
