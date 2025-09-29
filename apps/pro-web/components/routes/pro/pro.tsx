'use client'

import { Chat } from '@/components/routes/chat/chat'
import { ChatPanelPro } from '@/components/routes/pro/chat-panel-pro'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import type { ChatProps } from '@/types'
import { AnimatePresence } from 'framer-motion'
import type { Chatbot } from 'mb-genql'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export interface ProComponentProps extends ChatProps {
	isPro?: boolean
	showChatPanel?: boolean
}

export function Pro({
	chatbot: chatbotProps,
	className,
	chatPanelClassName,
	isPopup,
	scrollToBottomOfPopup,
	isAtBottom: isAtBottomOfPopup,
	isPro = true,
	showChatPanel = true,
}: ProComponentProps) {
	const {
		activeThread,
		loadingState,
		isOpenPopup,
		sectionRef,
		isAtBottomOfSection,
		setActiveThread,
		setIsOpenPopup,
		setLoadingState,
	} = useThread()

	const { activeChatbot } = useSidebar()
	const { isContinuousThread } = useThreadVisibility()
	const containerRef = React.useRef<HTMLDivElement>(null)
	const threadRef = React.useRef<HTMLDivElement>(null)
	const params = useParams<{ chatbot: string; threadId: string }>()
	const chatbot =
		chatbotProps || activeThread?.chatbot || (activeChatbot as Chatbot)

	const [
		{ newChatThreadId: threadId, input, isLoading, allMessages, isNewChat },
		{
			appendWithMbContextPrompts,
			appendAsContinuousThread,
			reload,
			setInput,
			stop,
		},
	] = useMBChat()

	const pathname = usePathname()
	const prevPathname = React.useRef(pathname)
	const { isNearBottom, smoothScrollToBottom, scrollToTop } = useMBScroll({
		containerRef,
		threadRef,
		isNewContent: isLoading,
		hasMore: false,
		isLast: true,
		loading: isLoading,
		loadMore: () => {},
	})

	// Debounced scroll to bottom
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let timeoutId: any
	const debounceScrollToBottom = (element: HTMLElement | null) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			if (element) {
				smoothScrollToBottom()
			}
			clearTimeout(timeoutId)
		}, 150)
	}

	const scrollToBottom = () => {
		console.log('Scrolling to bottom')
		if (containerRef.current || sectionRef.current) {
			const element: HTMLElement | null =
				sectionRef.current ?? containerRef.current
			debounceScrollToBottom(element)
		}
	}

	const chatSearchMessage = (
		isNewChat: boolean,
		isContinuousThread: boolean,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		allMessages: any[],
	) => {
		const threadTitle = allMessages.filter((m) => m.role === 'user')[0]?.content
		if (isContinuousThread && allMessages) {
			return 'Continue this thread here'
		}
		if (isNewChat) {
			return `Start New Chat with ${chatbot.name}`
		}

		return `Continue This Chat with ${chatbot.name}`
	}

	const resetState = () => {
		setIsOpenPopup(false)
		setActiveThread(null)
	}

	const resetLoadState = () => {
		setLoadingState(undefined)
	}

	// Reset state when pathname changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (prevPathname.current !== pathname) {
			prevPathname.current = pathname
			resetState()
		}
	}, [pathname])

	// Reset load state when loading finishes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!isLoading && loadingState) {
			resetLoadState()
		}
	}, [isLoading])

	// If not Pro, fallback to regular Chat component
	if (!isPro) {
		return (
			<Chat
				{...{
					chatbot: chatbotProps,
					className,
					chatPanelClassName,
					isPopup,
					scrollToBottomOfPopup,
					isAtBottom: isAtBottomOfPopup,
				}}
			/>
		)
	}

	// Handler for converting messages to documents - we'll add this functionality
	// directly in the Pro component even though we can't hook into the MessageRenderer
	const handleConvertToDocument = (messageId: string) => {
		// This function will be available in ChatPanelPro but can only be triggered
		// by UI elements we control directly, like buttons we add to the panel
		// For now, we can expose it as a feature the user accesses through the Pro panel
		console.log('Convert message to document:', messageId)
		// In a real implementation, we would convert the message to a document here
	}

	return (
		<AnimatePresence>
			{!showChatPanel && !activeThread ? null : (
				<ChatPanelPro
					className={`${activeThread || activeChatbot ? '' : 'hidden'} ${chatPanelClassName}`}
					scrollToBottom={
						isOpenPopup && isPopup && scrollToBottomOfPopup
							? scrollToBottomOfPopup
							: scrollToBottom
					}
					id={params.threadId || isNewChat ? threadId : activeThread?.threadId}
					isLoading={isLoading}
					stop={stop}
					append={
						isContinuousThread
							? appendAsContinuousThread
							: appendWithMbContextPrompts
					}
					reload={reload}
					messages={allMessages}
					input={input}
					setInput={setInput}
					chatbot={chatbot}
					placeholder={
						chatbot
							? chatSearchMessage(isNewChat, isContinuousThread, allMessages)
							: ''
					}
					showReload={!isNewChat}
					isAtBottom={
						params.threadId
							? isNearBottom
							: isPopup
								? Boolean(isAtBottomOfPopup)
								: isAtBottomOfSection
					}
					onConvertToDocument={handleConvertToDocument}
				/>
			)}
		</AnimatePresence>
	)
}
