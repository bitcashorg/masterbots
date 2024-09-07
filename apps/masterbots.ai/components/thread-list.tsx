'use client'

import { Thread } from 'mb-genql'
import React from 'react'
import ThreadComponent from "./thread-component"

export default function ThreadList({
  threads,
  loading,
  loadMore,
  count,
  pageSize
}: {
  threads: Thread[]
  loading: boolean
  count: number
  pageSize: number
  loadMore: () => void
}) {
  console.log('threads', threads)
  return (
    <ul className="flex flex-col w-full gap-3">
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