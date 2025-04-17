'use client'

import BrowseChatbotDetails from '@/components/routes/browse/browse-chatbot-details'
import UserThreadPanel from '@/components/routes/thread/user-thread-panel'
import { useThread } from '@/lib/hooks/use-thread'
import type { Chatbot, Thread } from 'mb-genql'

export function BotProfileThreadSection({
	threads,
	count,
	chatbot,
}: {
	threads: Thread[]
	count: number
	chatbot: Chatbot
}) {
	const { isOpenPopup } = useThread()
	return (
		<div className="w-full">
			{chatbot ? (
				<BrowseChatbotDetails
					chatbot={chatbot}
					variant={chatbot.name ? 'selected' : 'default'}
				/>
			) : (
				''
			)}
			<div className="flex flex-col w-full max-w-screen-xl gap-10 px-4 pt-5 mx-auto h-full md:px-10">
				<UserThreadPanel
					threads={threads}
					count={count}
					showSearch
					page="profile"
				/>
			</div>
		</div>
	)
}
