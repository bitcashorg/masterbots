import { getThread } from '@/services/hasura'
import { BrowseThread } from '@/components/home/browse-thread'
import { ChatPageProps } from '@/app/c/[chatbot]/[threadId]/page'

export default async function ThreadLandingPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId
  })
  return <BrowseThread thread={thread} />
}
