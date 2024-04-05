import BrowseList from '@/components/home/browse-list'
import { BrowseCategoryTabs } from '@/components/home/browse-category-tabs'
import { BrowseSearchInput } from '@/components/home/browse-search-input'
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
        initialCategory={params.category}
        categories={categories}
      />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}
