'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import { useDebounce, useDebouncedCallback } from 'use-debounce'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { encodeQuery } from '@/lib/url-params'

export function SearchInput() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlQuery = searchParams.get('query')

  // updates the url with encoded query without rerendering
  const updateUrl = useDebouncedCallback((query: string) => {
    const queryParam = encodeQuery(query)
    // Encoding the query and managing search parameters
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('query', encodeQuery(queryParam))
      console.log('params.get query', params.get('query'))
      router.replace(`${pathname}?query=${encodeQuery(queryParam)}`)
    } else {
      params.delete('query')
      router.replace(pathname)
    }
    router.refresh()
  }, 200)

  return (
    <div className="flex flex-col items-center justify-center w-full pt-10 pb-8 mb-4 dark:bg-black-alpha bg-[#F4F4F5] rounded-lg gap-4 px-4">
      <div className="relative w-full max-w-[600px]">
        {urlQuery ? (
          <div
            className="absolute z-10 cursor-pointer right-4 top-[12px] text-[#1beabd]"
            onClick={() => updateUrl('')}
          >
            <IconClose height={15} width={15} />
          </div>
        ) : null}
        <div className="w-full bg-black gradient-input">
          <Input
            className="bg-black border "
            defaultValue={urlQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              updateUrl(e.target.value)
            }}
            placeholder="Search answers on all categories"
            type="text"
          />
        </div>
      </div>
    </div>
  )
}
