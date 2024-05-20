import { getMessagePairs, getThread } from '@/app/actions'
import { ThreadAccordionServer } from '@/components/shared/thread-accordion.server'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

// ? For site mapping, we should remove this route and make all redirections and link shares to the /b/ route.
// ? It is only valid to have /[category] when navigating between categories on browse.
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
