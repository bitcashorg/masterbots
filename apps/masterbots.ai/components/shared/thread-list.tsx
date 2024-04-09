'use client'

import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import type { Thread } from '@repo/mb-genql'
import { useBrowse } from '@/hooks/use-browse'
import { getBrowseThreads } from '@/services/hasura'
import { ThreadDialog } from './thread-dialog'

export function ThreadList({
  initialThreads,
  filter,
  chat = false,
  currentThread
}: ThreadListProps) {
  const { keyword } = useBrowse()
  const [threads, setThreads] = useState<Thread[]>(initialThreads)
  const [filteredThreads, setFilteredThreads] =
    useState<Thread[]>(initialThreads)
  const [loading, setLoading] = useState<boolean>(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [hasMore, setHasMore] = useState(true)

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

  const verifyKeyword = () => {
    if (!keyword) {
      setFilteredThreads(threads)
    } else {
      debounce(() => {
        setFilteredThreads(
          threads.filter((thread: Thread) =>
            thread.messages[0]?.content
              .toLowerCase()
              .includes(keyword.toLowerCase())
          )
        )
      }, 230)()
    }
  }

  useEffect(() => {
    verifyKeyword()
  }, [keyword, threads, verifyKeyword])

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

  return (
    <div className="w-full py-5 flex flex-col gap-8">
      {filteredThreads.map((thread: Thread, key) => (
        <ThreadDialog
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
  filter: {
    categoryId?: number
    userId?: string
    chatbotName?: string
    slug?: string
  }
}
