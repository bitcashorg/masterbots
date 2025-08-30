'use client'

import { ChatPanelSkeleton } from '@/components/shared/skeletons/chat-panel-skeleton'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, getRouteType } from '@/lib/utils'
import { Skeleton } from '@masterbots/mb-ui'
import { usePathname } from 'next/navigation'

export function ThreadPopupContentSkeleton({
	className,
}: {
	className?: string
}) {
	const { activeThread } = useThread()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	const isBrowseView =
		routeType === 'public' ||
		routeType === 'profile' ||
		(routeType === 'bot' && activeThread?.threadId)
	const isBotView = routeType === 'bot'
	return (
		<div
			className={cn(
				'flex flex-col gap-3 p-2.5 dark:bg-[#18181b] bg-white grow rounded-b-[8px] scrollbar h-full',
				isBrowseView ? 'pb-2 md:pb-4' : 'pb-[120px] md:pb-[180px]',
				className,
			)}
		>
			<Skeleton className="h-9 w-full" />
			<Skeleton className="h-14 w-full" />
			<Skeleton className="h-14 w-full" />
			<Skeleton className="h-14 w-full" />
		</div>
	)
}

export function ThreadPopupSkeleton({ className }: { className?: string }) {
	const { activeThread } = useThread()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	const isBrowseView =
		routeType === 'public' ||
		routeType === 'profile' ||
		(routeType === 'bot' && activeThread?.threadId)
	const isBotView = routeType === 'bot'
	return (
		<div
			className={cn(
				'size-full bg-background/80 dark:bg-background/80',
				isBotView
					? ''
					: 'lg:max-w-[calc(100%-250px)] xl:max-w-[calc(100%-300px)]',
				'flex justify-center items-center fixed top-16',
				'h-[calc(100vh-4rem)] backdrop-blur-sm ease-in-out duration-500 z-40',
				'transition-all',
				className,
			)}
		>
			<div
				className={cn(
					'flex flex-col z-50 rounded-lg duration-500 ease-in-out fixed',
					'h-full max-h-[90%] max-w-[1032px] w-[95%]',
					'dark:border-mirage border-iron border bg-background dark:bg-background',
					'transition-opacity',
				)}
			>
				<div className="relative rounded-t-[8px] px-2.5 md:px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]">
					<div className="flex items-center justify-between gap-6">
						<div className="items-center block overflow-y-auto whitespace-pre-line max-h-28 scrollbar small-thumb">
							<Skeleton className="w-[280px] h-[20px]" />
						</div>
					</div>
				</div>

				<ThreadPopupContentSkeleton />

				{!isBrowseView && (
					<ChatPanelSkeleton className="!pl-0 rounded-b-[8px] overflow-hidden !absolute" />
				)}
			</div>
		</div>
	)
}
