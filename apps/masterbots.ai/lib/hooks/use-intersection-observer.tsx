import { useEffect, type RefObject, useCallback } from 'react'

interface UseIntersectionObserverProps {
  target: RefObject<HTMLElement>
  root?: RefObject<HTMLElement> | null
  rootMargin?: string
  threshold?: number
  onIntersect: (isIntersecting: boolean) => void
  enabled?: boolean
}

export function useIntersectionObserver({
  target,
  root = null,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
  enabled = true
}: UseIntersectionObserverProps) {
  const callback = useCallback<IntersectionObserverCallback>(
    ([entry]) => {
      onIntersect(entry.isIntersecting)
    },
    [onIntersect]
  )
  useEffect(() => {
    if (!enabled || !target.current) return

    const options: IntersectionObserverInit = {
      root: root?.current,
      rootMargin,
      threshold
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(target.current)

    return () => {
      observer.disconnect()
    }
  }, [callback, enabled, root, rootMargin, target, threshold])
}
