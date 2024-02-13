'use client'

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useBrowse } from '@/lib/hooks/use-browse'

export function BrowseSearchInput() {
  const { keyword, changeKeyword } = useBrowse()
  return (
    <div className="flex justify-center w-full py-10 dark:bg-[#09090B]  rounded-3xl gap-4">
      <div className="relative w-full max-w-[600px] flex items-center justify-center">
        <Input
          value={keyword}
          onChange={e => {
            changeKeyword(e.target.value)
          }}
          placeholder="Search any chat with any Bot"
          className="max-w-[600px]"

        />
        {keyword && (
          <Button
            type="reset"
            variant="ghost"
            className="absolute px-3 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => changeKeyword('')}
            aria-label="Clear search"
          >
            <IconClose className="!h-4 !w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
