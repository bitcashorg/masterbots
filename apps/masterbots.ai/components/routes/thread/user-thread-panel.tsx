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
 * - Handles the visibility of the continuos thread functionality.
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
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { getBrowseThreads, getThread, getThreads, getUserBySlug } from '@/services/hasura'
import type { Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAsync } from 'react-use'

const PAGE_SIZE = 20

// TODO: this is a hard to understand file since it tries to focus in too many different aspects
// in only one file, instead of relying on reusable hooks for each context. It should be refactored.
export default function UserThreadPanel({
  chatbot,
  threads: initialThreads,
  showSearch,
  page
}: {
  chatbot?: string
  threads?: Thread[]
  showSearch?: boolean
  search?: { [key: string]: string | string[] | undefined }
  page?: string
}) {
  const params = useParams<{ chatbot: string; threadId: string, slug?: string }>()
  const { data: session } = useSession()
  const { activeCategory, activeChatbot } = useSidebar()
  const { isOpenPopup, activeThread, setActiveThread, setIsOpenPopup } = useThread()
  const [loading, setLoading] = useState<boolean>(false)
  const { threads: hookThreads, isContinuosThread, setIsContinuosThread } = useThreadVisibility()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const searchParams = useSearchParams()
  const { slug, threadId } = params;
  const continuousThreadId = searchParams.get('continuousThreadId')

  const userWithSlug = useAsync(async () => {
    if (!slug) return { user: null }
    const result = await getUserBySlug({
      slug,
      isSameUser: session?.user?.slug === slug
    })
    return result
  }, [slug])

  const finalThreads = useMemo(
    () => initialThreads ?? hookThreads,
    [initialThreads, hookThreads]
  )
  const [threads, setThreads] = useState<Thread[]>(finalThreads ?? [])
  const [count, setCount] = useState<number>(finalThreads?.length ?? 0)
  const [totalThreads, setTotalThreads] = useState<number>(0)
  const prevCategoryRef = useRef(activeCategory);
  const prevChatbotRef = useRef(activeChatbot);
  const prevPathRef = useRef(usePathname());
  const pathname = usePathname();
  const fetchIdRef = useRef(0) // Store the fetchId in a ref

  useEffect(() => {
    setThreads(finalThreads)
    setCount(finalThreads?.length ?? 0)
    setTotalThreads(finalThreads?.length ?? 0)
  }, [finalThreads])

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
      });

    } catch (error) {
      console.error('Failed to fetch threads:', error);
      return [];
    }
  };

  const loadMore = async () => {
    console.log('🟡 Loading More Content')
    setLoading(true)
    let moreThreads: Thread[] = []
    const userOnSlug = userWithSlug.value?.user
    const isOwnProfile = session?.user?.id === userOnSlug?.userId;
    if (page === 'profile' && !session?.user || !isOwnProfile) {
      moreThreads = await fetchBrowseThreads();
    } else {
      moreThreads = await getThreads({
        jwt: session!.user?.hasuraJwt,
        userId: session!.user.id,
        offset: threads.length,
        limit: PAGE_SIZE,
        categoryId: activeCategory,
        chatbotName: activeChatbot?.name,
      })
    }
    if (moreThreads) setThreads(prevState => [...prevState, ...moreThreads])
    setCount(_prev => moreThreads.length ?? 0)
    setLoading(false)
  }

  const handleThreadsChange = async () => {
    let threads: Thread[] = []
    setLoading(true)
    const userOnSlug = userWithSlug.value?.user
    const isOwnProfile = session?.user?.id === userOnSlug?.userId;
    if (!session?.user || !isOwnProfile && page === 'profile') {
      threads = await fetchBrowseThreads();
      setThreads(_prev => threads ?? [])
      setCount(_prev => threads.length ?? 0)
      setTotalThreads(threads?.length ?? 0)
      setLoading(false)
      return;
    }

    const currentFetchId = Date.now() // Generate a unique identifier for the current fetch
    fetchIdRef.current = currentFetchId
    threads = await getThreads({
      jwt: session!.user?.hasuraJwt,
      userId: session!.user.id,
      limit: PAGE_SIZE,
      categoryId: activeCategory,
      chatbotName: activeChatbot?.name,
    })

    // Check if the fetchId matches the current fetchId stored in the ref
    if (fetchIdRef.current === currentFetchId) {
      // If it matches, update the threads state
      setThreads(_prev => threads ?? [])
      setCount(_prev => threads.length ?? 0)
      setTotalThreads(threads?.length ?? 0)
    }
    setLoading(false)
  }

  const getThreadByContinuousThreadId = async () => {
    const thread = await getThread({
      threadId: continuousThreadId,
      jwt: session!.user?.hasuraJwt,
    })

    if (thread) {
      setActiveThread(thread)
      setThreads([thread])
      setIsContinuosThread(true)
      setTotalThreads(1)
      setCount(1)
      setIsOpenPopup(true)
    }
  }

  useEffect(() => {
    if (continuousThreadId && session) {
      getThreadByContinuousThreadId()
    }
  }, [continuousThreadId, session]);

  useEffect(() => {
    // Skip if popup is open
    if (isOpenPopup) return;

    const shouldFetch =
      activeCategory ||
      activeChatbot ||
      (prevCategoryRef.current && !activeCategory) ||
      (prevChatbotRef.current && !activeChatbot) ||
      pathname !== prevPathRef.current; // Add pathname check

    // Update refs
    prevCategoryRef.current = activeCategory;
    prevChatbotRef.current = activeChatbot;
    prevPathRef.current = pathname;

    if (shouldFetch) {
      handleThreadsChange();
    }
  }, [activeCategory, activeChatbot, isOpenPopup, pathname]);

  useEffect(() => {
    if (
      threads &&
      threads.filter(t => t.threadId === activeThread?.threadId).length
    ) return

    setIsOpenPopup(false)
    setActiveThread(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads])

  const customMessage = activeChatbot
    ? `No threads available for ${activeChatbot.name}`
    : activeCategory
      ? 'No threads available in the selected category'
      : 'Start a conversation to create your first thread'


  const showNoResults = !loading && searchTerm && threads.length === 0
  const showChatbotDetails = !loading && !searchTerm && threads.length === 0
  return (
    <>
      { !isContinuosThread && (
        <div className="flex justify-between px-4 md:px-10 py-5 lg:max-w-[calc(100%-100px)] 2xl:max-w-full">
          <ChatSearchInput setThreads={setThreads} onSearch={setSearchTerm} />
        </div>
      )}

      {loading ? (
        <NoResults isLoading={true} />
      ) : threads && threads.length > 0 ? (
        <div className="flex px-4 py-5 md:px-10">
          <ThreadList
            threads={threads}
            loading={loading}
            count={count}
            pageSize={PAGE_SIZE}
            loadMore={loadMore}
          />
        </div>
      ) : showNoResults ? (
        <NoResults
          searchTerm={searchTerm}
          totalItems={totalThreads}
          customMessage={customMessage}
        />
      ) : showChatbotDetails ? (
        <ChatChatbotDetails />
      ) : null}
    </>
  )
}
