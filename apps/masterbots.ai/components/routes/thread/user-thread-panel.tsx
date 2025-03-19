'use client'

import BrowseListItem from '@/components/routes/browse/browse-list-item'
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
import ThreadList from '@/components/routes/thread/thread-list'
import { NoResults } from '@/components/shared/no-results-card'
import { ThreadSearchInput } from '@/components/shared/shared-search'
import { ThreadItemSkeleton } from '@/components/shared/skeletons/browse-skeletons'
import { Skeleton } from '@/components/ui/skeleton'
import { PAGE_SIZE, PAGE_SM_SIZE } from '@/lib/constants/hasura'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { searchThreadContent } from '@/lib/search'
import { cn } from '@/lib/utils'
import {
	getBrowseThreads,
	getThread,
	getThreads,
	getUserBySlug,
} from '@/services/hasura'
import { debounce } from 'lodash'
import type { Thread, User } from 'mb-genql'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAsync, useSetState } from 'react-use'

// TODO: this is a hard to understand file since it tries to focus in too many different aspects
// in only one file, instead of relying on reusable hooks for each context. It should be refactored.
export default function UserThreadPanel({
	threads: initialThreads = [],
	user: userProps,
	page,
}: {
	user?: User
	threads?: Thread[]
	showSearch?: boolean
	page?: string
}) {
	const params = useParams<{
		category?: string
		chatbot?: string
		threadId?: string
		slug?: string
	}>()
	const { data: session } = useSession()
	const { activeCategory, activeChatbot, setActiveChatbot } = useSidebar()
	const {
		isOpenPopup,
		activeThread,
		shouldRefreshThreads,
		setShouldRefreshThreads,
		setActiveThread,
		setIsOpenPopup,
	} = useThread()
	const [loading, setLoading] = useState<boolean>(true)
	const {
		isContinuousThread,
		setIsContinuousThread,
		threads: hookThreads,
		isAdminMode,
	} = useThreadVisibility()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const searchParams = useSearchParams()
	const { slug, category, chatbot } = params
	const continuousThreadId = searchParams.get('continuousThreadId')
	const [storeThreads, setStoreThreads] = useState<Thread[]>(initialThreads)
	const fetchIdRef = useRef<number>(0)

	const userWithSlug = useAsync(async () => {
		if (!slug) return { user: null }
		const result = await getUserBySlug({
			slug,
			isSameUser: session?.user?.slug === slug,
		})
		return result
	}, [slug])

	const prevPathRef = useRef('')
	const pathname = usePathname()
	const [state, setState] = useSetState<{
		threads: Thread[]
		count: number
		totalThreads: number
	}>({
		threads: [],
		count: 0,
		totalThreads: 0,
	})
	const { count, totalThreads } = state

	const fetchBrowseThreads = async () => {
		try {
			if (!slug) return []
			const user = userWithSlug.value?.user
			if (!user) return []
			return await getBrowseThreads({
				userId: user.userId,
				categoryId: activeCategory,
				chatbotName: activeChatbot?.name,
				limit: PAGE_SM_SIZE,
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
				limit: PAGE_SM_SIZE,
				categoryId: activeCategory,
				chatbotName: activeChatbot?.name,
			})
		}
		setState({
			threads: moreThreads ? [...threads, ...moreThreads] : threads,
			count: threads.length,
		})
		setStoreThreads(
			moreThreads ? [...storeThreads, ...moreThreads] : storeThreads,
		)
		setLoading(false)
	}

	const getThreadByContinuousThreadId = async (
		continuousThreadId: string,
		session: Session,
	) => {
		const thread = await getThread({
			threadId: continuousThreadId,
			jwt: session.user?.hasuraJwt,
		})

		if (thread) {
			const defaultThread = initialThread(thread, session)
			// ? here we can replace the active thread to appear as it is form a continuing thread with the thread parameter
			setActiveThread(defaultThread)
			// setActiveThread(thread)
			setIsContinuousThread(true)
			setIsOpenPopup(true)
		}
	}

	useAsync(async () => {
		if (!session) return

		if (!continuousThreadId && isContinuousThread) {
			setIsContinuousThread(false)
			return
		}

		if (!continuousThreadId) return

		await getThreadByContinuousThreadId(continuousThreadId, session)
	}, [session])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isAdminMode) {
			setStoreThreads(hookThreads)
			setState({
				threads: hookThreads,
				totalThreads: hookThreads.length,
				count: hookThreads.length,
			})
		}
	}, [hookThreads])

	const threads =
		state.threads.length > initialThreads.length || isAdminMode || searchTerm
			? state.threads
			: initialThreads
	const allthreads = threads
	const completeLoading = (load: boolean) => {
		setLoading(load)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: This effect should run only when the pathname changes
	useEffect(() => {
		// Skip if popup is open or there is initial threads
		if (isOpenPopup) return

		prevPathRef.current = pathname

		completeLoading(prevPathRef.current !== pathname)
	}, [initialThreads, pathname, activeChatbot, activeCategory])

	const handleThreadsChange = async () => {
		if (!shouldRefreshThreads) return

		try {
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
		} catch (error) {
			console.error('Failed to fetch threads:', error)
		} finally {
			setIsOpenPopup(false)
			setShouldRefreshThreads(false)

			setLoading(false)
		}
	}
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isOpenPopup) return

		const hasThreadListChanged = !threads?.some(
			(t) =>
				t.threadId === activeThread?.threadId ||
				t.messages.length === activeThread?.messages.length,
		)

		if (hasThreadListChanged) handleThreadsChange()
	}, [threads, isOpenPopup, pathname, shouldRefreshThreads])

	const customMessage = activeChatbot
		? `No threads available for ${activeChatbot.name}`
		: activeCategory
			? 'No threads available in the selected category'
			: 'Start a conversation to create your first thread'
	const showNoResults = !loading && searchTerm && threads.length === 0
	const showChatbotDetails = !loading && !searchTerm && !threads.length
	const searchInputContainerClassName =
		'flex justify-between py-5 lg:max-w-full'

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const debouncedSearch = useMemo(
		() =>
			debounce((term) => {
				if (!term) {
					setState({
						threads,
						count: threads.length,
						totalThreads: threads.length,
					})
				} else {
					const searchResult = storeThreads.filter((thread: Thread) =>
						searchThreadContent(thread, term),
					)
					setState({
						threads: searchResult,
						count: searchResult.length,
						totalThreads: threads.length,
					})
				}
				setLoading(false)
			}, 230),
		[storeThreads, threads],
	)

	const verifyKeyword = () => {
		setLoading(true)
		debouncedSearch(searchTerm)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (searchTerm) {
			verifyKeyword()
		}
	}, [searchTerm])

	return (
		<>
			{!loading &&
				(threads.length !== 0 || searchTerm) &&
				!isContinuousThread && (
					<div className={searchInputContainerClassName}>
						<ThreadSearchInput setThreads={setState} onSearch={setSearchTerm} />
					</div>
				)}
			{loading && (
				<div className={searchInputContainerClassName}>
					<div className="relative w-full max-w-[900px] mx-auto flex items-center justify-center">
						<Skeleton className="w-full mx-auto h-12 rounded-full flex absolute" />
						<Skeleton className="size-6 rounded-full mr-auto ml-3 bg-foreground/10" />
					</div>
				</div>
			)}
			<ul
				className={cn('flex flex-col size-full gap-3 pb-5', {
					'items-center justify-center': showNoResults || showChatbotDetails,
				})}
			>
				{showChatbotDetails ? (
					<ChatChatbotDetails />
				) : (
					<>
						{page === 'profile' ? (
							<div className="flex flex-col py-5">
								{threads.map((thread: Thread) => (
									<BrowseListItem
										thread={thread}
										key={thread.threadId}
										loading={loading}
										loadMore={loadMore}
										hasMore={count === PAGE_SIZE}
										isLast={
											thread.threadId === threads[threads.length - 1].threadId
										}
										pageType={page}
									/>
								))}
								{loading && <ThreadItemSkeleton />}
							</div>
						) : (
							<ThreadList
								threads={threads}
								loading={loading}
								count={count}
								pageSize={PAGE_SIZE}
								loadMore={loadMore}
							/>
						)}
					</>
				)}
				{showNoResults && (
					<NoResults
						searchTerm={searchTerm}
						totalItems={totalThreads}
						customMessage={customMessage}
					/>
				)}
			</ul>
		</>
	)
}

export function initialThread(thread: Thread, session: Session): Thread {
	return {
		threadId: '',
		chatbot: thread.chatbot,
		chatbotId: thread.chatbotId,
		createdAt: new Date(),
		isApproved: false,
		isPublic: false,
		// Filtering to have one user message so we can optimistically render the thread first question in the continuous thread.
		// After having a question we can fetch the rest of the thread and it will have the whole user messages.
		// ? These messages doesn't go to the allMessages directly, allMessages filters the true content.
		messages: [thread.messages.filter((msg) => msg.role === 'user')[0]],
		userId: session.user?.id,
		updatedAt: new Date(),
		isBlocked: false,
		model: 'OPENAI',
		user: null,
		thread,
		parentThreadId: thread.threadId,
		threads: [],
	} as unknown as Thread
}
