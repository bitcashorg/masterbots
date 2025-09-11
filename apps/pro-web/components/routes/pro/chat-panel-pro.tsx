'use client'

import {
	updateThreadDocumentsMetadata,
	uploadWorkspaceDocumentToBucket,
} from '@/app/actions/thread.actions'
import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { PromptForm } from '@/components/routes/chat/prompt-form'
import { WorkspaceContent } from '@/components/routes/workspace/workspace-content'
import { ButtonScrollToBottom } from '@/components/shared/button-scroll-to-bottom'
import { FeatureToggle } from '@/components/shared/feature-toggle'
import { LoadingIndicator } from '@/components/shared/loading-indicator'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconShare, IconStop } from '@/components/ui/icons'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createWorkspaceMetaPrompt } from '@/lib/constants/prompts'
import { useContinueGeneration } from '@/lib/hooks/use-continue-generation'
import { useDeepThinking } from '@/lib/hooks/use-deep-thinking'
import { type IndexedDBItem, useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useModel } from '@/lib/hooks/use-model'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useWorkspaceChat } from '@/lib/hooks/use-workspace-chat'
import {
	createStructuredMarkdown,
	parseMarkdownSections,
} from '@/lib/markdown-utils'
import { logErrorToSentry } from '@/lib/sentry'
import { cn } from '@/lib/utils'
import { createThread } from '@/services/hasura'
import type { WorkspaceDocumentMetadata } from '@/types/thread.types'
import { type UseChatHelpers, UseChatOptions, useChat } from '@ai-sdk/react'
import type { Message as AiMessage, ChatRequestOptions } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import {
	BrainIcon,
	ChevronDownIcon,
	ChevronsLeftRightEllipsis,
	FileEditIcon,
	FileTextIcon,
	GlobeIcon,
	GraduationCap,
	ImageIcon,
	SaveIcon,
	TableIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot, Thread } from 'mb-genql'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface ChatPanelProProps
	extends Pick<
		UseChatHelpers,
		'append' | 'isLoading' | 'reload' | 'stop' | 'input' | 'setInput'
	> {
	scrollToBottom: () => void
	id?: string
	title?: string
	chatbot?: Chatbot
	showReload?: boolean
	placeholder: string
	isAtBottom?: boolean
	className?: string
	messages: AiMessage[]
	onConvertToDocument?: (messageId: string) => void
	// Dialog state props - optional, only pass if you want to control the dialog externally
	convertDialogOpen?: boolean
	setConvertDialogOpen?: (isOpen: boolean) => void
	selectedMessageId?: string | null
	convertedText?: string
	setConvertedText?: (text: string) => void
	targetProject?: string | null
	setTargetProject?: (project: string | null) => void
	targetDocument?: string | null
	setTargetDocument?: (document: string | null) => void
}

const hiddenAnimationClasses =
	'p-2 gap-0 w-auto relative overflow-hidden [&:hover_span]:opacity-100 [&:hover_span]:w-auto [&:hover_span]:duration-300 [&:hover_svg]:mr-2 [&:hover_span]:transition-all'
const hiddenAnimationItemClasses =
	'transition-all w-[0px] opacity-0 whitespace-nowrap duration-300'

export function ChatPanelPro({
	title,
	id,
	isLoading,
	chatbot,
	placeholder,
	showReload = true,
	isAtBottom,
	scrollToBottom,
	className,
	onConvertToDocument,
	// Dialog state props - if provided, use them, otherwise use local state
	convertDialogOpen: externalConvertDialogOpen,
	setConvertDialogOpen: externalSetConvertDialogOpen,
	selectedMessageId: externalSelectedMessageId,
	convertedText: externalConvertedText,
	setConvertedText: externalSetConvertedText,
	targetProject: externalTargetProject,
	setTargetProject: externalSetTargetProject,
	targetDocument: externalTargetDocument,
	setTargetDocument: externalSetTargetDocument,
}: ChatPanelProProps) {
	const { isOpenPopup, loadingState, webSearch, activeThread, setWebSearch } =
		useThread()
	const { data: session } = useSession()
	const { isPowerUp, togglePowerUp } = usePowerUp()
	const { isDeepThinking, toggleDeepThinking } = useDeepThinking()
	const [shareDialogOpen, setShareDialogOpen] = useState(false)

	// Use either external state (if provided) or local state for conversion dialog
	const [localConvertDialogOpen, setLocalConvertDialogOpen] = useState(false)
	const [localSelectedMessageId, setLocalSelectedMessageId] = useState<
		string | null
	>(null)
	const [localConvertedText, setLocalConvertedText] = useState('')
	const [localTargetProject, setLocalTargetProject] = useState<string | null>(
		null,
	)
	const [localTargetDocument, setLocalTargetDocument] = useState<string | null>(
		null,
	)

	// Use either external or local state
	const convertDialogOpen =
		externalConvertDialogOpen !== undefined
			? externalConvertDialogOpen
			: localConvertDialogOpen
	const setConvertDialogOpen =
		externalSetConvertDialogOpen || setLocalConvertDialogOpen
	const selectedMessageId =
		externalSelectedMessageId !== undefined
			? externalSelectedMessageId
			: localSelectedMessageId
	const convertedText =
		externalConvertedText !== undefined
			? externalConvertedText
			: localConvertedText
	const setConvertedText = externalSetConvertedText || setLocalConvertedText
	const targetProject =
		externalTargetProject !== undefined
			? externalTargetProject
			: localTargetProject
	const setTargetProject = externalSetTargetProject || setLocalTargetProject
	const targetDocument =
		externalTargetDocument !== undefined
			? externalTargetDocument
			: localTargetDocument
	const setTargetDocument = externalSetTargetDocument || setLocalTargetDocument

	const {
		getContinuationPrompt,
		continueGeneration,
		setIsCutOff,
		setIsContinuing,
	} = useContinueGeneration()

	// Use workspace chat hook for workspace-specific functionality
	const {
		workspaceProcessingState,
		activeWorkspaceSection,
		input: workspaceInput,
		messages: workspaceMessages,
		selectionRange,
		append: workspaceAppend,
		setInput: setWorkspaceInput,
		handleWorkspaceEdit: workspaceHandleEdit,
		handleDocumentUpdate: workspaceHandleDocumentUpdate,
	} = useWorkspaceChat()
	const {
		isWorkspaceActive,
		activeOrganization,
		activeDepartment,
		activeProject,
		activeDocument,
		departmentList,
		projectList,
		documentList,
		documentContent,
		activeDocumentType,
		toggleWorkspace,
		setActiveDocument,
		setDocumentContent,
		setActiveDocumentType,
	} = useWorkspace()

	// Add debug logging to track ChatPanelPro re-renders
	useEffect(() => {
		console.log('🔍 ChatPanelPro re-render detected:', {
			isWorkspaceActive,
			activeProject,
			activeDocument,
			activeDocumentType,
			hasDocumentContent: !!documentContent,
			timestamp: Date.now(),
		})
	}, [
		isWorkspaceActive,
		activeProject,
		activeDocument,
		activeDocumentType,
		documentContent,
	])

	// Keep a local mirror for UI only, but source of truth is workspace
	const documentType =
		activeDocumentType === 'all' ? 'text' : activeDocumentType

	// Use departmentList as departmentsByOrg since they contain the same data
	const departmentsByOrg = departmentList

	const handleContinueGeneration = async () => {
		const continuationPrompt = getContinuationPrompt()

		try {
			await workspaceAppend?.({
				id: chatId,
				role: 'user',
				content: continuationPrompt,
			})
			await continueGeneration()
		} catch (error) {
			console.error('Error during continuation flow:', error)

			logErrorToSentry('Continuation generation failed', {
				error,
				message: 'Failed to generate continuation for the response.',
				level: 'error',
				extra: {
					continuationPrompt,
					chatbotName: chatbot?.name,
				},
				tags: {
					feature: 'continuation-flow',
					component: 'ChatPanelPro',
				},
			})
		} finally {
			//? Reset states
			setIsCutOff(false)
			setIsContinuing(false)
		}
	}

	// Open the convert dialog for a specific message
	const handleOpenConvertDialog = (messageId: string) => {
		const message = workspaceMessages?.find((m) => m.id === messageId)
		if (message) {
			setLocalSelectedMessageId(messageId)
			setConvertedText(message.content)
			setTargetProject(projectList[0] || null)
			setTargetDocument(null)
			setConvertDialogOpen(true)
		}
	}

	// Convert a message to a document
	const handleConvertToDocument = () => {
		if (!targetProject || !targetDocument || !convertedText.trim()) {
			return
		}

		// Format the text if needed
		const hasMarkdown = /^#{1,6}\s+.+$/m.test(convertedText)
		const documentContent = hasMarkdown
			? convertedText
			: createStructuredMarkdown(convertedText)

		// Save to workspace
		setDocumentContent(targetProject, targetDocument, documentContent)

		// If there's an external conversion handler, call it too
		if (onConvertToDocument && selectedMessageId) {
			onConvertToDocument(selectedMessageId)
		}

		// Close dialog and reset
		setConvertDialogOpen(false)
		setLocalSelectedMessageId(null)
		setConvertedText('')
		setTargetProject(null)
		setTargetDocument(null)
	}

	const isPreProcessing = Boolean(
		loadingState?.match(/processing|digesting|polishing/),
	)

	const prepareMessageOptions = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(chatOptions: any) => ({
			...chatOptions,
			powerUp: isPowerUp,
			reasoning: isDeepThinking,
			webSearch: webSearch,
		}),
		[isPowerUp, isDeepThinking, webSearch],
	)

	// Function to get workspace-specific loading messages
	const getWorkspaceLoadingMessage = (state: string | null) => {
		if (workspaceProcessingState === 'analyzing') {
			return activeWorkspaceSection
				? 'Analyzing focused section context...'
				: 'Analyzing document context...'
		}
		if (workspaceProcessingState === 'generating') {
			return activeWorkspaceSection
				? 'Generating section update...'
				: 'Generating content...'
		}
		if (workspaceProcessingState === 'updating') {
			return activeWorkspaceSection
				? 'Updating focused section...'
				: 'Updating document...'
		}
		return 'Processing...'
	}

	const chatId = useMemo(() => {
		return id || `chat-panel-${nanoid(16)}`
	}, [id])

	const handleUserPrompt = async (
		value: string,
		chatOptions?: ChatRequestOptions,
	) => {
		console.log('🎯 PromptForm onSubmit called:', {
			value,
			isWorkspaceActive,
			activeProject,
			activeDocument,
			documentContent,
			appendFunction: typeof workspaceAppend,
		})

		if (isWorkspaceActive) {
			if (!activeProject) {
				console.error('No active project found')
				return
			}

			// Get current document content for meta prompt
			const documentKey = `${activeProject}:${activeDocument}`
			const currentContent = documentContent?.[documentKey] || ''
			// Create meta prompt with document context
			const metaPrompt = createWorkspaceMetaPrompt({
				userPrompt: value,
				taskType: 'edit',
				projectName: activeProject as string,
				documentName: activeDocument as string,
				documentType,
				sections: parseMarkdownSections(currentContent),
				activeSectionTitle: activeWorkspaceSection as string,
			})

			// Then process workspace edit
			await workspaceHandleEdit(value, metaPrompt, selectionRange)
		} else if (workspaceAppend) {
			// In chat mode, use normal workspaceAppend behavior
			console.log('💬 Chat mode: using normal workspaceAppend')
			scrollToBottom()
			await workspaceAppend(
				{
					id: chatId,
					content: value,
					role: 'user',
					createdAt: new Date(),
				},
				prepareMessageOptions(chatOptions),
			)
		}
	}

	return (
		<motion.div
			className="z-50 sticky inset-x-0 bottom-2 w-full max-w-[1032px] mx-auto space-y-2"
			initial={{ opacity: 0, y: 64 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 64 }}
			transition={{ duration: 0.35, ease: 'easeInOut' }}
		>
			{/* Workspace Section (conditionally shown) */}
			<AnimatePresence>
				{isWorkspaceActive && !activeThread && (
					<motion.div
						className={cn(
							'size-full px-4 md:px-10',
							'lg:max-w-[calc(100%-250px)] xl:max-w-[calc(100%-300px)] lg:left-[250px] xl:left-[300px]',
							'flex justify-center items-end fixed bottom-0 pb-[192px] pt-[10%] left-0',
							'h-[calc(100vh-4rem)] backdrop-blur-sm ease-in-out duration-500 z-20',
							'transition-all',
							className,
						)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.35, ease: 'easeInOut' }}
						key="backdrop-workspace-content-chat-panel-pro"
					>
						<motion.div
							className={cn(
								'relative size-full max-w-[1032px] bg-background border shadow-xl rounded-lg',
							)}
							initial={{ y: 640, opacity: 0, height: '0%' }}
							animate={{ y: 0, opacity: 1, height: '100%' }}
							exit={{ y: 640, opacity: 0, height: '0%' }}
							transition={{ duration: 0.35, ease: 'easeInOut' }}
							key="workspace-content-chat-panel-pro"
						>
							<WorkspaceContent
								key={`workspace-${activeProject}-${activeDocument}-${activeDocumentType}`}
								className="size-full overflow-auto scrollbar"
								chatbot={chatbot}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			<div
				className={cn(
					'relative pb-4 shadow-xl rounded-lg z-30 border',
					'animate-in duration-300 ease-in-out',
					'bg-gradient-to-b from-background/90 to-background',
					className,
				)}
			>
				<div className="relative w-full">
					{/* Header Section */}
					<div
						className={cn(
							'flex flex-col items-center justify-between w-full p-2 space-y-2 md:flex-row md:space-y-0',
						)}
					>
						<div className="flex items-center justify-between w-full gap-4 mx-2">
							<div className="flex items-center space-x-6 w-full max-w-[60%] overflow-y-hidden scrollbar scrollbar-thin">
								{/* Chat Feature Toggles - shown in header when workspace is inactive */}
								<FeatureToggle
									id="powerUp"
									name="Deep Expertise"
									icon={<GraduationCap />}
									activeIcon={<GraduationCap />}
									isActive={isPowerUp}
									onChange={togglePowerUp}
									activeColor="yellow"
								/>

								<FeatureToggle
									id="reasoning"
									name="Deep Thinking"
									icon={<BrainIcon />}
									activeIcon={<BrainIcon />}
									isActive={isDeepThinking}
									onChange={() => {
										console.log('ChatPanelPro: Toggle Deep Thinking')
										toggleDeepThinking()
									}}
									activeColor="green"
								/>

								{appConfig.features.webSearch && (
									<FeatureToggle
										id="webSearch"
										name="Web Search"
										icon={<GlobeIcon />}
										activeIcon={<GlobeIcon />}
										isActive={webSearch}
										onChange={(newValue) => {
											console.log('ChatPanelPro: Toggle Web Search:', newValue)
											setWebSearch()
										}}
										activeColor="cyan"
									/>
								)}

								<FeatureToggle
									id="workspace"
									name="Workspace"
									icon={<FileEditIcon />}
									activeIcon={<FileEditIcon />}
									isActive={isWorkspaceActive}
									onChange={toggleWorkspace}
									activeColor="cyan"
								/>
							</div>

							{/* Right side controls - always shown */}
							<div className="flex items-center gap-3.5">
								{showReload && (isLoading || isPreProcessing) && (
									<>
										{loadingState !== 'finished' && (
											<LoadingIndicator state={loadingState} />
										)}
										{isWorkspaceActive && isLoading && (
											<div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
												{getWorkspaceLoadingMessage(loadingState || null)}
											</div>
										)}
										{isLoading && (
											<Button
												variant="outline"
												onClick={stop}
												className="bg-background"
											>
												<IconStop className="mr-2" />
											</Button>
										)}
									</>
								)}
								{!isWorkspaceActive && (
									<ButtonScrollToBottom
										scrollToBottom={scrollToBottom}
										isAtBottom={isAtBottom}
										className={hiddenAnimationClasses}
										textClassName={hiddenAnimationItemClasses}
									/>
								)}
								{!isWorkspaceActive &&
									workspaceMessages &&
									workspaceMessages.length >= 2 && (
										<Button
											variant="outline"
											size="icon"
											className={cn(
												hiddenAnimationClasses,
												'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30 text-yellow-500',
											)}
											onClick={() => handleContinueGeneration()}
										>
											<ChevronsLeftRightEllipsis className="transition-all" />
											<span className={hiddenAnimationItemClasses}>
												Continue message
											</span>
										</Button>
									)}
								{!isWorkspaceActive && chatId && title && (
									<>
										<Button
											variant="outline"
											onClick={() => setShareDialogOpen(true)}
										>
											<IconShare className="mr-2" />
											Share
										</Button>
										<ChatShareDialog
											onCopy={() => setShareDialogOpen(false)}
											chat={{
												id: chatId,
												title,
												messages: workspaceMessages || [],
											}}
										/>
									</>
								)}
							</div>
						</div>
					</div>

					{/* Prompt Form (always shown) */}
					<div
						className={cn(
							'border-t relative flex flex-col w-full',
							'pt-3 pb-2 px-2 md:px-4 space-y-2 sm:space-y-2',
							'dark:border-zinc-800 border-zinc-200',
							isOpenPopup ? 'dark:border-mirage border-iron' : '',
							'min-h-[64px] sm:min-h-[80px]',
						)}
					>
						<div className="mt-[1px]">
							<PromptForm
								onSubmit={handleUserPrompt}
								disabled={
									(isWorkspaceActive && (!activeProject || !activeDocument)) ||
									isLoading ||
									workspaceProcessingState !== 'idle' ||
									// biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
									(!isWorkspaceActive && !Boolean(chatbot)) ||
									isPreProcessing
								}
								input={workspaceInput || ''}
								setInput={setWorkspaceInput || (() => {})}
								isLoading={
									isLoading ||
									isPreProcessing ||
									workspaceProcessingState !== 'idle'
								}
								placeholder={
									isWorkspaceActive
										? 'Ask questions or request edits to your document...'
										: placeholder
								}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Message conversion dialog */}
			<Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
				<DialogContent className="sm:max-w-[625px]">
					<DialogHeader>
						<DialogTitle>Convert Message to Document</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label
								htmlFor="convert-project-select"
								className="text-right text-sm font-medium"
							>
								Project
							</label>
							<div className="col-span-3">
								<Select
									value={targetProject || ''}
									onValueChange={(value) => {
										setTargetProject(value || null)
										setTargetDocument(null) // Reset document when project changes
									}}
								>
									<SelectTrigger id="convert-project-select">
										<SelectValue placeholder="Select a project" />
									</SelectTrigger>
									<SelectContent>
										{projectList.map((project: string) => (
											<SelectItem key={project} value={project}>
												{project}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label
								htmlFor="convert-document-select"
								className="text-right text-sm font-medium"
							>
								Document
							</label>
							<div className="col-span-3">
								<Select
									value={targetDocument || ''}
									onValueChange={(value) => setTargetDocument(value || null)}
									disabled={!targetProject}
								>
									<SelectTrigger id="convert-document-select">
										<SelectValue placeholder="Select a document" />
									</SelectTrigger>
									<SelectContent>
										{targetProject &&
											documentList[targetProject]?.map((doc: string) => (
												<SelectItem key={doc} value={doc}>
													{doc}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid grid-cols-4 items-start gap-4">
							<label
								htmlFor="convert-content-textarea"
								className="text-right text-sm font-medium pt-2"
							>
								Content
							</label>
							<div className="col-span-3">
								<Textarea
									id="convert-content-textarea"
									value={convertedText}
									onChange={(e) => setConvertedText(e.target.value)}
									className="min-h-[200px]"
								/>
								<p className="text-xs text-muted-foreground mt-1">
									Edit content if needed. Markdown formatting will be preserved,
									or automatically created if none exists.
								</p>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button
							onClick={handleConvertToDocument}
							disabled={
								!targetProject || !targetDocument || !convertedText.trim()
							}
						>
							<FileTextIcon className="mr-2 h-4 w-4" />
							Create Document
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</motion.div>
	)
}
