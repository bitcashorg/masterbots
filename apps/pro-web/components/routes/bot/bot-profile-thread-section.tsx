'use client'

import BrowseChatbotDetails from '@/components/routes/browse/browse-chatbot-details'
import UserThreadPanel from '@/components/routes/thread/user-thread-panel'
import { OnboardingChatbotCard } from '@/components/shared/onboarding-chatbot-card'
import { useThread } from '@/lib/hooks/use-thread'
import type { Chatbot, Thread } from 'mb-genql'

export function BotProfileThreadSection({
	threads,
	count,
	chatbot,
}: {
	threads: Thread[]
	count: number
	chatbot: Chatbot | null
}) {
	const { isOpenPopup } = useThread()

	// Check if we have a selected chatbot (similar to chat flow)
	const isWelcomeView = !chatbot || !chatbot.name

	// Event handlers for mobile view
	const handleNewChat = () => {
		console.log('Starting new chat with:', chatbot?.name)
	}

	return (
		<div className="w-full">
			{/* Only show thread panel when a bot is selected */}
			{isWelcomeView ? (
				// Show onboarding card when no bot is selected (welcome view)
				<>
					<OnboardingChatbotCard isWelcomeView={true} />
				</>
			) : (
				// Show detailed bot view when a bot is selected
				<>
					<BrowseChatbotDetails
						chatbot={chatbot}
						variant={chatbot.name ? 'selected' : 'default'}
					/>
				</>
			)}
			{!isWelcomeView && (
				<div className="flex flex-col gap-5 px-4 pt-5 mx-auto w-full max-w-screen-xl h-full md:px-10">
					<UserThreadPanel
						threads={threads}
						count={count}
						showSearch
						page="bot"
					/>
				</div>
			)}
		</div>
	)
}
