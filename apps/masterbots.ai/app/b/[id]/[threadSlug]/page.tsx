import { BrowseThread } from '@/components/routes/browse/browse-thread'
import { getThread } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'

export { /* @next-codemod-error `generateMbMetadata` export is re-exported. Check if this component uses `params` or `searchParams`*/
generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatbotThreadArticlePage(props: ChatPageProps) {
  const params = await props.params;
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
