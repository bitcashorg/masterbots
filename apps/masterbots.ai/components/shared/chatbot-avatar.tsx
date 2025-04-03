'use client'

import { buttonVariants } from '@/components/ui/button'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn, getRouteType } from '@/lib/utils'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ChatbotAvatar({ thread }: { thread: Thread }) {
	const { activeChatbot } = useSidebar()
	const pathname = usePathname()
	const routeType = getRouteType(pathname)

	if (routeType !== 'public' && (activeChatbot || !thread.chatbot?.avatar))
		return null

	return routeType === 'public' ? (
		<Link
			href={`/b/${toSlug(thread.chatbot?.name)}`}
			className="mr-auto transition-all flex items-start leading-[1.6rem] gap-2 text-sm text-foreground/50 w-max hover:text-foreground"
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
			{thread.chatbot.name}
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
	)
}
