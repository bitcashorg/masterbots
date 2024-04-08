import ThreadList from '@/components/shared/thread-list'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { BrowseInput } from '@/components/shared/browse-input'
import { getBrowseThreads, getCategories } from '@/services/hasura'

export default async function BrowsePage() {
  const categories = await getCategories()
  const threads = await getBrowseThreads({
    limit: 25
  })
  return (
    <div className="container">
      <CategoryTabs categories={categories} />
      <BrowseInput />
      <ThreadList initialThreads={threads} filter={{}} />
    </div>
  )
}
