'use client'

import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { PromptForm } from '@/components/routes/chat/prompt-form'
import { WorkspaceContent } from '@/components/routes/workspace/workspace-content'
import { useState, useEffect, useRef, useMemo } from 'react'
import { WorkspaceDepartmentSelect } from '@/components/routes/workspace/workspace-department-select'
import { WorkspaceDocumentSelect } from '@/components/routes/workspace/workspace-document-select'
import { WorkspaceForm } from '@/components/routes/workspace/workspace-form'
import { WorkspaceOrganizationSelect } from '@/components/routes/workspace/workspace-organization-select'
import { WorkspaceProjectSelect } from '@/components/routes/workspace/workspace-project-select'
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
	DialogTrigger,
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
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { createStructuredMarkdown } from '@/lib/markdown-utils'
import { logErrorToSentry } from '@/lib/sentry'
import { cn } from '@/lib/utils'
import type { Message as AiMessage } from 'ai'
import type { UseChatHelpers } from 'ai/react'
import {
	BrainIcon,
	ChevronsLeftRightEllipsis,
	FileEditIcon,
	FileTextIcon,
	GlobeIcon,
	GraduationCap,
	ImageIcon,
	TableIcon,
	ChevronDownIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot } from 'mb-genql'
import { useCallback } from 'react'

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
	id,
	title,
	isLoading,
	stop,
	append,
	reload,
	input,
	setInput,
	messages,
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
	const { isOpenPopup, loadingState, webSearch, setWebSearch } = useThread()
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
		setDocumentContent,
	} = useWorkspace()
	
	// Document type state
	const [documentType, setDocumentType] = useState<'text' | 'image' | 'spreadsheet'>('text')
	
	// Initialize filteredDocumentList as null to force the useEffect to run on mount
	const [filteredDocumentList, setFilteredDocumentList] = useState<Record<string, string[]> | null>(null)
	
	// Effect to initialize filteredDocumentList on mount and update on document type change
	useEffect(() => {
		// Default to textDocuments if filteredDocumentList is null (initial mount)
		if (filteredDocumentList === null || documentType === 'text') {
			console.log("Setting text documents:", Object.keys(textDocuments))
			setFilteredDocumentList(textDocuments)
		} else if (documentType === 'image') {
			console.log("Setting image documents:", Object.keys(imageDocuments))
			setFilteredDocumentList(imageDocuments)
		} else if (documentType === 'spreadsheet') {
			console.log("Setting spreadsheet documents:", Object.keys(spreadsheetDocuments))
			setFilteredDocumentList(spreadsheetDocuments)
		}
	}, [documentType, textDocuments, imageDocuments, spreadsheetDocuments, filteredDocumentList])
	
	// Separate effect for document reset to avoid infinite loops
	// Only runs when document type actually changes
	const previousDocTypeRef = useRef(documentType);
	useEffect(() => {
		if (previousDocTypeRef.current !== documentType) {
			// Only reset if document type has changed
			setActiveDocument(null);
			previousDocTypeRef.current = documentType;
		}
	}, [documentType, setActiveDocument])

	// Use departmentList as departmentsByOrg since they contain the same data
	const departmentsByOrg = departmentList

	const handleContinueGeneration = async () => {
		const continuationPrompt = getContinuationPrompt()

		try {
			await appendWithMbContextPrompts({
				// id: crypto.randomUUID(),
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
		const message = messages.find((m) => m.id === messageId)
		if (message) {
			setSelectedMessageId(messageId)
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
		setSelectedMessageId(null)
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
	
	// Memoize document options to prevent unnecessary re-renders
	const documentOptions = useMemo(() => {
		// Check if activeProject is valid
		if (!activeProject) {
			return [];
		}
		
		// If filteredDocumentList is null, use textDocuments as fallback
		const documentSource = filteredDocumentList || textDocuments;
		
		// Check if documentSource is valid
		if (!documentSource) {
			return [];
		}
		
		// Check if the project exists in the document source
		if (!(activeProject in documentSource)) {
			return [];
		}
		
		// Return the document list for this project, or an empty array if it's undefined
		return documentSource[activeProject] || [];
	}, [activeProject, filteredDocumentList, textDocuments])

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
					<div className="flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0">
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
									{messages.length > 0 && appConfig.features.devMode && (
										<Button
											variant="ghost"
											size="icon"
											title="Convert Last Message to Document"
											onClick={() => {
												// Find the last assistant message
												const lastAssistantMessage = [...messages]
													.reverse()
													.find((m) => m.role === 'assistant')

												if (lastAssistantMessage && lastAssistantMessage.id) {
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
							{isWorkspaceActive && (
								<div className="flex-grow">
									{/* Empty div to maintain header layout */}
								</div>
							)}

							{/* Right side controls - always shown */}
							<div className="flex items-center gap-3.5">
								{showReload && (isLoading || isPreProcessing) && (
									<>
										{loadingState !== 'finished' && (
											<LoadingIndicator state={loadingState} />
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
								{!isWorkspaceActive && messages?.length >= 2 && (
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
								{!isWorkspaceActive && id && title && (
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
												id,
												title,
												messages,
											}}
										/>
									</>
								)}
							</div>
						</div>
					</div>

					{/* Workspace Section (conditionally shown) */}
					{isWorkspaceActive && (
						<div className="w-full h-[calc(100vh-220px)] bg-background border rounded-md shadow-sm">
							{/* Organization/Department/Project/Document selectors at top right of workspace */}
							<div className="flex justify-end p-2 bg-background">
								<div className="flex items-center gap-4">
									<WorkspaceOrganizationSelect
										value={activeOrganization}
										onChange={(newOrg) => {
											// Skip if the value hasn't actually changed
											if (newOrg === activeOrganization) {
												console.log('Organization unchanged, skipping update')
												return
											}
											console.log('Setting org to:', newOrg)
											setActiveOrganization(newOrg)
										}}
										options={organizationList || []}
									/>
									<WorkspaceDepartmentSelect
										value={activeDepartment}
										onChange={(newDept) => {
											// Skip if the value hasn't actually changed
											if (newDept === activeDepartment) {
												console.log('Department unchanged, skipping update')
												return
											}
											console.log('Setting dept to:', newDept)
											setActiveDepartment(newDept)
										}}
										options={
											activeOrganization &&
											departmentsByOrg &&
											departmentsByOrg[activeOrganization]
												? departmentsByOrg[activeOrganization]
												: []
										}
										disabled={!activeOrganization}
									/>
									<WorkspaceProjectSelect
										value={activeProject}
										onChange={(newProj) => {
											// Skip if the value hasn't actually changed
											if (newProj === activeProject) {
												console.log('Project unchanged, skipping update')
												return
											}
											console.log('Setting project to:', newProj)
											setActiveProject(newProj)
										}}
										options={
											activeOrganization &&
											activeDepartment &&
											projectsByDept &&
											projectsByDept[activeOrganization] &&
											projectsByDept[activeOrganization][activeDepartment]
												? projectsByDept[activeOrganization][activeDepartment]
												: []
										}
										disabled={!activeDepartment}
									/>
									{/* Document Type Selector */}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button 
												variant="outline" 
												className="flex items-center gap-2" 
												disabled={!activeProject}
											>
												{documentType === 'text' && <FileTextIcon className="h-4 w-4" />}
												{documentType === 'image' && <ImageIcon className="h-4 w-4" />}
												{documentType === 'spreadsheet' && <TableIcon className="h-4 w-4" />}
												<span>
													{documentType === 'text' && 'Text Documents'}
													{documentType === 'image' && 'Image Documents'}
													{documentType === 'spreadsheet' && 'Spreadsheets'}
												</span>
												<ChevronDownIcon className="h-4 w-4 opacity-70" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem onClick={() => setDocumentType('text')}>
												<FileTextIcon className="h-4 w-4 mr-2" />
												<span>Text Documents</span>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => setDocumentType('image')}>
												<ImageIcon className="h-4 w-4 mr-2" />
												<span>Image Documents</span>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => setDocumentType('spreadsheet')}>
												<TableIcon className="h-4 w-4 mr-2" />
												<span>Spreadsheets</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<WorkspaceDocumentSelect
										value={activeDocument}
										onChange={(newDoc) => {
											// Skip if the value hasn't actually changed
											if (newDoc === activeDocument) {
												console.log('Document unchanged, skipping update')
												return
											}
											console.log('Setting document to:', newDoc)
											setActiveDocument(newDoc)
										}}
										options={documentOptions}
										disabled={!activeProject || documentOptions.length === 0}
									/>
								</div>
							</div>
							<WorkspaceContent
								projectName={activeProject}
								documentName={activeDocument}
								documentType={documentType}
								isLoading={isLoading}
								className="h-[calc(100%-48px)] overflow-auto"
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
									if (isWorkspaceActive) {
										// In workspace mode, use input for editing the document
										console.log(
											'AI assist requested for document:',
											activeDocument,
											'with query:',
											value,
										)
										// Here we would handle the workspace edit operation
									} else {
										// In chat mode, use normal append behavior
										scrollToBottom()
										await append(
											{
												id,
												content: value,
												role: 'user',
											},
											prepareMessageOptions(chatOptions),
										)
									}
								}}
								// biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
								disabled={
									(isWorkspaceActive && (!activeProject || !activeDocument)) ||
									isLoading ||
									(!isWorkspaceActive && !Boolean(chatbot)) ||
									isPreProcessing
								}
								input={input}
								setInput={setInput}
								isLoading={isLoading || isPreProcessing}
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
							<label className="text-right text-sm font-medium">Project</label>
							<div className="col-span-3">
								<Select
									value={targetProject || ''}
									onValueChange={(value) => {
										setTargetProject(value || null)
										setTargetDocument(null) // Reset document when project changes
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a project" />
									</SelectTrigger>
									<SelectContent>
										{projectList.map((project) => (
											<SelectItem key={project} value={project}>
												{project}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label className="text-right text-sm font-medium">Document</label>
							<div className="col-span-3">
								<Select
									value={targetDocument || ''}
									onValueChange={(value) => setTargetDocument(value || null)}
									disabled={!targetProject}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a document" />
									</SelectTrigger>
									<SelectContent>
										{targetProject &&
											documentList[targetProject]?.map((doc) => (
												<SelectItem key={doc} value={doc}>
													{doc}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="grid grid-cols-4 items-start gap-4">
							<label className="text-right text-sm font-medium pt-2">
								Content
							</label>
							<div className="col-span-3">
								<Textarea
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