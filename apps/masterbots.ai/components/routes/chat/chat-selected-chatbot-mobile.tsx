import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, getRouteType } from '@/lib/utils'
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

	return (
		<div
			className="md:hidden h-[calc(100vh-196px)] flex items-center justify-center -translate-y-8"
			data-route={routeType}
		>
			<Card className="w-full bg-white dark:bg-[#09090B]">
				<CardHeader>
					<div className="flex flex-col gap-4">
						<div className="flex items-start justify-between px-4 pt-2">
							<h1 className="text-xl font-bold text-zinc-950 dark:text-gray-300">
								{botName}
							</h1>
						</div>

						<div className="flex items-center px-4">
							<Bot className="mr-2 size-4" />
							<span className="text-sm">bio:</span>
						</div>

						<div className="relative">
							{/* Avatar container positioned absolutely */}
							<div className="absolute z-10 right-4 -top-8">
								<div
									className={cn(
										'size-16 rounded-full relative',
										'bg-zinc-200 dark:bg-black',
										'ring-4 selected-bot-avatar',
									)}
								>
									<Image
										src={avatar}
										alt={`${botName} avatar`}
										height={64}
										width={64}
										className="object-cover rounded-full"
									/>
								</div>
							</div>

							{/* Separator line */}
							<div className="h-[3px] bg-zinc-200 dark:bg-slate-800" />
						</div>

						<div className="flex items-start justify-between gap-4 p-6">
							<p className="flex-1 text-sm text-zinc-500 dark:text-zinc-500">
								{description}
							</p>
						</div>
					</div>
				</CardHeader>
				<CardFooter className="flex justify-center py-4">
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
