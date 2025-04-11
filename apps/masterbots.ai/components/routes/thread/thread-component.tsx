'use client'

import { AdminModeApprove } from '@/components/routes/chat/admin-mode-approve'
import { ChatOptions } from '@/components/routes/chat/chat-options'
import { ProfileAvatar } from '@/components/routes/thread/profile-avatar'
import { ChatbotAvatar } from '@/components/shared/chatbot-avatar'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { cn, getRouteType } from '@/lib/utils'
import type { Thread } from 'mb-genql'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

export default function ThreadComponent({
	thread,
	loadMore,
	loading,
	isLast,
	hasMore,
}: {
	thread: Thread
	loadMore: () => void
	loading: boolean
	isLast: boolean
	hasMore: boolean
}) {
	const threadRef = useRef<HTMLLIElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const { isNewResponse } = useThread()
	const { isPublic, isAdminMode } = useThreadVisibility()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)

	const { scrollToTop } = useMBScroll({
		containerRef: contentRef,
		threadRef,
		isNewContent: isNewResponse,
		hasMore,
		isLast,
		loading,
		loadMore,
	})

	const handleAccordionToggle = (isOpen: boolean) => {
		if (isOpen) {
			scrollToTop()
		}
	}

	const threadId = thread.threadId
	const threadTitle = (
		thread.thread ? thread.thread.messages : thread.messages
	).filter((m) => m.role === 'user')[0]?.content

	return (
		<li ref={threadRef} className="w-full px-0">
			<SharedAccordion
				onToggle={handleAccordionToggle}
				className="relative"
				contentClass={cn(
					'!pt-0 !border-b-[3px] max-h-[70vh] scrollbar !border-l-[3px]',
				)}
				triggerClass={cn(
					'gap-2.5',
					'dark:border-b-mirage border-b-iron',
					'sticky top-0 z-[1] dark:hover:bg-mirage hover:bg-gray-300',
					'dark:bg-[#18181b] bg-[#f4f4f5]',
					'hover:[&_picture]:opacity-100',
				)}
				arrowClass="min-w-5 max-w-5"
				thread={thread}
				variant="browse"
			>
				<div className="flex w-full gap-2 text-left pr-2.5 sm:pl-2.5 py-2 overflow-x-hidden">
					<ChatbotAvatar thread={thread} />
					<span className="w-full text-left whitespace-pre-line line-clamp-2">
						{threadTitle || (
							<Skeleton className="w-[140px] md:w-[280px] max-w-[80%] h-[20px]" />
						)}
					</span>
				</div>
				<div className="ml-auto flex gap-1.5 items-start justify-center group">
					{thread.thread && (
						<Tooltip>
							<TooltipTrigger className="transition-all opacity-30 hover:opacity-100 focus-within:opacity-100 mt-2.5 px-1.5 py-0.5 w-auto text-[10px] font-medium rounded-md bg-accent text-accent-foreground">
								Continued
							</TooltipTrigger>
							<TooltipContent>
								Continued thread from <b>{thread.thread.user?.username}</b>.
							</TooltipContent>
						</Tooltip>
					)}
					<ChatOptions
						threadId={thread.threadId}
						thread={thread}
						isBrowse={isPublic}
					/>
					<ProfileAvatar thread={thread} />
				</div>
			</SharedAccordion>
			{/* Admin Mode Approve */}
			{isAdminMode && <AdminModeApprove threadId={threadId} />}

			<div ref={contentRef} className="w-full h-0" />
		</li>
	)
}
