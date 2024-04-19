import { ThreadList } from '@/components/shared/thread-list'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { SearchInput } from '@/components/shared/search-input'
import { getBrowseThreads, getCategories, getThread } from '@/services/hasura'
import { Card } from '@/components/ui/card'
import { decodeQuery } from '@/lib/url'
import { permanentRedirect } from 'next/navigation'
import { getThreadLink } from '@/lib/threads'

export default async function HomePage({ searchParams }: HomePageProps) {
  if (searchParams.threadId) {
    const thread = await getThread({ threadId: searchParams.threadId })
    permanentRedirect(getThreadLink({ thread }))
  }

  const categories = await getCategories()
  const query = searchParams.query ? decodeQuery(searchParams.query) : null
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 20
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const threads = await getBrowseThreads({
    limit,
    offset: (page - 1) * limit,
    query
  })
  console.log('Thereads', threads.length)

  return (
    <div className="container">
      <CategoryTabs categories={categories} />
      {/* <SearchInput /> */}
      {/* <div>Your query: {query}</div>
      <ul>
        {threads.map(t => (
          <li key={t.threadId}>{t.messages[0]?.content || 'not found'}</li>
        ))}
      </ul> */}

      {threads.length ? (
        <ThreadList
          filter={{
            query
          }}
          initialThreads={threads}
        />
      ) : (
        <Card>no results</Card>
      )}
    </div>
  )
}

interface HomePageProps {
  searchParams?: {
    query: string
    page: string
    limit: string
    threadId: string
  }
}
