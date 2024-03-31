/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useBrowse } from '@/lib/hooks/use-browse'

export function BrowseSearchInput() {
  const { keyword, changeKeyword } = useBrowse()
  return (
    <div className="flex flex-col items-center justify-center w-full py-10 dark:bg-[#09090B] bg-[#F4F4F5] rounded-lg gap-4">
      <div className="relative w-full max-w-[600px]">
        <Input
          value={keyword}
          onChange={e => {
            changeKeyword(e.target.value)
          }}
          placeholder="Search any chat with any Bot"
          className="w-full"
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
      <div className="w-full text-center">
        <p className="dark:text-[#83E56A] text-[#BE17E8] text-xs font-medium pt-2.5">
          Masterbots isn't infallible; verify crucial facts. Responses are for
          educational use, not legal, medical, financial or specialized advice.
        </p>
      </div>
    </div>
  )
}
