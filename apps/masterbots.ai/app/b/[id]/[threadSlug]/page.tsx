import { BrowseThread } from '@/components/routes/browse/browse-thread'
import { getThread } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatbotThreadArticlePage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadSlug: params.threadSlug,
    domain: params.domain,
    jwt: ''
  })

  if (!thread) {
    throw new Error('Bot Thread not found')
  }

  return <BrowseThread thread={thread} />
}
