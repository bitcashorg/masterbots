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
import ThreadList from '@/components/routes/thread/thread-list'
import { GlobalSearchInput } from '@/components/shared/global-search-input'
import { NoResults } from '@/components/shared/no-results-card'
import { ThreadSearchInput } from '@/components/shared/shared-search'
import { Skeleton } from '@/components/ui/skeleton'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadSearch } from '@/lib/hooks/use-thread-search'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { searchThreadContent } from '@/lib/search'
import { cn, getRouteType } from '@/lib/utils'
import {
	getBrowseThreads,
	getCategory,
	getThread,
	getThreads,
} from '@/services/hasura'
import type { GetBrowseThreadsParams } from '@/services/hasura/hasura.service.type'
import { debounce, uniqBy } from 'lodash'
import type { Thread, User } from 'mb-genql'
import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAsync, useSetState } from 'react-use'
import { EmptyState } from '../profile/empty-state'

// TODO: this is a hard to understand file since it tries to focus in too many different aspects
// in only one file, instead of relying on reusable hooks for each context. It should be refactored.
export default function UserThreadPanel({
	threads: initialThreads = [],
	count: initialCount = 0,
	user: userProps,
	page,
}: {
	user?: User
	threads?: Thread[]
	count?: number
	showSearch?: boolean
	page?: string
}) {
	const params = useParams<{
		userSlug?: string
		category?: string
		chatbot?: string
		botSlug?: string
		threadSlug?: string
	}>()
	const { data: session } = useSession()
	const {
		activeCategory,
		activeChatbot,
		selectedCategories,
		setActiveChatbot,
	} = useSidebar()
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
		threadsState: threadVisibilityState,
		isAdminMode,
	} = useThreadVisibility()

	const { searchTerm, setSearchTerm } = useThreadSearch()
	const searchParams = useSearchParams()

	const { userSlug, category, chatbot, botSlug } = params
	const continuousThreadId = searchParams.get('continuousThreadId')
	const [adminThreads, setAdminThreads] = useState<Thread[]>(initialThreads)
	const isPublic = !/^\/(?:c|u)(?:\/|$)/.test(usePathname())
	const fetchIdRef = useRef<number>(0)
	const prevPathRef = useRef('')
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	const isChatRoute = routeType === 'chat'
	const [state, setState] = useSetState<{
		threads: Thread[]
		count: number
		totalThreads: number
	}>({
		threads: [],
		count: 0,
		totalThreads: 0,
	})
	const { totalThreads } = state
	const isOwnProfile = session?.user?.id === userProps?.userId

	const getBotName = async () => {
		if (chatbot || botSlug) {
			const botSlugs = await botNames
			return (
				botSlugs.get(chatbot as string) ||
				botSlugs.get(botSlug as string) ||
				activeChatbot?.name ||
				''
			)
		}
		return ''
	}

	const fetchBrowseThreads = async ({
		offset = 0,
		keyword = '',
	}: {
		offset?: number
		keyword?: string
	} = {}) => {
		try {
			const browseThreadGetParams: GetBrowseThreadsParams = {
				offset,
				limit: PAGE_SIZE,
				isAdminMode,
				keyword,
			}

			if (activeCategory) {
				browseThreadGetParams.categoryId = activeCategory
			} else {
				// By default, it would fetch all the categories but since the userId is in the params,
				// it will return threads that are only related to the user.
				browseThreadGetParams.categoriesId = selectedCategories
			}
			if (chatbot || botSlug) {
				const chatbotName = await getBotName()
				browseThreadGetParams.chatbotName = chatbotName
			}
			if (userSlug && userProps) {
				browseThreadGetParams.userId = userProps.userId
			}

			return await getBrowseThreads(browseThreadGetParams)
		} catch (error) {
			console.error('Failed to fetch threads:', error)
			return {
				threads: [],
				count: 0,
			}
		}
	}

	const loadMore = async () => {
		if (totalThreads === count) return
		console.log('🟡 Loading More Content')
		setLoading(true)

		let moreThreads: { threads: Thread[]; count: number } = {
			threads: [],
			count: 0,
		}
		let chatbotName = ''

		if (chatbot || botSlug || activeChatbot) {
			chatbotName = await getBotName()
		}

		if (isAdminMode || (page === 'profile' && !isOwnProfile)) {
			moreThreads = await fetchBrowseThreads({
				offset: threads.length,
				keyword: searchTerm,
			})
		} else {
			moreThreads = await getThreads({
				jwt: session?.user?.hasuraJwt as string,
				userId: session?.user.id as string,
				offset: threads.length,
				limit: PAGE_SIZE,
				categoryId: activeCategory,
				chatbotName,
				keyword: searchTerm,
			})
		}

		const newThreads = uniqBy(
			[...threads, ...(moreThreads?.threads || [])],
			'threadId',
		)

		setState({
			threads: newThreads,
			totalThreads: newThreads.length,
		})
		setAdminThreads(
			moreThreads ? [...adminThreads, ...moreThreads.threads] : adminThreads,
		)
		setLoading(false)
	}

	const getThreadByContinuousThreadId = async (
		continuousThreadId: string,
		session: Session,
	) => {
		const thread = await getThread({
			threadId: continuousThreadId,
			isPersonal: !isPublic,
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
			// * This is the first time we are loading the threads as admin
			// * The switch to admin mode is triggered by the user and we need to fetch the threads
			setAdminThreads(threadVisibilityState.threads)
			setState({
				threads: threadVisibilityState.threads,
				totalThreads: threadVisibilityState.threads.length,
				count: threadVisibilityState.count,
			})
		}
	}, [threadVisibilityState])

	// biome-ignore lint/correctness/useExhaustiveDependencies: This effect should run only when the pathname changes (component unmount)
	useEffect(() => {
		return () => {
			setActiveChatbot(null)
			setActiveThread(null)
			setIsOpenPopup(false)
			setShouldRefreshThreads(false)
			setSearchTerm('')
		}
	}, [])

	const count =
		state.count > initialCount || isAdminMode || searchTerm
			? state.count
			: initialCount
	const threads =
		state.threads.length > initialThreads.length || isAdminMode || searchTerm
			? state.threads
			: initialThreads

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
			const isOwnProfile = session?.user?.id === userProps?.userId
			if (isAdminMode || (page === 'profile' && !isOwnProfile)) {
				const { threads: newThreads, count } = await fetchBrowseThreads()

				setState({
					threads: newThreads,
					totalThreads: threads?.length + newThreads.length,
					count,
				})
				setLoading(false)
				return
			}
			const botSlugs = await botNames
			const chatbotName =
				botSlugs.get(chatbot as string) || botSlugs.get(botSlug as string) || ''
			const categoryResponse = await getCategory({
				chatbotName,
			})
			const currentFetchId = Date.now() // Generate a unique identifier for the current fetch
			fetchIdRef.current = currentFetchId

			const { threads: newThreads, count } = await getThreads({
				jwt: session?.user?.hasuraJwt as string,
				userId: session?.user.id,
				limit: PAGE_SIZE,
				categoryId: categoryResponse?.categoryId || activeCategory,
				chatbotName: chatbotName || activeChatbot?.name,
			})

			// Check if the fetchId matches the current fetchId stored in the ref
			if (fetchIdRef.current === currentFetchId) {
				// If it matches, update the threads state
				setState({
					threads: newThreads,
					totalThreads: threads?.length + newThreads.length,
					count,
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
	}, [isOpenPopup, pathname, shouldRefreshThreads])

	const customMessage = activeChatbot
		? `No threads available for ${activeChatbot.name}`
		: activeCategory
			? 'No threads available in the selected category'
			: 'Start a conversation to create your first thread'
	const noResultsMessage =
		totalThreads === count
			? 'This is the end of all. No more threads available.'
			: customMessage
	const showNoResults = !loading && searchTerm && threads.length === 0
	const showChatbotDetails = !loading && !searchTerm && !threads.length
	const searchInputContainerClassName = 'flex justify-between lg:max-w-full'

	const searchThreadsFromDb = async (term: string) => {
		let chatbotName = ''
		let moreThreads: { threads: Thread[]; count: number } = {
			threads: [],
			count: 0,
		}

		if (chatbot || botSlug || activeChatbot) {
			chatbotName = await getBotName()
		}

		if (isAdminMode || (page === 'profile' && !isOwnProfile)) {
			moreThreads = await fetchBrowseThreads({
				offset: threads.length,
				keyword: term,
			})
		} else {
			moreThreads = await getThreads({
				jwt: session?.user?.hasuraJwt as string,
				userId: session?.user.id as string,
				offset: threads.length,
				limit: PAGE_SIZE,
				categoryId: activeCategory,
				chatbotName,
				keyword: term,
			})
		}

		setState({
			threads: moreThreads?.threads || [],
			count: moreThreads?.count || 0,
			totalThreads: threads.length + (moreThreads?.threads?.length || 0),
		})
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const debouncedSearch = useMemo(
		() =>
			debounce((term) => {
				if (!term) {
					setState({
						totalThreads: threads.length,
						threads,
						count,
					})
				} else {
					searchThreadsFromDb(term)
				}
				setLoading(false)
			}, 230),
		[adminThreads, threads],
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
			{!isContinuousThread && (threads.length !== 0 || searchTerm) && (
				<>
					{isChatRoute && <ChatChatbotDetails />}
					<div className={searchInputContainerClassName}>
						{/* <ThreadSearchInput setThreads={setState} onSearch={setSearchTerm} /> */}
						<GlobalSearchInput />
					</div>
				</>
			)}
			{loading && threads.length === 0 && !searchTerm && (
				<div className={searchInputContainerClassName}>
					<div className="flex relative justify-center items-center mx-auto w-full max-w-screen-xl">
						<Skeleton className="flex absolute mx-auto w-full h-12 rounded-full" />
						<Skeleton className="mr-auto ml-3 rounded-full size-6 bg-foreground/10" />
					</div>
				</div>
			)}
			<ul
				className={cn('flex flex-col size-full gap-3 !pb-36', {
					'items-center justify-center': showNoResults || showChatbotDetails,
				})}
			>
				{showChatbotDetails ? (
					page === 'profile' ? (
						<EmptyState
							title="No Threads Available"
							description={`There are no threads available for ${userProps?.username} yet.`}
						/>
					) : (
						isChatRoute && <ChatChatbotDetails />
					)
				) : (
					<ThreadList
						threads={threads}
						loading={loading}
						loadMore={loadMore}
						count={count}
					/>
				)}
				{totalThreads === count && threads.length > 0 && !loading && (
					<hr className="mt-12 w-full border-t-2 border-t-foreground/15" />
				)}
				{showNoResults && (
					<NoResults
						searchTerm={searchTerm}
						totalItems={totalThreads}
						customMessage={noResultsMessage}
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
