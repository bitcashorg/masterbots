'use client'

/**
 * ThreadList Component
 *
 * A component that displays a list of chat threads with filtering capabilities:
 * - Renders individual ThreadComponent for each thread
 * - Supports infinite scrolling with load more functionality
 * - Filters threads based on selected categories and chatbots from the sidebar
 *
 * Key Features:
 * - Displays a list of threads in a vertical layout
 * - Filters threads based on user-selected categories and chatbots
 * - Handles loading state and pagination
 *
 * Props:
 * - threads: Array of Thread objects to display
 * - loading: Boolean indicating if threads are currently loading
 * - count: Total number of threads available
 * - pageSize: Number of threads per page
 * - loadMore: Function to load more threads when needed
 */

import ThreadComponent from '@/components/routes/thread/thread-component'
import { ThreadItemSkeleton } from '@/components/shared/skeletons/browse-skeletons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useSonner } from '@/lib/hooks/useSonner'
import { getOpeningActiveThreadHelper } from '@/lib/threads'
import type { Thread } from 'mb-genql'
import { useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'

export default function ThreadList({
	loading,
	loadMore,
	count,
	threads,
}: {
	threads: Thread[]
	loading: boolean
	count: number
	loadMore: () => void
}) {
	const {
		selectedCategories,
		selectedChatbots,
		activeCategory,
		activeChatbot,
	} = useSidebar()
	const { activeThread, setActiveThread, setIsOpenPopup } = useThread()
	const [loadingThread, setLoadingThread] = useState(false)
	const { customSonner } = useSonner()

	const filteredThreads = threads.filter(
		(thread) =>
			!(
				(selectedCategories.length &&
					!selectedCategories.includes(
						thread.chatbot.categories[0].categoryId,
					)) ||
				(selectedChatbots.length &&
					!selectedChatbots.includes(thread.chatbotId))
			) ||
			(activeCategory &&
				thread.chatbot.categories.some(
					({ categoryId }) => activeCategory === categoryId,
				)) ||
			(activeChatbot && thread.chatbot.chatbotId === activeChatbot.chatbotId),
	)

	const activateThreadPopup = (thread: Thread) => {
		try {
			setLoadingThread(true)

			setActiveThread(thread)
			setIsOpenPopup(true)
		} catch (error) {
			console.error('Error activating thread popup:', error)
			customSonner({ type: 'error', text: 'Error activating thread popup' })
		} finally {
			setLoadingThread(false)
		}
	}

	const [, getOpeningActiveThread] = useAsyncFn(
		() =>
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

	if (loadingThread) {
		return (
			<>
				{[1, 2, 3, 4, 5].map((pos) => (
					<ThreadItemSkeleton key={`thread-skeleton-${pos}`} />
				))}
			</>
		)
	}

	return (
		<>
			{filteredThreads?.map((thread, key) => (
				<ThreadComponent
					key={thread.threadId}
					thread={thread}
					loading={loading}
					loadMore={loadMore}
					hasMore={count > filteredThreads.length}
					isLast={key === filteredThreads.length - 1}
				/>
			))}
			{loading && <ThreadItemSkeleton />}
		</>
	)
}
