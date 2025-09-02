import { ThreadItemSkeleton } from '@masterbots/mb-ui'

export function BrowseListSkeleton({ count = 3 }: { count?: number }) {
	return (
		<div className="flex flex-col w-full gap-3 py-5">
			{Array.from({ length: count }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<ThreadItemSkeleton key={index} />
			))}
		</div>
	)
}
