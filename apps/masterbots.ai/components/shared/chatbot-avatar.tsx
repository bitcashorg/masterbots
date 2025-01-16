'use client'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import type { Thread } from 'mb-genql'
import Image from 'next/image'

export function ChatbotAvatar({ thread }: { thread: Thread }) {
	const { activeChatbot } = useSidebar()

	if (activeChatbot || !thread.chatbot?.avatar) return null

	return (
		<div
			className={cn(
				'md:flex size-10 shrink-0 select-none items-center justify-center rounded-full border',
			)}
		>
			<Image
				className="transition-all duration-300 rounded-full select-none bg-background/100 hover:bg-background/30"
				src={thread.chatbot?.avatar}
				alt={thread.chatbot?.name ?? 'BotAvatar'}
				height={40}
				width={40}
			/>{' '}
		</div>
	)
}
