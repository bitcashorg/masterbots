'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, getRouteType } from '@/lib/utils'
import type { ChatbotDetailsProps } from '@/types/types'
import { ArrowBigLeft, Bot } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function OnboardingChatbotCard({
	isWelcomeView = true,
}: ChatbotDetailsProps) {
	const routeType = getRouteType(usePathname())
	const { activeChatbot } = useSidebar()
	const { randomChatbot } = useThread()

	const botName = activeChatbot?.name || randomChatbot?.name
	const avatar = activeChatbot?.avatar || randomChatbot?.avatar || ''
	const description = activeChatbot?.description || randomChatbot?.description

	// Background image class
	const bgImage = 'bg-[url(/background-light.webp)] dark:bg-[url(/background.webp)]'

	return (
		<div
			className="mt-10 hidden h-[calc(50vh-196px)] md:flex items-center justify-center -translate-y-8 relative"
			data-route={routeType}
		>
			<Card className="max-w-screen-lg min-w-[320px] bg-white dark:bg-[#09090B] relative z-10 overflow-hidden rounded-2xl">
				{/* Background image layer */}
				<div
					className={`absolute inset-0 bg-center bg-cover opacity-20 ${bgImage}`}
				/>

				{/* Content layer */}
				<div className="relative z-20">
					<CardHeader className="space-y-3">
						<h1 className="px-4 pt-4 text-2xl font-bold text-zinc-950 dark:text-white">
							{isWelcomeView ? 'Welcome to Masterbots!' : botName}
						</h1>
						<div className="h-[3px] bg-zinc-300 dark:bg-slate-800 relative">
							<div className="absolute right-6 -top-12">
								<div
									className={cn(
										'relative rounded-full size-32',
										'bg-white dark:bg-black',
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

					<CardContent className="space-y-1">
						<p className="pt-2.5 max-w-[calc(100%-160px)] text-base text-black dark:text-white min-h-24">
							{isWelcomeView
								? 'Here you can create new threads and share them to your network! Navigate with the sidebar and pick any bot of your interest.'
								: description}
						</p>

						{isWelcomeView && (
							<div className="flex flex-col justify-start items-start space-y-1">
								<h2 className="flex items-center text-base font-medium selected-bot-text">
									<ArrowBigLeft className="mr-2 size-6 selected-bot-icon" />
									Go to sidebar and select one bot
								</h2>
							</div>
						)}
					</CardContent>
				</div>
			</Card>
		</div>
	)
}
