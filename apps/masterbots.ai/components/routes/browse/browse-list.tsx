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

import ThreadComponent from '@/components/routes/thread/thread-component'
import { NoResults } from '@/components/shared/no-results-card'
import { BrowseListSkeleton } from '@/components/shared/skeletons/browse-list-skeleton'
import { ThreadItemSkeleton } from '@/components/shared/skeletons/browse-skeletons'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { useBrowse } from '@/lib/hooks/use-browse'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useSonner } from '@/lib/hooks/useSonner'
import { searchThreadContent } from '@/lib/search'
import { getRouteType } from '@/lib/utils'
import { getBrowseThreads, getThread } from '@/services/hasura'
import { debounce, isEqual } from 'lodash'
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
	}: {
		categoriesId: number[]
		chatbotsId: number[]
		keyword: string
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
			})
			setThreadState(threads)
			setFilteredThreads(threads)
			setCount(count)
			setHasInitialized(true) // ? Setting hasInitialized after fetch preventing NoResults from showing
		} catch (error) {
			console.error('Error fetching threads:', error)
		} finally {
			setLoading(false)
		}
	}

	const verifyKeyword = () => {
		if (!keyword) {
			setFilteredThreads(threads)
		} else {
			debounce(() => {
				// Use our searchThreadContent function instead of just title search
				setFilteredThreads(
					threads.filter((thread: Thread) =>
						searchThreadContent(thread, keyword),
					),
				)
			}, 230)()
		}
	}

	const loadMore = async () => {
		console.log('🟡 Loading More Content')
		setLoading(true)

		const { threads: moreThreads, count } = await getBrowseThreads({
			categoriesId: selectedCategories,
			offset: threads.length,
			limit: PAGE_SIZE,
		})

		setThreadState((prevState) => [...prevState, ...moreThreads])
		setCount(count)
		setLoading(false)
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
	const [, getOpeningActiveThread] = useAsyncFn(async () => {
		if (activeThread) return
		const pathname = window.location.pathname
		const pathNameParts = pathname.split('/')
		// console.log('window.location.pathname.split', pathname.split('/'))
		const isPublic = getRouteType(pathname) === 'public'
		const isProfile = getRouteType(pathname) === 'profile'
		const isBotProfile = getRouteType(pathname) === 'bot'

		const [, _category, _domain, _chatbot, threadSlug, threadQuestionSlug] =
			pathNameParts
		const [
			,
			_chatbotProfileRootBase,
			_chatbotProfileChatbotName,
			chatbotProfileThreadSlug,
			chatbotProfileThreadQuestionSlug,
		] = pathNameParts
		const [
			,
			_userProfileRootBase,
			_userSlug,
			_userThreadRootBase,
			_userCategory,
			_userDomain,
			_userChatbot,
			userThreadSlug,
			userThreadQuestionSlug,
		] = pathNameParts

		console.log('pathname', {
			pathNameParts,
			isPublic,
			isProfile,
			isBotProfile,
		})

		if (isPublic && !threadSlug && !threadQuestionSlug) return
		if (
			isBotProfile &&
			!chatbotProfileThreadSlug &&
			!chatbotProfileThreadQuestionSlug
		)
			return
		if (isProfile && !userThreadSlug && !userThreadQuestionSlug) return

		const thread = await getThread({
			threadSlug: threadSlug || chatbotProfileThreadSlug,
		})

		if (!thread) {
			customSonner({
				type: 'error',
				text: 'Error finding the thread that you were looking for.',
			})
			return
		}
		if (
			(threadQuestionSlug && isPublic) ||
			(chatbotProfileThreadQuestionSlug && isProfile) ||
			(threadSlug && isPublic) ||
			(chatbotProfileThreadSlug && isProfile)
		) {
			console.log(
				'scrolling to',
				threadQuestionSlug || chatbotProfileThreadQuestionSlug,
			)
			activateThreadPopup(thread)
		}
	}, [activeThread])

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
	}, [keyword, threads])

	if (loading && threads.length === 0) {
		return <BrowseListSkeleton count={5} />
	}

	return (
		<div className="flex flex-col w-full gap-3 py-5">
			{filteredThreads.length > 0 ? (
				<ul className="flex flex-col size-full gap-3 pb-36">
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
				hasInitialized &&
				!loading &&
				!filteredThreads.length && (
					<NoResults searchTerm={keyword} totalItems={threads.length} />
				)
			)}
		</div>
	)
}
