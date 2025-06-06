/* eslint-disable no-unused-vars */
import { ReasoningChatMessage } from '@/components/routes/chat/reasoning/reasoning-chat-message'
import { ChatMessagePro } from '@/components/routes/pro/chat-message-pro'
import { hasReasoning } from '@/lib/helpers/ai-helpers'
import type { SendMessageFromResponseMessageData } from '@/types/types'

type MessageRendererProProps = {
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
	// Function to handle converting a message to a document
	onConvertToDocument?: (messageId: string) => void
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any
}

export function MessageRendererPro({
	message,
	actionRequired = true,
	sendMessageFromResponse,
	chatbot,
	webSearchResults = [],
	onConvertToDocument,
	...props
}: MessageRendererProProps) {
	//? Determine if the message has reasoning content
	const messageHasReasoning = hasReasoning(message)

	//? Render the appropriate component based on whether reasoning exists
	if (messageHasReasoning) {
		// We could create a pro version of ReasoningChatMessage too, but for now
		// we'll just use the regular one as it's less common
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

	//? Render the pro message component
	return (
		<ChatMessagePro
			message={message}
			actionRequired={actionRequired}
			sendMessageFromResponse={sendMessageFromResponse}
			chatbot={chatbot}
			webSearchResults={webSearchResults}
			onConvertToDocument={onConvertToDocument}
			{...props}
		/>
	)
}
