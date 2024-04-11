'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { Chat } from '@/types/chat'
import { SidebarItem } from '@/components/routes/c/sidebar/sidebar-item'

interface SidebarItemsProps {
  chats?: Chat[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  if (!chats.length) return null

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              exit={{
                opacity: 0,
                height: 0
              }}
              key={chat.id}
            >
              <SidebarItem chat={chat} index={index}>
                <div />
              </SidebarItem>
            </motion.div>
          )
      )}
    </AnimatePresence>
  )
}
