import { Skeleton } from '@masterbots/mb-ui'

export function ProfileSidebarSkeleton() {
	return (
		<div className="block md:hidden">
			<Skeleton className="rounded-full size-8" />
		</div>
	)
}

export function ProfileSidebarSheetSkeleton() {
	return (
		<div className="flex flex-col h-full">
			{/* Profile Header Skeleton */}
			<div className="p-4 border-b">
				<div className="flex items-center gap-4">
					<Skeleton className="rounded-full size-10" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[120px]" />
						<Skeleton className="h-3 w-[160px]" />
					</div>
				</div>
			</div>

			{/* Navigation Links Skeleton */}
			<nav className="flex flex-col p-4 space-y-2 lg:hidden">
				<Skeleton className="w-full h-8" />
				<Skeleton className="w-full h-8" />
				<Skeleton className="w-full h-8" />
			</nav>

			{/* Footer Skeleton */}
			<div className="flex items-center justify-between p-4 mt-auto border-t">
				<Skeleton className="h-8 w-[100px]" />
				<Skeleton className="rounded-full size-8" />
			</div>
		</div>
	)
}
