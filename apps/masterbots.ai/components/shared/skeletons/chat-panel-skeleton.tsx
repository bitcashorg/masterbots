import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function ChatPanelSkeleton({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'fixed inset-x-0 bottom-0 z-20 w-full',
				'pb-4',
				'duration-300 ease-in-out animate-in',
				'bg-gradient-to-b from-background/50 to-background',
				'dark:from-background/0 dark:to-background/80',
				'lg:pl-[250px] xl:pl-[300px]',
				className,
			)}
		>
			<div className="relative mx-auto w-full">
				{/* Header Section Skeleton */}
				<div className="flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0">
					<div className="flex gap-4 justify-between items-center mx-2 w-full">
						<div className="flex items-center space-x-6 w-full max-w-[60%] overflow-y-hidden scrollbar scrollbar-thin">
							<Skeleton className="h-9 w-40" />
							<Skeleton className="h-9 w-32" />
							<Skeleton className="h-9 w-44" />
						</div>
						<div className="flex items-center gap-3.5">
							<Skeleton className="h-9 w-9" />
							<Skeleton className="h-9 w-24" />
						</div>
					</div>
				</div>

				{/* Prompt Form Section Skeleton */}
				<div
					className={cn(
						'flex relative flex-col w-full',
						'p-2 space-y-2 md:px-4 sm:space-y-4',
						'border-t shadow-lg bg-background',
						'dark:border-zinc-800 border-zinc-200',
						'min-h-[64px] sm:min-h-[80px]',
					)}
				>
					<Skeleton className="h-[48px] w-full" />
				</div>
			</div>
		</div>
	)
}
