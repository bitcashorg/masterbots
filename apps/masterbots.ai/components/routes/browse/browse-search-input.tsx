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
 * - Integration with Custom Hooks: Uses `useBrowse` to manage the search keyword state.
 */

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useBrowse } from '@/lib/hooks/use-browse'

export function BrowseSearchInput() {
  const { keyword, changeKeyword } = useBrowse()
  return (
    <div className="relative w-full max-w-[600px] mx-auto flex items-center justify-center pt-5">
      <Input
        value={keyword}
        onChange={e => {
          changeKeyword(e.target.value)
        }}
        placeholder="Search any chat with any Bot"
        className="w-full py-6 bg-white dark:bg-[#343434] text-sm font-medium rounded-lg shadow-sm"
      />
      {keyword && (
        <Button
          type="reset"
          variant="ghost"
          className="absolute right-0 px-3 -translate-y-1/2 cursor-pointer top-1/2"
          onClick={() => changeKeyword('')}
          aria-label="Clear search"
        >
          <IconClose className="!h-4 !w-4" />
        </Button>
      )}
    </div>
  )
}
