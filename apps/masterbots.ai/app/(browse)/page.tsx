import { ThreadList } from '@/components/shared/thread-list'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { SearchInput } from '@/components/shared/search-input'
import { getBrowseThreads, getCategories } from '@/services/hasura'
import { Card } from '@/components/ui/card'
import { decodeQuery } from '@/lib/url'

export default async function HomePage({ searchParams }: HomePageProps) {
  const categories = await getCategories()
  const query = searchParams.query ? decodeQuery(searchParams.query) : null
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 20
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const threads = await getBrowseThreads({
    limit,
    offset: (page - 1) * limit,
    query
  })
  return (
    <div className="container">
      <CategoryTabs categories={categories} />
      <SearchInput />

      {threads?.length ? (
        <ThreadList
          initialThreads={threads}
          filter={{
            query
          }}
        />
      ) : (
        <Card>no results</Card>
      )}
    </div>
  )
}

interface HomePageProps {
  searchParams?: { query: string; page: string; limit: string }
}
