'use client'
import { ThreadPopupSkeleton } from '@/components/shared/skeletons/thread-popup-skeleton'
import { useThread } from '@/lib/hooks/use-thread'
import dynamic from 'next/dynamic'

const ThreadPopup = dynamic(
	() =>
		import('@/components/routes/thread/thread-popup').then(
			(mod) => mod.ThreadPopup,
		),
	{
		ssr: false,
		loading: () => <ThreadPopupSkeleton />,
	},
)

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
