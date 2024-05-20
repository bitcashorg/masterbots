import { ThreadList } from '@/components/shared/thread-list'
import { Card } from '@/components/ui/card'
import { decodeQuery } from '@/lib/url-params'
import { getThread, getThreads } from '../actions'
import { permanentRedirect } from 'next/navigation'
import { getThreadLink } from '@/lib/threads'

export default async function HomePage({ searchParams }: HomePageProps) {
  if (searchParams.threadId) {
    const thread = await getThread({ threadId: searchParams.threadId })
    permanentRedirect(getThreadLink({ thread }).trim())
  }

  const query = searchParams.query ? decodeQuery(searchParams.query) : null
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 20
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  // console.log({ query, limit, page })
  const threads = await getThreads({page})

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
