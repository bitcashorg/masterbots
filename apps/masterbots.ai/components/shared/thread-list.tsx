'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Thread } from '@repo/mb-genql'
import { getBrowseThreads } from '@/services/hasura'
import { ThreadDoubleAccordion } from './thread-double-accordion'
import { ThreadDialog } from './thread-dialog'
import { usePathname, useSearchParams } from 'next/navigation'
import { GetBrowseThreadsParams } from '@/services/hasura/hasura.service.type'
import { useInfiniteQuery } from '@tanstack/react-query'
import { uniq, flatten } from 'lodash'

export function ThreadList({
  initialThreads,
  filter,
  chat = false,
  currentThread,
  dialog = false
}: ThreadListProps) {
  const params = useSearchParams()
  const queryKey = [usePathname(), params.get('query')]
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const { isFetchingNextPage, fetchNextPage, data } = useInfiniteQuery({
    queryKey,
    queryFn: async props => {
      return getBrowseThreads({
        ...filter,
        offset: props.pageParam * 20,
        limit: 20
      })
    },
    initialData: { pages: [initialThreads], pageParams: [1] },
    initialPageParam: 2,
    getNextPageParam: (_a, _b, lastPageParam) => {
      return lastPageParam + 1
    },
    enabled: false
  })

  // load mare item when it gets to the end
  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) {
        setTimeout(() => {
          fetchNextPage()
        }, 150)
        observer.unobserve(entry.target)
      }
    })

    observer.observe(loadMoreRef.current)

    return () => {
      // always unsubscribe on component unmount
      observer.disconnect()
    }
  }, [isFetchingNextPage])

  // ThreadDialog and ThreadDoubleAccordion can be used interchangeably
  const ThreadComponent = dialog ? ThreadDialog : ThreadDoubleAccordion

  const threads = uniq(flatten(data.pages))

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      {threads.map((thread: Thread) => (
        <ThreadComponent
          key={thread.threadId}
          thread={thread}
          chat={chat}
          defaultOpen={thread.threadId === currentThread?.threadId}
        />
      ))}
      <div ref={loadMoreRef}>
        {isFetchingNextPage ? 'loading more results ...' : ''}
      </div>
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
