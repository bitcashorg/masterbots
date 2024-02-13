'use client'

import { Separator } from '@/components/ui/separator'
import { Thread } from 'mb-genql'
import Link from 'next/link'
import React from 'react'

export default function ThreadList({
  threads,
  loading,
  loadMore,
  count,
  pageSize,
}: {
  threads: Thread[]
  loading: boolean
  count: number
  pageSize: number
  loadMore: () => void
}) {
  return (
    <ul className="w-full">
      {threads.map((thread, key) => (
        <ThreadComponent
          key={key}
          thread={thread}
          loading={loading}
          loadMore={loadMore}
          hasMore={count === pageSize}
          isLast={key === threads.length - 1}
        />
      ))}
    </ul>
  )
}

function ThreadComponent({
  thread,
  loadMore,
  loading,
  isLast,
  hasMore
}: {
  thread: Thread
  loadMore: () => void
  loading: boolean
  isLast: boolean
  hasMore: boolean
}) {
  const threadRef = React.useRef<HTMLLIElement>(null)

  React.useEffect(() => {
    if (!threadRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (hasMore && isLast && entry.isIntersecting && !loading) {
        const timeout = setTimeout(() => {
          console.log('loading more content')
          loadMore()
          clearTimeout(timeout)
        }, 150)

        observer.unobserve(entry.target)
      }
    })

    observer.observe(threadRef.current)

    return () => {
      observer.disconnect()
    }
  }, [threadRef.current, isLast, hasMore, loading, loadMore])

  return (
    <li ref={threadRef}>
      <Link
        href={`/${thread.chatbot.name.trim().toLowerCase()}/${thread.threadId}`}
        className="flex items-center h-12"
        shallow={true}
      >
        {thread.messages
          .filter(m => m.role === 'user')[0]
          ?.content.substring(0, 100) || 'wat'}
      </Link>

      <Separator />
    </li>
  )
}
