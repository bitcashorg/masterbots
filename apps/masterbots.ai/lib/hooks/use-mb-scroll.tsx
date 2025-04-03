import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce } from './use-debounce'
import { useIntersectionObserver } from './use-intersection-observer'

interface UseScrollOptions {
	containerRef: RefObject<HTMLElement | null>
	threadRef: RefObject<HTMLElement | null>
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

export function useMBScroll({
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
	// Use a mutable ref for the dummy element
	const dummyElementRef = useRef<HTMLDivElement | null>(null)

	// Create and manage dummy element
	useEffect(() => {
		if (!containerRef.current) return

		// Create the dummy element if it doesn't exist
		if (!dummyElementRef.current) {
			const dummy = document.createElement('div')
			dummy.style.height = '1px'
			containerRef.current.appendChild(dummy)
			dummyElementRef.current = dummy
		}

		// Cleanup function
		return () => {
			if (dummyElementRef.current) {
				dummyElementRef.current.remove()
				dummyElementRef.current = null
			}
		}
	}, [containerRef])

	// Bottom detection observer
	useIntersectionObserver({
		target: {
			current: dummyElementRef.current,
		} as RefObject<HTMLElement | null>,
		root: containerRef,
		rootMargin,
		threshold,
		onIntersect: (isIntersecting) => {
			setIsNearBottom(isIntersecting)
		},
		enabled: Boolean(dummyElementRef.current),
	})

	// Infinite scroll observer
	const debouncedLoadMore = useDebounce(loadMore, 100, [loadMore])
	useIntersectionObserver({
		target: threadRef,
		root: null,
		rootMargin: '100px',
		threshold: 0.1,
		onIntersect: (isIntersecting) => {
			if (hasMore && isLast && isIntersecting && !loading) {
				debouncedLoadMore()
			}
		},
		enabled: hasMore && isLast && !loading,
	})

	const smoothScrollToBottom = useCallback(() => {
		if (!containerRef.current) return

		const scrollHeight = containerRef.current.scrollHeight
		const height = containerRef.current.clientHeight
		const maxScrollTop = scrollHeight - height

		try {
			// First phase: scroll near bottom
			containerRef.current.scrollTo({
				top: maxScrollTop - 8,
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
				block: 'start',
			})
		} catch (error) {
			console.error('Error during scroll to top:', error)
			// Fallback to instant scroll
			if (threadRef.current) {
				threadRef.current.scrollIntoView({ block: 'start' })
			}
		}
	}, [threadRef, scrollBehavior, scrollDelay])

	// Auto-scroll to bottom when new content arrives
	// useEffect(() => {
	//   if (isNewContent && !isNearBottom) {
	//     smoothScrollToBottom()
	//   }
	// }, [isNearBottom])

	return {
		isNearBottom,
		smoothScrollToBottom,
		scrollToTop,
	}
}
