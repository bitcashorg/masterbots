'use client'

import React from 'react'

import { getBrowseThreads } from '@/services/hasura'
import { Thread } from 'mb-genql'
import BrowseListItem from './browse-list-item'

export default function BrowseSpecificThreadList({
  initialThreads,
  query,
  PAGE_SIZE,
  isShowUser = true
}: {
  query: { [key: string]: string | undefined }
  initialThreads: Thread[]
  PAGE_SIZE: number
  isShowUser?: boolean
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
    <div className="max-w-[1024px] px-4 mx-auto mt-8 flex gap-y-4 flex-col">
      {threads.map((thread: Thread, key) => (
        <BrowseListItem
          isShowUser={isShowUser}
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
