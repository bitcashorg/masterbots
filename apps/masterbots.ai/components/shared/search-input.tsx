'use client'

import { useEffect, useState, useTransition } from 'react'

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
  const [isPending, startTransition] = useTransition()

  const replaceUrl = () => {
    const searchParams = new URLSearchParams(window.location.search)
    if (query) {
      searchParams.set('query', query)
    } else {
      console.log('delete')
      searchParams.delete('query')
    }
    searchParams.delete('page')

    startTransition(() => {
      console.log(`start transition to ${pathname}?${searchParams.toString()}`)
      router.replace(`${pathname}?${searchParams.toString()}`)
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    replaceUrl()
  }

  const clearQuery = () => {
    setSearchQuery('')
  }

  // useEffect(() => {
  //   const decodedQuery = decodeQuery(urlQuery || '')
  //   if (decodedQuery !== query) setSearchQuery(decodedQuery)
  // }, [urlQuery])

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
            type="text"
            onChange={e => {
              setSearchQuery(e.target.value)
            }}
            placeholder="Search answers on all categories"
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
