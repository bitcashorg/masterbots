import { type RefObject, useCallback, useEffect, useState, useRef } from 'react'

// TODO: Replace the name for use-mb-scroll

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
  scrollBehavior?: ScrollBehavior
  scrollDelay?: number
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
  scrollBehavior = 'smooth',
  scrollDelay = 300,
}: UseScrollOptions) {
  const [isNearBottom, setIsNearBottom] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const dummyRef = useRef<HTMLDivElement | null>(null)
  const loadMoreTimeoutRef = useRef<number | null>(null)

  // Memoize scroll handlers to prevent unnecessary re-renders
  const smoothScrollToBottom = useCallback(() => {
    if (!containerRef.current) return

    const scrollHeight = containerRef.current.scrollHeight
    const height = containerRef.current.clientHeight
    const maxScrollTop = scrollHeight - height

    // Implement RAF-based smooth scrolling with error handling
    try {
      // First phase: scroll near bottom
      containerRef.current.scrollTo({
        top: maxScrollTop - 1,
        behavior: scrollBehavior,
      })

      // Second phase: complete scroll to bottom
      requestAnimationFrame(() => {
        if (!containerRef.current) return
        containerRef.current.scrollTo({
          top: maxScrollTop,
          behavior: scrollBehavior,
        })
      })
    } catch (error) {
      console.error('Error during smooth scroll:', error)
      // Fallback to instant scroll if smooth scroll fails
      if (containerRef.current) {
        containerRef.current.scrollTop = maxScrollTop
      }
    }
  }, [containerRef, scrollBehavior])

  const scrollToTop = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, scrollDelay))
      if (!threadRef.current) return

      threadRef.current.scrollIntoView({ 
        behavior: scrollBehavior, 
        block: 'start' 
      })
    } catch (error) {
      console.error('Error during scroll to top:', error)
      // Fallback to instant scroll
      if (threadRef.current) {
        threadRef.current.scrollIntoView({ block: 'start' })
      }
    }
  }, [threadRef, scrollBehavior, scrollDelay])

  // Setup bottom observer
  useEffect(() => {
    if (!containerRef.current) return

    const cleanupObserver = () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (dummyRef.current) {
        dummyRef.current.remove()
        dummyRef.current = null
      }
    }

    try {
      cleanupObserver()

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsNearBottom(entry.isIntersecting)
        },
        {
          root: containerRef.current,
          threshold,
          rootMargin,
        }
      )

      dummyRef.current = document.createElement('div')
      dummyRef.current.style.height = '1px'
      containerRef.current.appendChild(dummyRef.current)
      observerRef.current.observe(dummyRef.current)

    } catch (error) {
      console.error('Error setting up bottom observer:', error)
    }

    return cleanupObserver
  }, [containerRef, rootMargin, threshold])

  // Handle new content scrolling
  useEffect(() => {
    if (isNewContent && isNearBottom) {
      smoothScrollToBottom()
    }
  }, [isNewContent, isNearBottom, smoothScrollToBottom])

  // Setup infinite scroll observer
  useEffect(() => {
    if (!threadRef.current) return

    const cleanupTimeout = () => {
      if (loadMoreTimeoutRef.current) {
        window.clearTimeout(loadMoreTimeoutRef.current)
        loadMoreTimeoutRef.current = null
      }
    }

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (hasMore && isLast && entry.isIntersecting && !loading) {
            // Debounce loadMore calls
            cleanupTimeout()
            loadMoreTimeoutRef.current = window.setTimeout(() => {
              loadMore()
            }, 100)
          }
        },
        {
          root: null,
          rootMargin: '100px',
          threshold: 0.1,
        }
      )

      observer.observe(threadRef.current)

      return () => {
        cleanupTimeout()
        observer.disconnect()
      }
    } catch (error) {
      console.error('Error setting up infinite scroll observer:', error)
    }
  }, [threadRef, isLast, hasMore, loading, loadMore])

  return {
    isNearBottom,
    smoothScrollToBottom,
    scrollToTop,
  }
}