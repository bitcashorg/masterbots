'use client'

import { FeatureToggle } from '@/components/shared/feature-toggle'
import { Button } from '@/components/ui/button'
import { useDeepThinking } from '@/lib/hooks/use-deep-thinking'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useWorkspaceChat } from '@/lib/hooks/use-workspace-chat'
import { cn } from '@/lib/utils'
import {
	BrainIcon,
	FileEditIcon,
	GlobeIcon,
	GraduationCap,
	NotepadTextIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot } from 'mb-genql'
import { useCallback } from 'react'
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

	// Add workspace chat hook to handle active section changes
	const { setActiveWorkspaceSection } = useWorkspaceChat()

	const hiddenAnimationClasses =
		'p-2 gap-0 w-auto relative overflow-hidden [&:hover_span]:opacity-100 [&:hover_span]:w-auto [&:hover_span]:duration-300 [&:hover_svg]:mr-2 [&:hover_span]:transition-all'
	const hiddenAnimationItemClasses =
		'transition-all w-[0px] opacity-0 whitespace-nowrap duration-300'

	const handleAIAssist = useCallback(() => {
		// Logic to handle AI assistance with the current document section
		console.log('AI assist requested for document:', activeDocument)
	}, [activeDocument])

	// Handle section selection changes in the workspace content
	const handleActiveSectionChange = useCallback(
		(sectionId: string | null) => {
			console.log('🎯 WorkspacePanel: Active section changed:', sectionId)
			setActiveWorkspaceSection(sectionId)
			console.log(
				'🎯 WorkspacePanel: Section set in workspace chat hook:',
				sectionId,
			)
		},
		[setActiveWorkspaceSection],
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

							{/* Workspace Toggle - positioned on the opposite side */}
							<div className="ml-auto">
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

				{/* Workspace Content or Chat Form Section */}
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
								onActiveSectionChange={handleActiveSectionChange}
							/>
							<WorkspaceForm
								onAIAssist={handleAIAssist}
								disabled={!activeProject || !activeDocument || isLoading}
							/>
						</>
					) : (
						<div className="flex items-center justify-center p-4 text-muted-foreground">
							Toggle Workspace mode to edit documents
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
