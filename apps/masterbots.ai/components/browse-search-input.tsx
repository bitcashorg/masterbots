'use client'

import { Input } from '@/components/ui/input'
import { IconChatSearch } from './ui/icons'
import { Button } from './ui/button'
import { useBrowse } from '@/lib/hooks/use-browse'

export function BrowseSearchInput() {
  const { keyword, changeKeyword } = useBrowse()
  return (
    <div className="flex justify-center w-full py-10 dark:bg-[#09090B]  rounded-3xl gap-4">
      <Input
        value={keyword}
        onChange={e => {
          changeKeyword(e.target.value)
        }}
        placeholder="Search any chat with any Bot"
        className="max-w-[600px]"
      />
      <Button variant="ghost" className="p-2 h-9">
        <IconChatSearch className="!h-6 !w-6" />
      </Button>
    </div>
  )
}
