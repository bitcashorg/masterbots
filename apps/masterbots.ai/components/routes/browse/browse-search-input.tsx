'use client'

/**
 * BrowseSearchInput Component
 *
 * This component provides a search input field for users to filter chat threads based on keywords.
 * It allows users to type in a search term and clear the input when needed.
 *
 * Key Features:
 * - Controlled Input: Manages the input value using state to reflect the current search keyword.
 * - Dynamic Placeholder: Displays a placeholder text guiding users on what to search for.
 * - Clear Functionality: Provides a button to clear the search input, enhancing user experience.
 * - Responsive Design: Utilizes Tailwind CSS for styling and layout.
 * - Integration with Custom Hooks: Uses `useBrowse and useThreadSearch` to manage the searching.
 */

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useBrowse } from '@/lib/hooks/use-browse'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useThreadSearch } from '@/lib/hooks/use-threa-search'

export function BrowseSearchInput() {
  const { searchTerm, setSearchTerm } = useThreadSearch()
  const { changeKeyword } = useBrowse()

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    changeKeyword(value)
  }

  return (
    <div className="relative w-full max-w-[900px] mx-auto flex items-center justify-center pt-5">
      <div className="relative w-full">
        <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 group-focus-within:opacity-100">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r dark:from-[#83E56A]/5 dark:to-[#83E56A]/5 from-[#BE17E8]/5 to-[#BE17E8]/5 blur-lg animate-pulse" />
        </div>

        <div
          className={cn(
            'group relative w-full flex items-center',
            'rounded-full',
            'dark:bg-[#18181B]/90',
            'border dark:border-[#83E56A]/10 border-[#BE17E8]/10',
            'transition-all duration-200'
          )}
        >
          <Search className="absolute w-5 h-5 left-4 text-zinc-400" />
          <Input
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search in all messages and threads..."
            className={cn(
              'w-full px-12 py-6',
              'bg-transparent',
              'placeholder:text-zinc-400',
              'text-base dark:text-zinc-100',
              'border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              'rounded-full'
            )}
          />
          {searchTerm && (
            <Button
              type="reset"
              variant="ghost"
              onClick={() => handleSearch('')}
              className={cn(
                'absolute right-2',
                'size-8 p-0',
                'hover:bg-zinc-800/50',
                'rounded-full'
              )}
              aria-label="Clear search"
            >
              <IconClose className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
