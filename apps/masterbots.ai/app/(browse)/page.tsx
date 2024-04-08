import ThreadList from '@/components/shared/thread-list'
import { BrowseCategoryTabs } from '@/components/routes/browse/browse-category-tabs'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { getBrowseThreads, getCategories } from '@/services/hasura'

export default async function BrowsePage() {
  const categories = await getCategories()
  const threads = await getBrowseThreads({
    limit: 50
  })
  return (
    <div className="container">
      <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <ThreadList initialThreads={threads} filter={{}} />
    </div>
  )
}
