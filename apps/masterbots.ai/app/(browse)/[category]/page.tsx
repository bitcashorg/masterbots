import { ThreadList } from '@/components/shared/thread-list'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { SearchInput } from '@/components/shared/search-input'
import { getBrowseThreads, getCategories } from '@/services/hasura'
import { toSlug } from '@repo/mb-lib'
import { decodeQuery } from '@/lib/url'
import { constants } from 'perf_hooks'

// TODO: dicuss caching
// export const revalidate = 3600 // revalidate the data at most every hour

export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps) {
  const categories = await getCategories()
  const categoryId = categories.find(
    c => toSlug(c.name) === params.category
  )?.categoryId
  if (!categoryId) throw new Error('Category not foud')

  const query = searchParams.query ? decodeQuery(searchParams.query) : null
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 20
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const threads = await getBrowseThreads({
    limit,
    categoryId,
    offset: (page - 1) * limit,
    query
  })

  // Extract users and total number of users from the result
  // const users = result.users.items
  // const total = result.users.total

  // // Calculate the total number of pages and determine navigation possibility
  // const totalPages = Math.ceil(total / limit)
  // const hasNextPage = page < totalPages
  // const hasPreviousPage = page > 1

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
  searchParams?: { query: string; page: string; limit: string }
}
