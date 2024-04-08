import ThreadList from '@/components/shared/thread-list'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { BrowseInput } from '@/components/shared/browse-input'
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
    limit: 20,
    categoryId
  })

  return (
    <div className="container">
      <CategoryTabs categories={categories} initialCategory={params.category} />
      <BrowseInput />
      <ThreadList initialThreads={threads} filter={{ categoryId }} />
    </div>
  )
}
