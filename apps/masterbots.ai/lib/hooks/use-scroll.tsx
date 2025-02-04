import { type RefObject, useCallback, useEffect, useState } from 'react'

interface UseScrollOptions {
  containerRef: RefObject<HTMLElement>
  threadRef: RefObject<HTMLElement>
  isNewContent: boolean
  hasMore: boolean
  isLast: boolean
  loading: boolean
  loadMore: () => void
  rootMargin?: string
  threshold?: number
}

export function useScroll({
  containerRef,
  threadRef,
  isNewContent,
  hasMore,
  isLast,
  loading,
  loadMore,
  rootMargin = '0px 0px 100px 0px',
  threshold = 0.1,
}: UseScrollOptions) {
  const [isNearBottom, setIsNearBottom] = useState(false)

  const smoothScrollToBottom = useCallback(() => {
    if (containerRef.current) {
      const scrollHeight = containerRef.current.scrollHeight
      const height = containerRef.current.clientHeight
      const maxScrollTop = scrollHeight - height

      // ? Two-phase scroll
      containerRef.current.scrollTop = maxScrollTop - 1 // ? First scroll to near bottom
      requestAnimationFrame(() => {
        if (!containerRef.current) return
        containerRef.current.scrollTop = maxScrollTop // ? Then scroll to actual bottom
      })
    }
  }, [containerRef])

  const scrollToTop = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)) // animation time
    if (threadRef.current) {
      threadRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [threadRef])

  useEffect(() => {
    if (containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsNearBottom(entry.isIntersecting)
        },
        {
          root: containerRef.current,
          threshold,
          rootMargin,
        },
      )

      const dummy = document.createElement('div')
      dummy.style.height = '1px'
      containerRef.current.appendChild(dummy)
      observer.observe(dummy)

      return () => {
        observer.disconnect()
        dummy.remove()
      }
    }
  }, [containerRef, rootMargin, threshold])

  useEffect(() => {
    if (isNewContent && isNearBottom) {
      smoothScrollToBottom()
    }
  }, [isNewContent, isNearBottom, smoothScrollToBottom])

  useEffect(() => {
    if (!threadRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hasMore && isLast && entry.isIntersecting && !loading) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      },
    )

    observer.observe(threadRef.current)

    return () => {
      observer.disconnect()
    }
  }, [threadRef, isLast, hasMore, loading, loadMore])

  return { isNearBottom, smoothScrollToBottom, scrollToTop }
}
