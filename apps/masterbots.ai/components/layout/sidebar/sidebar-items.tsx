'use client'

import React, { useMemo, useCallback } from 'react'
import { Chat } from '@/types/types'
import { AnimatePresence, motion } from 'framer-motion'
import { SidebarItem } from '@/components/layout/sidebar/sidebar-item'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Button } from '@/components/ui/button'

interface SidebarItemsProps {
  chats?: Chat[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  const {
    isFilterMode,
    filterValue,
    selectedChats,
    setSelectedChats
  } = useSidebar()

  const filteredChats = useMemo(() => 
    chats?.filter(chat => 
      chat.title.toLowerCase().includes(filterValue.toLowerCase())
    ) ?? [],
    [chats, filterValue]
  )

  const visibleChats = useMemo(() => 
    isFilterMode 
      ? filteredChats 
      : filteredChats.filter(chat => selectedChats.includes(chat.id)),
    [isFilterMode, filteredChats, selectedChats]
  )

  const handleSelectAllChats = useCallback(() => {
    if (selectedChats.length === filteredChats.length) {
      setSelectedChats([])
    } else {
      setSelectedChats(filteredChats.map(chat => chat.id))
    }
  }, [filteredChats, selectedChats, setSelectedChats])

  if (!chats?.length) return null

  return (
    <div className="space-y-2">
      {isFilterMode && (
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-sm font-medium">Recent Chats</span>
          <Button
            onClick={handleSelectAllChats}
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-600"
          >
            {selectedChats.length === filteredChats.length ? 'Deselect All' : 'Select All'}
          </Button>
        </div>
      )}
      <AnimatePresence>
        {visibleChats.map((chat, index) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SidebarItem 
              index={index} 
              chat={chat}
            >
              <div />
            </SidebarItem>
          </motion.div>
        ))}
      </AnimatePresence>
      {visibleChats.length === 0 && (
        <div className="px-4 py-2 text-sm text-gray-500">
          {filterValue ? 'No matching chats found' : 'No chats available'}
        </div>
      )}
    </div>
  )
}