'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconChatSearch, IconFilter, IconClose } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/lib/hooks/use-sidebar'

interface FilterInputProps {
  className?: string
}

export function FilterInput({ className }: FilterInputProps) {
  const {
    filterValue,
    setFilterValue,
    isFilterMode,
    setIsFilterMode
  } = useSidebar()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }

  const handleClearFilter = () => {
    setFilterValue('')
  }

  const handleFilterModeToggle = () => {
    setIsFilterMode(prev => !prev)
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search..."
          value={filterValue}
          onChange={handleInputChange}
          className="pr-12"
          aria-label="Filter bots"
        />
        <IconChatSearch className="absolute -translate-y-1/2 right-2 top-1/2 text-muted-foreground" />
        {filterValue && (
          <button
            onClick={handleClearFilter}
            className="absolute -translate-y-1/2 right-8 top-1/2 text-muted-foreground hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Clear filter"
          >
            <IconClose className="w-4 h-4" />
          </button>
        )}
      </div>
      <Button
        size="icon"
        variant={isFilterMode ? 'default' : 'outline'}
        onClick={handleFilterModeToggle}
        aria-label="Toggle filter mode"
      >
        <IconFilter className={cn('size-4', isFilterMode && 'text-white')} />
      </Button>
    </div>
  )
}