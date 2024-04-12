'use client'

import { useState, useTransition } from 'react'
import { usePathname , useRouter } from 'next/navigation'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { encodeQuery } from '@/lib/url'
import { useGlobalStore } from '@/hooks/use-global-store'

export function SearchInput() {
  const router = useRouter()
  const pathname = usePathname()
  const { setGlobalQuery, ...global } = useGlobalStore()
  const [query, setQuery] = useState(global.query)
  const [_isPending, startTransition] = useTransition()

  const replaceUrl = () => {
    const searchParams = new URLSearchParams(window.location.search)
    if (query) {
      searchParams.set('query', encodeQuery(query))
    } else {
      console.log('delete')
      searchParams.delete('query')
    }
    searchParams.delete('page')

    // startTransition(() => {
    //   console.log(`start transition to ${pathname}?${searchParams.toString()}`)
    //   router.push(`${pathname}?${searchParams.toString()}`)
    // })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setGlobalQuery(encodeQuery(query))
    replaceUrl()
  }

  const clearQuery = () => {
    setQuery('')
    setGlobalQuery('')
  }

  return (
    <form
      className="flex flex-col items-center justify-center w-full pt-10 pb-8 mb-4 dark:bg-black-alpha bg-[#F4F4F5] rounded-lg gap-4 px-4"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full max-w-[600px]">
        {query ? (
          <div
            className="absolute z-10 cursor-pointer right-4 top-[12px] text-[#1beabd]"
            onClick={clearQuery}
          >
            <IconClose height={15} width={15} />
          </div>
        ) : null}
        <div className="w-full bg-black gradient-input">
          <Input
            className="bg-black border "
            onChange={e => {
              setQuery(e.target.value)
            }}
            placeholder="Search answers on all categories"
            type="text"
            value={query || ''}
          />
          {/* <span></span> */}
        </div>
      </div>
      {/* <Button type="submit">Search</Button> */}
      <div className="w-full text-center">
        {/* Removing this momentarily to discuss dark:text-[#83E56A] text-[#BE17E8] font-medium */}
        <p className="pt-4 text-xs font-light text-neutral-500 ">
          Masterbots isn't infallible; verify crucial facts. Responses are for
          educational use, not legal, medical, financial or specialized advice.
        </p>
      </div>
    </form>
  )
}
