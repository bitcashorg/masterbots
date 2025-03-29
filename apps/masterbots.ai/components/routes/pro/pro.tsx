'use client'

import { Chat } from '@/components/routes/chat/chat'
import { ChatPanel } from '@/components/routes/chat/chat-panel'
import { WorkspacePanel } from '@/components/routes/workspace/workspace-panel'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import type { ChatProps } from '@/types/types'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'
import { useParams, usePathname } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'

export interface ProComponentProps extends ChatProps {
	isPro?: boolean
}

export function Pro({
	chatbot: chatbotProps,
	className,
	chatPanelClassName,
	isPopup,
	scrollToBottomOfPopup,
	isAtBottom: isAtBottomOfPopup,
	isPro = true,
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

	const {
		isWorkspaceActive,
		setIsWorkspaceActive,
		toggleWorkspace,
		activeProject,
		activeDocument,
		documentContent,
		createDocumentFromMessage,
	} = useWorkspace()

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

	const handleCreateDocument = useCallback(
		(message: Message) => {
			// Use the enhanced document creation function from context
			// This handles setting the project, active document, and activating workspace mode
			if (message && message.content) {
				createDocumentFromMessage(message.content)
			}
		},
		[createDocumentFromMessage],
	)

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

	// This is the solution: use distinct rendering rather than fragments
	// By returning directly we avoid multiple renders
	if (isWorkspaceActive) {
		return (
			<WorkspacePanel
				className={`${activeThread || activeChatbot ? '' : 'hidden'} ${chatPanelClassName}`}
				scrollToBottom={
					isOpenPopup && isPopup && scrollToBottomOfPopup
						? scrollToBottomOfPopup
						: scrollToBottom
				}
				id={params.threadId || isNewChat ? threadId : activeThread?.threadId}
				title={activeThread?.messages[0]?.content || ''}
				chatbot={chatbot}
				isAtBottom={
					params.threadId
						? isNearBottom
						: isPopup
							? Boolean(isAtBottomOfPopup)
							: isAtBottomOfSection
				}
				isLoading={isLoading}
				isPro={isPro}
				stop={stop}
				append={
					isContinuousThread
						? appendAsContinuousThread
						: appendWithMbContextPrompts
				}
				reload={reload}
				messages={allMessages.map((msg) => ({
					...msg,
					onCreateDocument:
						msg.role === 'assistant' ? handleCreateDocument : undefined,
				}))}
				input={input}
				setInput={setInput}
				placeholder={
					chatbot
						? chatSearchMessage(isNewChat, isContinuousThread, allMessages)
						: ''
				}
				showReload={!isNewChat}
				onCreateDocument={async () => {
					if (activeThread && allMessages.length > 0) {
						// Find the latest assistant message, if any
						const lastAssistantMessage = [...allMessages]
							.reverse()
							.find((m) => m.role === 'assistant')

						if (lastAssistantMessage) {
							handleCreateDocument(lastAssistantMessage)
						}
					}
				}}
				onSelectTemplate={async (templateId) => {
					console.log(`Selected template: ${templateId}`)
				}}
				onToggleWorkspace={toggleWorkspace}
			/>
		)
	} else {
		return (
			<ChatPanel
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
				messages={allMessages.map((msg) => ({
					...msg,
					onCreateDocument:
						msg.role === 'assistant' ? handleCreateDocument : undefined,
				}))}
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
				onToggleWorkspace={toggleWorkspace}
			/>
		)
	}
}
