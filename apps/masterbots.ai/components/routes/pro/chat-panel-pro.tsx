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
import { type UseChatHelpers, useChat } from '@ai-sdk/react'
import type { Message as AiMessage } from 'ai'
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
	const {
		isOpenPopup,
		loadingState,
		webSearch,
		setWebSearch,
		refreshActiveThread,
		activeThread,
		setIsOpenPopup,
	} = useThread()
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
		input: workspaceInput,
		append: workspaceAppend,
		messages: workspaceMessages,
		workspaceProcessingState,
		setInput: setWorkspaceInput,
		setWorkspaceProcessingState,
		activeWorkspaceSection,
		setActiveWorkspaceSection,
		cursorPosition: workspaceCursorPosition,
		handleWorkspaceEdit: workspaceHandleEdit,
		handleDocumentUpdate: workspaceHandleDocumentUpdate,
	} = useWorkspaceChat()

	// console.log('🔄 ChatPanelPro workspaceMessages:', workspaceMessages)
	const [, { appendWithMbContextPrompts }] = useMBChat()
	const {
		isWorkspaceActive,
		toggleWorkspace,
		activeOrganization,
		setActiveOrganization,
		activeDepartment,
		setActiveDepartment,
		activeProject,
		setActiveProject,
		activeDocument,
		setActiveDocument,
		organizationList,
		departmentList,
		projectList,
		documentList,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
		projectsByDept,
		documentContent,
		setDocumentContent,
		activeDocumentType,
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
	const setDocumentType = (v: 'text' | 'image' | 'spreadsheet') =>
		setActiveDocumentType(v)

	// Sync selection dropdowns to respect null/None
	useEffect(() => {
		if (activeDocument === undefined) {
			setActiveDocument(null)
		}
	}, [activeDocument, setActiveDocument])

	// IndexedDB for local document raw storage (reuse attachment DB)
	const { addItem: addIndexedItem, updateItem: updateIndexedItem } =
		useIndexedDB({})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleSaveDocument = useCallback(async () => {
		try {
			if (!activeProject || !activeDocument) return
			// Determine type when All is selected
			const docType: 'text' | 'image' | 'spreadsheet' =
				activeDocumentType === 'all' ? 'text' : activeDocumentType
			// Resolve current content
			const key = `${activeProject}:${activeDocument}`
			const content = documentContent?.[key] || ''
			if (!content.trim()) return

			// Create new thread if one doesn't exist - Fixed thread creation for workspace mode
			let threadSlug = activeThread?.slug
			if (!threadSlug && session?.user?.hasuraJwt && chatbot) {
				const newThreadId = nanoid(12)
				const newThreadSlug = `${chatbot.name.toLowerCase().replace(/\s+/g, '-')}-${newThreadId}`

				try {
					// Include workspace metadata in thread creation
					const threadMetadata = {
						documents:
							activeProject && activeDocument
								? [
										{
											id: activeDocument, // Use document name as ID for now
											project: activeProject,
											name: activeDocument,
											type: docType as 'text' | 'image' | 'spreadsheet',
											currentVersion: 1,
											versions: [],
										},
									]
								: [],
						organization: activeOrganization,
						department: activeDepartment,
						isWorkspaceThread: isWorkspaceActive,
					}

					const createdThread = await createThread({
						threadId: newThreadId,
						chatbotId: chatbot.chatbotId,
						slug: newThreadSlug,
						jwt: session.user.hasuraJwt,
						userId: session.user.id,
						model: 'OPENAI',
						isPublic: false,
					})

					if (createdThread?.threadId) {
						threadSlug = createdThread.slug || newThreadSlug
						// Update the thread with workspace metadata after creation
						try {
							await updateThreadDocumentsMetadata({
								threadSlug,
								documents: threadMetadata.documents,
							})
							// Refresh the active thread to include the new metadata
							refreshActiveThread(
								createdThread.threadId,
								session.user.hasuraJwt,
							)
						} catch (metadataError) {
							console.warn(
								'Failed to update thread metadata, continuing with document save:',
								metadataError,
							)
						}
					}
				} catch (error) {
					console.error('Failed to create thread for document save:', error)
					return
				}
			}

			if (!threadSlug) return

			const { document } = await uploadWorkspaceDocumentToBucket({
				threadSlug,
				project: activeProject,
				name: activeDocument,
				content,
				type: docType,
			})
			// Store raw locally in IndexedDB similar to attachments
			const id = document?.id || nanoid(12)
			// Convert content to base64 data URL (browser compatible)
			const base64 = await new Promise<string>((resolve, reject) => {
				try {
					const blob = new Blob([content], { type: 'text/markdown' })
					const reader = new FileReader()
					reader.onloadend = () => resolve(reader.result as string)
					reader.onerror = reject
					reader.readAsDataURL(blob)
				} catch (err) {
					reject(err)
				}
			})
			const item = {
				id,
				name: activeDocument,
				project: activeProject,
				type: docType,
				url: base64,
				content: base64,
				size: new Blob([content]).size,
				messageIds: [],
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
			} as unknown as IndexedDBItem
			try {
				updateIndexedItem(id, item)
			} catch {
				addIndexedItem(item)
			}
		} catch (e) {
			console.error('Failed to save document', e)
		}
	}, [
		activeProject,
		activeDocument,
		activeDocumentType,
		documentContent,
		updateIndexedItem,
		addIndexedItem,
		activeThread,
		session,
		chatbot,
	])

	// Use departmentList as departmentsByOrg since they contain the same data
	const departmentsByOrg = departmentList

	const handleContinueGeneration = async () => {
		const continuationPrompt = getContinuationPrompt()

		try {
			await appendWithMbContextPrompts({
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
	const hiddenAnimationClasses =
		'p-2 gap-0 w-auto relative overflow-hidden [&:hover_span]:opacity-100 [&:hover_span]:w-auto [&:hover_span]:duration-300 [&:hover_svg]:mr-2 [&:hover_span]:transition-all'
	const hiddenAnimationItemClasses =
		'transition-all w-[0px] opacity-0 whitespace-nowrap duration-300'

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

	// Function to create meta prompt with document context and chatbot expertise
	const createDocumentMetaPrompt = (
		userPrompt: string,
		documentContent: string,
		activeSection: string | null,
	) => {
		console.log('📝 Creating meta prompt with:', {
			userPromptLength: userPrompt.length,
			documentContentLength: documentContent.length,
			activeSection,
			hasDocumentContent: !!documentContent,
		})

		const sections = parseMarkdownSections(documentContent)
		const sectionsContext = sections
			.map(
				(section) =>
					`## ${section.title} (Level ${section.level})\n${section.content}\n`,
			)
			.join('\n')

		const focusedSection = activeSection
			? sections.find((s) => s.id === activeSection)
			: null

		console.log('📝 Meta prompt details:', {
			totalSections: sections.length,
			focusedSectionTitle: focusedSection?.title,
			sectionsContextLength: sectionsContext.length,
		})

		// Add chatbot expertise if available
		let chatbotExpertise = ''
		if (chatbot?.prompts && chatbot.prompts.length > 0) {
			const expertisePrompts = chatbot.prompts
				.filter((p) => p.prompt.type === 'prompt')
				.map((p) => `<expertise>\n${p.prompt.content}\n</expertise>`)
				.join('\n\n')

			const instructionPrompts = chatbot.prompts
				.filter((p) => p.prompt.type === 'instruction')
				.map((p) => `<instructions>\n${p.prompt.content}\n</instructions>`)
				.join('\n\n')

			chatbotExpertise = `\n\nCHATBOT EXPERTISE:\n${expertisePrompts}\n\n${instructionPrompts}\n`
		}

		// Create focused or general instructions based on active section
		let taskInstructions = ''
		let outputFormat = ''

		if (!focusedSection) {
			console.error('NO FOCUSED SECTION FOUND!')
			return ''
		}

		// Section-specific editing mode
		taskInstructions = `
EDITING MODE: SECTION UPDATE
You are editing a specific section of a larger document. The user has selected the section "${focusedSection.title}" for editing.

FULL DOCUMENT STRUCTURE:
${sectionsContext}

CURRENT SECTION BEING EDITED:
## ${focusedSection.title} (Level ${focusedSection.level})
${focusedSection.content}

USER REQUEST: ${userPrompt}

IMPORTANT: You should ONLY return the updated content for the "${focusedSection.title}" section. Do NOT include the entire document or other sections in your response.`

		outputFormat = `
<output_format>
Return ONLY the updated content for the "${focusedSection.title}" section. Your response should be the new content that will replace the existing section content.

ACCEPTABLE FORMATS:
1. Plain text content (will be inserted as-is into the section).
2. Markdown content with subsections (H3, H4, etc.) that belong under "${focusedSection.title}".

DO NOT INCLUDE:
- The section heading itself (## ${focusedSection.title}).
- Other sections from the document.
- Complete document restructure.
- Content that belongs to other sections.
</output_format>`
		// 			// Full document mode
		// 			taskInstructions = `
		// EDITING MODE: FULL DOCUMENT
		// You are working with the entire document. The user has not selected a specific section.

		// FULL DOCUMENT:
		// ${sectionsContext}

		// USER REQUEST: ${userPrompt}`

		// 			outputFormat = `
		// <output_format>
		// Since no specific section is selected, you can:
		// 1. Add new sections to the document
		// 2. Provide content that spans multiple sections
		// 3. Suggest document-wide improvements

		// Format your response as complete markdown with appropriate headings.
		// </output_format>`

		return `You are an expert document editor and content creator working with specialized chatbot expertise.${chatbotExpertise}

${taskInstructions}

${outputFormat}

INSTRUCTIONS:
1. Apply your specialized expertise to the document editing task
2. Analyze the user's request in the context of the provided document
3. Maintain the document's style and tone while applying your expertise
4. Focus on providing valuable, actionable content improvements
5. Ensure your response integrates well with the existing document structure

Please provide your response now:`
	}

	const chatId = useMemo(() => {
		return id || `chat-panel-${nanoid(16)}`
	}, [id])

	return (
		<>
			<div
				className={cn(
					'z-[2] fixed inset-x-0 bottom-0 w-full',
					'pb-4',
					'animate-in duration-300 ease-in-out',
					'bg-gradient-to-b from-background/50 to-background',
					'dark:from-background/0 dark:to-background/80',
					'lg:pl-[250px] xl:pl-[300px]',
					className,
				)}
			>
				<div className="relative w-full mx-auto">
					{/* Header Section */}
					<div
						className={cn(
							'flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0',
							isWorkspaceActive && 'hidden',
						)}
					>
						<div className="flex items-center justify-between w-full gap-4 mx-2">
							{!isWorkspaceActive && (
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
												console.log(
													'ChatPanelPro: Toggle Web Search:',
													newValue,
												)
												setWebSearch()
											}}
											activeColor="cyan"
										/>
									)}

									{appConfig.features.devMode && (
										<FeatureToggle
											id="workspace"
											name="Workspace"
											icon={<FileEditIcon />}
											activeIcon={<FileEditIcon />}
											isActive={isWorkspaceActive}
											onChange={toggleWorkspace}
											activeColor="cyan"
										/>
									)}

									{/* Convert to Document Button - only shown when workspace is inactive */}
									{workspaceMessages &&
										workspaceMessages.length > 0 &&
										appConfig.features.devMode && (
											<Button
												variant="ghost"
												size="icon"
												title="Convert Last Message to Document"
												onClick={() => {
													// Find the last assistant message
													const lastAssistantMessage = [...workspaceMessages]
														.reverse()
														.find((m) => m.role === 'assistant')

													if (lastAssistantMessage?.id) {
														handleOpenConvertDialog(lastAssistantMessage.id)
													}
												}}
												className="text-muted-foreground hover:text-primary relative group"
											>
												<FileTextIcon className="h-4 w-4" />
												<span className="sr-only">Convert Last Message</span>
												<span className="absolute whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity right-full mr-2 text-xs bg-background border rounded px-1 py-0.5">
													Convert Message
												</span>
											</Button>
										)}
								</div>
							)}

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

					{/* Workspace Section (conditionally shown) */}
					{isWorkspaceActive && (
						<div
							className={cn(
								'w-full bg-background border rounded-md shadow-sm',
								activeThread
									? 'h-[calc(100vh-424px)]'
									: 'h-[calc(100vh-220px)]',
							)}
						>
							{/* Removed duplicate document type dropdown. Breadcrumb is source of truth. */}
							<WorkspaceContent
								key={`workspace-${activeProject}-${activeDocument}-${activeDocumentType}`}
								isLoading={isLoading}
								className="size-full overflow-auto scrollbar"
								chatbot={chatbot}
							/>
						</div>
					)}

					{/* Prompt Form (always shown) */}
					<div
						className={cn(
							'relative flex flex-col w-full',
							'pt-3 pb-2 px-2 md:px-4 space-y-2 sm:space-y-2',
							'border-t shadow-lg bg-background',
							'dark:border-zinc-800 border-zinc-200',
							isOpenPopup ? 'dark:border-mirage border-iron' : '',
							'min-h-[64px] sm:min-h-[80px]',
						)}
					>
						{/* Feature Toggle Toolbar - shown here only when workspace is active */}
						{isWorkspaceActive && (
							<div className="flex items-center space-x-6 border-b dark:border-zinc-800 border-zinc-200 pb-[10px] pt-0 -mx-4 px-4 w-[calc(100%+2rem)] mb-0">
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

								{appConfig.features.devMode && (
									<FeatureToggle
										id="workspace"
										name="Workspace"
										icon={<FileEditIcon />}
										activeIcon={<FileEditIcon />}
										isActive={isWorkspaceActive}
										onChange={toggleWorkspace}
										activeColor="cyan"
									/>
								)}
							</div>
						)}
						<div className="mt-[1px]">
							<PromptForm
								onSubmit={async (value, chatOptions) => {
									console.log('🎯 PromptForm onSubmit called:', {
										value,
										isWorkspaceActive,
										activeProject,
										activeDocument,
										documentContent,
										appendFunction: typeof workspaceAppend,
									})

									if (isWorkspaceActive) {
										// ISSUE 1 FIX: Workspace mode should create/link thread properly
										console.log(
											'🏢 Workspace mode: AI assist requested for document:',
											activeDocument,
											'with query:',
											value,
										)

										// If no active thread exists, create one with workspace metadata
										if (
											!activeThread &&
											activeProject &&
											session?.user &&
											chatbot
										) {
											console.log(
												'Creating new thread for workspace interaction...',
											)
											try {
												const newThreadId = nanoid(12)
												const newThreadSlug =
													`${activeProject}-${activeDocument || 'workspace'}-${Date.now()}`
														.toLowerCase()
														.replace(/[^a-z0-9-]/g, '-')

												const createdThread = await createThread({
													threadId: newThreadId,
													chatbotId: chatbot.chatbotId,
													slug: newThreadSlug,
													jwt: session.user.hasuraJwt,
													userId: session.user.id,
													model: 'OPENAI',
													isPublic: false,
												})

												if (createdThread?.threadId) {
													// Update thread with workspace metadata
													await updateThreadDocumentsMetadata({
														threadSlug: createdThread.slug || newThreadSlug,
														documents: [
															{
																id: `${activeProject}:${activeDocument || 'workspace'}`,
																project: activeProject,
																name: activeDocument || 'workspace',
																type: 'text',
																currentVersion: 1,
																versions: [],
															},
														],
													})

													// Open popup to show the thread is being created
													setIsOpenPopup(true)

													console.log(
														'Thread created and linked to workspace:',
														createdThread.slug,
													)
												}
											} catch (error) {
												console.error(
													'Failed to create workspace thread:',
													error,
												)
											}
										}

										// Get current document content for meta prompt
										const documentKey = `${activeProject}:${activeDocument}`
										const currentContent = documentContent?.[documentKey] || ''

										// Create meta prompt with document context
										const metaPrompt = createDocumentMetaPrompt(
											value,
											currentContent,
											activeWorkspaceSection,
										)

										// ISSUE 6 FIX: Connect workspace messages with chat messages
										// Store the original message in both systems
										const messageData = {
											id: nanoid(),
											content: value,
											role: 'user' as const,
											createdAt: new Date(),
										}

										// Add to main chat context via workspaceAppend
										if (workspaceAppend) {
											await workspaceAppend(
												messageData,
												prepareMessageOptions(chatOptions),
											)
										}

										// Then process workspace edit
										await workspaceHandleEdit(
											value,
											metaPrompt,
											workspaceCursorPosition,
										)
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
								}}
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
		</>
	)
}
