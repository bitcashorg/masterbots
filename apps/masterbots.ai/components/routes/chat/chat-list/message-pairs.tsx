import { ChatLoadingState } from '@/components/routes/chat/chat-list/chat-loading-state'
import { MessagePairAccordion } from '@/components/routes/chat/chat-list/message-pair-accordion'
import {
	CONTINUE_GENERATION_PROMPT,
	CONTINUE_GENERATION_PROMPT_2,
} from '@/lib/constants/prompts'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useOptimisticChat } from '@/lib/hooks/use-optimistic-chat'
import { useThread } from '@/lib/hooks/use-thread'
import type { MessagePair } from '@/lib/threads'
import type { SendMessageFromResponseMessageData } from '@/types/types'
import { Separator } from '@radix-ui/react-dropdown-menu'
import type { Message as AiMessage } from 'ai'
import type { Chatbot, Message } from 'mb-genql'
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
	userAttachments?: FileAttachment[]
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
	const { isNewResponse, activeThread } = useThread()
	const [optimisticState, optimisticActions] = useOptimisticChat()

	// @AndlerRL
	// ! Previous and Current messages mapping are the same. The only difference is the type of message (previous or current)
	// ! This is a temporary solution until we can refactor the code to use a single mapping function
	// ? Whenever we get more 💰💰💰

	// Memoize previous pairs processing
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const previousPairsElements = useMemo(() => {
		const { userMessages, assistantMessages } = messagesData.previous

		return userMessages?.map((userMessage, index) => {
			const chatGptMessage = assistantMessages[index] || []
			const pair = { userMessage, chatGptMessage }

			if (
				userMessage.content.includes(CONTINUE_GENERATION_PROMPT) ||
				userMessage.content.includes(CONTINUE_GENERATION_PROMPT_2)
			) {
				userMessage.content = '(continued...)'
			}

			const filteredUserAttachments =
				(userAttachments?.length
					? userAttachments
					: (activeThread?.metadata?.attachments as FileAttachment[])
				)?.filter((attachment) =>
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

		// Merge optimistic messages into userMessages array
		const allUserMessages = [...userMessages]

		if (optimisticState.optimisticMessages?.length > 0) {
			for (const optimisticMessage of optimisticState.optimisticMessages) {
				// Only add if not already in the userMessages array
				const existsInUserMessages = allUserMessages.some(
					(message) =>
						message.messageId === optimisticMessage.messageId ||
						message.id === optimisticMessage.id,
				)

				if (!existsInUserMessages) {
					console.log(
						'MessagePairs: Adding optimistic message:',
						optimisticMessage,
					)
					allUserMessages.push(optimisticMessage as AiMessage & Message)
				}
			}

			// Sort by creation time to maintain chronological order
			allUserMessages.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			)
		}

		return allUserMessages
			.map((userMessage, index) => {
				const chatGptMessage = assistantMessages[index] || []
				const pair = { userMessage, chatGptMessage }

				if (
					userMessage.content.includes(CONTINUE_GENERATION_PROMPT) ||
					userMessage.content.includes(CONTINUE_GENERATION_PROMPT_2)
				) {
					userMessage.content = '(continued...)'
				}

				// Don't filter out optimistic messages - they can exist without assistant responses
				if (!userMessage) return null

				console.log('MessagePairs: Rendering message pair:', {
					userMessageId: userMessage.id,
					hasAssistantResponse: chatGptMessage.length > 0,
					isOptimistic: optimisticState.optimisticMessages?.some(
						(m) =>
							m.id === userMessage.id || m.messageId === userMessage.messageId,
					),
				})

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
							arrayLength={allUserMessages.length}
							isNewResponse={isNewResponse}
							type="current"
							chatTitleClass={chatTitleClass}
							chatContentClass={chatContentClass}
							sendMessageFn={sendMessageFn}
							userAttachments={filteredUserAttachments}
						/>
						{allUserMessages.length > 1 &&
						index === allUserMessages.length - 1 ? (
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
		optimisticState,
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
