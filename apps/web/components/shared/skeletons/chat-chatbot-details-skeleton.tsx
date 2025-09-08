import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ChatChatbotDetailsSkeleton() {
	// Background image class
	const bgImage = 'bg-[url(/background.webp)] dark:bg-[url(/background.webp)]'
	return (
		<div className="mt-10 h-[calc(50vh-196px)] md:flex items-center justify-center -translate-y-8 relative">
			<Card className="w-[600px] relative bg-white dark:bg-[#09090B] relative z-10">
				{/* Background image layer */}
				<div
					className={`absolute inset-0 bg-center bg-cover opacity-20 ${bgImage}`}
				/>
				<CardHeader className="space-y-3 px-4 pt-4">
					<Skeleton className="w-48 h-8" />
				</CardHeader>

				{/* Separator Line with Avatar */}
				<div className="h-[3px] bg-zinc-200 dark:bg-slate-800 mt-6 relative">
					<div className="absolute right-4 -top-10 md:right-6 md:-top-12 rounded-full bg-background">
						<Skeleton className="rounded-full size-20 md:size-32" />
					</div>
				</div>

				{/* Description */}
				<CardContent className="px-4 space-y-6">
					<Skeleton className="h-24 w-[calc(100%-160px)]" />
				</CardContent>

				{/* Card Content */}
				<CardFooter className="flex flex-col px-4 space-y-4">
					<Skeleton className="w-48 h-8 mr-auto mb-2" />
				</CardFooter>
			</Card>
		</div>
	)
}
