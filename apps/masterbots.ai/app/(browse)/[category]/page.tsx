import { ThreadList } from '@/components/shared/thread-list'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { SearchInput } from '@/components/shared/search-input'
import { getBrowseThreads, getCategories } from '@/services/hasura'
import { toSlug } from '@repo/mb-lib'
import { decodeQuery } from '@/lib/url'

// TODO: dicuss caching
// export const revalidate = 3600 // revalidate the data at most every hour

export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps) {
  const categories = await getCategories()
  const categoryId = categories.find(
    c => toSlug(c.name) === params.category
  ).categoryId
  if (!categoryId) throw new Error('Category not foud')

  const query = searchParams.query ? decodeQuery(searchParams.query) : null

  const threads = await getBrowseThreads({
    limit: 20,
    categoryId,
    query
  })

  return (
    <div className="container">
      <CategoryTabs categories={categories} initialCategory={params.category} />
      <SearchInput />
      <ThreadList initialThreads={threads} filter={{ categoryId, query }} />
    </div>
  )
}

interface CategoryPageProps {
  params: { category: string }
  searchParams?: { query: string }
}
