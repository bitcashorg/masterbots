
import { ThreadPageProps } from '@/app/(browse)/[category]/[threadId]/page'
import { getMessagePairs, getThread } from '@/app/actions'
import { ThreadAccordionServer } from '@/components/shared/thread-accordion.server'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

// ? When a user clicks to a thread, the URL gets updated to this one.
// ? When a user navigates within the bot page and click to a thread, the URL gets updated to this one.
// * When sharing, the URL gets updated to this one.
export default async function ChatPage({ params }: ThreadPageProps) {
  const thread = await getThread({
    threadId: params.threadId,
  })
  const messagePairs = await getMessagePairs(thread.threadId)

  return <ThreadAccordionServer messagePairs={messagePairs} thread={thread} />
}
