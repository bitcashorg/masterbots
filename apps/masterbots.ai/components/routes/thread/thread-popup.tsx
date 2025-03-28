'use client'

import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { Chat } from '@/components/routes/chat/chat'
import { ChatList } from '@/components/routes/chat/chat-list'
import { Button } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { getCanonicalDomain } from '@/lib/url'
import { cn, getRouteType } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import type { Message as AiMessage } from 'ai'
import type { Chatbot, Message } from 'mb-genql'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

export function ThreadPopup({ className }: { className?: string }) {
	const { activeChatbot } = useSidebar()
	const { isOpenPopup, activeThread, isNewResponse } = useThread()
	const [{ allMessages, isLoading }, { sendMessageFromResponse }] = useMBChat()
	const [browseMessages, setBrowseMessages] = useState<Message[]>([])
	const popupContentRef = useRef<HTMLDivElement | null>(null)
	const threadRef = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()

	const { isNearBottom, smoothScrollToBottom } = useMBScroll({
		containerRef: popupContentRef,
		threadRef,
		isNewContent: isNewResponse,
		hasMore: false,
		isLast: true,
		loading: isLoading,
		loadMore: () => {},
	})

	const scrollToBottom = () => {
		if (popupContentRef.current) {
			smoothScrollToBottom()
		}
	}

	// Fetch browse messages when activeThread changes
	useEffect(() => {
		const fetchBrowseMessages = async () => {
			if (activeThread?.threadId) {
				const messages = await getMessages({ threadId: activeThread.threadId })
				setBrowseMessages(messages)
			}
		}

		if (activeThread?.threadId) {
			fetchBrowseMessages()
		}
	}, [activeThread?.threadId])

	const routeType = getRouteType(pathname)
	const isBrowseView = routeType === 'public' && activeThread?.threadId

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
				<ThreadPopUpCardHeader
					messages={isBrowseView ? browseMessages : allMessages}
					isBrowseView={isBrowseView}
				/>

				<div
					ref={popupContentRef}
					className={cn(
						'flex flex-col dark:bg-[#18181b] bg-white grow rounded-b-[8px] scrollbar h-full',
						isBrowseView ? 'pb-2 md:pb-4' : 'pb-[120px] md:pb-[180px]',
						isBrowseView
							? ''
							: 'max-h-[calc(100%-240px)] md:max-h-[calc(100%-220px)]',
						className,
					)}
				>
					<div ref={threadRef}>
						{isBrowseView ? (
							// Browse view
							<div className="px-8 py-4">
								<BrowseChatMessageList
									chatbot={activeThread?.chatbot}
									user={activeThread?.user || undefined}
									messages={browseMessages}
									threadId={activeThread?.threadId}
								/>
							</div>
						) : (
							// Chat view
							<>
								<ChatList
									isThread={false}
									messages={allMessages}
									isLoadingMessages={isLoading}
									sendMessageFn={(message: string) => {
										scrollToBottom()
										sendMessageFromResponse(message)
									}}
									chatbot={activeThread?.chatbot || (activeChatbot as Chatbot)}
									chatContentClass="!border-x-gray-300 md:px-[16px] !mx-0 max-h-[none] dark:!border-x-mirage"
									className="max-w-full md:px-[32px] !mx-0"
									chatArrowClass="!right-0 !mr-0"
									chatTitleClass="!px-[11px]"
								/>

								<Chat
									isPopup
									chatPanelClassName="!pl-0 rounded-b-[8px] overflow-hidden !absolute"
									scrollToBottomOfPopup={scrollToBottom}
									isAtBottom={isNearBottom}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

function ThreadPopUpCardHeader({
	messages,
	isBrowseView,
}: {
	messages: (AiMessage | Message)[]
	isBrowseView: boolean
}) {
	const {
		isOpenPopup,
		activeThread,
		setIsOpenPopup,
		setActiveThread,
		setShouldRefreshThreads,
	} = useThread()
	const { navigateTo } = useSidebar()
	const pathname = usePathname()
	const params = useParams()
	const isPublic = getRouteType(pathname) === 'public'

	const onClose = () => {
		const canonicalDomain = getCanonicalDomain(
			activeThread?.chatbot?.name || '',
		)
		setIsOpenPopup(!isOpenPopup)

		navigateTo({
			urlType: 'chatbotThreadListUrl',
			shallow: true,
			navigationParams: {
				type: isPublic ? 'public' : 'personal',
				category: activeThread?.chatbot?.categories?.[0]?.category?.name || '',
				domain: canonicalDomain,
				chatbot: activeThread?.chatbot?.name || '',
			},
		})

		// ! Required to close the threads popup and show the thread list. Without this, the thread accordion will remain open.
		// ? We have to signal the use-thread-panel component to re-fetch the threads list when the activeThread is closed.
		setActiveThread(null)
		setShouldRefreshThreads(true)
	}

	// Handle different message structures for browse and chat views
	const threadTitle = useMemo(() => {
		try {
			return cleanPrompt(
				isBrowseView
					? (messages[0] as Message)?.content
					: (
							messages.filter(
								(m) => (m as AiMessage).role === 'user',
							)[0] as AiMessage
						)?.content,
			)
		} catch (e) {
			// console.error('Error cleaning thread title:', e)
			return isBrowseView
				? (messages[0] as Message)?.content
				: (
						messages.filter(
							(m) => (m as AiMessage).role === 'user',
						)[0] as AiMessage
					)?.content
		}
	}, [messages, isBrowseView])

	const threadTitleChunks = threadTitle?.split(/\s/g)
	const threadTitleHeading = threadTitleChunks?.slice(0, 49).join(' ')
	const threadTitleSubHeading = threadTitleChunks?.slice(49).join(' ')

	return (
		<div className="relative rounded-t-[8px] px-4 md:px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]">
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
