'use client'

import { buttonVariants } from '@/components/ui/button'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { cn } from '@/lib/utils'
import type { Chat } from '@/types/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type * as React from 'react'

interface SidebarItemProps {
	index: number
	chat: Chat
	children: React.ReactNode
}

export function SidebarItem({ index, chat, children }: SidebarItemProps) {
	const pathname = usePathname()

	const isActive = pathname === chat.path
	const [newChatId, setNewChatId] = useLocalStorage('newChatId', null)
	const shouldAnimate = index === 0 && isActive && newChatId

	if (!chat?.id) return null

	return (
		<motion.div
			className="relative h-8"
			variants={{
				initial: {
					height: 0,
					opacity: 0,
				},
				animate: {
					height: 'auto',
					opacity: 1,
				},
			}}
			initial={shouldAnimate ? 'initial' : undefined}
			animate={shouldAnimate ? 'animate' : undefined}
			transition={{
				duration: 0.25,
				ease: 'easeIn',
			}}
		>
			<div className="absolute flex items-center justify-center left-2 top-1 size-6">
				{chat.sharePath ? (
					<Tooltip delayDuration={1000}>
						<TooltipTrigger
							tabIndex={-1}
							className="focus:bg-muted focus:ring-1 focus:ring-ring"
						>
							<IconUsers className="mr-2" />
						</TooltipTrigger>
						<TooltipContent>This is a shared chat.</TooltipContent>
					</Tooltip>
				) : (
					<IconMessage className="mr-2" />
				)}
			</div>
			<Link
				href={chat.path}
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10',
					isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800',
				)}
			>
				<div
					className="relative flex-1 overflow-hidden break-all select-none max-h-5 text-ellipsis"
					title={chat.title}
				>
					<span className="whitespace-nowrap">
						{shouldAnimate ? (
							chat.title.split('').map((character, index) => (
								<motion.span
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									variants={{
										initial: {
											opacity: 0,
											x: -100,
										},
										animate: {
											opacity: 1,
											x: 0,
										},
									}}
									initial={shouldAnimate ? 'initial' : undefined}
									animate={shouldAnimate ? 'animate' : undefined}
									transition={{
										duration: 0.25,
										ease: 'easeIn',
										delay: index * 0.05,
										staggerChildren: 0.05,
									}}
									onAnimationComplete={() => {
										if (index === chat.title.length - 1) {
											setNewChatId(null)
										}
									}}
								>
									{character}
								</motion.span>
							))
						) : (
							<span>{chat.title}</span>
						)}
					</span>
				</div>
			</Link>
			{isActive && <div className="absolute right-2 top-1">{children}</div>}
		</motion.div>
	)
}
