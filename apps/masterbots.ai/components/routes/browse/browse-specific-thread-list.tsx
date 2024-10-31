'use client'

/**
 * BrowseSpecificThreadList Component
 *
 * This component displays a list of specific chat threads based on user queries.
 * It allows users to view initial threads and load more threads as needed.
 *
 * Props:
 * - initialThreads: An array of Thread objects representing the initial set of threads to display.
 * - query: An object containing query parameters for fetching threads.
 * - PAGE_SIZE: A number indicating the maximum number of threads to load at once.
 * - pageType: An optional string to specify the type of page (e.g., 'bot', 'user').
 *
 * Key Features:
 * - State Management: Manages the list of threads, loading state, and total count using React hooks.
 * - Load More Functionality: Fetches additional threads when the user requests more content.
 * - Responsive Design: Utilizes Tailwind CSS for styling and layout.
 * - Integration with Services: Uses the `getBrowseThreads` service to fetch threads based on the query.
 */

import React from 'react'
import { getBrowseThreads } from '@/services/hasura'
import type { Thread } from 'mb-genql'
import BrowseListItem from '@/components/routes/browse/browse-list-item'

export default function BrowseSpecificThreadList({
  initialThreads,
  query,
  PAGE_SIZE,
  pageType = ''
}: {
  query: { [key: string]: string | undefined }
  initialThreads: Thread[]
  PAGE_SIZE: number
  pageType?: string
}) {
  const [threads, setThreads] = React.useState<Thread[]>(initialThreads)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [count, setCount] = React.useState<number>(initialThreads.length)

  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreThreads = await getBrowseThreads({
      ...query,
      limit: PAGE_SIZE,
      offset: threads.length
    })

    setThreads(prevState => [...prevState, ...moreThreads])
    setCount(moreThreads.length)
    setLoading(false)
  }

  return (
    <div className="flex flex-col max-w-screen-lg px-4 mx-auto mt-8 gap-y-4">
      {threads.map((thread: Thread, key) => (
        <BrowseListItem
          pageType={pageType}
          thread={thread}
          key={key}
          loading={loading}
          loadMore={loadMore}
          hasMore={count === PAGE_SIZE}
          isLast={key === threads.length - 1}
        />
      ))}
    </div>
  )
}
