import BrowseList from '@/components/browse-list'
import { BrowseCategoryTabs } from '@/components/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse-search-input'
import { getCategories } from '@/services/hasura'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string }
}) {
  const categories = await getCategories()

  return (
    <div className="max-w-[1024px] pb-10 mx-auto w-full">
      <BrowseCategoryTabs
        initialCategory={params.category}
        categories={categories}
      />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}
