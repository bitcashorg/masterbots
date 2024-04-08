import ThreadList from '@/components/shared/thread-list'
import { BrowseCategoryTabs } from '@/components/routes/browse/browse-category-tabs'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { getBrowseThreads, getCategories } from '@/services/hasura'

export const revalidate = 3600 // revalidate the data at most every hour

export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string }
}) {
  const categories = await getCategories()
  const categoryId = categories.find(
    c =>
      c.name.toLowerCase().replace(/\s+/g, '_').replace(/\&/g, '_') ===
      params.category
  ).categoryId
  if (!categoryId) throw new Error('Category id not foud')

  const threads = await getBrowseThreads({
    limit: 50,
    categoryId
  })

  return (
    <div className="container">
      <BrowseCategoryTabs
        categories={categories}
        initialCategory={params.category}
      />
      <BrowseSearchInput />
      <ThreadList initialThreads={threads} filter={{ categoryId }} />
    </div>
  )
}
