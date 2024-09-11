'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { SidebarItems } from '@/components/layout/sidebar/sidebar-items'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Chat } from '@/types/types'

interface SidebarListProps {
  userId?: string
}

// This function should be moved to a separate file, e.g., '@/lib/api'
async function fetchChats(userId?: string): Promise<Chat[]> {
  // Implement your actual chat loading logic here
  // This is a placeholder and should be replaced with your data fetching logic
  const response = await fetch(`/api/chats?userId=${userId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch chats')
  }
  return response.json()
}

export function SidebarList({ userId }: SidebarListProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { filterValue, isFilterMode } = useSidebar()

  useEffect(() => {
    async function loadChats() {
      try {
        setIsLoading(true)
        const loadedChats = await fetchChats(userId)
        setChats(loadedChats)
      } catch (error) {
        console.error('Failed to load chats:', error)
        // Optionally, you could set an error state here and display it to the user
      } finally {
        setIsLoading(false)
      }
    }

    loadChats()
  }, [userId])

  const filteredChats = useMemo(() => 
    chats.filter(chat =>
      chat.title.toLowerCase().includes(filterValue.toLowerCase())
    ),
    [chats, filterValue]
  )

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">Loading chats...</p>
          </div>
        ) : filteredChats.length > 0 ? (
          <div className="px-2 space-y-2">
            <SidebarItems chats={filteredChats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">
              {filterValue ? 'No matching chats found' : 'No chat history'}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
        {isFilterMode && filteredChats.length > 0 && (
          <button
            onClick={() => {
              // Implement clear filters functionality
              // This should probably be handled in the useSidebar hook
            }}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}