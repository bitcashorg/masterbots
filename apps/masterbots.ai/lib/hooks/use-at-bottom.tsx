import type { MotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	ref: any
	scrollY: MotionValue<number>
}

export const useAtBottom = ({ ref, scrollY }: Props) => {
	const [isAtBottom, setIsAtBottom] = useState(false)

	useEffect(() => {
		if (!scrollY || !ref.current) return
		scrollY.clearListeners()
		scrollY.on('change', () => {
			setIsAtBottom(
				scrollY.get() + 5 >
					ref.current.scrollHeight - ref.current.offsetHeight &&
					scrollY.get() > 0,
			)
		})
	}, [ref, scrollY])
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!scrollY || !ref.current) return
		if (
			scrollY.get() + 5 > ref.current.scrollHeight - ref.current.offsetHeight &&
			scrollY.get() === 0
		) {
			setIsAtBottom(true)
		}
	}, [])

	return {
		isAtBottom,
	}
}
