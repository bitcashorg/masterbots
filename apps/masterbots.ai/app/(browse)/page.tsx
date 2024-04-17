import BrowseList from '@/components/browse-list'
import { BrowseCategoryTabs } from '@/components/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse-search-input'
import { getCategories } from '@/services/hasura'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="max-w-[1024px] px-4 pb-10 mx-auto w-full">
      <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}
