import { ChatMessage } from '@/components/routes/chat/chat-message'
import { ReasoningChatMessage } from '@/components/routes/chat/reasoning/reasoning-chat-message'
import { hasReasoning } from '@/lib/helpers/ai-helpers'
import { Loader2 } from 'lucide-react'

type MessageRendererProps = {
	message: any
	actionRequired?: boolean
	sendMessageFromResponse?: (message: string) => void
	chatbot?: any
	webSearchResults?: any[]
	[key: string]: any
}

export function MessageRenderer({
	message,
	actionRequired = true,
	sendMessageFromResponse,
	chatbot,
	webSearchResults = [],
	...props
}: MessageRendererProps) {
	const messageHasReasoning = hasReasoning(message)

	//? Shared props of both components
	const commonProps = {
		message,
		actionRequired: message.isContinuing ? false : actionRequired, //! Actions are disabled while continuing
		sendMessageFromResponse,
		chatbot,
		webSearchResults,
		...props,
	}

	//? Show a loading state when the message is continuing
	if (message.isContinuing) {
		return (
			<div className="flex flex-col space-y-2">
				{messageHasReasoning ? (
					<ReasoningChatMessage {...commonProps} />
				) : (
					<ChatMessage {...commonProps} />
				)}
				<div className="flex items-center pl-10 mt-2 space-x-2 text-sm text-gray-500 animate-pulse">
					<Loader2 className="w-4 h-4 animate-spin" />
					<span>Completing message content...</span>
				</div>
			</div>
		)
	}

	//? Render standard message components
	if (messageHasReasoning) {
		return <ReasoningChatMessage {...commonProps} />
	}

	return <ChatMessage {...commonProps} />
}
