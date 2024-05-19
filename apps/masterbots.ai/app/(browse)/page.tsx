import { ThreadList } from '@/components/shared/thread-list'
import { Card } from '@/components/ui/card'
import { decodeQuery } from '@/lib/url-params'
import { getThreads } from '../actions'

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = searchParams.query ? decodeQuery(searchParams.query) : null
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 20
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  // console.log({ query, limit, page })
  const threads = await getThreads({})

  return (
    <div>
      {threads.length ? (
        <ThreadList initialThreads={threads} />
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
