'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Thread } from '@repo/mb-genql'
import { getBrowseThreads } from '@/services/hasura'
import { ThreadDoubleAccordion } from './thread-double-accordion'
import { ThreadDialog } from './thread-dialog'
import { usePathname, useSearchParams } from 'next/navigation'
import { GetBrowseThreadsParams } from '@/services/hasura/hasura.service.type'
import { useQuery } from '@tanstack/react-query'
import { uniq } from 'lodash'
import { useAsyncFn } from 'react-use'

export function ThreadList({
  initialThreads,
  filter,
  chat = false,
  currentThread,
  dialog = false
}: ThreadListProps) {
  const params = useSearchParams()
  const [threads, setThreads] = useState(initialThreads)

  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [moreThreads, fetchMoreThreads] = useAsyncFn(() => {
    const searchFilter = {
      ...filter,
      offset: threads.length,
      limit: 25
    }
    console.log(
      `🛜 Loading More Content for ${JSON.stringify(searchFilter)}, current thread count ${threads.length}`
    )
    return getBrowseThreads(searchFilter)
  }, [filter, threads])

  // add more threads as they come in
  useEffect(() => {
    setThreads(prev =>
      uniq(prev.concat(moreThreads.value)).filter(v => v != undefined)
    )
  }, [moreThreads])

  // load mare item when it gets to the end
  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !moreThreads.loading) {
        console.log(' intersection !')
        // NOTE: I think this is not required

        setTimeout(() => {
          console.log('go fetch more')
          fetchMoreThreads()
        }, 150)
        observer.unobserve(entry.target)
      }
    })

    observer.observe(loadMoreRef.current)

    return () => {
      // always unsubscribe on component unmount
      observer.disconnect()
    }
  }, [moreThreads.loading])

  // ThreadDialog and ThreadDoubleAccordion can be used interchangeably
  const ThreadComponent = dialog ? ThreadDialog : ThreadDoubleAccordion

  // useQuery format. we want to use useInfiniteScroll
  const queryKey = [
    usePathname() + params.get('query'),
    { ...filter, offset: threads.length }
  ]

  return (
    <div
      // use url queryKey as key for component to force rerender
      // I'm debuggin ssr results hydration issues
      key={JSON.stringify(queryKey)}
      className="flex flex-col w-full gap-8 py-5"
    >
      {threads.map((thread: Thread) => (
        <ThreadComponent
          key={thread.threadId}
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
