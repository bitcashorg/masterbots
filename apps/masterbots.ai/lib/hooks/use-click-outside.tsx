import type { RefObject } from 'react'
import { useEffect } from 'react'

const useClickOutside = (
	elementRef: RefObject<Element>,
	toggleVisiblePopover: () => void,
) => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleClickOutside = (e: Event) => {
			if (
				e.target instanceof Node &&
				elementRef.current &&
				!elementRef.current.contains(e.target)
			) {
				toggleVisiblePopover()
			}
		}
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])
}
export default useClickOutside
