'use client'

import { AdminModeApprove } from '@/components/routes/chat/admin-mode-approve'
import { ChatOptions } from '@/components/routes/chat/chat-options'
import { ChatbotAvatar } from '@/components/shared/chatbot-avatar'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { urlBuilders } from '@/lib/url'
import { cn, getRouteType } from '@/lib/utils'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { EyeClosed } from 'lucide-react'
import type { Thread } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useRef } from 'react'

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
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const userProfileUrl = useMemo(
		() =>
			urlBuilders.profilesUrl({
				type: 'user',
				usernameSlug: thread.user?.slug as string,
			}),
		[],
	)
	// green and purple
	const bgColor = isPublic ? 'be16e8' : '82e46a'
	// console.log('thread.user?.profilePicture', thread.user?.profilePicture)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const threadThumbnail = useMemo(
		() =>
			`https://robohash.org/${thread?.user?.username || threadId}?bgset=bg2`,
		// () =>
		// 	thread.user?.profilePicture||
		// 	`https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${thread.slug}&backgroundColor=${bgColor},ffdfbf&backgroundType=gradientLinear&backgroundRotation=40`,
		[],
	)

	return (
		<li ref={threadRef} className="w-full">
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
				<div className="flex w-full gap-2 text-left px-2.5 py-2 overflow-x-hidden">
					<ChatbotAvatar thread={thread} />
					<span className="w-full text-left whitespace-pre-line line-clamp-2">
						{thread.messages.filter((m) => m.role === 'user')[0]?.content || (
							<Skeleton className="w-[140px] md:w-[280px] max-w-[80%] h-[20px]" />
						)}
					</span>
				</div>
				<div className="ml-auto flex gap-1.5 items-start justify-center group">
					{/* Thread Options */}
					{routeType === 'chat' && (
						<Badge
							variant="outline"
							className={cn(
								'p-0.5 text-white/50 bg-transparent border-transparent my-2',
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
					<ChatOptions
						threadId={thread.threadId}
						thread={thread}
						isBrowse={isPublic}
					/>
					<Tooltip>
						<TooltipTrigger>
							{routeType === 'public' && (
								<Link
									className="flex transition-all w-16 h-full opacity-100 hover:opacity-80"
									href={userProfileUrl}
									onClick={(e) => {
										e.stopPropagation()
									}}
									prefetch
								>
									<Image
										className="object-cover size-full rounded-r-lg"
										src={threadThumbnail}
										alt={thread.slug}
										width={72}
										height={72}
									/>
								</Link>
							)}
						</TooltipTrigger>
						<TooltipContent
							className="bg-background px-2.5 py-1.5 rounded-lg"
							id={`chatbot-avatar-tooltip-${thread.chatbot.name || 'Default BotAvatar'}`}
							side="top"
							align="end"
						>
							Go to {thread.user?.username}
						</TooltipContent>
					</Tooltip>
				</div>
			</SharedAccordion>

			{/* Admin Mode Approve */}
			{isAdminMode && !thread.isApproved && (
				<AdminModeApprove threadId={threadId} />
			)}

			<div ref={contentRef} className="w-full h-0" />
		</li>
	)
}
