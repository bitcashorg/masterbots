import { getMessagePairs, getThread } from '@/services/hasura'

import type { ChatPageProps } from '@/app/c/[chatbot]/[threadId]/page'
import Shortlink from '@/components/routes/browse/shortlink-button'
import { ThreadAccordion } from '@/components/shared/thread-accordion'

export default async function ThreadLandingPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId
  })
  const initialMessagePairs = await getMessagePairs(thread.threadId)

  return (
    <div className="container">
      <Shortlink />
      <ThreadAccordion
        thread={thread}
        initialMessagePairs={initialMessagePairs}
      />
    </div>
  )
}
