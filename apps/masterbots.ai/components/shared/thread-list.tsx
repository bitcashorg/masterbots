'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Thread } from '@repo/mb-genql'
import { getBrowseThreads } from '@/services/hasura'
import { ThreadDoubleAccordion } from './thread-double-accordion'
import { ThreadDialog } from './thread-dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import { GetBrowseThreadsParams } from '@/services/hasura/hasura.service.type'

export function ThreadList({
  initialThreads,
  filter,
  chat = false,
  currentThread,
  dialog = false
}: ThreadListProps) {
  const [threads, setThreads] = useState<Thread[]>(initialThreads)
  const [filteredThreads, setFilteredThreads] =
    useState<Thread[]>(initialThreads)
  const [loading, setLoading] = useState<boolean>(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [hasMore, setHasMore] = useState(true)
  const searchParams = useSearchParams()

  // load more threads for the category
  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)

    const moreThreads = await getBrowseThreads({
      ...filter,
      offset: filteredThreads.length,
      limit: 25
    })

    if (moreThreads.length === 0) setHasMore(false)
    setThreads(prevState => [...prevState, ...moreThreads])
    setLoading(false)
  }

  // load mare item when it gets to the end
  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && entry.isIntersecting && !loading) {
        setTimeout(() => loadMore(), 150)
        observer.unobserve(entry.target)
      }
    })

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [hasMore, loading, loadMore])

  const ThreadComponent = dialog ? ThreadDialog : ThreadDoubleAccordion

  console.log('ThreadList', searchParams.get('query'))
  return (
    <div
      key={searchParams.get('query')}
      className="flex flex-col w-full gap-8 py-5"
    >
      {filteredThreads.map((thread: Thread, key) => (
        <ThreadComponent
          key={key}
          thread={thread}
          chat={chat}
          defaultOpen={thread.threadId === currentThread?.threadId}
        />
      ))}
      <div ref={loadMoreRef} />
    </div>
  )
}

type ThreadListProps = {
  currentThread?: Thread
  initialThreads: Thread[]
  chat?: boolean
  dialog?: boolean
  filter: GetBrowseThreadsParams
}
