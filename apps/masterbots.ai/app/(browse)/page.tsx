import BrowseList from '@/components/home/browse-list'
import { BrowseCategoryTabs } from '@/components/home/browse-category-tabs'
import { BrowseSearchInput } from '@/components/home/browse-search-input'
import { getCategories } from '@/services/hasura'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function BrowsePage() {
  const categories = await getCategories()

  return (
    <div className="w-full max-w-screen-lg px-4 pb-10 mx-auto">
      <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}
