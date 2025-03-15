import { ChatMessage } from '@/components/routes/chat/chat-message'
import { ReasoningChatMessage } from '@/components/routes/chat/reasoning/reasoning-chat-message'

type MessageRendererProps = {
	message: any
	actionRequired?: boolean
	sendMessageFromResponse?: (message: string) => void
	chatbot?: any
	webSearchResults?: any[]
	[key: string]: any
}

//? Helper function to check if a message has reasoning
function hasReasoning(message: any): boolean {
	return Boolean(
		message.reasoning ||
			message.parts?.some((part: any) => part.type === 'reasoning'),
	)
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
