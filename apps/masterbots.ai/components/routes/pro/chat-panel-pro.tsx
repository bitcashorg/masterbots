'use client'

import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { PromptForm } from '@/components/routes/chat/prompt-form'
import { WorkspaceContent } from '@/components/routes/workspace/workspace-content'
import { WorkspaceDepartmentSelect } from '@/components/routes/workspace/workspace-department-select'
import { WorkspaceDocumentSelect } from '@/components/routes/workspace/workspace-document-select'
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
	TableIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot } from 'mb-genql'
import { nanoid } from 'nanoid'
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
	const { isOpenPopup, loadingState, webSearch, setWebSearch } = useThread()
	const { isPowerUp, togglePowerUp } = usePowerUp()
	const { isDeepThinking, toggleDeepThinking } = useDeepThinking()
	const [shareDialogOpen, setShareDialogOpen] = useState(false)
	const { selectedModel, clientType } = useModel()
	const { append, messages, reload, setInput, input, id } = useChat({
		id: nanoid(),
		body: {
			id: nanoid(),
			model: selectedModel,
			clientType,
		},
	})

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
		setWorkspaceProcessingState,
		activeWorkspaceSection,
		setActiveWorkspaceSection,
		cursorPosition: workspaceCursorPosition,
		handleWorkspaceEdit: workspaceHandleEdit,
		handleDocumentUpdate: workspaceHandleDocumentUpdate,
	} = useWorkspaceChat()
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
	} = useWorkspace()

	// Document type state with ref for tracking changes
	const [documentType, setDocumentType] = useState<
		'text' | 'image' | 'spreadsheet'
	>('text')

	// Ref to track document type to ensure proper updates
	const documentTypeRef = useRef<'text' | 'image' | 'spreadsheet'>('text')

	// Initialize with deep copy of textDocuments, not just reference
	const [filteredDocumentList, setFilteredDocumentList] = useState<
		Record<string, string[]>
	>(() => {
		console.log('[INIT] Creating initial deep copy of textDocuments')
		return textDocuments ? JSON.parse(JSON.stringify(textDocuments)) : {}
	})

	// Log initial textDocuments for debugging with better formatting
	console.log(
		'[INIT] Initial textDocuments:',
		JSON.stringify(textDocuments, null, 2),
	)
	console.log(
		'[INIT] Campaign A docs:',
		textDocuments && 'Campaign A' in textDocuments
			? JSON.stringify(textDocuments['Campaign A'], null, 2)
			: 'Not found',
	)

	// Effect to update document list when document type changes - improved implementation
	useEffect(() => {
		// Generate a unique ID for this effect run to trace in logs
		const effectId = Math.random().toString(36).substring(2, 8)
		console.log(
			`[${effectId}] Document type changed from ${documentTypeRef.current} to ${documentType}`,
		)

		// Update ref immediately to prevent race conditions
		documentTypeRef.current = documentType

		// Deep validation check for document sources with improved logging
		const validateDocSource = (
			source: Record<string, string[]> | null,
			sourceName: string,
		) => {
			if (!source) {
				console.log(`[${effectId}] ${sourceName} is null or undefined`)
				return false
			}

			const keys = Object.keys(source)
			console.log(
				`[${effectId}] ${sourceName} contains ${keys.length} project keys:`,
				keys,
			)

			// Check for Campaign A specifically since it's mentioned in the bug
			if ('Campaign A' in source) {
				const campaignDocs = source['Campaign A']
				console.log(
					`[${effectId}] Campaign A ${sourceName} docs:`,
					Array.isArray(campaignDocs) ? [...campaignDocs] : campaignDocs,
				)
				if (
					!campaignDocs ||
					!Array.isArray(campaignDocs) ||
					campaignDocs.length === 0
				) {
					console.log(
						`[${effectId}] Warning: Campaign A has no documents in ${sourceName}`,
					)
				}
			} else {
				console.log(
					`[${effectId}] Warning: Campaign A not found in ${sourceName}`,
				)
			}

			return true
		}

		// Validate all document sources
		validateDocSource(textDocuments, 'textDocuments')
		validateDocSource(imageDocuments, 'imageDocuments')
		validateDocSource(spreadsheetDocuments, 'spreadsheetDocuments')

		// Create a new filtered document list based on the type using deep copy
		let newFilteredList: Record<string, string[]> | null = null

		// Deep copy function to ensure reference changes
		const deepCopy = (
			obj: Record<string, string[]> | null | undefined,
		): Record<string, string[]> => {
			if (!obj) return {}
			// Use JSON methods for deep copy to ensure new references for all nested arrays
			return JSON.parse(JSON.stringify(obj))
		}

		if (documentType === 'text') {
			console.log(`[${effectId}] Setting text documents (deep copy)`)
			newFilteredList = deepCopy(textDocuments)
		} else if (documentType === 'image') {
			console.log(`[${effectId}] Setting image documents (deep copy)`)
			newFilteredList = deepCopy(imageDocuments)
		} else if (documentType === 'spreadsheet') {
			console.log(`[${effectId}] Setting spreadsheet documents (deep copy)`)
			newFilteredList = deepCopy(spreadsheetDocuments)
		}

		// Special debugging for text documents
		if (documentType === 'text') {
			console.log(`[${effectId}] TEXT DOCUMENT SOURCE CHECK:`)
			console.log(
				`[${effectId}] Original textDocuments reference:`,
				textDocuments,
			)
			console.log(`[${effectId}] New filtered list reference:`, newFilteredList)

			// Check for reference equality
			console.log(
				`[${effectId}] References are ${newFilteredList === textDocuments ? 'SAME' : 'DIFFERENT'}`,
			)

			// Deep check for Campaign A
			if (
				textDocuments &&
				'Campaign A' in textDocuments &&
				newFilteredList &&
				'Campaign A' in newFilteredList
			) {
				console.log(
					`[${effectId}] Campaign A arrays are ${
						textDocuments['Campaign A'] === newFilteredList['Campaign A']
							? 'SAME'
							: 'DIFFERENT'
					} references`,
				)
			}
		}

		// Validate the new filtered list before setting it
		console.log(
			`[${effectId}] New filtered document list keys:`,
			newFilteredList ? Object.keys(newFilteredList) : 'null',
		)
		console.log(
			`[${effectId}] Does new list contain Campaign A?`,
			newFilteredList && 'Campaign A' in newFilteredList,
		)

		if (newFilteredList && 'Campaign A' in newFilteredList) {
			console.log(`[${effectId}] Campaign A docs in new list:`, [
				...newFilteredList['Campaign A'],
			])
		}

		// Always force a new reference to guarantee re-renders
		setFilteredDocumentList(newFilteredList || {})

		// Force a re-render by triggering state update at the end of this effect
		const forceUpdate = setTimeout(() => {
			console.log(`[${effectId}] Forcing update to ensure re-render`)
			setFilteredDocumentList((prev) => {
				// Create a new object reference with the same content
				return { ...prev }
			})
		}, 0)

		// Clean up timeout on unmount
		return () => clearTimeout(forceUpdate)
	}, [documentType, textDocuments, imageDocuments, spreadsheetDocuments])

	// Separate effect for document reset to avoid infinite loops
	// Only runs when document type actually changes
	const previousDocTypeRef = useRef(documentType)
	useEffect(() => {
		// Generate a unique ID for this effect run
		const effectId = Math.random().toString(36).substring(2, 8)

		if (previousDocTypeRef.current !== documentType) {
			console.log(
				`[${effectId}] Document type changed from ${previousDocTypeRef.current} to ${documentType}`,
			)

			// Only reset if document type has changed
			if (activeDocument) {
				console.log(
					`[${effectId}] Resetting active document from ${activeDocument} to null due to document type change`,
				)
				setActiveDocument(null)
			}

			// Check if current project has documents in the new type
			if (activeProject) {
				let newDocs: string[] | undefined
				if (documentType === 'text') {
					newDocs = textDocuments?.[activeProject]
				} else if (documentType === 'image') {
					newDocs = imageDocuments?.[activeProject]
				} else if (documentType === 'spreadsheet') {
					newDocs = spreadsheetDocuments?.[activeProject]
				}

				console.log(
					`[${effectId}] Project ${activeProject} ${newDocs ? 'has' : 'does not have'} documents in the ${documentType} category`,
				)
				if (newDocs && newDocs.length > 0) {
					console.log(
						`[${effectId}] Available ${documentType} documents for ${activeProject}:`,
						[...newDocs],
					)
				}
			}

			previousDocTypeRef.current = documentType
		}
	}, [
		documentType,
		setActiveDocument,
		activeDocument,
		activeProject,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
	])

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
		const focusContext = focusedSection
			? `\n\nCURRENT FOCUS SECTION:\n## ${focusedSection.title}\n${focusedSection.content}`
			: ''

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

		// Add output instructions
		const outputInstructions = `
<output_instructions>
- Use different heading levels (e.g., H1, H2, H3) and punctuation for better readability.
- Use lists when necessary for clarity and organization.
- Maintain the document's style and tone
- For editing requests, provide the updated content that should replace the existing section
- Ensure your response is clear and actionable
- Focus specifically on document editing and content improvement
</output_instructions>`

		return `You are an expert document editor and content creator working with specialized chatbot expertise.${chatbotExpertise}

DOCUMENT CONTEXT:
${sectionsContext}${focusContext}

USER REQUEST: ${userPrompt}

${outputInstructions}

INSTRUCTIONS:
1. Apply your specialized expertise to the document editing task
2. Analyze the user's request in the context of the provided document
3. If the user is asking to edit a specific section, focus your response on that section
4. If the user is asking general questions, provide answers based on the full document context
5. For editing requests, provide the updated content that should replace the existing section
6. Maintain the document's style and tone while applying your expertise

Please provide your response now:`
	}

	// Memoize document options with improved reference tracking
	const documentOptionsRef = useRef<string[]>([])
	const prevProjectRef = useRef<string>('')
	const prevFilteredDocsRef = useRef<Record<string, string[]> | null>(null)
	const prevDocumentTypeRef = useRef<string>('')
	const renderCountRef = useRef<number>(0)

	// Force this memo to run again when document type changes
	const documentTypeVersion = useRef<number>(0)
	useEffect(() => {
		// Increment version to force documentOptions to recalculate
		documentTypeVersion.current++
		console.log(
			`[DOCTYPE] Document type changed to ${documentType}, incrementing version to ${documentTypeVersion.current}`,
		)
	}, [documentType])

	const documentOptions = useMemo(() => {
		// Track render count to help debug re-renders
		const renderCount = ++renderCountRef.current
		const docTypeVersion = documentTypeVersion.current

		// Always create a new empty array for our result
		const result: string[] = []

		// Store previous options for comparison
		const previousOptions = [...documentOptionsRef.current]

		// Log detailed execution info
		console.log(
			`[DOCS:${renderCount}:v${docTypeVersion}] documentOptions calculating for project="${activeProject}" with type="${documentType}"`,
		)

		// Track changes in dependencies from previous render
		const projectChanged = prevProjectRef.current !== activeProject
		const documentTypeChanged = prevDocumentTypeRef.current !== documentType

		// Create a unique tag for these logs
		const logPrefix = `[DOCS:${renderCount}:v${docTypeVersion}]`

		// Log all changes
		console.log(`${logPrefix} Changes detected:`, {
			renderCount,
			docTypeVersion,
			projectChanged,
			documentTypeChanged,
			previousProject: prevProjectRef.current,
			previousDocType: prevDocumentTypeRef.current,
		})

		// Deep debug logging for text documents specifically
		if (documentType === 'text') {
			console.log(`${logPrefix} TEXT DOCUMENT DETAILED DEBUG`)
			console.log(`${logPrefix} filteredDocumentList:`, filteredDocumentList)
			console.log(`${logPrefix} textDocuments:`, textDocuments)

			// Check if Campaign A exists in text documents
			if (textDocuments && 'Campaign A' in textDocuments) {
				console.log(
					`${logPrefix} Campaign A found in textDocuments with ${textDocuments['Campaign A'].length} documents`,
				)
				console.log(
					`${logPrefix} Campaign A texts:`,
					JSON.stringify(textDocuments['Campaign A']),
				)
			} else {
				console.log(`${logPrefix} Campaign A NOT found in textDocuments`)
			}

			// Check if Campaign A exists in filtered documents
			if (filteredDocumentList && 'Campaign A' in filteredDocumentList) {
				console.log(
					`${logPrefix} Campaign A found in filteredDocumentList with ${filteredDocumentList['Campaign A'].length} documents`,
				)
				console.log(
					`${logPrefix} Campaign A filtered:`,
					JSON.stringify(filteredDocumentList['Campaign A']),
				)
			} else {
				console.log(`${logPrefix} Campaign A NOT found in filteredDocumentList`)
			}
		}

		// Exit early if we don't have an active project
		if (!activeProject) {
			console.log(`${logPrefix} No active project, returning empty array`)
			// Update references for next comparison
			documentOptionsRef.current = result
			prevProjectRef.current = ''
			prevFilteredDocsRef.current = filteredDocumentList
			prevDocumentTypeRef.current = documentType
			return result
		}

		// Get proper document source based on type - ALWAYS create fresh copies
		let documentSource: Record<string, string[]> = {}
		let sourceDescription = ''

		// Create a deep copy function that guarantees new references
		const deepCopySource = (
			source: Record<string, string[]> | null | undefined,
		): Record<string, string[]> => {
			if (!source) return {}
			// Using JSON methods ensures complete reference changes at all levels
			try {
				return JSON.parse(JSON.stringify(source))
			} catch (e) {
				console.error(`${logPrefix} Error during deep copy:`, e)
				return {}
			}
		}

		// For text documents, we ALWAYS want to use a fresh copy to ensure rerenders
		if (documentType === 'text') {
			// Special handling for text documents to ensure fresh references
			if (textDocuments) {
				documentSource = deepCopySource(textDocuments)
				sourceDescription = 'direct text documents (deep copied)'
			} else {
				console.log(`${logPrefix} Warning: Text documents source is missing!`)
				documentSource = {}
				sourceDescription = 'empty (no text documents available)'
			}
		}
		// For other document types, use the filtered list first, then fallback
		else {
			if (
				filteredDocumentList &&
				Object.keys(filteredDocumentList).length > 0
			) {
				documentSource = deepCopySource(filteredDocumentList)
				sourceDescription = `filtered ${documentType} documents`
			} else if (documentType === 'image' && imageDocuments) {
				documentSource = deepCopySource(imageDocuments)
				sourceDescription = 'direct image documents'
			} else if (documentType === 'spreadsheet' && spreadsheetDocuments) {
				documentSource = deepCopySource(spreadsheetDocuments)
				sourceDescription = 'direct spreadsheet documents'
			} else {
				console.log(
					`${logPrefix} Warning: No document source found for type ${documentType}`,
				)
				documentSource = {}
				sourceDescription = `empty (no ${documentType} documents available)`
			}
		}

		console.log(`${logPrefix} Using document source: ${sourceDescription}`)
		console.log(
			`${logPrefix} Document source keys:`,
			Object.keys(documentSource),
		)

		// Exit early if the project doesn't exist in our source
		if (!(activeProject in documentSource)) {
			console.log(
				`${logPrefix} Project "${activeProject}" not found in document source, returning empty array`,
			)
			// Update references for next comparison
			documentOptionsRef.current = result
			prevProjectRef.current = activeProject
			prevFilteredDocsRef.current = filteredDocumentList
			prevDocumentTypeRef.current = documentType
			return result
		}

		// Get documents for this project and create a NEW array (crucial for references)
		const projectDocs = documentSource[activeProject] || []
		const newOptions = [...projectDocs]

		console.log(
			`${logPrefix} Found ${newOptions.length} documents for project "${activeProject}":`,
			newOptions,
		)

		// Determine if anything has changed
		let hasChanged = true

		if (previousOptions.length === newOptions.length) {
			// Check if the array contents are the same
			const contentUnchanged = !newOptions.some(
				(doc, i) => doc !== previousOptions[i],
			)
			if (contentUnchanged && !projectChanged && !documentTypeChanged) {
				hasChanged = false
			}
		}

		// Force a new reference if document type has changed
		if (documentTypeChanged) {
			console.log(`${logPrefix} Document type changed - forcing new references`)
			hasChanged = true
		}

		// Even if no change is detected, ALWAYS return a new array reference for text documents
		// This is crucial to fix the bug where text document selection doesn't work
		if (documentType === 'text') {
			console.log(
				`${logPrefix} Type is 'text' - always returning fresh array regardless of changes`,
			)
			hasChanged = true
		}

		// Log whether options have changed
		console.log(
			`${logPrefix} Options ${hasChanged ? 'HAVE CHANGED' : 'remain unchanged'}`,
		)
		console.log(
			`${logPrefix} Returning ${newOptions.length} options for "${activeProject}", hasChanged=${hasChanged}`,
		)

		// Always update our refs for the next comparison
		documentOptionsRef.current = newOptions
		prevProjectRef.current = activeProject
		prevFilteredDocsRef.current = filteredDocumentList
		prevDocumentTypeRef.current = documentType

		return newOptions
	}, [
		// Dependencies that should trigger recalculation
		activeProject,
		filteredDocumentList,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
		documentType,
	])

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
												{documentType === 'text' && (
													<FileTextIcon className="h-4 w-4" />
												)}
												{documentType === 'image' && (
													<ImageIcon className="h-4 w-4" />
												)}
												{documentType === 'spreadsheet' && (
													<TableIcon className="h-4 w-4" />
												)}
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
											<DropdownMenuItem
												onClick={() => setDocumentType('image')}
											>
												<ImageIcon className="h-4 w-4 mr-2" />
												<span>Image Documents</span>
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setDocumentType('spreadsheet')}
											>
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
								onActiveSectionChange={setActiveWorkspaceSection}
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
										appendFunction: typeof append,
									})

									if (isWorkspaceActive) {
										// In workspace mode, use the workspace chat hook
										console.log(
											'🏢 Workspace mode: AI assist requested for document:',
											activeDocument,
											'with query:',
											value,
										)

										// Get current document content for meta prompt
										const documentKey = `${activeProject}:${activeDocument}`
										const currentContent = documentContent?.[documentKey] || ''

										// Create meta prompt with document context
										const metaPrompt = createDocumentMetaPrompt(
											value,
											currentContent,
											activeWorkspaceSection,
										)

										await workspaceHandleEdit(
											value,
											metaPrompt,
											workspaceCursorPosition,
										)
									} else {
										// In chat mode, use normal append behavior
										console.log('💬 Chat mode: using normal append')
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
								disabled={
									(isWorkspaceActive && (!activeProject || !activeDocument)) ||
									isLoading ||
									workspaceProcessingState !== 'idle' ||
									// biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
									(!isWorkspaceActive && !Boolean(chatbot)) ||
									isPreProcessing
								}
								input={input}
								setInput={setInput}
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
