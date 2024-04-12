'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { encodeQuery, decodeQuery } from '@/lib/url'
import { useSearchParam } from 'react-use'

export function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const urlQuery = useSearchParam('query')
  const [query, setSearchQuery] = useState(urlQuery)

  const handleSubmit = e => {
    e.preventDefault()
    router.refresh()
    router.push(`${pathname}?query=${encodeQuery(query)}`)
    router.refresh()
    setTimeout(() => {
      console.log('refreshing')
      router.refresh()
    }, 1500)
  }

  useEffect(() => {
    const decodedQuery = decodeQuery(urlQuery || '')
    if (decodedQuery !== query) setSearchQuery(decodedQuery)
  }, [urlQuery])

  return (
    <form
      className="flex flex-col items-center justify-center w-full pt-10 pb-8 mb-4 dark:bg-[#09090B] bg-[#F4F4F5] rounded-lg gap-4 px-4"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full max-w-[600px]">
        <Input
          className="w-full py-6"
          onChange={e => {
            setSearchQuery(e.target.value)
          }}
          placeholder="Search any chat with any Bot"
          value={query || ''}
        />
        {query ? (
          <Button
            aria-label="Clear query"
            className="absolute right-0 px-3 -translate-y-1/2 cursor-pointer top-1/2"
            type="submit"
            variant="ghost"
          >
            <IconClose className="!h-4 !w-4" />
          </Button>
        ) : null}
      </div>
      {/* <Button type="submit">Search</Button> */}
      <div className="w-full text-center">
        <p className="dark:text-[#83E56A] text-[#BE17E8] text-xs font-medium pt-4">
          Masterbots isn't infallible; verify crucial facts. Responses are for
          educational use, not legal, medical, financial or specialized advice.
        </p>
      </div>
    </form>
  )
}
