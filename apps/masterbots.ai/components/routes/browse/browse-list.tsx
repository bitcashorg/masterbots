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

import BrowseListItem from '@/components/routes/browse/browse-list-item'
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
import { debounce } from 'lodash'
import { appConfig } from 'mb-env'
import type { Chatbot, Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useAsync } from 'react-use'

export default function BrowseList({
	initialThreads,
	categoryId,
	chatbot,
}: {
	initialThreads?: Thread[]
	categoryId?: number
	chatbot?: Chatbot
}) {
	const { keyword } = useBrowse()
	const { activeThread, setActiveThread, setIsOpenPopup } = useThread()
	const [threadState, setThreadState] = React.useState<Thread[]>([])
	const [hasInitialized, setHasInitialized] = React.useState(false)
	const [filteredThreads, setFilteredThreads] = React.useState<Thread[]>([])
	const [loading, setLoading] = React.useState<boolean>(false)
	const [count, setCount] = React.useState<number>(0)
	const {
		selectedCategories,
		selectedChatbots,
		activeCategory,
		activeChatbot,
		setActiveChatbot,
		setActiveCategory,
	} = useSidebar()
	const { data: session } = useSession()
	const { customSonner } = useSonner()
	const userId = session?.user?.id
	const threads =
		threadState && initialThreads && threadState.length > initialThreads.length
			? threadState
			: initialThreads || []

	const fetchThreads = async ({
		categoriesId,
		chatbotsId,
		keyword,
	}: {
		categoriesId: number[]
		chatbotsId: number[]
		keyword: string
	}) => {
		setLoading(true) // ? Seting loading before fetch
		try {
			const threads = await getBrowseThreads({
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
			setCount(threads.length)
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

		const moreThreads = await getBrowseThreads({
			categoriesId: selectedCategories,
			offset: threads.length,
			limit: PAGE_SIZE,
		})

		setThreadState((prevState) => [...prevState, ...moreThreads])
		setCount(moreThreads.length)
		setLoading(false)
	}

	const verifyPath = () => {
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
		setActiveThread(thread as Thread)
		setIsOpenPopup(true)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		// if (isEqual(threads, filteredThreads)) return
		verifyKeyword()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword, threads])

	useAsync(async () => {
		if (activeThread) return
		const pathname = window.location.pathname
		const pathNameParts = pathname.split('/')
		// console.log('window.location.pathname.split', pathname.split('/'))
		const isPublic = getRouteType(pathname) === 'public'
		const isProfile = getRouteType(pathname) === 'profile'

		const [, _category, _domain, _chatbot, threadSlug, threadQuestionSlug] =
			pathNameParts
		const [
			,
			_chatbotProfileRootBase,
			_chatbotProfileChatbotName,
			chatbotProfileThreadSlug,
			chatbotProfileThreadQuestionSlug,
		] = pathNameParts
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
				<>
					{filteredThreads.map((thread: Thread, key) => (
						<BrowseListItem
							thread={thread}
							key={thread.threadId}
							loading={loading}
							loadMore={loadMore}
							hasMore={count === PAGE_SIZE}
							isLast={key === filteredThreads.length - 1}
						/>
					))}
					{loading && <ThreadItemSkeleton />}
				</>
			) : (
				hasInitialized &&
				!loading && (
					<NoResults searchTerm={keyword} totalItems={threads.length} />
				)
			)}
		</div>
	)
}
