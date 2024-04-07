import { getThread } from '@/services/hasura'
import { BrowseThread } from '@/components/browse/browse-thread'
import type { ChatPageProps } from '@/app/c/[chatbot]/[threadId]/page'
import Shortlink from '@/components/browse/shortlink-button'

export default async function ThreadLandingPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId
  })
  return (
    <>
      <div>
        <Shortlink />
      </div>

      <BrowseThread thread={thread} />
    </>
  )
}
