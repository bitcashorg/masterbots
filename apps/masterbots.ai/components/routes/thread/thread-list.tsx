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
import { useSidebar } from '@/lib/hooks/use-sidebar'
import type { Thread } from 'mb-genql'

export default function ThreadList({
	loading,
	loadMore,
	count,
	pageSize,
	threads,
}: {
	threads: Thread[]
	loading: boolean
	count: number
	pageSize: number
	loadMore: () => void
}) {
	const { selectedCategories, selectedChatbots } = useSidebar()

	const filteredThreads = threads.filter(
		(thread) =>
			!(
				(selectedCategories.length &&
					!selectedCategories.includes(
						thread.chatbot.categories[0].categoryId,
					)) ||
				(selectedChatbots.length &&
					!selectedChatbots.includes(thread.chatbotId))
			),
	)

	return (
		<ul className="flex flex-col w-full gap-3">
			{filteredThreads?.map((thread, key) => (
				<ThreadComponent
					key={key}
					thread={thread}
					loading={loading}
					loadMore={loadMore}
					hasMore={count === pageSize}
					isLast={key === threads.length - 1}
				/>
			))}
		</ul>
	)
}
