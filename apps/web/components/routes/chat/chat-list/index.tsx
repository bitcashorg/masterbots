'use client'

import type { MessagePairsData } from '@/components/routes/chat/chat-list/message-pairs'
import {
	type FileAttachment,
	useFileAttachments,
} from '@/lib/hooks/use-chat-attachments'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import type { MessagePair } from '@/lib/threads'
import { cn, createMessagePairs } from '@/lib/utils'
import type { SendMessageFromResponseMessageData } from '@/types'
import { ThreadPopupContentSkeleton } from '@masterbots/mb-ui'
import type { Message } from 'ai'
import { isEqual } from 'lodash'
import type { Chatbot } from 'mb-genql'
import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from 'react'

const MessagePairs = dynamic(
	() =>
		import('@/components/routes/chat/chat-list/message-pairs').then(
			(mod) => mod.MessagePairs,
		),
	{
		ssr: false,
		loading: () => <ThreadPopupContentSkeleton />,
	},
)

export interface ChatList {
	messages?: Message[]
	chatbot?: Chatbot
	isThread?: boolean
	className?: string
	chatContentClass?: string
	chatTitleClass?: string
	chatArrowClass?: string
	containerRef?: React.RefObject<HTMLDivElement | null>
	isLoadingMessages?: boolean
	sendMessageFn?: (
		messageData: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => void
}

export function ChatList({
	className,
	messages,
	isThread = true,
	isLoadingMessages = false,
	chatContentClass,
	chatTitleClass,
	chatArrowClass,
	containerRef: externalContainerRef,
	sendMessageFn,
}: ChatList) {
	const { isNewResponse, activeThread } = useThread()
	const [
		{
			userData: { userAttachments },
		},
	] = useFileAttachments()
	const [pairs, setPairs] = React.useState<MessagePair[]>([])
	const [previousConversationPairs, setPreviousConversationPairs] =
		React.useState<MessagePair[]>([])
	const chatListRef = useRef<HTMLDivElement>(null)
	const messageContainerRef = useRef<HTMLDivElement>(null)

	//? Uses the external ref if provided, otherwise it uses our internal refs
	const effectiveContainerRef = externalContainerRef || chatListRef
	const effectiveThreadRef = messageContainerRef

	// ! Temporary fix for the chat messages... Must be related with the thread title:
	// ? Related Issue: The last question shows as Thread Title when it should be the first
	const chatMessages = messages || activeThread?.messages || []
	// .sort(
	// 	(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	// )
	const previousChatMessages = activeThread?.thread?.messages || []
	// .sort(
	// 	(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	// )

	const { isNearBottom } = useMBScroll({
		containerRef: effectiveContainerRef,
		threadRef: effectiveThreadRef,
		isNewContent: isNewResponse,
		hasMore: false,
		isLast: true,
		loading: isLoadingMessages,
		loadMore: () => {
			console.log('loading more!')
		},
	})

	useEffect(() => {
		if (chatMessages?.length) {
			const prePairs: MessagePair[] = createMessagePairs(
				chatMessages,
			) as MessagePair[]
			setPairs((prevPairs) => {
				if (!isEqual(prevPairs, prePairs)) {
					return prePairs
				}
				return prevPairs
			})
		}
	}, [chatMessages])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (previousChatMessages?.length) {
			const prePairs: MessagePair[] = createMessagePairs(
				previousChatMessages,
			) as MessagePair[]
			setPreviousConversationPairs((prevPairs) => {
				if (!isEqual(prevPairs, prePairs)) {
					return prePairs
				}
				return prevPairs
			})
		}
		if (
			!activeThread?.thread?.messages &&
			previousConversationPairs.length > 0
		) {
			setPreviousConversationPairs([])
		}
	}, [previousChatMessages, activeThread?.thread])

	if (chatMessages?.length === 0) return null

	const currentMessages: MessagePairsData['current'] = {
		userMessages: pairs.map((pair) => pair.userMessage),
		assistantMessages: pairs.flatMap((pair) => [pair.chatGptMessage]),
	}
	const previousMessages: MessagePairsData['previous'] = {
		userMessages: previousConversationPairs.map((pair) => pair.userMessage),
		assistantMessages: previousConversationPairs.flatMap((pair) => [
			pair.chatGptMessage,
		]),
	}

	const messagesData: MessagePairsData = {
		current: currentMessages,
		previous: previousMessages,
	}

	return (
		<div
			ref={effectiveContainerRef}
			className={cn('relative max-w-3xl px-2.5 mx-auto', className, {
				'flex flex-col gap-3': isThread,
			})}
		>
			<div ref={effectiveThreadRef} className="min-h-full">
				<MessagePairs
					messagesData={messagesData}
					isThread={isThread}
					chatTitleClass={chatTitleClass}
					chatArrowClass={chatArrowClass}
					chatContentClass={chatContentClass}
					sendMessageFn={sendMessageFn}
					userAttachments={userAttachments as FileAttachment[] | undefined}
				/>
			</div>
		</div>
	)
}
