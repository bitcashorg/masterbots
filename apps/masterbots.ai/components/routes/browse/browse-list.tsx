'use client'

/**
 * BrowseList Component
 *
 * This component displays a list of chat threads for browsing based on user-selected categories and keywords.
 * It allows users to filter threads dynamically and load more content as they scroll.
 *
 * Key Features:
 * - Dynamic Filtering: Filters threads based on the user's input keyword and selected categories.
 * - Infinite Scrolling: Loads more threads when the user reaches the end of the list.
 * - State Management: Manages loading states and thread counts using React hooks.
 * - Responsive Design: Utilizes Tailwind CSS for styling and layout.
 * - Integration with Custom Hooks: Uses `useBrowse` for browsing context and `useSidebar` for category selection.
 *
 * State Variables:
 * - threads: An array of Thread objects representing the current list of threads.
 * - filteredThreads: An array of Thread objects representing the filtered list based on the keyword.
 * - loading: A boolean indicating if threads are currently being loaded.
 * - count: A number representing the total number of threads fetched.
 */

import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { OnboardingMobileView } from '@/components/routes/chat/chat-onboarding-chatbot-mobile'
import { SelectedBotMobileView } from '@/components/routes/chat/chat-selected-chatbot-mobile'
import ThreadComponent from '@/components/routes/thread/thread-component'
import { GlobalSearchInput } from '@/components/shared/global-search-input'
import { NoResults } from '@/components/shared/no-results-card'
import { OnboardingChatbotCard } from '@/components/shared/onboarding-chatbot-card'
import { BrowseListSkeleton } from '@/components/shared/skeletons/browse-list-skeleton'
import { ThreadItemSkeleton } from '@/components/shared/skeletons/browse-skeletons'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { useBrowse } from '@/lib/hooks/use-browse'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useSonner } from '@/lib/hooks/useSonner'
import { searchThreadContent } from '@/lib/search'
import { getOpeningActiveThreadHelper } from '@/lib/threads'
import { getBrowseThreads } from '@/services/hasura'
import { isEqual, uniqBy } from 'lodash'
import { appConfig } from 'mb-env'
import type { Chatbot, Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'

export default function BrowseList({
	initialThreads,
	initialCount,
	categoryId,
	chatbot,
}: {
	initialThreads?: Thread[]
	initialCount?: number
	categoryId?: number
	chatbot?: Chatbot
}) {
	const { keyword, changeKeyword } = useBrowse()
	const { activeThread, setActiveThread, setIsOpenPopup } = useThread()
	const [threadState, setThreadState] = React.useState<Thread[]>(
		initialThreads || [],
	)
	const [hasInitialized, setHasInitialized] = React.useState(false)
	const [filteredThreads, setFilteredThreads] = React.useState<Thread[]>([])
	const [loading, setLoading] = React.useState<boolean>(false)
	const [countState, setCount] = React.useState<number>(0)
	const {
		selectedCategories,
		selectedChatbots,
		activeCategory,
		activeChatbot,
		setActiveChatbot,
		setActiveCategory,
	} = useSidebar()
	const prevSelectedCategories = React.useRef<number[]>(selectedCategories)
	const prevSelectedChatbots = React.useRef<number[]>(selectedChatbots)
	const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
	const { data: session } = useSession()
	const { customSonner } = useSonner()
	const userId = session?.user?.id
	const threads =
		threadState && initialThreads && threadState.length > initialThreads.length
			? threadState
			: initialThreads || []
	const count = countState || initialCount || 0

	const fetchThreads = async ({
		categoriesId,
		chatbotsId,
		keyword,
		offset = 0,
	}: {
		categoriesId: number[]
		chatbotsId: number[]
		keyword: string
		offset?: number
	}) => {
		setLoading(true) // ? Setting loading before fetch
		try {
			const { threads, count } = await getBrowseThreads({
				...(activeCategory !== null ||
				activeChatbot !== null ||
				chatbot ||
				categoryId
					? {
							categoryId: categoryId || activeCategory,
							chatbotName: chatbot?.name || activeChatbot?.name,
							...(userId ? { followedUserId: userId } : {}),
						}
					: {
							categoriesId,
							chatbotsId,
							keyword,
							...(userId ? { followedUserId: userId } : {}),
						}),
				limit: PAGE_SIZE,
				offset,
			})
			setThreadState((prevState: Thread[]) =>
				uniqBy([...prevState, ...threads], 'threadId'),
			)
			setFilteredThreads((prevState: Thread[]) =>
				uniqBy([...prevState, ...threads], 'threadId').filter(
					(thread: Thread) => searchThreadContent(thread, keyword),
				),
			)
			// console.log('Fetched threads:', { filteredThreads, count })
			// If the keyword is empty, we set the filteredThreads to threads
			setCount(count)
		} catch (error) {
			console.error('Error fetching threads:', error)
		} finally {
			setLoading(false)
			setHasInitialized(true) // ? Setting hasInitialized after fetch preventing NoResults from showing
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: No need to track fetchThreads in the dependency array
	const verifyKeyword = React.useCallback(() => {
		// Clear previous timeout
		if (searchTimeoutRef.current) {
			clearTimeout(searchTimeoutRef.current)
		}

		if (!keyword) {
			setFilteredThreads(threads)
		} else {
			// Set new timeout for debouncing
			searchTimeoutRef.current = setTimeout(async () => {
				await fetchThreads({
					categoriesId: selectedCategories,
					chatbotsId: selectedChatbots,
					keyword,
				})
			}, 440)
		}
	}, [keyword, threads, selectedChatbots, selectedCategories])

	const loadMore = async () => {
		if (threads.length >= countState) return

		await fetchThreads({
			categoriesId: selectedCategories,
			chatbotsId: selectedChatbots,
			keyword,
			offset: threads.length,
		})
	}

	const verifyPath = () => {
		// we update the prevSelectedCategories and prevSelectedChatbots to trigger the useEffect
		// to check whether the selected threads has changed or not.
		if (prevSelectedCategories.current !== selectedCategories) {
			prevSelectedCategories.current = selectedCategories
		}
		if (prevSelectedChatbots.current !== selectedChatbots) {
			prevSelectedChatbots.current = selectedChatbots
		}
		if (chatbot) {
			setActiveChatbot(chatbot)
		}
		if (categoryId) {
			setActiveCategory(categoryId)
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if ((chatbot || categoryId) && !activeCategory && !activeChatbot) {
			verifyPath()
			return
		}

		if (
			isEqual(selectedCategories, prevSelectedCategories.current) &&
			isEqual(selectedChatbots, prevSelectedChatbots.current)
		) {
			return
		}

		fetchThreads({
			keyword,
			categoriesId: selectedCategories,
			chatbotsId: selectedChatbots,
		})
	}, [
		selectedCategories,
		selectedChatbots,
		activeCategory,
		activeChatbot,
		session,
	])

	const activateThreadPopup = (thread: Thread) => {
		// ? WHY SPREAD OPERATORS?! ... Ask me why if curious 😊 -Andler
		setActiveThread({
			...thread,
			thread: {
				...thread.thread,
			},
		} as Thread)
		setIsOpenPopup(true)
	}

	// TODO: Make a utility function for this. Same as in the thread-list.tsx
	const [, getOpeningActiveThread] = useAsyncFn(
		async () =>
			getOpeningActiveThreadHelper(
				activeThread,
				customSonner,
				activateThreadPopup,
			),
		[activeThread, window.location.pathname],
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (activeThread) return
		getOpeningActiveThread()
	}, [activeThread])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (appConfig.features.devMode) {
			console.log('🟡 Filtering Threads', {
				threads,
				filteredThreads,
			})
		}
		// if (isEqual(threads, filteredThreads)) return

		verifyKeyword()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword])

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (searchTimeoutRef.current) {
				clearTimeout(searchTimeoutRef.current)
			}
		}
	}, [])

	if (loading && threads.length === 0) {
		return <BrowseListSkeleton count={5} />
	}

	return (
		// <div className="flex flex-col gap-3 py-5 w-full">
		<>
			{/* Show welcome onboarding card when no category or chatbot is selected */}
			{!activeCategory && !activeChatbot && !chatbot && !categoryId && (
				<>
					<OnboardingChatbotCard isWelcomeView={true} />
					<OnboardingMobileView />
				</>
			)}

			{/* Show onboarding card when no threads are loaded yet (for selected categories/bots) */}
			{(activeCategory || activeChatbot || chatbot || categoryId) && (
				<>
					<OnboardingChatbotCard isWelcomeView={false} />
					<SelectedBotMobileView
						onNewChat={() => console.log('New chat clicked')}
					/>
				</>
			)}

			<GlobalSearchInput />

			{/* Show threads when available and a category/bot is selected */}
			{filteredThreads.length > 0 ? (
				<ul className="flex flex-col gap-3 pb-36 size-full">
					{filteredThreads.map((thread: Thread, key) => (
						<ThreadComponent
							thread={thread}
							key={thread.threadId}
							loading={loading}
							loadMore={loadMore}
							hasMore={count > threads.length}
							isLast={key === filteredThreads.length - 1}
						/>
					))}
					{loading && <ThreadItemSkeleton />}
				</ul>
			) : (
				/* Show no results only after initialization and when not loading */
				hasInitialized &&
				!loading &&
				!filteredThreads.length &&
				(activeCategory ||
					activeChatbot ||
					chatbot ||
					categoryId ||
					keyword) && (
					<NoResults searchTerm={keyword} totalItems={threads.length} />
				)
			)}
		</>
	)
}
