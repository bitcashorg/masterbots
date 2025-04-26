'use client'
import { useThread } from '@/lib/hooks/use-thread'
import { ThreadPopup } from '../thread/thread-popup'

export function BotPopup() {
	const { isOpenPopup } = useThread()

	if (!isOpenPopup) {
		return null
	}

	return (
		<div className="flex justify-center items-center w-full h-full z-10">
			<ThreadPopup />
		</div>
	)
}
