import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { MessagePair } from '@/lib/threads'
import type { SendMessageFromResponseMessageData } from '@/types/types'
import { Fragment } from 'react'

import { MessagePairAccordionPro } from './message-pair-accordion-pro'

export function MessagePairsPro({
	messagePairs,
	isThread,
	currentMessagePairs,
	previousMessagePairs,
	isNewResponse,
	userAttachments,
	onConvertToDocument,
	...props
}: {
	messagePairs: MessagePair[]
	isThread: boolean
	currentMessagePairs: MessagePair[]
	previousMessagePairs: MessagePair[]
	isNewResponse: boolean
	userAttachments: FileAttachment[]
	onConvertToDocument?: (messageId: string) => void
	sendMessageFn?: (
		messageData: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => void
}) {
	return (
		<>
			{/* Previous Messages */}
			{previousMessagePairs.length > 0 && (
				<Fragment>
					{previousMessagePairs.map((pair, index) => (
						<MessagePairAccordionPro
							key={pair.userMessage.id}
							pair={pair}
							isThread={isThread}
							index={index}
							arrayLength={previousMessagePairs.length}
							isNewResponse={isNewResponse}
							type="previous"
							userAttachments={userAttachments}
							onConvertToDocument={onConvertToDocument}
							sendMessageFn={props.sendMessageFn}
						/>
					))}
				</Fragment>
			)}

			{/* Current Messages */}
			{currentMessagePairs.map((pair, index) => (
				<MessagePairAccordionPro
					key={pair.userMessage.id}
					pair={pair}
					isThread={isThread}
					index={index}
					arrayLength={currentMessagePairs.length}
					isNewResponse={isNewResponse}
					type="current"
					userAttachments={userAttachments}
					onConvertToDocument={onConvertToDocument}
					sendMessageFn={props.sendMessageFn}
				/>
			))}
		</>
	)
}
