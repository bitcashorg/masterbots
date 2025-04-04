import { ChatMessage } from '@/components/routes/chat/chat-message'
import { ReasoningChatMessage } from '@/components/routes/chat/reasoning/reasoning-chat-message'
import { hasReasoning } from '@/lib/helpers/ai-helpers'

type MessageRendererProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	message: any
	actionRequired?: boolean
	sendMessageFromResponse?: (message: string) => void
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	chatbot?: any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	webSearchResults?: any[]
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
	//? Determine if the message has reasoning content
	const messageHasReasoning = hasReasoning(message)

	//? Render the appropriate component based on whether reasoning exists
	if (messageHasReasoning) {
		return (
			<ReasoningChatMessage
				message={message}
				actionRequired={actionRequired}
				sendMessageFromResponse={sendMessageFromResponse}
				chatbot={chatbot}
				webSearchResults={webSearchResults}
				{...props}
			/>
		)
	}

	//? Render the standard message component
	return (
		<ChatMessage
			message={message}
			actionRequired={actionRequired}
			sendMessageFromResponse={sendMessageFromResponse}
			chatbot={chatbot}
			webSearchResults={webSearchResults}
			{...props}
		/>
	)
}
