'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { IconFilter, IconClose } from '@/components/ui/icons'

interface SidebarHeaderProps extends React.ComponentProps<'div'> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  const {
    filterValue,
    setFilterValue,
    isFilterMode,
    setIsFilterMode,
    selectedCategories,
    selectedChatbots,
    selectedChats
  } = useSidebar()

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value)
  }

  const handleFilterModeToggle = () => {
    setIsFilterMode(prev => !prev)
  }

  const handleClearFilter = () => {
    setFilterValue('')
  }

  const totalSelectedItems = selectedCategories.length + selectedChatbots.length + selectedChats.length

  return (
    <div
      className={cn('flex flex-col space-y-2 p-4', className)}
      {...props}
    >
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Filter items..."
            value={filterValue}
            onChange={handleFilterChange}
            className="pr-8"
          />
          {filterValue && (
            <button
              onClick={handleClearFilter}
              className="absolute -translate-y-1/2 right-2 top-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear filter"
            >
              <IconClose className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          onClick={handleFilterModeToggle}
          variant={isFilterMode ? "default" : "outline"}
          size="sm"
          className="whitespace-nowrap"
        >
          <IconFilter className="w-4 h-4 mr-2" />
          {isFilterMode ? 'Exit Filter' : 'Enter Filter'}
        </Button>
      </div>
      {isFilterMode && totalSelectedItems > 0 && (
        <div className="text-sm text-muted-foreground">
          {totalSelectedItems} item{totalSelectedItems !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  )
}