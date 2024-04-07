import BrowseList from '@/components/browse/browse-list'
import { BrowseCategoryTabs } from '@/components/browse/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse/browse-search-input'
import { getCategories } from '@/services/hasura'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string }
}) {
  const categories = await getCategories()

  return (
    <div className="w-full max-w-screen-lg pb-10 mx-auto">
      <BrowseCategoryTabs
        categories={categories}
        initialCategory={params.category}
      />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}
