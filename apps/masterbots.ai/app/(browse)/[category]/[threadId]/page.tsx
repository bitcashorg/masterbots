import { ThreadAccordion } from '@/components/shared/thread-accordion'
import { getMessagePairs, getThread } from '@/app/actions'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ThreadPage({ params }: ThreadPageProps) {
  const thread = await getThread({
    threadId: params.threadId
  })
  const initialMessagePairs = await getMessagePairs(thread.threadId)

  return (
    <ThreadAccordion
      initialMessagePairs={initialMessagePairs}
      thread={thread}
    />
  )
}

export interface ThreadPageProps {
  params: {
    threadId: string
    chatbot: string
  }
}
