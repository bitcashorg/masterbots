'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import {
	cleanClickableText,
	extractFollowUpContext,
} from '@/lib/chat-clickable-text'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useWorkspaceChat } from '@/lib/hooks/use-workspace-chat'
import {
	type MarkdownSection,
	combineMarkdownSections,
	createStructuredMarkdown,
	parseMarkdownSections,
} from '@/lib/markdown-utils'
import { buildSectionTree } from '@/lib/section-tree-utils'
import { cn } from '@/lib/utils'
import {
	FileIcon,
	FileText,
	Image,
	PlusIcon,
	SaveIcon,
	Table,
} from 'lucide-react'
import type { Chatbot } from 'mb-genql'
import * as React from 'react'
import { WorkspaceSectionTree } from './workspace-section-tree'

interface WorkspaceContentProps {
	projectName: string | null
	documentName: string | null
	className?: string
	isLoading?: boolean
	documentType?: 'text' | 'image' | 'spreadsheet'
	onActiveSectionChange?: (sectionId: string | null) => void
	chatbot?: Chatbot
}

export function WorkspaceContent({
	projectName,
	documentName,
	className,
	isLoading = false,
	documentType = 'text',
	onActiveSectionChange,
	chatbot,
}: WorkspaceContentProps) {
	// Initial document for new documents
	const initialMarkdown = `# Introduction
This is the introduction section of the document. It provides an overview of the project.

## Background
This section covers the background and context of the project, including relevant history and previous work.

## Methodology
The methodology section details the approach and techniques used in this project.

## Results
This section presents the findings and outcomes of the project work.

## Conclusion
The conclusion summarizes the key points and implications of the project.
`

	// Get document content from workspace context
	const { documentContent, setDocumentContent } = useWorkspace()

	// Check if we have content for this document
	const documentKey =
		projectName && documentName ? `${projectName}:${documentName}` : null
	const savedContent =
		documentKey && documentContent && documentContent[documentKey]

	// Define document types
	type DocumentType = 'text' | 'image' | 'spreadsheet'

	// State management
	const [fullMarkdown, setFullMarkdown] = React.useState<string>(
		savedContent || initialMarkdown,
	)
	const [sections, setSections] = React.useState<MarkdownSection[]>(
		parseMarkdownSections(savedContent || initialMarkdown),
	)
	const [activeSection, setActiveSection] = React.useState<string | null>(null)
	const [editableContent, setEditableContent] = React.useState<string>('')
	const [isImportDialogOpen, setIsImportDialogOpen] = React.useState(false)
	const [pasteContent, setPasteContent] = React.useState('')
	const [viewMode, setViewMode] = React.useState<'sections' | 'source'>(
		'sections',
	)
	// Cursor position tracking for precise AI output placement
	const [cursorPosition, setCursorPosition] = React.useState<number>(0)
	const sectionTextareaRef = React.useRef<HTMLTextAreaElement>(null)
	const sourceTextareaRef = React.useRef<HTMLTextAreaElement>(null)
	// Track if user is actively typing to prevent cursor jumps
	const isUserTypingRef = React.useRef<boolean>(false)
	const userTypingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
	// documentType is now passed as a prop
	// Use workspace chat hook for workspace-specific functionality
	const {
		messages,
		setCursorPosition: setGlobalCursorPosition,
		handleWorkspaceEdit,
		workspaceProcessingState,
	} = useWorkspaceChat()

	// Use a ref to track previous document key to prevent unnecessary resets
	const prevDocumentKeyRef = React.useRef(documentKey)

	// Cleanup timeout on unmount
	React.useEffect(() => {
		return () => {
			if (userTypingTimeoutRef.current) {
				clearTimeout(userTypingTimeoutRef.current)
			}
		}
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		// Only reset when document actually changes (not on every render)
		if (documentKey !== prevDocumentKeyRef.current) {
			setActiveSection(null)
			setEditableContent('')
			prevDocumentKeyRef.current = documentKey
			// Notify parent that no section is active
			onActiveSectionChange?.(null)

			// If we have saved content for this document, load it
			if (savedContent) {
				setFullMarkdown(savedContent)
				const parsedSections = parseMarkdownSections(savedContent)
				console.log('📄 Loading saved document sections:', {
					documentKey,
					totalSections: parsedSections.length,
					sections: parsedSections.map((s) => ({
						id: s.id,
						title: s.title,
						level: s.level,
					})),
				})
				setSections(parsedSections)
			} else {
				// Reset to initial state for new documents and ensure it's saved to workspace
				setFullMarkdown(initialMarkdown)
				const parsedSections = parseMarkdownSections(initialMarkdown)
				console.log('📄 Creating new document sections:', {
					documentKey,
					totalSections: parsedSections.length,
					sections: parsedSections.map((s) => ({
						id: s.id,
						title: s.title,
						level: s.level,
					})),
				})
				setSections(parsedSections)

				// Initialize the document content in workspace context so AI has proper context
				if (projectName && documentName) {
					console.log('🔧 Initializing document content in workspace:', {
						projectName,
						documentName,
						documentKey,
						contentLength: initialMarkdown.length,
					})
					setDocumentContent(projectName, documentName, initialMarkdown)
				}
			}
		}
	}, [
		documentKey,
		savedContent,
		onActiveSectionChange,
		projectName,
		documentName,
	])

	// Track the last assistant message to detect new AI responses
	const lastAssistantMessage = React.useMemo(() => {
		return messages?.filter((m) => m.role === 'assistant').pop()
	}, [messages])

	// Track processed message IDs to prevent re-processing
	const processedMessageIds = React.useRef<Set<string>>(new Set())

	// console.log('lastAssistantMessage', lastAssistantMessage)
	console.log('isUserTypingRef.current', isUserTypingRef.current)

	// Effect to handle live updates when new AI messages arrive during streaming
	// This effect is REMOVED to prevent infinite loops - document updates are now handled
	// directly by the workspace chat hook's onFinish callback and the external content sync effect

	// Effect to handle external document content updates (e.g., from workspace chat)
	// with improved loop prevention
	React.useEffect(() => {
		// Only sync if content has actually changed and user is not typing
		if (
			savedContent &&
			savedContent !== fullMarkdown &&
			!isUserTypingRef.current
		) {
			console.log(
				'📝 External document update detected, syncing workspace content',
				{
					currentLength: fullMarkdown.length,
					newLength: savedContent.length,
					hasChanges: savedContent !== fullMarkdown,
				},
			)

			// Use React.startTransition to mark this as a non-urgent update
			React.startTransition(() => {
				setFullMarkdown(savedContent)
				setSections(parseMarkdownSections(savedContent))

				// If there's an active section, update its content to reflect changes
				if (activeSection) {
					const updatedSections = parseMarkdownSections(savedContent)
					const newActiveSection = updatedSections.find(
						(s) => s.id === activeSection,
					)
					if (newActiveSection) {
						// Store current cursor position before updating content
						const currentCursor =
							sectionTextareaRef.current?.selectionStart || 0
						setEditableContent(newActiveSection.content)

						// Restore cursor position after content update (without causing loops)
						setTimeout(() => {
							if (sectionTextareaRef.current && !isUserTypingRef.current) {
								const newPosition = Math.min(
									currentCursor,
									newActiveSection.content.length,
								)
								sectionTextareaRef.current.setSelectionRange(
									newPosition,
									newPosition,
								)
								sectionTextareaRef.current.focus()
							}
						}, 0)
					}
				} else if (viewMode === 'source') {
					// If in source view, preserve cursor position in full source
					const currentCursor = sourceTextareaRef.current?.selectionStart || 0
					setTimeout(() => {
						if (sourceTextareaRef.current && !isUserTypingRef.current) {
							const newPosition = Math.min(currentCursor, savedContent.length)
							sourceTextareaRef.current.setSelectionRange(
								newPosition,
								newPosition,
							)
							sourceTextareaRef.current.focus()
						}
					}, 0)
				}
			})
		}
	}, [savedContent, fullMarkdown, activeSection, viewMode])

	const handleSectionClick = (sectionId: string) => {
		const section = sections.find((s) => s.id === sectionId)
		if (section) {
			console.log('🎯 Section clicked:', {
				sectionId,
				title: section.title,
				level: section.level,
				allSections: sections.map((s) => ({ id: s.id, title: s.title })),
			})
			setActiveSection(sectionId)
			setEditableContent(section.content)
			// Notify parent component about active section change
			onActiveSectionChange?.(sectionId)
			console.log('🎯 Active section change notification sent for:', sectionId)
		} else {
			console.error('❌ Section not found:', {
				requestedId: sectionId,
				availableSections: sections.map((s) => ({ id: s.id, title: s.title })),
			})
		}
	}

	// Mark user as typing to prevent external updates from interfering
	const markUserTyping = React.useCallback(() => {
		isUserTypingRef.current = true
		// Clear existing timeout
		if (userTypingTimeoutRef.current) {
			clearTimeout(userTypingTimeoutRef.current)
		}
		// Set timeout to mark user as no longer typing after 1 second of inactivity
		userTypingTimeoutRef.current = setTimeout(() => {
			isUserTypingRef.current = false
		}, 1000)
	}, [])

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		markUserTyping()
		setEditableContent(e.target.value) // Track cursor position for precise AI output placement
		const position = e.target.selectionStart || 0
		setCursorPosition(position)
		setGlobalCursorPosition(position)
	}

	// Handle cursor position tracking on focus and selection change
	const handleCursorPositionChange = React.useCallback(
		(
			e:
				| React.FocusEvent<HTMLTextAreaElement>
				| React.MouseEvent<HTMLTextAreaElement>,
		) => {
			const target = e.target as HTMLTextAreaElement
			const position = target.selectionStart || 0
			setCursorPosition(position)
			setGlobalCursorPosition(position)
		},
		[setGlobalCursorPosition],
	)

	const handleSaveSection = React.useCallback(() => {
		if (activeSection) {
			const updatedSections = sections.map((section) =>
				section.id === activeSection
					? { ...section, content: editableContent }
					: section,
			)
			setSections(updatedSections)

			// Regenerate the full markdown to keep it in sync
			const newMarkdown = combineMarkdownSections(updatedSections)
			setFullMarkdown(newMarkdown)

			// Save to workspace context
			if (projectName && documentName) {
				setDocumentContent(projectName, documentName, newMarkdown)
			}
		}
	}, [
		activeSection,
		editableContent,
		sections,
		projectName,
		documentName,
		setDocumentContent,
	])

	// Debounced save for full source changes
	const debouncedSaveFullSource = React.useCallback(() => {
		let timeoutId: NodeJS.Timeout
		return (content: string) => {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				if (projectName && documentName && content) {
					setDocumentContent(projectName, documentName, content)
				}
			}, 500) // 500ms debounce
		}
	}, [projectName, documentName, setDocumentContent])

	const handleImportPaste = () => {
		if (!pasteContent.trim()) return

		// Determine if the pasted content has markdown or if we need to create structure
		const hasHeadings = /^#{1,6}\s+.+$/m.test(pasteContent)
		const markdownContent = hasHeadings
			? pasteContent
			: createStructuredMarkdown(pasteContent)

		// Parse the content into sections
		const newSections = parseMarkdownSections(markdownContent)
		setSections(newSections)
		setFullMarkdown(markdownContent)

		// Reset state
		setPasteContent('')
		setIsImportDialogOpen(false)
		setActiveSection(null)
		setEditableContent('')
	}

	// Memoize to prevent unnecessary function recreation
	const handleViewSourceToggle = React.useCallback(
		(fullView: boolean) => {
			if (fullView && activeSection && editableContent.trim()) {
				// Save current section changes before switching to source view
				handleSaveSection()
			} else if (!fullView && projectName && documentName) {
				// Save full source changes before switching to section view
				setDocumentContent(projectName, documentName, fullMarkdown)
			}
		},
		[
			activeSection,
			editableContent,
			handleSaveSection,
			projectName,
			documentName,
			setDocumentContent,
			fullMarkdown,
		],
	)

	// Handler functions for the new overview mode
	const handleSectionUpdate = React.useCallback(
		(sectionId: string, newTitle: string) => {
			setSections((prevSections) =>
				prevSections.map((section) =>
					section.id === sectionId ? { ...section, title: newTitle } : section,
				),
			)
		},
		[],
	)

	// Function to create comprehensive meta prompt with document context and chatbot expertise
	const createWorkspaceMetaPrompt = React.useCallback(
		(
			userPrompt: string,
			sectionTitle: string,
			taskType: 'expand' | 'rewrite',
		) => {
			console.log('📝 Creating workspace meta prompt with:', {
				userPromptLength: userPrompt.length,
				sectionTitle,
				taskType,
				documentContentLength: fullMarkdown.length,
				totalSections: sections.length,
			})

			const sectionsContext = sections
				.map(
					(section) =>
						`## ${section.title} (Level ${section.level})\n${section.content}\n`,
				)
				.join('\n')

			const focusedSection = sections.find((s) => s.title === sectionTitle)

			console.log('📝 Workspace meta prompt details:', {
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

			// Create task-specific instructions
			let taskInstructions = ''
			let outputFormat = ''

			if (!focusedSection) {
				console.error('NO FOCUSED SECTION FOUND!', {
					sectionTitle,
					availableSections: sections.map((s) => s.title),
				})
				return ''
			}

			// Section-specific editing mode
			const taskAction = taskType === 'expand' ? 'expand' : 'rewrite'
			const taskDescription =
				taskType === 'expand'
					? "with detailed, relevant content that fits the document's context and purpose"
					: "to improve clarity, coherence, and alignment with the document's overall purpose and structure"

			taskInstructions = `
EDITING MODE: SECTION ${taskType.toUpperCase()}
You are ${taskType === 'expand' ? 'expanding' : 'rewriting'} a specific section of a larger document. The user has requested to ${taskAction} the section "${focusedSection.title}".

WORKSPACE CONTEXT:
- Project: ${projectName || 'Untitled Project'}
- Document: ${documentName || 'Untitled Document'}
- Document Type: ${documentType}
- Active Section: ${sectionTitle}
- Total Sections: ${sections.length}
- All Section Titles: ${sections.map((s) => s.title).join(', ')}

FULL DOCUMENT STRUCTURE:
${sections.map((s) => `${' '.repeat((s.level - 1) * 2)}${s.level === 1 ? '#' : s.level === 2 ? '##' : s.level === 3 ? '###' : '####'} ${s.title}`).join('\n')}

CURRENT SECTION BEING EDITED:
## ${focusedSection.title} (Level ${focusedSection.level})
${focusedSection.content}

USER REQUEST: ${userPrompt}

TASK: ${taskAction.charAt(0).toUpperCase() + taskAction.slice(1)} the "${focusedSection.title}" section ${taskDescription}.`

			outputFormat = `
<output_format>
Return ONLY the ${taskType === 'expand' ? 'expanded' : 'rewritten'} content for the "${focusedSection.title}" section. Your response should be the new content that will replace the existing section content.

ACCEPTABLE FORMATS:
1. Plain text content (will be inserted as-is into the section).
2. Markdown content with subsections (H3, H4, etc.) that belong under "${focusedSection.title}".

DO NOT INCLUDE:
- The section heading itself (## ${focusedSection.title}).
- Other sections from the document.
- Complete document restructure.
- Content that belongs to other sections.
</output_format>`

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
		},
		[chatbot, projectName, documentName, documentType, sections, fullMarkdown],
	)

	const handleExpandSection = React.useCallback(
		async (sectionTitle: string) => {
			const prompt = `Proceed to expand ${sectionTitle} section`
			const metaPrompt = createWorkspaceMetaPrompt(
				prompt,
				sectionTitle,
				'expand',
			)

			if (!metaPrompt) {
				console.error('❌ Failed to create metaPrompt for expand operation')
				return
			}

			await handleWorkspaceEdit(prompt, metaPrompt, cursorPosition)
		},
		[createWorkspaceMetaPrompt, handleWorkspaceEdit, cursorPosition],
	)

	const handleRewriteSection = React.useCallback(
		async (sectionTitle: string) => {
			const prompt = `Rewrite ${sectionTitle} section`
			const metaPrompt = createWorkspaceMetaPrompt(
				prompt,
				sectionTitle,
				'rewrite',
			)

			if (!metaPrompt) {
				console.error('❌ Failed to create metaPrompt for rewrite operation')
				return
			}

			await handleWorkspaceEdit(prompt, metaPrompt, cursorPosition)
		},
		[createWorkspaceMetaPrompt, handleWorkspaceEdit, cursorPosition],
	)

	// Build section tree for overview mode
	const sectionTree = React.useMemo(
		() => buildSectionTree(sections),
		[sections],
	)

	if (!projectName || !documentName) {
		return (
			<div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
				<p>Select a project and document to edit</p>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="space-y-4 p-4">
				<Skeleton className="h-8 w-1/3" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
			</div>
		)
	}

	return (
		<div className={cn('flex flex-col space-y-4 p-4', className)}>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">
					{projectName} / {documentName}
				</h2>
				<div className="flex items-center gap-2">
					{documentType === 'text' && activeSection && (
						<Button
							size="sm"
							variant="outline"
							onClick={handleSaveSection}
							className="flex items-center gap-2"
						>
							<SaveIcon className="h-4 w-4" />
							Save Section
						</Button>
					)}
				</div>
			</div>

			{/* Text Document View */}
			{documentType === 'text' && (
				<div className="space-y-4 h-full">
					{/* Simple tab UI without Radix tabs */}
					<div className="flex space-x-2 border-b">
						<button
							type="button"
							onClick={() => {
								setViewMode('sections')
								handleViewSourceToggle(false)
							}}
							className={cn(
								'px-4 py-2 border-b-2 transition-colors',
								viewMode === 'sections'
									? 'border-primary text-primary font-medium'
									: 'border-transparent hover:border-gray-300',
							)}
						>
							Section Editor
						</button>
						<button
							type="button"
							onClick={() => {
								setViewMode('source')
								handleViewSourceToggle(true)
							}}
							className={cn(
								'px-4 py-2 border-b-2 transition-colors',
								viewMode === 'source'
									? 'border-primary text-primary font-medium'
									: 'border-transparent hover:border-gray-300',
							)}
						>
							Full Source
						</button>
					</div>

					{/* Section editor view with enhanced tree UI */}
					{viewMode === 'sections' && (
						<div className="h-[calc(100%-64px)] grid grid-cols-12 gap-4">
							{/* Enhanced section navigation with tree structure */}
							<div className="col-span-4 border rounded-lg p-2 h-full overflow-y-auto">
								<h3 className="font-medium mb-2 p-2">Document Sections</h3>
								<div className="space-y-1">
									<WorkspaceSectionTree
										tree={sectionTree}
										activeSection={activeSection}
										onSectionClick={handleSectionClick}
										onExpandSection={handleExpandSection}
										onRewriteSection={handleRewriteSection}
										onRenameSection={handleSectionUpdate}
									/>
								</div>
							</div>

							{/* Content area */}
							<div className="col-span-8 border rounded-lg p-4 h-full overflow-y-auto">
								{activeSection ? (
									<div className="space-y-4 h-[calc(100%-64px)]">
										<h3 className="font-semibold">
											{sections.find((s) => s.id === activeSection)?.title}
										</h3>
										<textarea
											ref={sectionTextareaRef}
											value={editableContent}
											onChange={handleContentChange}
											onFocus={handleCursorPositionChange}
											onClick={handleCursorPositionChange}
											onKeyUp={(e) => {
												const position =
													(e.target as HTMLTextAreaElement).selectionStart || 0
												setCursorPosition(position)
												setGlobalCursorPosition(position)
											}}
											className="size-full p-3 border rounded-md focus:outline-none focus:ring-2 resize-none font-mono text-sm"
										/>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
										<FileText className="h-12 w-12 opacity-20" />
										<p>Select a section to edit</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Source view */}
					{viewMode === 'source' && (
						<div className="h-[calc(100%-64px)] border rounded-lg p-4">
							<Textarea
								ref={sourceTextareaRef}
								value={fullMarkdown}
								onChange={(e) => {
									markUserTyping()
									const newValue = e.target.value
									setFullMarkdown(newValue)
									// When source is changed, update sections
									setSections(parseMarkdownSections(newValue))
									// Track cursor position
									const position = e.target.selectionStart || 0
									setCursorPosition(position)
									setGlobalCursorPosition(position) // Save changes with debounce
									debouncedSaveFullSource()(newValue)
								}}
								onFocus={handleCursorPositionChange}
								onClick={handleCursorPositionChange}
								onKeyUp={(e) => {
									const position =
										(e.target as HTMLTextAreaElement).selectionStart || 0
									setCursorPosition(position)
									setGlobalCursorPosition(position)
								}}
								className="min-h-[400px] h-[94%] font-mono text-sm"
								placeholder="# Document Title..."
							/>
							<div className="mt-2 text-xs text-muted-foreground">
								<p>
									Edit the full markdown source. Changes will be applied when
									you switch back to section view.
								</p>
							</div>
						</div>
					)}
				</div>
			)}

			{/* Image Document View */}
			{documentType === 'image' && (
				<div className="border rounded-lg p-6 h-[500px] flex flex-col items-center justify-center gap-4">
					<Image className="h-20 w-20 opacity-20" />
					<h3 className="text-xl font-medium">Image Document Editor</h3>
					<p className="text-muted-foreground text-center max-w-lg">
						Use AI to generate, edit, and enhance images. Upload existing images
						or create new ones with detailed text prompts.
					</p>
					<div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-2xl">
						<Button
							variant="outline"
							className="h-20 flex flex-col gap-2 items-center justify-center"
						>
							<PlusIcon className="h-6 w-6" />
							<span>Generate New Image</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col gap-2 items-center justify-center"
						>
							<FileIcon className="h-6 w-6" />
							<span>Upload Image</span>
						</Button>
					</div>
				</div>
			)}

			{/* Spreadsheet Document View */}
			{documentType === 'spreadsheet' && (
				<div className="border rounded-lg p-6 h-[500px] flex flex-col items-center justify-center gap-4">
					<Table className="h-20 w-20 opacity-20" />
					<h3 className="text-xl font-medium">Spreadsheet Editor</h3>
					<p className="text-muted-foreground text-center max-w-lg">
						Create and edit data in a structured format. Define tables, create
						formulas, and visualize data with charts.
					</p>
					<div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-2xl">
						<Button
							variant="outline"
							className="h-20 flex flex-col gap-2 items-center justify-center"
						>
							<PlusIcon className="h-6 w-6" />
							<span>Create New Table</span>
						</Button>
						<Button
							variant="outline"
							className="h-20 flex flex-col gap-2 items-center justify-center"
						>
							<FileIcon className="h-6 w-6" />
							<span>Import Data</span>
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
