import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { cn, getRouteType } from '@/lib/utils'
import { MemoizedReactMarkdown } from '@masterbots/mb-ui'
import { Card, CardContent, CardFooter, CardHeader } from '@masterbots/mb-ui'
import { ArrowBigDown, Bot } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface SelectedBotMobileViewProps {
	onNewChat: () => void
}

export function SelectedBotMobileView({
	onNewChat,
}: SelectedBotMobileViewProps) {
	const pathname = usePathname()
	const routeType = getRouteType(pathname)
	const { activeChatbot } = useSidebar()
	const { randomChatbot } = useThread()

	const botName = activeChatbot?.name || randomChatbot?.name
	const avatar = activeChatbot?.avatar || randomChatbot?.avatar || ''
	const description = activeChatbot?.description || randomChatbot?.description
	// Background image class
	const bgImage = 'bg-[url(/background.webp)] dark:bg-[url(/background.webp)]'
	return (
		<div
			className="md:hidden mt-24 h-[calc(50vh-196px)] flex items-center justify-center -translate-y-8"
			data-route={routeType}
		>
			<Card className="relative w-full bg-white dark:bg-[#09090B]">
				{/* Background image layer */}
				<div
					className={`absolute inset-0 bg-center bg-cover opacity-20 ${bgImage}`}
				/>
				<CardHeader>
					<div className="flex flex-col gap-4">
						<div className="flex items-start justify-between px-4 pt-2">
							<h1 className="text-xl font-bold text-zinc-950 dark:text-gray-300">
								{botName}
							</h1>
						</div>

						<div className="relative">
							{/* Avatar container positioned absolutely */}
							<div className="absolute z-10 right-4 -top-10">
								<div
									className={cn(
										'size-16 rounded-full relative',
										'bg-zinc-200 dark:bg-black',
										'ring-4 selected-bot-avatar',
									)}
								>
									{avatar && (
										<Image
											src={avatar}
											alt={`${botName} avatar`}
											height={128}
											width={128}
											className="object-cover rounded-full"
										/>
									)}
								</div>
							</div>

							{/* Separator line */}
							<div className="h-[3px] bg-zinc-200 dark:bg-slate-800" />
						</div>
					</div>
				</CardHeader>

				<CardContent className="px-4 space-y-1">
					<MemoizedReactMarkdown
						className="pt-6 text-base text-black dark:text-white min-h-24 onboarding-chatbot-card__content"
						components={memoizedMarkdownComponents()}
					>
						{description}
					</MemoizedReactMarkdown>
				</CardContent>

				<CardFooter className="flex justify-center py-4 selected-bot__footer">
					<h2 className="flex items-center text-lg font-semibold selected-bot-text">
						<ArrowBigDown className="mr-2 size-6 selected-bot-icon" />
						Start Chatting Below
					</h2>
				</CardFooter>
			</Card>
		</div>
	)
}

export default SelectedBotMobileView
