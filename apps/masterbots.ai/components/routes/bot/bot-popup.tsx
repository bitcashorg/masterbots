'use client'
import { useThread } from '@/lib/hooks/use-thread'
import { ThreadPopup } from '../thread/thread-popup'

export function BotPopup() {
	const { isOpenPopup } = useThread()
	return (
		<div className="flex justify-center items-center w-full h-full z-10">
			<ThreadPopup className={isOpenPopup ? '' : 'hidden'} />
		</div>
	)
}
