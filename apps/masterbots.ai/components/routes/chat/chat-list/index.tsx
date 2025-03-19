'use client'

import {
	MessagePairs,
	type MessagePairsData,
} from '@/components/routes/chat/chat-list/message-pairs'
import {
	type FileAttachment,
	getUserIndexedDBKeys,
} from '@/lib/hooks/use-chat-attachments'
import { useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import type { MessagePair } from '@/lib/threads'
import { cn, createMessagePairs } from '@/lib/utils'
import type { Message } from 'ai'
import { isEqual } from 'lodash'
import type { Chatbot } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'
import { useAsyncFn } from 'react-use'

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
	sendMessageFn?: (message: string) => void
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
	const { data: session } = useSession()
	const indexedDBKeys = getUserIndexedDBKeys(session?.user?.id)
	const { getAllItems } = useIndexedDB(indexedDBKeys)
	const [userAttachments, setUserAttachments] = React.useState<
		FileAttachment[]
	>([])
	const { isNewResponse, activeThread, setActiveThread, setIsOpenPopup } =
		useThread()
	const [_, getUserAttachments] = useAsyncFn(async () => {
		const attachments = await getAllItems()
		setUserAttachments(attachments as FileAttachment[])

		return attachments
	}, [session, messages])
	const [pairs, setPairs] = React.useState<MessagePair[]>([])
	const [previousConversationPairs, setPreviousConversationPairs] =
		React.useState<MessagePair[]>([])
	const chatListRef = useRef<HTMLDivElement>(null)
	const messageContainerRef = useRef<HTMLDivElement>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (session) {
			getUserAttachments()
		}
	}, [session, activeThread])

	//? Uses the external ref if provided, otherwise it uses our internal refs
	const effectiveContainerRef = externalContainerRef || chatListRef
	const effectiveThreadRef = messageContainerRef

	const chatMessages = (messages || activeThread?.messages || []).sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	)
	const previousChatMessages = (activeThread?.thread?.messages || []).sort(
		(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	)

	const { isNearBottom } = useMBScroll({
		containerRef: effectiveContainerRef,
		threadRef: effectiveThreadRef,
		isNewContent: isNewResponse,
		hasMore: false,
		isLast: true,
		loading: isLoadingMessages,
		loadMore: () => {},
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
		if (!activeThread?.thread && previousConversationPairs.length > 0) {
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
			className={cn('relative max-w-3xl px-4 mx-auto', className, {
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
					userAttachments={userAttachments as FileAttachment[]}
				/>
			</div>
		</div>
	)
}
