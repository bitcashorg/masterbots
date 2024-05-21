'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// ! This component is not necessary to be split this way, only functionality.
// ! Though functionality looks correct, this causes an error in the app, a infinite loop very easy
// ! I suggest to only split the code in the same file, or use a different approach to split the code.
// * Search params might look fine but if an user goes (or saves) a link with a page number, it will be lost the first items that are on smaller page number
// * E.g.: If I go to /?page=2, I will lose the first items that are on page 1... This is not a good user experience
export function ThreadListReload() {
  const params = useSearchParams()
  const router = useRouter()
  const page = parseInt(params.get('page') || '1', 10)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(([entry]) => {

      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);

        setTimeout(() => {
          const newPage = page + 1
          const newParams = new URLSearchParams(params)
          newParams.set('page', newPage.toString())
          router.push(`${window.location.pathname}?${newParams.toString()}`)

          setIsLoading(false);
        }, 150)
        observer.unobserve(entry.target)
      }
    })

    observer.observe(loadMoreRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isLoading, page, params, router])

  return (
    <div ref={loadMoreRef} className='min-h-4' />
  )
}
