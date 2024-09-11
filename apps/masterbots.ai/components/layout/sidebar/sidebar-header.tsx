'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { IconFilter, IconX } from '@/components/ui/icons'

interface SidebarHeaderProps extends React.ComponentProps<'div'> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  const {
    filterValue,
    setFilterValue,
    isFilterMode,
    setIsFilterMode,
    selectedChats,
    setSelectedChats
  } = useSidebar()

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value)
  }

  const handleFilterModeToggle = () => {
    setIsFilterMode(prev => !prev)
    if (isFilterMode) {
      // Clear selections when exiting filter mode
      setSelectedChats([])
    }
  }

  const handleClearFilter = () => {
    setFilterValue('')
  }

  return (
    <div
      className={cn('flex flex-col space-y-2 p-4', className)}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Filter chats..."
            value={filterValue}
            onChange={handleFilterChange}
            className="pr-8"
          />
          {filterValue && (
            <button
              onClick={handleClearFilter}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear filter"
            >
              <IconX className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          onClick={handleFilterModeToggle}
          variant={isFilterMode ? "default" : "outline"}
          size="sm"
          className="whitespace-nowrap"
        >
          <IconFilter className="mr-2 h-4 w-4" />
          {isFilterMode ? 'Exit Filter' : 'Enter Filter'}
        </Button>
      </div>
      {isFilterMode && selectedChats.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {selectedChats.length} chat{selectedChats.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  )
}