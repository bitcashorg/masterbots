import { Skeleton } from '@/components/ui/skeleton'

export function ChatChatbotDetailsSkeleton() {
	return (
		<div className="h-[calc(100vh-196px)] flex items-center justify-center -translate-y-8">
			<div className="dark:bg-[#09090B] bg-white w-[85%] md:w-[600px] rounded-xl text-white relative">
				{/* Card Header */}
				<div className="px-4 pt-4 md:px-6 md:pt-6">
					<Skeleton className="w-48 h-8" />
				</div>

				{/* Separator Line with Avatar */}
				<div className="h-[3px] bg-zinc-200 dark:bg-slate-800 mt-6 relative">
					<div className="absolute right-4 -top-10 md:right-6 md:-top-12">
						<Skeleton className="rounded-full size-20 md:size-32" />
					</div>
				</div>

				{/* Description */}
				<div className="p-2 px-4 mr-2 md:p-3 md:px-6 md:mr-4">
					<Skeleton className="h-16 w-[80%]" />
				</div>

				{/* Card Content */}
				<div className="px-4 pb-4 md:px-6 md:pb-6 flex flex-col items-center justify-start gap-1.5">
					<div className="w-full mb-3 text-center md:mb-4">
						<Skeleton className="w-48 h-8 mx-auto mb-2" />
						<Skeleton className="h-6 mx-auto w-36" />
					</div>

					<div className="flex flex-col items-center w-full gap-3">
						<div className="flex items-center justify-center gap-4 md:gap-6">
							<Skeleton className="w-24 h-6" />
							<Skeleton className="w-32 h-6" />
							<Skeleton className="w-20 h-8" />
						</div>

						<Skeleton className="w-48 h-10" />
					</div>
				</div>
			</div>
		</div>
	)
}
