/* eslint-disable no-unused-vars */
import { ChatMessage } from '@/components/routes/chat/chat-message'
import { ReasoningChatMessage } from '@/components/routes/chat/reasoning/reasoning-chat-message'
import { ImageMessageComponent } from '@/components/shared/image-message'
import { hasReasoning } from '@/lib/helpers/ai-helpers'
import { isImageMessage } from '@/types/types'
import type { SendMessageFromResponseMessageData } from '@/types/types'

type MessageRendererProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	message: any
	actionRequired?: boolean
	sendMessageFromResponse?: (
		messageData: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => void
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

	//? Check if the message is an image message
	if (isImageMessage(message)) {
		return (
			<ImageMessageComponent
				message={message}
				actionRequired={actionRequired}
				{...props}
			/>
		)
	}

	//? Render the appropriate component based on whether reasoning exists
	if (messageHasReasoning) {
		return (
			<ReasoningChatMessage
				message={message}
				actionRequired={actionRequired}
				sendMessageFromResponse={sendMessageFromResponse}
				chatbot={chatbot}
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
