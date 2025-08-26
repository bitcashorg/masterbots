'use client'

import { SidebarItem } from '@/components/layout/sidebar/sidebar-item'
import type { Chat } from '@/types/types'
import { AnimatePresence, motion } from 'framer-motion'

interface SidebarItemsProps {
	chats?: Chat[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
	if (!chats?.length) return null

	return (
		<AnimatePresence>
			{chats.map(
				(chat, index) =>
					chat && (
						<motion.div
							key={chat?.id}
							exit={{
								opacity: 0,
								height: 0,
							}}
						>
							<SidebarItem index={index} chat={chat}>
								<div />
							</SidebarItem>
						</motion.div>
					),
			)}
		</AnimatePresence>
	)
}
