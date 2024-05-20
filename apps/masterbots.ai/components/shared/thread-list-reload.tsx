'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

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
