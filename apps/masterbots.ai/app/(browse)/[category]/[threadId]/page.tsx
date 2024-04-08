import { getCategories, getMessagePairs, getThread } from '@/services/hasura'

import type { ChatPageProps } from '@/app/c/[chatbot]/[threadId]/page'
import Shortlink from '@/components/shared/shortlink-button'
import { ThreadAccordion } from '@/components/shared/thread-accordion'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { BrowseInput } from '@/components/shared/browse-input'

export default async function ThreadLandingPage({ params }: ChatPageProps) {
  const categories = await getCategories()
  const thread = await getThread({
    threadId: params.threadId
  })
  const initialMessagePairs = await getMessagePairs(thread.threadId)

  return (
    <div className="container">
      <CategoryTabs categories={categories} />
      <BrowseInput />
      <Shortlink />
      <ThreadAccordion
        thread={thread}
        initialMessagePairs={initialMessagePairs}
      />
    </div>
  )
}
