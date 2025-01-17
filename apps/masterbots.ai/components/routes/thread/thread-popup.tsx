'use client'

/**
 * ThreadPopup Component
 *
 * A popup component that displays the active chat thread in a modal-like interface.
 * It integrates chat functionality and provides a user-friendly way to interact
 * with threads associated with a specific chatbot.
 *
 * Key Features:
 * - Displays the thread title and subheading
 * - Contains a close button to exit the popup
 * - Shows the chat history and allows sending messages
 * - Supports scrolling to the bottom of the chat when new messages arrive
 * - Includes a publicity switch for thread visibility settings
 *
 * Functionality:
 * - Manages the visibility of the popup based on user interaction
 * - Automatically scrolls to the bottom when new messages are loaded
 * - Displays a list of messages in the active thread
 *
 * Props:
 * - className: Optional string for additional styling
 */

import { Chat } from '@/components/routes/chat/chat'
import { ChatList } from '@/components/routes/chat/chat-list'
import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, scrollToBottomOfElement } from '@/lib/utils'
import type { Message as AiMessage } from 'ai'
import { useScroll } from 'framer-motion'
import type { Chatbot } from 'mb-genql'
import { useEffect, useRef } from 'react'
import { ThreadPublicitySwitch } from './thread-publicity-switch'

export function ThreadPopup({ className }: { className?: string }) {
	const { activeChatbot } = useSidebar()
	const { isOpenPopup, activeThread } = useThread()
	const [{ allMessages, isLoading }, { sendMessageFromResponse }] = useMBChat()

	const popupContentRef = useRef<HTMLDivElement>()

	const { scrollY } = useScroll({
		container: popupContentRef as React.RefObject<HTMLElement>,
	})

	const { isAtBottom } = useAtBottom({
		ref: popupContentRef,
		scrollY,
	})

	const scrollToBottom = () => {
		if (popupContentRef.current) {
			const element = popupContentRef.current
			scrollToBottomOfElement(element)
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isLoading && isOpenPopup) {
			const timeout = setTimeout(() => {
				scrollToBottom()
				clearTimeout(timeout)
			}, 150)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, isOpenPopup])

	return (
		<div
			className={cn(
				'size-full bg-background/80 dark:bg-background/80',
				'lg:max-w-[calc(100%-250px)] xl:max-w-[calc(100%-300px)]',
				'flex justify-center items-center fixed top-16',
				'h-[calc(100vh-4rem)] backdrop-blur-sm ease-in-out duration-500 z-[9]',
				'transition-all',
				isOpenPopup ? 'animate-fade-in' : 'animate-fade-out',
				className,
			)}
		>
			<div
				className={cn(
					'flex flex-col z-10 rounded-lg duration-500 ease-in-out fixed',
					'h-full max-h-[90%] max-w-[1032px] w-[95%]',
					'dark:border-mirage border-iron border bg-background dark:bg-background',
					'transition-opacity',
				)}
			>
				<ThreadPopUpCardHeader messages={allMessages} />

				<div
					className={cn(
						'flex flex-col dark:bg-[#18181B] bg-white grow rounded-b-[8px] scrollbar h-full',
						'pb-[120px] md:pb-[180px]', //? Reduced padding on mobile
						'max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-220px)]', //? Adjusted height for mobile
						className,
					)}
					ref={popupContentRef as React.Ref<HTMLDivElement>}
				>
					<ChatList
						isThread={false}
						messages={allMessages}
						sendMessageFn={sendMessageFromResponse}
						chatbot={activeThread?.chatbot || (activeChatbot as Chatbot)}
						chatContentClass="dark:!border-x-mirage !border-x-gray-300 !py-[20px] !px-[16px] !mx-0 max-h-[none] "
						className="max-w-full !px-[32px] !mx-0"
						chatArrowClass="!right-0 !mr-0"
						chatTitleClass="!px-[11px]"
					/>

					<Chat
						isPopup
						chatPanelClassName="!pl-0 rounded-b-[8px] overflow-hidden !absolute"
						scrollToBottom={scrollToBottom}
						isAtBottom={isAtBottom}
					/>
				</div>
			</div>
		</div>
	)
}

export function ThreadPopUpCardHeader({ messages }: { messages: AiMessage[] }) {
	const { isOpenPopup, activeThread, setIsOpenPopup, setActiveThread } =
		useThread()

	const onClose = () => {
		setIsOpenPopup(!isOpenPopup)
		if (activeThread?.threadId) {
			setActiveThread(null)
		}
	}

	const threadTitle = messages.filter((m) => m.role === 'user')[0]?.content
	const threadTitleChunks = threadTitle?.split(/\s/g) // ' '
	const threadTitleHeading = threadTitleChunks?.slice(0, 32).join(' ')
	const threadTitleSubHeading = threadTitleChunks?.slice(32).join(' ')

	return (
		<div className="relative rounded-t-[8px] px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]">
			<div className="flex items-center justify-between gap-6">
				<div className="items-center block overflow-y-auto whitespace-pre-line max-h-28 scrollbar small-thumb">
					{threadTitle ? (
						threadTitleChunks.length > 32 ? (
							`${threadTitleHeading}`
						) : (
							threadTitle
						)
					) : (
						<Skeleton className="w-[280px] h-[20px]" />
					)}
					{threadTitleSubHeading && (
						<span className="ml-2 overflow-hidden text-sm opacity-50">
							{threadTitleSubHeading}
						</span>
					)}
				</div>

				<div className="flex items-center gap-4">
					<ThreadPublicitySwitch threadId={activeThread?.threadId} />
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="ml-2"
						onClick={onClose}
					>
						<IconClose />
					</Button>
				</div>
			</div>
		</div>
	)
}
