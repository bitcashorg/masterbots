import { getMessagePairs, getThread } from '@/app/actions'
import { ThreadAccordionServer } from '@/components/shared/thread-accordion.server'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ThreadPage({ params }: ThreadPageProps) {
  const thread = await getThread({
    threadId: params.threadId
  })

  const messagePairs = await getMessagePairs(thread.threadId)

  return <ThreadAccordionServer messagePairs={messagePairs} thread={thread} />
}

export interface ThreadPageProps {
  params: {
    threadId: string
    chatbot: string
  }
}
