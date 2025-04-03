'use client'

import { AdminModeApprove } from '@/components/routes/chat/admin-mode-approve'
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
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const threadThumbnail = useMemo(
		() => `https://robohash.org/${thread?.slug || threadId}?bgset=bg2`,
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
				<div className="flex flex-col w-full py-3">
					{/* Thread Title */}
					<div className="px-2.5 flex justify-between items-start w-full gap-3">
						<div className="flex flex-col gap-2 w-full">
							<ChatbotAvatar thread={thread} />
							<span className="flex-inline text-left whitespace-pre-line line-clamp-5 sm:line-clamp-4">
								{thread.messages.filter((m) => m.role === 'user')[0]
									?.content || (
									<Skeleton className="w-[140px] md:w-[280px] max-w-[80%] h-[20px]" />
								)}
							</span>
						</div>
						{/* Thread Options */}
						{routeType === 'chat' && (
							<div className="flex gap-1.5 items-start justify-center group">
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
								<ChatOptions
									threadId={thread.threadId}
									thread={thread}
									isBrowse
								/>
							</div>
						)}
					</div>

					<div className="flex gap-4 mt-auto">
						{/* Thread Description */}
						<div className="overflow-hidden text-sm text-left opacity-50">
							{thread.messages.filter((m) => m.role !== 'user')?.[0]
								?.content ? (
								<div className="flex-1 px-2.5 pb-3 space-y-2 overflow-hidden">
									<ShortMessage
										content={
											thread.messages.filter((m) => m.role !== 'user')[0]
												.content
										}
									/>
								</div>
							) : (
								''
							)}
						</div>
						{routeType === 'public' && (
							<div className="flex gap-1.5 items-start justify-center group">
								<Link
									className="ml-auto transition-all flex items-start leading-[1.6rem] gap-2 text-sm text-foreground/50 w-max hover:text-foreground hover:[&_img]:opacity-100"
									href={userProfileUrl}
									prefetch
								>
									by
									<picture className="min-w-8 md:min-w-10 size-8 sm:size-10">
										<Image
											className={cn(
												'bg-background size-8 sm:size-10 opacity-80 duration-300 select-none',
												buttonVariants({
													variant: 'icon',
													size: 'icon',
													radius: 'full',
												}),
											)}
											src={
												thread.user?.profilePicture || '/images/robohash1.png'
											}
											alt={thread.user?.username ?? 'Avatar'}
											height={42}
											width={42}
										/>
									</picture>
								</Link>
								<ChatOptions
									threadId={thread.threadId}
									thread={thread}
									isBrowse
								/>
							</div>
						)}
					</div>
				</div>
				<picture className="transition-all relative h-[100px] sm:w-[160px] sm:min-h-[140px] sm:h-full rounded-r-lg opacity-50">
					<Image
						className="size-full object-cover rounded-t-lg sm:rounded-tl-none sm:rounded-r-lg"
						src={threadThumbnail}
						alt={thread.chatbot?.name || 'Default BotAvatar'}
						width={160}
						height={140}
						priority
					/>
				</picture>
			</SharedAccordion>

			{/* Admin Mode Approve */}
			{isAdminMode && !thread.isApproved && (
				<AdminModeApprove threadId={threadId} />
			)}

			<div ref={contentRef} className="w-full h-0" />
		</li>
	)
}
