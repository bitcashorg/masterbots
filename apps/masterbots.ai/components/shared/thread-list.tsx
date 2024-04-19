'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Thread } from '@repo/mb-genql'
import { usePathname } from 'next/navigation'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { uniq, flatten } from 'lodash'
import { GetBrowseThreadsParams } from '@/services/hasura/hasura.service.type'
import { getBrowseThreads } from '@/services/hasura'
// import { useGlobalStore } from '@/hooks/use-global-store'
import { ThreadDialog } from './thread-dialog'
import { ThreadListAccordion } from './thread-list-accordion'
import { ThreadListChatItem } from './thread-list-chat-item'

const limit = 20
export function ThreadList({
  initialThreads,
  filter,
  chat = false,
  dialog = false
}: ThreadListProps) {
  // const globalStore = useGlobalStore()
  const queryKey = [usePathname(), 'globalStore.query']
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [lastQueryKey, setLastQueryKey] = useState(queryKey)

  const { isFetchingNextPage, fetchNextPage, data } = useInfiniteQuery({
    queryKey,
    queryFn: async props => {
      return getBrowseThreads({
        ...filter,
        offset: props.pageParam * limit,
        limit
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
  // TODO: read count from database
  useEffect(() => {
    // only load add observer if we get at least iquals to limit on initialThreads
    // TODO: get thread count from server db query
    if (!loadMoreRef.current || initialThreads.length < limit) return
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
  }, [isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    const queryKeyString = JSON.stringify(queryKey)
    const lastQueryKeyString = JSON.stringify(lastQueryKey)
    console.log(
      queryKeyString === lastQueryKeyString,
      queryKeyString,
      lastQueryKeyString
    )
    if (queryKeyString === lastQueryKeyString) return
    console.log('queryKey changed, resetting query client ...')
    // Invalidate and refetch the query to reset state
    // we need this cos nextjs wont hydrate this client component, only src
    setShowSkeleton(true)
    setLastQueryKey(queryKey)

    queryClient.invalidateQueries({ queryKey }).then(() => {
      queryClient.refetchQueries({ queryKey }).then(() => {
        setShowSkeleton(false)
      })
    })
  }, [queryKey, setLastQueryKey, lastQueryKey, setShowSkeleton])

  // ThreadList can displays the rigth list item based on the context
  // ThreadListChatItem is next shallow link for chat ui lists
  // ThreadDialog is user preference
  // ThreadListAccordion is the defualt public list item
  const ThreadComponent = chat
    ? ThreadListChatItem
    : dialog
      ? ThreadDialog
      : ThreadListAccordion

  const threads = uniq(flatten(data.pages))

  return (
    <div className="flex flex-col w-full gap-8 py-5" key={queryKey[0]}>
      {!threads.length ? <div>No threads founds</div> : null}
      {showSkeleton ? ' Loading ...' : ''}
      {!showSkeleton &&
        threads.map((thread: Thread) => (
          <ThreadComponent
            chat={chat}
            defaultOpen={false} // we can have one open by default
            key={thread.threadId}
            thread={thread}
          />
        ))}
      <div ref={loadMoreRef}>
        {isFetchingNextPage ? 'loading more results ...' : ''}
      </div>
    </div>
  )
}

interface ThreadListProps {
  initialThreads: Thread[]
  chat?: boolean
  dialog?: boolean
  filter: GetBrowseThreadsParams
}
