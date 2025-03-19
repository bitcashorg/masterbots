import { useCallback, useEffect, useRef } from 'react'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useDebounce<T extends (...args: any[]) => void>(
	callback: T,
	delay: number,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	deps: any[] = [],
) {
	const timeoutRef = useRef<number | null>(null)

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	return useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current)
			}

			timeoutRef.current = window.setTimeout(() => {
				callback(...args)
			}, delay)
		},
		[callback, delay],
	) as T
}
