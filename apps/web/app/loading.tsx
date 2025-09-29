'use client'

import {
	MainContentSkeleton,
	SidebarSkeleton,
} from '@/components/shared/skeletons/chat-page-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<>
			<SidebarSkeleton />

			{/* Main Content Area */}
			<div className="relative flex h-screen">
				<div className="flex-1 mt-16 lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)] lg:ml-[250px] xl:ml-[300px]">
					<MainContentSkeleton />
					<Skeleton className="size-full absolute inset-0 z-0 opacity-80" />
				</div>
			</div>
		</>
	)
}
