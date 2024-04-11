'use client'

import React, { useEffect, useRef } from 'react'
import type { Thread } from '@repo/mb-genql'
import { getBrowseThreads } from '@/services/hasura'
import { ThreadDoubleAccordion } from './thread-double-accordion'
import { ThreadDialog } from './thread-dialog'
import { usePathname, useSearchParams } from 'next/navigation'
import { GetBrowseThreadsParams } from '@/services/hasura/hasura.service.type'
import { useQuery } from '@tanstack/react-query'

export function ThreadList({
  initialThreads,
  filter,
  chat = false,
  currentThread,
  dialog = false
}: ThreadListProps) {
  const searchParams = useSearchParams()
  const queryKey = [usePathname() + searchParams.get('query')]
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const threads = useQuery({
    queryKey,
    queryFn: async () => {
      const searchFilter = {
        ...filter,
        offset: threads.length,
        limit: 25
      }
      console.log(`🛜 Loading More Content for ${JSON.stringify(searchFilter)}`)
      const moreThreads = await getBrowseThreads(searchFilter)
      // concatenate newly loaded threads
      return threads.concat(moreThreads)
    },
    // data comes from nextjs server on first render
    refetchOnMount: false,
    initialData: initialThreads
  })

  // load mare item when it gets to the end
  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !threads.isLoading) {
        // NOTE: I think this is not required
        // setTimeout(() => threads.refetch(), 150)
        threads.refetch()
        observer.unobserve(entry.target)
      }
    })

    observer.observe(loadMoreRef.current)

    return () => {
      // always unsubscribe on component unmount
      observer.disconnect()
    }
  }, [threads.isLoading])

  // ThreadDialog and ThreadDoubleAccordion can be used interchangeably
  const ThreadComponent = dialog ? ThreadDialog : ThreadDoubleAccordion

  return (
    <div
      // use url queryKey as key for component to force rerender
      // I'm debuggin ssr results hydration issues
      key={queryKey[0]}
      className="flex flex-col w-full gap-8 py-5"
    >
      {threads.data.map((thread: Thread) => (
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
