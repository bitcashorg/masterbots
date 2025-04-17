'use client'

import { buttonVariants } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { cn, getRouteType } from '@/lib/utils'
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ChatbotAvatar({ thread }: { thread: Thread }) {
	const { isAdminMode } = useThreadVisibility()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				{routeType.match(/(public|profile)/) || isAdminMode ? (
					<Link
						href={`/b/${toSlug(thread.chatbot?.name)}`}
						className="transition-all flex items-start leading-[1.6rem] gap-2 text-sm text-foreground/50 w-max hover:text-foreground"
						onClick={(e) => {
							e.stopPropagation()
						}}
						prefetch
					>
						<picture className="min-w-8 md:min-w-10 size-8 sm:size-10">
							<Image
								className={cn(
									'bg-background size-8 sm:size-10 duration-300 select-none',
									buttonVariants({
										variant: 'icon',
										size: 'icon',
										radius: 'full',
									}),
								)}
								src={thread.chatbot?.avatar ?? '/images/robohash1.png'}
								alt={thread.chatbot?.name ?? 'Default BotAvatar'}
								height={42}
								width={42}
							/>
						</picture>
						{/* {thread.chatbot.name} */}
					</Link>
				) : (
					<div
						className={cn(
							'md:flex size-10 shrink-0 select-none items-center justify-center rounded-full border',
						)}
					>
						<Image
							className="transition-all duration-300 rounded-full select-none bg-background/100 hover:bg-background/30"
							src={thread.chatbot?.avatar ?? '/images/robohash1.png'}
							alt={thread.chatbot?.name ?? 'Default BotAvatar'}
							height={42}
							width={42}
						/>{' '}
					</div>
				)}
			</TooltipTrigger>
			<TooltipContent
				className="bg-background px-2.5 py-1.5 rounded-lg"
				id={`profile-avatar-tooltip-${thread.user?.username || 'Default Profile'}`}
				side="top"
				align="start"
			>
				Go to {thread.chatbot?.name ?? 'Default BotAvatar'}
			</TooltipContent>
		</Tooltip>
	)
}
