import { type RefObject, useCallback, useEffect } from 'react'

interface UseIntersectionObserverProps {
	target: RefObject<HTMLElement | null>
	root?: RefObject<HTMLElement | null> | null
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
	enabled = true,
}: UseIntersectionObserverProps) {
	const callback = useCallback<IntersectionObserverCallback>(
		([entry]) => {
			onIntersect(entry.isIntersecting)
		},
		[onIntersect],
	)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!enabled || !target.current) return

		const options: IntersectionObserverInit = {
			root: root?.current,
			rootMargin,
			threshold,
		}

		const observer = new IntersectionObserver(callback, options)
		observer.observe(target.current)

		return () => {
			observer.disconnect()
		}
	}, [enabled, root, rootMargin, target, threshold])
}
