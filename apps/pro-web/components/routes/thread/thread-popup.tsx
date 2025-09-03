'use client'

import { ChatList } from '@/components/routes/chat/chat-list'
import { WorkspaceContent } from '@/components/routes/workspace/workspace-content'
import { ExternalLink } from '@/components/shared/external-link'
import { ChatPanelSkeleton } from '@/components/shared/skeletons/chat-panel-skeleton'
import { Button, buttonVariants } from '@/components/ui/button'
import { IconClose } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useSonner } from '@/lib/hooks/useSonner'
import { createStructuredMarkdown } from '@/lib/markdown-utils'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { cn, getRouteType } from '@/lib/utils'
import type { SendMessageFromResponseMessageData } from '@/types'
import type { Message as AiMessage } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import { FileTextIcon } from 'lucide-react'
import type { Message } from 'mb-genql'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'

const Chat = dynamic(
	() => import('@/components/routes/chat/chat').then((mod) => mod.Chat),
	{
		ssr: false,
		loading: () => (
			<ChatPanelSkeleton className="!pl-0 rounded-b-[8px] overflow-hidden !absolute" />
		),
	},
)

const Pro = dynamic(
	() => import('@/components/routes/pro/pro').then((mod) => mod.Pro),
	{
		ssr: false,
		loading: () => (
			<ChatPanelSkeleton className="!pl-0 rounded-b-[8px] overflow-hidden !absolute" />
		),
	},
)

export function ThreadPopup({ className }: { className?: string }) {
	const { isOpenPopup, activeThread, isNewResponse } = useThread()
	const [{ allMessages, isLoading }, { sendMessageFromResponse }] = useMBChat()
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
	const {
		activeProject,
		activeDocument,
		activeDocumentType,
		addDocument,
		setActiveDocument,
		setDocumentContent,
		isWorkspaceActive,
		toggleWorkspace,
	} = useWorkspace()
	const { customSonner } = useSonner()

	const scrollToBottom = () => {
		if (popupContentRef.current) {
			smoothScrollToBottom()
		}
	}

	const convertToWorkspaceDocument = (messageId: string) => {
		// Handle document conversion in the popup - find the message and convert it
		const message = allMessages.find((m) => m.id === messageId)
		if (!message || (message as AiMessage).role !== 'assistant') {
			console.error('Message not found or not an assistant message')
			return
		}

		// Find the corresponding user message
		const userMessage = allMessages.find((m, index) => {
			// Find user message that comes before this assistant message
			const assistantIndex = allMessages.findIndex(
				(msg) => msg.id === messageId,
			)
			return index < assistantIndex && (m as AiMessage).role === 'user'
		})

		if (!userMessage) {
			console.error('Corresponding user message not found')
			return
		}

		if (!activeProject) {
			customSonner({
				type: 'error',
				text: 'Please select a project from the breadcrumb navigation first',
			})
			return
		}

		try {
			const messageTitle = message.content?.match(/#\s.+\w/)?.[0]
			// Create document title from user question (first 50 chars)
			const docTitle =
				!activeThread?.metadata?.documents?.length || !messageTitle
					? (userMessage as AiMessage).content
							.substring(0, 50)
							.replace(/[^\w\s-]/g, '')
							.trim() || 'New Document'
					: messageTitle.replace('# ', '')

			// Generate structured markdown from assistant content
			const structuredContent = createStructuredMarkdown(
				(message as AiMessage).content,
			)

			// Add the document to workspace
			const docType = activeDocumentType === 'all' ? 'text' : activeDocumentType
			addDocument(
				activeProject,
				docTitle,
				docType as 'text' | 'image' | 'spreadsheet',
			)

			// Set document content
			setDocumentContent(activeProject, docTitle, structuredContent)
			setActiveDocument(docTitle)

			// Enable workspace mode if not already active
			if (!isWorkspaceActive) {
				toggleWorkspace()
			}

			customSonner({
				type: 'success',
				text: `Document "${docTitle}" created successfully!`,
			})
		} catch (error) {
			console.error('Error creating document:', error)
			customSonner({
				type: 'error',
				text: 'Failed to create document',
			})
		}
	}

	const routeType = getRouteType(pathname)
	const isBrowseView =
		routeType === 'public' ||
		routeType === 'org' ||
		routeType === 'profile' ||
		(routeType === 'bot' && activeThread?.threadId)
	const isProView = routeType === 'pro'
	const isBotView = routeType === 'bot'
	const threadCategory = activeThread?.chatbot.categories?.[0]?.category
		?.name as string
	const chatbotName = activeThread?.chatbot?.name as string
	const canonicalDomain = getCanonicalDomain(chatbotName || 'prompt')

	return (
		<AnimatePresence propagate mode="popLayout">
			<motion.div
				className={cn(
					'size-full',
					isBotView
						? ''
						: 'lg:max-w-[calc(100%-250px)] xl:max-w-[calc(100%-300px)] lg:left-[250px] xl:left-[300px]',
					'flex justify-center items-end fixed bottom-0 pb-[192px] pt-[10%] left-0',
					'h-[calc(100vh-4rem)] backdrop-blur-sm ease-in-out duration-500 z-40',
					'transition-all origin-bottom',
					isOpenPopup ? 'animate-fade-in' : 'animate-fade-out',
					className,
				)}
				initial={{ y: 640, opacity: 0, height: '0%' }}
				animate={{ y: 0, opacity: 1, height: '100%' }}
				exit={{ y: 640, opacity: 0, height: '0%' }}
				transition={{ duration: 0.35, ease: 'easeInOut' }}
				key="thread-pop-up"
			>
				<div
					className={cn(
						'flex flex-col z-50 rounded-lg duration-500 ease-in-out fixed',
						'h-full max-h-[calc(95%-250px)] max-w-[1032px] w-[calc(100%-3rem)] md:w-[calc(100%-5rem)] mx-4 md:mx-10',
						'dark:border-mirage border-iron border bg-background dark:bg-background shadow-xl',
						'transition-opacity overflow-hidden',
					)}
				>
					<ThreadPopUpCardHeader
						messages={allMessages}
						isBrowseView={isBrowseView}
						isProView={isProView}
					/>

					<div
						ref={popupContentRef}
						className={cn(
							'flex flex-col dark:bg-[#18181b] bg-white grow rounded-b-[8px] scrollbar h-full',
							isBrowseView ? 'pb-2 md:pb-4' : 'pb-[120px] md:pb-[180px]',
							className,
						)}
					>
						<AnimatePresence>
							{/* Workspace Section (conditionally shown) */}
							{isWorkspaceActive && activeThread && (
								<motion.div
									className={cn(
										'absolute bottom-0 z-50 size-full bg-background border border-b-0 rounded-md shadow-sm max-h-[calc(100%-88px)]',
									)}
									initial={{ y: 320, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 320, opacity: 0 }}
									transition={{ duration: 0.35, ease: 'easeInOut' }}
									key="workspace-content-thread-pop-up"
								>
									{/* Removed duplicate document type dropdown. Breadcrumb is source of truth. */}
									<WorkspaceContent
										key={`workspace-${activeProject}-${activeDocument}-${activeDocumentType}`}
										isLoading={isLoading}
										className="size-full overflow-auto scrollbar"
										chatbot={activeThread?.chatbot}
									/>
								</motion.div>
							)}
						</AnimatePresence>
						<div ref={threadRef}>
							<ChatList
								isThread={false}
								messages={allMessages}
								isLoadingMessages={isLoading}
								sendMessageFn={(
									messageData: SendMessageFromResponseMessageData,
									callback?: () => void,
								) => {
									scrollToBottom()
									sendMessageFromResponse(messageData, callback)
								}}
								onConvertToWorkspaceDocument={convertToWorkspaceDocument}
								chatContentClass="!border-x-gray-300 md:px-[16px] !mx-0 max-h-[none] dark:!border-x-mirage"
								className="max-w-full md:px-[32px] !mx-0"
								chatArrowClass="!right-0 !mr-0"
								chatTitleClass="!px-2.5"
							/>
							{isBrowseView && (
								<div className="pt-6 text-center border-t border-t-iron dark:border-t-mirage mt-12 mb-5 lg:mt-20">
									<ExternalLink
										className={cn(
											buttonVariants({ size: 'xl', radius: 'full' }),
											'text-xl hover:no-underline',
										)}
										href={`${urlBuilders.chatbotThreadListUrl({
											type: 'personal',
											category: threadCategory,
											domain: canonicalDomain,
											chatbot: chatbotName as string,
										})}?continuousThreadId=${activeThread?.threadId}`}
									>
										Continue Thread
									</ExternalLink>
								</div>
							)}
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

function ThreadPopUpCardHeader({
	messages,
	isBrowseView,
	isProView = false,
}: {
	messages: (AiMessage | Message)[]
	isBrowseView: boolean
	isProView?: boolean
}) {
	const {
		isOpenPopup,
		activeThread,
		setIsOpenPopup,
		setActiveThread,
		setShouldRefreshThreads,
		refreshActiveThread,
	} = useThread()
	const { navigateTo } = useSidebar()
	const {
		activeProject,
		activeDocumentType,
		addDocument,
		setActiveDocument,
		setDocumentContent,
		isWorkspaceActive,
		toggleWorkspace,
		// NEW: use workspace documents so we can detect thread-linked docs
		documentList,
	} = useWorkspace()
	const { customSonner } = useSonner()
	const pathname = usePathname()
	const params = useParams()
	const isPublic = getRouteType(pathname) === 'public'
	const isProfile = getRouteType(pathname) === 'profile'
	const isBot = getRouteType(pathname) === 'bot'
	const isPro = getRouteType(pathname) === 'pro'

	// Ensure we have up-to-date thread documents metadata when the popup opens
	// Attempt exactly once per threadId to avoid repeated fetches
	const { data: session } = useSession()
	const attemptedDocsRefreshRef = useRef<string | null>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!isOpenPopup) return

		// Prefer slug from any document explicitly linked to a thread
		const docWithThreadSlug = Array.isArray(documentList)
			? // biome-ignore lint/suspicious/noExplicitAny: we only need threadSlug presence
				(documentList as any[]).find(
					(d) => typeof d?.threadSlug === 'string' && d.threadSlug,
				)
			: undefined
		const threadSlugFromDoc = docWithThreadSlug?.threadSlug as
			| string
			| undefined
		const candidateSlug = threadSlugFromDoc || activeThread?.slug
		const candidateId = activeThread?.threadId
		// Build a stable key for "attempt once"
		const refreshKey = candidateSlug || candidateId

		if (!refreshKey) return
		if (attemptedDocsRefreshRef.current === refreshKey) return

		attemptedDocsRefreshRef.current = refreshKey
		// Try by slug first (more specific linkage), then fall back to id
		refreshActiveThread({
			threadSlug: candidateSlug,
			threadId: candidateId,
		}).catch(() => {
			// Silently ignore; UI will fall back to current state
		})
	}, [isOpenPopup, activeThread, session?.user?.hasuraJwt, documentList])

	// Check if we have at least one assistant message and this is the first one
	const hasFirstAssistantMessage =
		messages.length >= 2 &&
		messages.filter((m) => (m as AiMessage).role === 'assistant').length === 1

	// ISSUE 4 FIX: Show workspace mode indicator when no thread exists but user started creating document
	const showWorkspaceMode =
		isProView && (isWorkspaceActive || (!activeThread && activeProject))
	const showCreateDocument =
		hasFirstAssistantMessage && !isBrowseView && activeProject

	const handleCreateDocument = async () => {
		// Get the user question (first user message) and assistant answer (first assistant message)
		const userMessage = messages.find(
			(m) => (m as AiMessage).role === 'user',
		) as AiMessage
		const assistantMessage = messages.find(
			(m) => (m as AiMessage).role === 'assistant',
		) as AiMessage

		if (!assistantMessage || !userMessage) {
			customSonner({
				type: 'error',
				text: 'No assistant message found to create document from',
			})
			return
		}

		if (!activeProject) {
			customSonner({
				type: 'error',
				text: 'Please select a project from the breadcrumb navigation first',
			})
			return
		}

		try {
			// Create document title from user question (first 50 chars)
			const docTitle =
				userMessage.content
					.substring(0, 50)
					.replace(/[^\w\s-]/g, '')
					.trim() || 'New Document'

			// Generate structured markdown from assistant content
			const structuredContent = createStructuredMarkdown(
				assistantMessage.content,
			)

			// Add the document to workspace
			const docType = activeDocumentType === 'all' ? 'text' : activeDocumentType
			addDocument(
				activeProject,
				docTitle,
				docType as 'text' | 'image' | 'spreadsheet',
			)

			// Set document content
			setDocumentContent(activeProject, docTitle, structuredContent)
			setActiveDocument(docTitle)

			// Enable workspace mode if not already active
			if (!isWorkspaceActive) {
				toggleWorkspace()
			}

			customSonner({
				type: 'success',
				text: `Document "${docTitle}" created successfully!`,
			})
		} catch (error) {
			console.error('Error creating document:', error)
			customSonner({
				type: 'error',
				text: 'Failed to create document',
			})
		}
	}

	const onClose = () => {
		const canonicalDomain = getCanonicalDomain(
			activeThread?.chatbot?.name || '',
		)
		setIsOpenPopup(!isOpenPopup)
		setActiveThread(null)

		if (isProfile) {
			const slug = params.userSlug as string
			navigateTo({
				urlType: 'profilesUrl',
				shallow: true,
				navigationParams: {
					type: 'user',
					domain: canonicalDomain,
					chatbot: activeThread?.chatbot?.name || '',
					usernameSlug: slug,
					category:
						activeThread?.chatbot?.categories?.[0]?.category?.name || '',
				},
			})
			setActiveThread(null)
			setShouldRefreshThreads(true)
			return
		}

		if (isBot) {
			navigateTo({
				urlType: 'chatbotProfileUrl',
				shallow: true,
				navigationParams: {
					domain: canonicalDomain,
					chatbot: activeThread?.chatbot?.name || '',
				},
			})

			setActiveThread(null)
			setShouldRefreshThreads(true)
			return
		}

		if (isPro) {
			// For pro routes, just close the popup without navigation
			setActiveThread(null)
			setShouldRefreshThreads(true)
			return
		}

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
		const currentThreadTitle = isBrowseView
			? (messages[0] as Message)?.content
			: (
					messages.filter(
						(m) => (m as AiMessage).role === 'user',
					)[0] as AiMessage
				)?.content
		const previousThreadTitle = activeThread?.thread?.messages
			? isBrowseView
				? (activeThread.thread.messages[0] as Message)?.content
				: (
						activeThread?.thread?.messages?.filter(
							(m) => m && m.role === 'user',
						)[0] as Message
					)?.content
			: ''
		// ? Since we are checking if the activeThread has a parentThread (thread), we are OK
		// ? to use check and destructure the way we did here.
		const threadTitle = activeThread?.thread?.messages
			? previousThreadTitle
			: currentThreadTitle
		try {
			return cleanPrompt(threadTitle)
		} catch (e) {
			// console.error('Error cleaning thread title:', e)
			return threadTitle
		}
	}, [messages, activeThread, isBrowseView])

	const threadTitleChunks = threadTitle?.split(/\s/g)
	const threadTitleHeading = threadTitleChunks?.slice(0, 49).join(' ')
	const threadTitleSubHeading = threadTitleChunks?.slice(49).join(' ')

	return (
		<div className="relative rounded-t-[8px] px-2.5 md:px-4 py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7] transition-all">
			<div className="flex items-center justify-between gap-6 transition-all">
				<div className="items-center block overflow-y-auto whitespace-pre-line max-h-28 scrollbar small-thumb gap-1 transition-all">
					<AnimatePresence mode="wait">
						{showWorkspaceMode && (
							<motion.div
								className="flex items-center gap-2 mb-2"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.35, ease: 'easeInOut' }}
								key="workspace-mode-flag"
							>
								<div className="w-2 h-2 bg-blue-500 rounded-full" />
								<span className="text-sm text-blue-600 font-medium">
									Workspace Mode
									{activeProject && ` - ${activeProject}`}
									{activeThread?.metadata?.documents &&
										activeThread.metadata.documents.length > 0 &&
										` (${activeThread.metadata.documents.length} document${activeThread.metadata.documents.length > 1 ? 's' : ''})`}
								</span>
							</motion.div>
						)}
					</AnimatePresence>
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
					{/* Create Document button for first assistant message */}
					{/* {showCreateDocument && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="gap-2"
							onClick={handleCreateDocument}
						>
							<FileTextIcon className="w-4 h-4" />
							Create Document
						</Button>
					)} */}
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
