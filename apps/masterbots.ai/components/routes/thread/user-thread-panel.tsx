'use client'

/**
 * UserThreadPanel Component
 *
 * A component that displays user threads associated with a specific chatbot.
 * It integrates search functionality and manages the loading of threads.
 *
 * Key Features:
 * - Displays a list of threads with filtering capabilities
 * - Supports infinite scrolling to load more threads
 * - Integrates a search input for filtering threads
 * - Manages visibility of threads based on user interaction
 *
 * Functionality:
 * - Fetches threads based on the selected category and chatbot
 * - Updates the thread list when the active category or chatbot changes
 * - Handles loading state and pagination
 * - Sets the active thread when a thread is part of que Query Params.
 * - Handles the visibility of the continuous thread functionality.
 *
 * Props:
 * - chatbot: Optional string representing the selected chatbot
 * - threads: Optional array of Thread objects to display
 *
 * Note: This component handles both the display of threads and the logic
 * for fetching and updating the thread list based on user actions.
 */

import ChatChatbotDetails from '@/components/routes/chat/chat-chatbot-details'
import { ChatSearchInput } from '@/components/routes/chat/chat-search-input'
import ThreadList from '@/components/routes/thread/thread-list'
import { NoResults } from '@/components/shared/no-results-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { getBrowseThreads, getThread, getThreads, getUserBySlug } from '@/services/hasura'
import { isEqual } from 'lodash'
import type { Thread } from 'mb-genql'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useAsync, useSetState } from 'react-use'

const PAGE_SIZE = 20

// TODO: this is a hard to understand file since it tries to focus in too many different aspects
// in only one file, instead of relying on reusable hooks for each context. It should be refactored.
export default function UserThreadPanel({
  threads: initialThreads,
  page,
}: {
  threads?: Thread[]
  showSearch?: boolean
  page?: string
}) {
  const params = useParams<{ chatbot: string; threadId: string; slug?: string }>()
  const { data: session } = useSession()
  const { activeCategory, activeChatbot } = useSidebar()
  const { isOpenPopup, activeThread, setActiveThread, setIsOpenPopup } = useThread()
  const [loading, setLoading] = useState<boolean>(false)
  const { threads: hookThreads, isContinuousThread, setIsContinuousThread } = useThreadVisibility()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const searchParams = useSearchParams()
  const { slug, threadId } = params
  const continuousThreadId = searchParams.get('continuousThreadId')

  const userWithSlug = useAsync(async () => {
    if (!slug) return { user: null }
    const result = await getUserBySlug({
      slug,
      isSameUser: session?.user?.slug === slug,
    })
    return result
  }, [slug])

  const prevCategoryRef = useRef(activeCategory)
  const prevChatbotRef = useRef(activeChatbot)
  const prevPathRef = useRef(usePathname())
  const fetchIdRef = useRef(0) // Store the fetchId in a ref
  const pathname = usePathname()
  const [state, setState] = useSetState<{
    threads: Thread[]
    count: number
    totalThreads: number
  }>({
    threads: initialThreads || [],
    count: initialThreads?.length || 0,
    totalThreads: initialThreads?.length || 0,
  })
  const { threads, count, totalThreads } = state

  const updateThreads = () => {
    console.log('threads', threads)
    console.log('initialThreads', initialThreads)

    setState({
      threads: initialThreads || hookThreads,
      count: initialThreads?.length,
      totalThreads: initialThreads?.length,
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should run only once when the initial threads change
  useEffect(() => {
    if (isEqual(initialThreads, threads) && threads.length > (initialThreads?.length || 0)) return

    updateThreads()

    return () => {
      updateThreads()
    }
  }, [activeCategory, activeChatbot])

  const fetchBrowseThreads = async () => {
    try {
      if (!slug) return []
      const user = userWithSlug.value?.user
      if (!user) return []
      return await getBrowseThreads({
        userId: user.userId,
        categoryId: activeCategory,
        chatbotName: activeChatbot?.name,
        limit: PAGE_SIZE,
      })
    } catch (error) {
      console.error('Failed to fetch threads:', error)
      return []
    }
  }

  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)
    let moreThreads: Thread[] = []
    const userOnSlug = userWithSlug.value?.user
    const isOwnProfile = session?.user?.id === userOnSlug?.userId
    if ((page === 'profile' && !session?.user) || !isOwnProfile) {
      moreThreads = await fetchBrowseThreads()
    } else {
      moreThreads = await getThreads({
        jwt: session?.user?.hasuraJwt as string,
        userId: session?.user.id as string,
        offset: threads.length,
        limit: PAGE_SIZE,
        categoryId: activeCategory,
        chatbotName: activeChatbot?.name,
      })
    }
    setState({
      threads: moreThreads
        ? [...threads, ...moreThreads]
        : threads,
      count: threads.length,
    })
    setLoading(false)
  }

  const handleThreadsChange = async () => {
    setLoading(true)
    const userOnSlug = userWithSlug.value?.user
    const isOwnProfile = session?.user?.id === userOnSlug?.userId
    if (!session?.user || (!isOwnProfile && page === 'profile')) {
      const newThreads = await fetchBrowseThreads()

      setState({
        threads: newThreads,
        totalThreads: threads?.length,
        count: threads?.length,
      })
      setLoading(false)
      return
    }

    const currentFetchId = Date.now() // Generate a unique identifier for the current fetch
    fetchIdRef.current = currentFetchId
    const newThreads = await getThreads({
      jwt: session?.user?.hasuraJwt,
      userId: session?.user.id,
      limit: PAGE_SIZE,
      categoryId: activeCategory,
      chatbotName: activeChatbot?.name,
    })

    // Check if the fetchId matches the current fetchId stored in the ref
    if (fetchIdRef.current === currentFetchId) {
      // If it matches, update the threads state
      setState({
        threads: newThreads,
        totalThreads: threads?.length,
        count: threads?.length,
      })
    }
    setLoading(false)
  }

  const getThreadByContinuousThreadId = async (continuousThreadId: string, session: Session) => {
    const thread = await getThread({
      threadId: continuousThreadId,
      jwt: session.user?.hasuraJwt,
    })

    if (thread) {
      setState({
        threads: [thread, ...threads],
        totalThreads: totalThreads + 1,
        count: count + 1,
      })
      setActiveThread(thread)
      setIsContinuousThread(true)
      setIsOpenPopup(true)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should run only once
  useEffect(() => {
    if (continuousThreadId && session) {
      getThreadByContinuousThreadId(continuousThreadId, session)
    }
  }, [continuousThreadId, session])

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should run only when the active category or chatbot changes
  useEffect(() => {
    // Skip if popup is open
    if (isOpenPopup) return

    const shouldFetch =
      activeCategory ||
      activeChatbot ||
      (prevCategoryRef.current && !activeCategory) ||
      (prevChatbotRef.current && !activeChatbot) ||
      pathname !== prevPathRef.current // Add pathname check

    // Update refs
    prevCategoryRef.current = activeCategory
    prevChatbotRef.current = activeChatbot
    prevPathRef.current = pathname

    if (shouldFetch) {
      handleThreadsChange()
    }
  }, [activeCategory, activeChatbot, isOpenPopup, pathname])

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should run only when the active thread changes
  useEffect(() => {
    if (threads?.filter((t) => t.threadId === activeThread?.threadId).length)
      return

    setIsOpenPopup(false)
    setActiveThread(null)
  }, [threads])

  const customMessage = activeChatbot
    ? `No threads available for ${activeChatbot.name}`
    : activeCategory
      ? 'No threads available in the selected category'
      : 'Start a conversation to create your first thread'
  const showNoResults = !loading && searchTerm && threads.length === 0
  const showChatbotDetails = !loading && !searchTerm && threads.length === 0

  return (
    <Suspense fallback={(
      <div className="flex flex-col gap-10 w-full">
        <Skeleton className="w-[280px] h-[20px]" />

        <NoResults isLoading={true} />
      </div>
    )}>
      <div className="flex flex-col gap-1 h-[calc(100%-9.688rem)] px-4 py-5 lg:px-10">
        {!isContinuousThread && (
          <div className="flex justify-between px-4 md:px-10 py-5 lg:max-w-full">
            <ChatSearchInput setThreads={setState} onSearch={setSearchTerm} />
          </div>
        )}
        {loading && <NoResults isLoading={true} />}
        <ThreadList
          threads={threads}
          loading={loading}
          count={count}
          pageSize={PAGE_SIZE}
          loadMore={loadMore}
        />
        {showNoResults && (
          <NoResults
            searchTerm={searchTerm}
            totalItems={totalThreads}
            customMessage={customMessage}
          />
        )}
        {showChatbotDetails && (
          <ChatChatbotDetails />
        )}
      </div>
    </Suspense>
  )
}
