'use client'

import { FeatureToggle } from '@/components/shared/feature-toggle'
import { Button } from '@/components/ui/button'
import { useDeepThinking } from '@/lib/hooks/use-deep-thinking'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { cn } from '@/lib/utils'
import {
	BrainIcon,
	FileEditIcon,
	GlobeIcon,
	GraduationCap,
	NotepadTextIcon,
	SendIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot } from 'mb-genql'
import { useCallback, useState } from 'react'
import { WorkspaceContent } from './workspace-content'
import { WorkspaceDocumentSelect } from './workspace-document-select'
import { WorkspaceForm } from './workspace-form'
import { WorkspaceProjectSelect } from './workspace-project-select'

export interface WorkspacePanelProps {
	scrollToBottom: () => void
	id?: string
	title?: string
	chatbot?: Chatbot
	isAtBottom?: boolean
	className?: string
	isLoading?: boolean
	isPro?: boolean
	// Chat props
	stop?: () => void
	append?: (message: any, options?: any) => Promise<void>
	reload?: () => Promise<void>
	messages?: any[]
	input?: string
	setInput?: (value: string) => void
	placeholder?: string
	showReload?: boolean
	// Workspace props
	onCreateDocument?: () => Promise<void>
	onSelectTemplate?: (templateId: string) => Promise<void>
	// Toggle prop to manage workspace state from parent
	onToggleWorkspace?: () => void
}

export function WorkspacePanel({
	id,
	title,
	chatbot,
	isAtBottom,
	scrollToBottom,
	className,
	isLoading = false,
	isPro = true,
	// Chat props
	stop,
	append,
	reload,
	messages = [],
	input = '',
	setInput = () => {},
	placeholder = '',
	showReload = true,
	// Workspace props
	onCreateDocument = async () => {},
	onSelectTemplate = async () => {},
	// Toggle prop
	onToggleWorkspace,
}: WorkspacePanelProps) {
	const { isOpenPopup, loadingState, webSearch, setWebSearch } = useThread()
	const { isPowerUp, togglePowerUp } = usePowerUp()
	const { isDeepThinking, toggleDeepThinking } = useDeepThinking()
	const {
		isWorkspaceActive,
		toggleWorkspace,
		activeProject,
		setActiveProject,
		activeDocument,
		setActiveDocument,
		projectList,
		documentList,
	} = useWorkspace()

	const hiddenAnimationClasses =
		'p-2 gap-0 w-auto relative overflow-hidden [&:hover_span]:opacity-100 [&:hover_span]:w-auto [&:hover_span]:duration-300 [&:hover_svg]:mr-2 [&:hover_span]:transition-all'
	const hiddenAnimationItemClasses =
		'transition-all w-[0px] opacity-0 whitespace-nowrap duration-300'

	// Active section in the document being edited
	const [activeSection, setActiveSection] = useState<string | null>(null)

	const handleAIAssist = useCallback(
		async (promptText: string, sectionId?: string) => {
			// Logic to handle AI assistance with the current document section
			console.log('AI assist requested:', {
				document: activeDocument,
				section: sectionId || activeSection,
				prompt: promptText,
			})

			// In a real implementation, this would call an API to get AI assistance
			// For now, we'll just log the request
			if (append) {
				await append(
					{
						id,
						content: promptText,
						role: 'user',
					},
					{
						powerUp: isPowerUp,
						reasoning: isDeepThinking,
						webSearch: webSearch,
						workspace: {
							documentId: activeDocument,
							sectionId: sectionId || activeSection,
							projectId: activeProject,
						},
					},
				)
			}
		},
		[
			activeDocument,
			activeProject,
			activeSection,
			append,
			id,
			isPowerUp,
			isDeepThinking,
			webSearch,
		],
	)

	const handleSectionSelect = useCallback((sectionId: string) => {
		setActiveSection(sectionId)
	}, [])

	const handleCreateDocument = useCallback(async () => {
		// In a real implementation, this would call an API to create a document
		console.log('Creating new document in project:', activeProject)

		// Call custom handler if provided
		await onCreateDocument()
	}, [activeProject, onCreateDocument])

	const handleSelectTemplate = useCallback(
		async (templateId: string) => {
			// In a real implementation, this would call an API to apply a template
			console.log('Applying template to document:', {
				templateId,
				document: activeDocument,
			})

			// Call custom handler if provided
			await onSelectTemplate(templateId)
		},
		[activeDocument, onSelectTemplate],
	)

	const prepareMessageOptions = useCallback(
		(chatOptions?: any) => ({
			...(chatOptions || {}),
			powerUp: isPowerUp,
			reasoning: isDeepThinking,
			webSearch: webSearch,
		}),
		[isPowerUp, isDeepThinking, webSearch],
	)

	if (!isPro) {
		return (
			<div className="flex flex-col items-center justify-center h-[300px] p-6 border rounded-lg">
				<NotepadTextIcon className="h-16 w-16 mb-4 text-muted-foreground" />
				<h3 className="text-xl font-semibold mb-2">Pro Feature Only</h3>
				<p className="text-center text-muted-foreground mb-4">
					Workspace editing is available exclusively for Pro users.
				</p>
				<Button variant="default">Upgrade to Pro</Button>
			</div>
		)
	}

	return (
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
						<div className="flex items-center space-x-6 w-full max-w-[60%] overflow-y-hidden scrollbar scrollbar-thin">
							{/* Feature Toggles */}
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
								onChange={toggleDeepThinking}
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
										console.log('WorkspacePanel: Toggle Web Search:', newValue)
										setWebSearch(newValue)
									}}
									activeColor="cyan"
								/>
							)}

							{/* Workspace Toggle - positioned with other toggles */}
							<FeatureToggle
								id="workspace"
								name="Workspace"
								icon={<FileEditIcon />}
								activeIcon={<FileEditIcon />}
								isActive={isWorkspaceActive}
								onChange={onToggleWorkspace || toggleWorkspace}
								activeColor="cyan"
							/>
						</div>

						{/* Project and Document Selection - only show when workspace is active */}
						{isWorkspaceActive && (
							<div className="flex items-center gap-4">
								<WorkspaceProjectSelect
									value={activeProject}
									onChange={setActiveProject}
									options={projectList}
								/>
								<WorkspaceDocumentSelect
									value={activeDocument}
									onChange={setActiveDocument}
									options={activeProject ? documentList[activeProject] : []}
									disabled={!activeProject}
								/>
							</div>
						)}
					</div>
				</div>

				{/* Workspace Content or Chat Input Section */}
				<div
					className={cn(
						'fixed flex flex-col w-full',
						'p-2 sm:px-4 space-y-2 sm:space-y-4',
						'border-t shadow-lg bg-background',
						'dark:border-zinc-800 border-zinc-200',
						isOpenPopup ? 'dark:border-mirage border-iron' : '',
						'min-h-[64px] sm:min-h-[80px]',
					)}
				>
					{isWorkspaceActive ? (
						<>
							<WorkspaceContent
								projectName={activeProject}
								documentName={activeDocument}
								isLoading={isLoading}
								onSectionSelect={handleSectionSelect}
								onCreateDocument={handleCreateDocument}
								onSelectTemplate={handleSelectTemplate}
							/>
							<WorkspaceForm
								onAIAssist={handleAIAssist}
								onSubmit={async (value, options) => {
									scrollToBottom()
									if (append) {
										await append(
											{
												id,
												content: value,
												role: 'user',
											},
											prepareMessageOptions(options),
										)
									}
								}}
								activeSection={activeSection}
								disabled={!activeProject || !activeDocument || isLoading}
								input={input}
								setInput={setInput}
								placeholder={
									activeSection
										? 'How should I improve this section?'
										: 'Ask a question about this document...'
								}
								isLoading={isLoading}
							/>
						</>
					) : (
						<>
							{/* Chat input form when workspace is not active */}
							{append && (
								<form
									className="relative flex flex-col w-full px-4 py-2"
									onSubmit={async (e) => {
										e.preventDefault()
										if (!input.trim() || isLoading) return

										scrollToBottom()
										await append(
											{
												id,
												content: input,
												role: 'user',
											},
											{
												powerUp: isPowerUp,
												reasoning: isDeepThinking,
												webSearch: webSearch,
											},
										)
										setInput('')
									}}
								>
									<div className="relative flex w-full gap-2 sm:gap-4">
										<textarea
											tabIndex={0}
											rows={1}
											value={input}
											onChange={(e) => setInput(e.target.value)}
											placeholder={placeholder || 'Type your message...'}
											spellCheck={false}
											className="min-h-[60px] w-full resize-none bg-background px-3 py-3 sm:text-sm border rounded-md"
											disabled={isLoading}
										/>
										<button
											type="submit"
											className="shrink-0 h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50"
											disabled={isLoading || !input.trim()}
											aria-label="Send message"
										>
											<SendIcon className="h-5 w-5" />
										</button>
									</div>
								</form>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
