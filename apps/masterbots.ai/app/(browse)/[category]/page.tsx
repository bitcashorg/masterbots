import { permanentRedirect } from 'next/navigation'
import { ThreadList } from '@/components/shared/thread-list'
import { decodeQuery, toSlug } from '@/lib/url-params'
import { getCategories, getThreads } from '@/app/actions'

// TODO: dicuss caching
// export const revalidate = 3600 // revalidate the data at most every hour

export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps) {
  if (searchParams.threadId)
    permanentRedirect(`${params.category}/${searchParams.threadId}`)
  const categories = await getCategories()

  const categoryId = categories.find(
    c => toSlug(c.name) === params.category
  )?.categoryId
  if (!categoryId) throw new Error('Category not foud')

  const query = searchParams.query ? decodeQuery(searchParams.query) : null
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 20
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const threads = await getThreads({ categoryId })

  // Extract users and total number of users from the result
  // const users = result.users.items
  // const total = result.users.total

  // // Calculate the total number of pages and determine navigation possibility
  // const totalPages = Math.ceil(total / limit)
  // const hasNextPage = page < totalPages
  // const hasPreviousPage = page > 1

  return <ThreadList initialThreads={threads} />
}

interface CategoryPageProps {
  params: { category: string }
  searchParams?: {
    query: string
    page: string
    limit: string
    threadId: string
  }
}
