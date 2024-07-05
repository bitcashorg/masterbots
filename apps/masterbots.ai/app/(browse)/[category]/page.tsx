import BrowseList from '@/components/browse-list'
import { BrowseCategoryTabs } from '@/components/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse-search-input'
import { getCategories } from '@/services/hasura'

export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string }
}) {
  const categories = await getCategories()

  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      <BrowseCategoryTabs
        initialCategory={params.category}
        categories={categories}
      />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}
