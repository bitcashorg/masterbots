import BrowseList from '@/components/browse-list'
import { BrowseCategoryTabs } from '@/components/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse-search-input'
import { getCategories } from '@/services/hasura'

export default async function HomePage() {
  let categories = []
  try {
    categories = await getCategories()
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }

  return (
    <div className="max-w-screen-lg px-4 pb-10 mx-auto w-full">
      <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}
