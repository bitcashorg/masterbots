import { getCategories, getMessagePairs, getThread } from '@/services/hasura'

import type { ChatPageProps } from '@/app/c/[chatbot]/[threadId]/page'
import Shortlink from '@/components/routes/browse/shortlink-button'
import { ThreadAccordion } from '@/components/shared/thread-accordion'
import { BrowseCategoryTabs } from '@/components/routes/browse/browse-category-tabs'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'

export default async function ThreadLandingPage({ params }: ChatPageProps) {
  const categories = await getCategories()
  const thread = await getThread({
    threadId: params.threadId
  })
  const initialMessagePairs = await getMessagePairs(thread.threadId)

  return (
    <div className="container">
      <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <Shortlink />
      <ThreadAccordion
        thread={thread}
        initialMessagePairs={initialMessagePairs}
      />
    </div>
  )
}
