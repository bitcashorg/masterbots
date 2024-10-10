/* eslint-disable react/no-unescaped-entities */
'use client'

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
