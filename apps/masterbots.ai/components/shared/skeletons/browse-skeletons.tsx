import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ThreadItemSkeleton() {
	return (
		<div className="relative">
			<div className="dark:hover:bg-mirage hover:bg-gray-300 pl-[8px] py-3 flex flex-col gap-[6px]">
				{/* Thread Header */}
				<div className="flex items-center justify-between w-full gap-3 pr-4">
					<div className="flex items-center gap-2 sm:gap-4 w-[calc(100%-100px)] sm:w-[calc(100%-124px)]">
						{/* Avatar */}
						<Skeleton className="w-8 h-8 rounded-full sm:h-10 sm:w-10" />

						{/* Title */}
						<div className="flex-1">
							<Skeleton className="w-3/4 h-5" />
						</div>

						{/* User Section */}
						<div className="flex items-center gap-1 ml-2 sm:gap-3 sm:ml-4">
							<Skeleton className="hidden w-16 h-4 sm:inline" />
							<Skeleton className="w-8 h-8 rounded-full sm:h-10 sm:w-10" />
						</div>
					</div>

					{/* Options */}
					<div className="pl-2 pr-4 sm:pl-4 sm:pr-8">
						<Skeleton className="w-8 h-8" />
					</div>
				</div>

				{/* Description */}
				<div className="pr-4 pl-14">
					<Skeleton className="w-5/6 h-4 mb-2" />
					<Skeleton className="w-2/3 h-4" />
				</div>
			</div>
		</div>
	)
}
