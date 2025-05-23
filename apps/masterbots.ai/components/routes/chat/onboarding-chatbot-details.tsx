'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, getRouteType } from '@/lib/utils'
import type { ChatbotDetailsProps } from '@/types/types'
import { ArrowBigDown, ArrowBigLeft, Bot } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function OnboardingChatbotDetails({
	isWelcomeView = true,
	followers,
}: ChatbotDetailsProps) {
	const routeType = getRouteType(usePathname())
	const { activeChatbot } = useSidebar()
	const { randomChatbot } = useThread()

	const botName = activeChatbot?.name || randomChatbot?.name
	const avatar = activeChatbot?.avatar || randomChatbot?.avatar || ''
	const description = activeChatbot?.description || randomChatbot?.description

	return (
		<div
			className="hidden h-[calc(100vh-196px)] md:flex items-center justify-center -translate-y-8 relative"
			data-route={routeType}
		>
			<Card className="w-[600px] bg-white dark:bg-[#09090B] relative z-10">
				<CardHeader className="space-y-3">
					<h1 className="px-4 pt-4 text-2xl font-bold text-zinc-950 dark:text-gray-300">
						{isWelcomeView ? 'Welcome to Masterbots!' : botName}
					</h1>
					{!isWelcomeView && (
						<div className="flex items-center px-4">
							<Bot className="mr-2 size-4" />
							<span className="text-sm">bio:</span>
						</div>
					)}
					<div className="h-[3px] bg-zinc-200 dark:bg-slate-800 relative">
						<div className="absolute right-6 -top-12">
							<div
								className={cn(
									'size-32 rounded-full relative',
									'bg-zinc-200 dark:bg-black',
									'ring-4 selected-bot-avatar', // Using the route-based ring color
								)}
							>
								<Image
									src={avatar}
									alt={`${botName} avatar`}
									height={128}
									width={128}
									className="object-cover rounded-full"
								/>
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className="space-y-6">
					<p className="pt-2.5 max-w-[calc(100%-160px)] text-base text-zinc-500 dark:text-zinc-500 min-h-24">
						{isWelcomeView
							? 'Here you can create new threads and share them to your network! Navigate with the sidebar and pick any bot of your interest.'
							: description}
					</p>

					{isWelcomeView && (
						<div className="flex flex-col items-center justify-center space-y-4">
							<h2 className="flex items-center text-2xl font-semibold selected-bot-text">
								<ArrowBigLeft className="mr-2 size-6 selected-bot-icon" />
								Go To Sidebar And Select One Bot
							</h2>
						</div>
					)}
				</CardContent>

				{!isWelcomeView && (
					<CardFooter className="flex flex-col space-y-4">
						<div className="w-1/2 mx-auto">
							<div className="flex flex-col items-center justify-center space-y-4">
								<h2 className="flex items-center text-2xl font-semibold selected-bot-text">
									<ArrowBigDown className="mr-2 size-6 selected-bot-icon" />
									Start Chatting Below
								</h2>
							</div>
						</div>
					</CardFooter>
				)}
			</Card>
		</div>
	)
}
