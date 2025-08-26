import { ThreadItemSkeleton } from '@/components/shared/skeletons/browse-skeletons'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { ChatChatbotDetailsSkeleton } from './chat-chatbot-details-skeleton'

export function SidebarSkeleton() {
	return (
		<aside
			className={cn(
				'hidden lg:flex peer absolute min-h-[inherit] h-full flex-col z-40 inset-y-0 border-r',
				'w-[300px] lg:w-[250px] xl:w-[300px]',
				'bg-[#fae8ff] dark:bg-[#000000]',
			)}
		>
			<div className="p-4 space-y-4">
				<Skeleton className="w-full h-10" />
				<div className="space-y-2">
					{Array.from({ length: 8 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={i} className="flex items-center p-4 space-x-4">
							<div className="space-y-2">
								<Skeleton className="h-4 w-[200px]" />
							</div>
						</div>
					))}
				</div>
			</div>
		</aside>
	)
}

export function MainContentSkeleton() {
	return (
		<div className="flex h-full group w-full overflow-auto animate-in duration-300 ease-in-out relative">
			<div className="flex flex-col gap-5 px-4 pt-5 mx-auto w-full max-w-screen-xl h-full md:px-10 py-10">
				<ChatChatbotDetailsSkeleton />
				<Skeleton className="w-full h-10 mb-4" />
				<div className="flex w-full flex-col items-center justify-between mb-4 gap-6">
					<ThreadItemSkeleton />
					<ThreadItemSkeleton />
					<ThreadItemSkeleton />
					<ThreadItemSkeleton />
				</div>
			</div>
		</div>
	)
}

export function ChatPageSkeleton() {
	return (
		<div className="flex h-full">
			<div className="hidden lg:block w-[250px] xl:w-[300px] border-r">
				<SidebarSkeleton />
			</div>
			<div className="flex-1">
				<MainContentSkeleton />
			</div>
		</div>
	)
}
