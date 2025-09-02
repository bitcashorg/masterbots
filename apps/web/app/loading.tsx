'use client'

import { MainContentSkeleton, SidebarSkeleton } from '@masterbots/mb-ui'
import { Skeleton } from '@masterbots/mb-ui'

export default function Loading() {
	return (
		<>
			<SidebarSkeleton />

			{/* Main Content Area */}
			<div className="relative flex h-screen">
				<div className="flex-1 mt-16">
					<MainContentSkeleton />
					<Skeleton className="size-full absolute inset-0 z-0 opacity-80" />
				</div>
			</div>
		</>
	)
}
