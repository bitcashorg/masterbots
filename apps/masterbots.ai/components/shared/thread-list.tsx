import { getThreads } from '@/app/actions'
import { MB } from '@repo/supabase'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { flatten, uniq } from 'lodash'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ThreadDialog } from './thread-dialog'
import { ThreadListAccordion } from './thread-list-accordion'
import { ThreadListChatItem } from './thread-list-chat-item'

const limit = 20
export function ThreadList({
  initialThreads,
  chat = false,
  dialog = false,
  isUser = false,
  isBot = false
}: ThreadListProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const [showSkeleton, setShowSkeleton] = useState(false)

  const queryKey = [usePathname(), query]
  const [lastQueryKey, setLastQueryKey] = useState(queryKey)
  const { isFetchingNextPage, fetchNextPage, data, refetch } = useInfiniteQuery(
    {
      queryKey,
      queryFn: async (props) => {
        const query = await getThreads({
          page: props.pageParam - 1,
        })
        return query.data
      },
      initialData: { pages: [initialThreads], pageParams: [1] },
      initialPageParam: 2,
      getNextPageParam: ((_a, _b, lastPageParam) => {
        return lastPageParam + 1
      }),
      enabled: false
    }
  )

  useEffect(() => {
    refetch()
  }, [refetch, query])

  // load mare item when it gets to the end
  // TODO: read count from database
  useEffect(() => {
    // only load add observer if we get at least iquals to limit on initialThreads
    // TODO: get thread count from server db query
    if (
      !loadMoreRef.current ||
      data.pages[data.pages.length - 1].length < limit
    )
      return
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
        refetch()
      })
    })
  }, [queryKey, setLastQueryKey, lastQueryKey, setShowSkeleton, refetch])

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
    <div className="flex flex-col w-full gap-8 py-5">
      {!threads.length ? <div>No threads founds</div> : null}
      {showSkeleton ? ' Loading ...' : ''}
      {!showSkeleton &&
        threads.map((thread: MB.ThreadFull) => (
          <ThreadComponent
            chat={chat}
            defaultOpen={false} // we can have one open by default
            key={thread.threadId}
            thread={thread}
            {...(isBot ? { isBot } : {})}
            {...(isUser ? { isUser } : {})}
          />
        ))}
      <div ref={loadMoreRef} className="min-h-10">
        {isFetchingNextPage && (
          <div className='flex justify-center items-center h-10'>
            <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900' />
          </div>
        )}
      </div>
    </div>
  )
}

interface ThreadListProps {
  initialThreads: MB.ThreadFull[]
  chat?: boolean
  dialog?: boolean
  isUser?: boolean
  isBot?: boolean
}
