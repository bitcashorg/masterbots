'use client'

import { BrowseChatMessageList } from '@/components/routes/browse/browse-chat-message-list'
import { Chat } from '@/components/routes/chat/chat'
import { ChatList } from '@/components/routes/chat/chat-list'
import { AttachmentsDisplay } from '@/components/routes/chat/prompt-form/attachments-display'
import { UserAttachments } from '@/components/routes/chat/prompt-form/user-attachments'
import { FeatureToggle } from '@/components/shared/feature-toggle'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { IconClose } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import {
	type FileAttachment,
	useFileAttachments,
} from '@/lib/hooks/use-chat-attachments'
import { useDeepThinking } from '@/lib/hooks/use-deep-thinking'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { getCanonicalDomain } from '@/lib/url'
import { cn, getRouteType, nanoid } from '@/lib/utils'
import { getMessages } from '@/services/hasura'
import type { Message as AiMessage, ChatRequestOptions } from 'ai'
import {
	BrainIcon,
	FileEditIcon,
	FilePlusIcon,
	GlobeIcon,
	GraduationCap,
	PaperclipIcon,
	SaveIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot, Message } from 'mb-genql'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { WorkspaceContent } from '../workspace/workspace-content'
import { WorkspaceDocumentSelect } from '../workspace/workspace-document-select'
import { WorkspaceProjectSelect } from '../workspace/workspace-project-select'

export function ThreadPopup({ className }: { className?: string }) {
	const { activeChatbot } = useSidebar()
	const {
		isOpenPopup,
		activeThread,
		isNewResponse,
		webSearch,
		setWebSearch,
		setIsOpenPopup,
		setActiveThread,
		setShouldRefreshThreads,
	} = useThread()
	const [{ allMessages, isLoading }, { sendMessageFromResponse }] = useMBChat()
	const [browseMessages, setBrowseMessages] = useState<Message[]>([])
	const popupContentRef = useRef<HTMLDivElement | null>(null)
	const threadRef = useRef<HTMLDivElement | null>(null)
	const messageContainerRef = useRef<HTMLDivElement | null>(null)
	const formRef = useRef<HTMLFormElement | null>(null)
	const pathname = usePathname()
	const [inputValue, setInputValue] = useState('')
	const formId = useMemo(() => nanoid(16), [])

	// Feature toggle hooks
	const { isPowerUp, togglePowerUp } = usePowerUp()
	const { isDeepThinking, toggleDeepThinking } = useDeepThinking()
	const {
		isWorkspaceActive,
		toggleWorkspace: originalToggleWorkspace,
		setIsWorkspaceActive,
		activeProject,
		setActiveProject,
		activeDocument,
		setActiveDocument,
		documentList,
		projectList,
		createDocumentFromMessage,
	} = useWorkspace()

	// File attachment hooks
	const [{ attachments, isDragging, userData }, fileAttachmentActions] =
		useFileAttachments(formRef)

	const { isNearBottom, smoothScrollToBottom } = useMBScroll({
		containerRef: popupContentRef,
		threadRef,
		isNewContent: isNewResponse,
		hasMore: false,
		isLast: true,
		loading: isLoading,
		loadMore: () => {},
	})

	// Check if we're in the Pro page to avoid duplicate chat UI
	const isProPage = pathname.includes('/pro')

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

	// Keep track of where the user came from
	const [cameFromThreadList, setCameFromThreadList] = useState<boolean>(false)

	// Custom toggle workspace that also opens the popup if needed
	const toggleWorkspace = () => {
		// If workspace is being activated, ensure popup is open and track origin
		if (!isWorkspaceActive) {
			// Check if we're coming from thread list (no active thread)
			if (!activeThread) {
				setCameFromThreadList(true)
			}
			setIsOpenPopup(true)
		} else if (cameFromThreadList) {
			// If returning to chat mode from workspace and originally from thread list
			// Close the popup and reset active thread to return to thread list
			setIsOpenPopup(false)
			setCameFromThreadList(false)
			setActiveThread(null)
			setShouldRefreshThreads(true)
			// Toggle workspace state before returning
			originalToggleWorkspace()
			return
		}
		// Toggle workspace state
		originalToggleWorkspace()
	}

	// Effect to open popup when workspace is activated
	useEffect(() => {
		if (isWorkspaceActive && !isOpenPopup) {
			setIsOpenPopup(true)
		}
	}, [isWorkspaceActive, isOpenPopup, setIsOpenPopup])

	// Handle message submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (inputValue.trim()) {
			scrollToBottom()

			// Prepare chat options with toggles and attachments
			const chatOptions: ChatRequestOptions = {
				powerUp: isPowerUp,
				reasoning: isDeepThinking,
				webSearch: webSearch,
			}

			// Add attachments if present
			if (attachments.length) {
				chatOptions.experimental_attachments = attachments
			}

			// Send message with options
			sendMessageFromResponse(inputValue, chatOptions)

			// Clear input and attachments
			setInputValue('')
			fileAttachmentActions.clearAttachments()
		}
	}

	// Helper function for file input
	const triggerNativeFileInput = (e: React.MouseEvent) => {
		const $document = e.currentTarget.ownerDocument
		if (!$document) return

		const $input = $document.getElementById(`file-attachments-${formId}`)
		if (!$input) return

		$input.removeAttribute('disabled')
		$input.click()
		$input.setAttribute('disabled', '')
	}

	// Force re-render when thread changes
	const threadKey = useMemo(
		() => `thread-${activeThread?.threadId || 'none'}-${allMessages.length}`,
		[activeThread?.threadId, allMessages.length],
	)

	// Create a document from current message
	const handleCreateDocument = async () => {
		// Find the latest user message to convert to a document
		const userMessages = allMessages.filter((m) => m.role === 'user')
		if (userMessages.length > 0) {
			const lastUserMessage = userMessages[userMessages.length - 1]
			createDocumentFromMessage(lastUserMessage.content)
		}
	}

	// Handle section selection in workspace
	const [selectedSection, setSelectedSection] = useState<string | null>(null)

	const handleSectionSelect = (sectionId: string) => {
		setSelectedSection(sectionId)
	}

	// Handle AI prompt for editing a section
	const handleAIEdit = (e: React.FormEvent) => {
		e.preventDefault()
		if (inputValue.trim() && selectedSection) {
			// Prepare chat options with toggles and workspace section info
			const chatOptions: ChatRequestOptions = {
				powerUp: isPowerUp,
				reasoning: isDeepThinking,
				webSearch: webSearch,
				workspace: {
					documentId: activeDocument,
					sectionId: selectedSection,
					projectId: activeProject,
				},
			}

			// Send message with options
			sendMessageFromResponse(inputValue, chatOptions)

			// Clear input
			setInputValue('')
		}
	}

	// Show popup if workspace is active or if regular popup is open
	const showPopup = isOpenPopup || isWorkspaceActive

	return (
		<div
			className={cn(
				'size-full bg-background/80 dark:bg-background/80',
				'lg:max-w-[calc(100%-250px)] xl:max-w-[calc(100%-300px)]',
				'flex justify-center items-center fixed top-16',
				'h-[calc(100vh-4rem)] backdrop-blur-sm ease-in-out duration-500 z-[9]',
				'transition-all',
				showPopup ? 'animate-fade-in' : 'animate-fade-out',
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
					onClose={() => {
						// When closing, reset workspace state if it's active
						if (isWorkspaceActive) {
							setIsWorkspaceActive(false)
						}
						// Reset the came from thread list flag and ensure proper cleanup
						setCameFromThreadList(false)
						// If we came from thread list, make sure we return to it properly
						if (cameFromThreadList) {
							setActiveThread(null)
							setShouldRefreshThreads(true)
						}
					}}
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
							// Chat or Workspace view based on toggle
							<>
								{!isWorkspaceActive ? (
									// Chat view when workspace is not active
									<div key={threadKey} ref={messageContainerRef}>
										<ChatList
											isThread={false}
											messages={allMessages}
											isLoadingMessages={isLoading}
											sendMessageFn={(message: string) => {
												scrollToBottom()
												sendMessageFromResponse(message)
											}}
											chatbot={
												activeThread?.chatbot || (activeChatbot as Chatbot)
											}
											chatContentClass="!border-x-gray-300 !px-[16px] !mx-0 max-h-[none] dark:!border-x-mirage"
											className="max-w-full !px-[32px] !mx-0"
											chatArrowClass="!right-0 !mr-0"
											chatTitleClass="!px-[11px]"
											containerRef={messageContainerRef}
											onCreateDocument={(message) => {
												// Create document from the message content and assign to Unassigned project
												createDocumentFromMessage(message.content, true)
												// Note: createDocumentFromMessage already activates workspace mode
											}}
										/>
									</div>
								) : (
									// Workspace view when workspace is active
									<div className="px-4 py-4 flex flex-col h-full">
										{/* Project and Document Selection */}
										<div className="flex items-center gap-4 mb-4 px-4">
											<WorkspaceProjectSelect
												value={activeProject}
												onChange={setActiveProject}
												options={projectList}
											/>
											<WorkspaceDocumentSelect
												value={activeDocument}
												onChange={setActiveDocument}
												options={
													activeProject ? documentList[activeProject] : []
												}
												disabled={!activeProject}
											/>
										</div>

										{/* Workspace Content Area */}
										<div className="flex-grow overflow-y-auto pb-[140px]">
											<WorkspaceContent
												projectName={activeProject}
												documentName={activeDocument}
												isLoading={isLoading}
												onCreateDocument={handleCreateDocument}
												onSectionSelect={handleSectionSelect}
												className="h-full"
											/>
											{selectedSection && (
												<div className="fixed bottom-[76px] left-0 right-0 w-full mx-auto max-w-screen-lg px-4">
													<div className="bg-primary/10 text-primary text-sm p-2 rounded-t-md">
														Editing section: {selectedSection}
													</div>
												</div>
											)}
										</div>
									</div>
								)}

								{/* Handle input panel based on mode */}
								{!isProPage ? (
									// Standard Chat component for non-Pro pages
									<Chat
										isPopup
										chatPanelClassName="!pl-0 rounded-b-[8px] overflow-hidden !absolute"
										scrollToBottomOfPopup={scrollToBottom}
										isAtBottom={isNearBottom}
									/>
								) : (
									// Custom input panel for Pro page to avoid duplicate messages
									<div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border w-full rounded-b-[8px] shadow-lg">
										{/* Feature Toggles Section */}
										<div className="flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0">
											<div className="flex items-center justify-between w-full gap-4 mx-2">
												<div className="flex items-center space-x-6 w-full max-w-[60%] overflow-y-hidden scrollbar scrollbar-thin">
													{/* Deep Expertise Toggle */}
													<FeatureToggle
														id="powerUp-popup"
														name="Deep Expertise"
														icon={<GraduationCap />}
														activeIcon={<GraduationCap />}
														isActive={isPowerUp}
														onChange={togglePowerUp}
														activeColor="yellow"
													/>

													{/* Deep Thinking Toggle */}
													<FeatureToggle
														id="reasoning-popup"
														name="Deep Thinking"
														icon={<BrainIcon />}
														activeIcon={<BrainIcon />}
														isActive={isDeepThinking}
														onChange={toggleDeepThinking}
														activeColor="green"
													/>

													{/* Web Search Toggle - Conditional */}
													{appConfig.features.webSearch && (
														<FeatureToggle
															id="webSearch-popup"
															name="Web Search"
															icon={<GlobeIcon />}
															activeIcon={<GlobeIcon />}
															isActive={webSearch}
															onChange={(newValue) => {
																console.log(
																	'ThreadPopup: Toggle Web Search:',
																	newValue,
																)
																setWebSearch(newValue)
															}}
															activeColor="cyan"
														/>
													)}

													{/* Workspace Toggle */}
													<FeatureToggle
														id="workspace-popup"
														name="Workspace"
														icon={<FileEditIcon />}
														activeIcon={<FileEditIcon />}
														isActive={isWorkspaceActive}
														onChange={toggleWorkspace}
														activeColor="cyan"
													/>
												</div>
											</div>
										</div>

										{/* Input Form Section - Always show input, but use different submit handler for workspace */}
										<div className="p-2 sm:px-4 border-t dark:border-zinc-800 border-zinc-200">
											<form
												ref={formRef}
												id={`prompt-form-${formId}`}
												className="relative flex flex-col w-full px-4 py-2"
												onSubmit={
													isWorkspaceActive ? handleAIEdit : handleSubmit
												}
												onDrop={fileAttachmentActions.onDrop}
												onDragOver={fileAttachmentActions.onDragOver}
												onDragExit={fileAttachmentActions.onDragLeave}
												onDragLeave={fileAttachmentActions.onDragLeave}
											>
												{/* Attachment display area - Only show for chat mode */}
												{!isWorkspaceActive && (
													<AttachmentsDisplay
														isDragging={isDragging}
														attachments={attachments}
														onRemove={fileAttachmentActions.removeAttachment}
													/>
												)}

												<div className="relative flex w-full gap-2 sm:gap-4">
													<textarea
														tabIndex={0}
														rows={1}
														value={inputValue}
														onChange={(e) => setInputValue(e.target.value)}
														placeholder={
															isWorkspaceActive && selectedSection
																? 'How would you like to edit this section?'
																: isWorkspaceActive
																	? 'Please select a section to edit'
																	: 'Type your follow-up question...'
														}
														spellCheck={false}
														className="min-h-[60px] w-full resize-none bg-background px-3 py-3 sm:text-sm border rounded-md"
														disabled={
															isLoading ||
															(isWorkspaceActive && !selectedSection)
														}
													/>

													{/* Attachment button - Only show for chat mode */}
													{!isWorkspaceActive && (
														<Popover>
															<PopoverTrigger asChild>
																<div
																	role="button"
																	tabIndex={0}
																	onClick={(e) => {
																		e.currentTarget
																			.querySelector('input')
																			?.click()
																	}}
																	onKeyDown={(e) => {
																		if (e.key === 'Enter' || e.key === ' ') {
																			e.currentTarget
																				.querySelector('input')
																				?.click()
																		}
																	}}
																	className="h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground flex items-center justify-center cursor-pointer relative"
																>
																	<Input
																		onChange={
																			fileAttachmentActions.handleFileSelect
																		}
																		tabIndex={-1}
																		id={`file-attachments-${formId}`}
																		className="absolute opacity-0 size-full !cursor-pointer p-0 disabled:opacity-0"
																		accept="image/*,text/*"
																		type="file"
																		disabled={Boolean(
																			userData.userAttachments?.length,
																		)}
																		multiple
																	/>
																	<PaperclipIcon className="p-0.5 z-0 cursor-pointer" />
																</div>
															</PopoverTrigger>
															<PopoverContent className="w-[320px]">
																<Command>
																	<CommandGroup>
																		<CommandList className="overflow-hidden w-full p-0">
																			{userData.userAttachments?.length > 0 && (
																				<Accordion type="single" collapsible>
																					<AccordionItem
																						value={`user-attachments-${formId}`}
																					>
																						<AccordionTrigger className="sticky top-0 p-2">
																							<SaveIcon className="size-4" />{' '}
																							Saved Attachments (
																							{userData.userAttachments
																								.length || 0}
																							)
																						</AccordionTrigger>
																						<AccordionContent className="scrollbar h-full max-h-[200px] md:max-h-[300px] w-full">
																							<UserAttachments
																								attachments={userData.userAttachments.map(
																									(
																										attachment: FileAttachment,
																									) => ({
																										...attachment,
																										isSelected:
																											attachments.some(
																												(a) =>
																													a.id ===
																													attachment.id,
																											),
																									}),
																								)}
																								onChange={
																									fileAttachmentActions.toggleAttachmentSelection
																								}
																							/>
																						</AccordionContent>
																					</AccordionItem>
																				</Accordion>
																			)}

																			<CommandItem
																				asChild
																				className="bg-transparent"
																			>
																				<Button
																					variant="outline"
																					size="lg"
																					className="w-full mt-4 mb-1 cursor-pointer"
																					onClick={triggerNativeFileInput}
																				>
																					<FilePlusIcon className="size-4 mr-2" />
																					Add Attachments
																				</Button>
																			</CommandItem>
																		</CommandList>
																	</CommandGroup>
																</Command>
															</PopoverContent>
														</Popover>
													)}

													{/* Submit button */}
													<button
														type="submit"
														className="shrink-0 h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50"
														disabled={
															isLoading ||
															!inputValue.trim() ||
															(isWorkspaceActive && !selectedSection)
														}
														aria-label="Send message"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														>
															<path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
														</svg>
													</button>
												</div>
											</form>
										</div>
									</div>
								)}
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
	onClose: externalOnClose,
}: {
	messages: (AiMessage | Message)[]
	isBrowseView: boolean
	onClose?: () => void
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
		// Allow external close handler to run if provided
		if (externalOnClose) {
			externalOnClose()
		}

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
