'use client'

import { AdminModeApprove } from '@/components/routes/chat/admin-mode-approve'
import { ChatList } from '@/components/routes/chat/chat-list'
import { ChatOptions } from '@/components/routes/chat/chat-options'
import { ChatbotAvatar } from '@/components/shared/chatbot-avatar'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ShortMessage } from '@/components/shared/short-message'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { cn, getRouteType } from '@/lib/utils'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { EyeClosed } from 'lucide-react'
import type { Thread } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
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

	const threadId = thread.threadId
	const handleAccordionToggle = (isOpen: boolean) => {
		if (isOpen) {
			scrollToTop()
		}
	}

	return (
		<li ref={threadRef}>
			<SharedAccordion
				onToggle={handleAccordionToggle}
				className="relative"
				contentClass={cn(
					'!pt-0 !border-b-[3px] max-h-[70vh] scrollbar !border-l-[3px]',
				)}
				triggerClass={cn(
					'gap-2.5 py-3',
					'dark:border-b-mirage border-b-iron',
					'sticky top-0 z-[1] dark:hover:bg-mirage hover:bg-gray-300',
					'dark:bg-[#18181b] bg-[#f4f4f5]',
					'[&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage',
					'[&[data-state=open]]:rounded-t-[8px]',
					'[&[data-state=closed]>div>span>span]:line-clamp-2',
				)}
				arrowClass="min-w-5 max-w-5"
				thread={thread}
				variant="browse"
			>
				{/* Thread Title */}
				<div className="pl-2.5 flex justify-between items-start w-full gap-3">
					<span className="inline-flex items-center gap-3 text-left">
						<ChatbotAvatar thread={thread} />
						<span className="whitespace-pre-line">
							{thread.messages.filter((m) => m.role === 'user')[0]?.content || (
								<Skeleton className="w-[280px] h-[20px]" />
							)}
						</span>
					</span>
					{/* Thread Options */}
					<div className="flex gap-1.5 items-center justify-center">
						{routeType === 'chat' && (
							<Badge
								variant="outline"
								className={cn(
									'p-0.5 text-white/50 bg-transparent border-transparent',
									{
										// green public
										'text-[#82e46a]': thread.isApproved && thread.isPublic,
										// purple private
										'text-[#be16e8]': thread.isApproved && !thread.isPublic,
									},
								)}
							>
								{/* {thread.isPublic ? 'Public' : 'Private'} */}
								{thread.isPublic ? (
									<EyeOpenIcon className="size-4" />
								) : (
									<EyeClosed className="size-4" />
								)}
							</Badge>
						)}
						{routeType === 'public' && (
							<Link
								className={cn(
									'size-8 sm:size-10',
									buttonVariants({
										variant: 'icon',
										size: 'icon',
										radius: 'full',
									}),
								)}
								href={`/profile/${thread.user?.slug}`}
								prefetch
							>
								<Image
									className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
									src={thread.user?.profilePicture || '/images/robohash1.png'}
									alt={thread.user?.username ?? 'Avatar'}
									height={42}
									width={42}
								/>
							</Link>
						)}
						<ChatOptions threadId={thread.threadId} thread={thread} isBrowse />
					</div>
				</div>

				{/* Thread Description */}
				<div className="overflow-hidden text-sm text-left opacity-50">
					{thread.messages.filter((m) => m.role !== 'user')?.[0]?.content ? (
						<div className="flex-1 px-2.5 pb-3 space-y-2 overflow-hidden">
							<ShortMessage
								content={
									thread.messages.filter((m) => m.role !== 'user')[0].content
								}
							/>
						</div>
					) : (
						''
					)}
				</div>

				{/* Thread Content */}
				<div
					ref={contentRef}
					className="overflow-y-auto max-h-[calc(70vh-100px)]"
				>
					<ChatList
						className="max-w-full !px-0"
						isThread={false}
						chatbot={thread.chatbot}
						containerRef={contentRef}
						isLoadingMessages={loading}
					/>
				</div>
			</SharedAccordion>

			{/* Admin Mode Approve */}
			{isAdminMode && !thread.isApproved && (
				<AdminModeApprove threadId={threadId} />
			)}
		</li>
	)
}
