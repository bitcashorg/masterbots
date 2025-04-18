import { ChatLoadingState } from '@/components/routes/chat/chat-list/chat-loading-state'
import { MessagePairAccordion } from '@/components/routes/chat/chat-list/message-pair-accordion'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useThread } from '@/lib/hooks/use-thread'
import type { MessagePair } from '@/lib/threads'
import type { SendMessageFromResponseMessageData } from '@/types/types'
import { Separator } from '@radix-ui/react-dropdown-menu'
import type { Chatbot } from 'mb-genql'
import { Fragment, useMemo } from 'react'

export type MessagePairsData = {
	current: {
		userMessages: MessagePair['userMessage'][]
		assistantMessages: MessagePair['chatGptMessage'][]
	}
	previous: {
		userMessages: MessagePair['userMessage'][]
		assistantMessages: MessagePair['chatGptMessage'][]
	}
}

export function MessagePairs({
	messagesData,
	isThread,
	chatTitleClass,
	chatArrowClass,
	chatContentClass,
	userAttachments,
	sendMessageFn,
}: {
	isThread: boolean
	messagesData: MessagePairsData
	userAttachments: FileAttachment[]
	chatbot?: Chatbot
	chatTitleClass?: string
	chatArrowClass?: string
	chatContentClass?: string
	isBrowseView?: boolean
	sendMessageFn?: (
		messageData: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => void
}) {
	const { isNewResponse } = useThread()

	// Memoize previous pairs processing
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const previousPairsElements = useMemo(() => {
		const { userMessages, assistantMessages } = messagesData.previous

		return userMessages.map((userMessage, index) => {
			const chatGptMessage = assistantMessages[index] || []
			const pair = { userMessage, chatGptMessage }

			const filteredUserAttachments =
				userAttachments?.filter((attachment) =>
					(attachment as FileAttachment).messageIds?.includes(userMessage.id),
				) || []

			return (
				<MessagePairAccordion
					key={`${userMessage.createdAt}-${chatGptMessage[0]?.id ?? 'pending'}`}
					pair={pair}
					isThread={isThread}
					index={index}
					arrayLength={userMessages.length}
					isNewResponse={isNewResponse}
					type="previous"
					sendMessageFn={sendMessageFn}
					chatTitleClass={chatTitleClass}
					userAttachments={filteredUserAttachments}
					chatContentClass={chatContentClass}
				/>
			)
		})
	}, [
		messagesData.previous,
		userAttachments,
		isThread,
		isNewResponse,
		chatTitleClass,
		chatContentClass,
	])

	// Memoize current pairs processing
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const currentPairsElements = useMemo(() => {
		const { userMessages, assistantMessages } = messagesData.current

		return userMessages
			.map((userMessage, index) => {
				const chatGptMessage = assistantMessages[index] || []
				const pair = { userMessage, chatGptMessage }

				if (!chatGptMessage[0] || !userMessage) return null

				const filteredUserAttachments =
					userAttachments?.filter((attachment) =>
						(attachment as FileAttachment).messageIds?.includes(userMessage.id),
					) || []

				return (
					<Fragment
						key={`${userMessage.createdAt}-${chatGptMessage[0]?.id ?? 'pending'}`}
					>
						<MessagePairAccordion
							pair={pair}
							isThread={isThread}
							index={index}
							arrayLength={userMessages.length}
							isNewResponse={isNewResponse}
							type="current"
							chatTitleClass={chatTitleClass}
							chatContentClass={chatContentClass}
							sendMessageFn={sendMessageFn}
							userAttachments={filteredUserAttachments}
						/>
						{userMessages.length > 1 && index === userMessages.length - 1 ? (
							<ChatLoadingState key="chat-loading-state" />
						) : null}
					</Fragment>
				)
			})
			.filter(Boolean)
	}, [
		messagesData.current,
		userAttachments,
		isThread,
		isNewResponse,
		chatTitleClass,
		chatContentClass,
	])

	const showSeparator =
		messagesData.previous.userMessages.length > 0 &&
		messagesData.current.userMessages.length > 0

	return (
		<>
			{previousPairsElements}
			{showSeparator && (
				<Separator className="relative my-6 h-0.5 z-[2] rounded-sm bg-iron dark:bg-mirage" />
			)}
			{currentPairsElements}
		</>
	)
}
