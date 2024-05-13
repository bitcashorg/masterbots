import { getCategories, getMessagePairs, getThread } from '@/services/hasura'
import { ThreadAccordion } from '@/components/shared/thread-accordion'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { SearchInput } from '@/components/shared/search-input'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ThreadPage({ params }: ThreadPageProps) {
  const categories = await getCategories()
  const thread = await getThread({
    threadId: params.threadId
  })
  const initialMessagePairs = await getMessagePairs(thread.threadId)

  return (
    <div className="fluid-container">
      <CategoryTabs categories={categories} />
      <SearchInput />
      <ThreadAccordion
        initialMessagePairs={initialMessagePairs}
        thread={thread}
      />
    </div>
  )
}

export interface ThreadPageProps {
  params: {
    threadId: string
    chatbot: string
  }
}
