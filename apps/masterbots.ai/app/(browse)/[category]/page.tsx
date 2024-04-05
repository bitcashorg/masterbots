import BrowseList from '@/components/home/browse-list'
import { BrowseCategoryTabs } from '@/components/home/browse-category-tabs'
import { BrowseSearchInput } from '@/components/home/browse-search-input'
import { CategoryMainTabs } from '@/components/category-main-tabs'
import { getCategories } from '@/services/hasura'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string }
}) {
  const categories = await getCategories()

  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      <CategoryMainTabs />
      <BrowseCategoryTabs
        initialCategory={params.category}
        categories={categories}
      />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}
