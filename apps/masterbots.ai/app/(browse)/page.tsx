import BrowseList from '@/components/shared/thread-dialog/thread-list'
import { BrowseCategoryTabs } from '@/components/browse/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse/browse-search-input'
import { getBrowseThreads, getCategories } from '@/services/hasura'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function BrowsePage() {
  const categories = await getCategories()
  const threads = await getBrowseThreads({
    limit: 50
  })

  return (
    <div className="w-full max-w-screen-lg px-4 pb-10 mx-auto">
      <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <BrowseList initialThreads={threads} />
    </div>
  )
}
