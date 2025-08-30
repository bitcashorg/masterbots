'use client'

import {
	updateThreadDocumentsMetadata,
	uploadWorkspaceDocumentToBucket,
} from '@/app/actions/thread.actions'
import { computeChecksum } from '@/lib/checksum'
import { type IndexedDBItem, useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useWorkspaceChat } from '@/lib/hooks/use-workspace-chat'
import { useSonner } from '@/lib/hooks/useSonner'
import {
	type MarkdownSection,
	combineMarkdownSections,
	createStructuredMarkdown,
	parseMarkdownSections,
} from '@/lib/markdown-utils'
import { buildSectionTree } from '@/lib/section-tree-utils'
import { cn } from '@/lib/utils'
import {
	type WorkspaceStatePayload,
	getWorkspaceState,
	postWorkspaceState,
	upsertDocumentDraft,
} from '@/lib/workspace-state'
import { createThread } from '@/services/hasura/hasura.service'
import { Button } from '@masterbots/mb-ui'
import { FileIcon, Image, PlusIcon, Table } from 'lucide-react'
import type { Chatbot } from 'mb-genql'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { WorkspaceContentHeader } from './workspace-content-header'
import { WorkspaceContentWrapper } from './workspace-content-wrapper'
import { WorkspaceTextEditor } from './workspace-text-editor'

// Lightweight types for thread metadata documents
type ThreadDocVersion = {
	version: number
	updatedAt: string
	checksum: string
	url: string
}
type ThreadDocMeta = {
	id: string
	name?: string
	project?: string
	type?: 'text' | 'image' | 'spreadsheet'
	currentVersion?: number
	versions?: ThreadDocVersion[]
}

function isThreadDocVersion(v: unknown): v is ThreadDocVersion {
	return (
		!!v &&
		typeof (v as ThreadDocVersion).version === 'number' &&
		typeof (v as ThreadDocVersion).updatedAt === 'string' &&
		typeof (v as ThreadDocVersion).checksum === 'string' &&
		typeof (v as ThreadDocVersion).url === 'string'
	)
}

function isThreadDocMeta(d: unknown): d is ThreadDocMeta {
	const doc = d as ThreadDocMeta
	const versionsOk =
		!doc.versions ||
		(Array.isArray(doc.versions) && doc.versions.every(isThreadDocVersion))
	return !!doc && typeof doc.id === 'string' && versionsOk
}
// Minimal typing for useWorkspace fields we rely on here
type WorkspaceHookSlice = {
	documentContent: Record<string, string>
	setDocumentContent: (
		project: string,
		document: string,
		content: string,
	) => void
	activeOrganization: string | null
	activeDepartment: string | null
	organizationList: string[]
	projectList: string[]
	documentList: Record<string, string[]>
	textDocuments: Record<string, string[]>
	imageDocuments: Record<string, string[]>
	spreadsheetDocuments: Record<string, string[]>
	projectsByDept: Record<string, Record<string, string[]>>
	departmentList: Record<string, string[]>
}

// Workspace server cache payload (mirrors /api/workspace/state)
// Workspace server cache types are imported from '@/lib/workspace-state'

interface WorkspaceContentInternalProps {
	projectName: string
	documentName: string
	documentType: 'text' | 'image' | 'spreadsheet'
	chatbot?: Chatbot
}

function WorkspaceContentInternal({
	projectName,
	documentName,
	documentType,
	chatbot,
}: WorkspaceContentInternalProps) {
	const {
		documentContent,
		setDocumentContent,
		activeOrganization,
		activeDepartment,
		organizationList,
		projectList,
		documentList,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
		projectsByDept,
		departmentList,
	} = useWorkspace() as unknown as WorkspaceHookSlice
	console.log('useWorkspace documentContent', documentContent)
	// console.log('workspace context slice loaded')
	const {
		setCursorPosition: setGlobalCursorPosition,
		handleWorkspaceEdit,
		workspaceProcessingState,
		setActiveWorkspaceSection: onActiveSectionChange,
	} = useWorkspaceChat()
	const { activeThread, refreshActiveThread } = useThread()
	const { data: session } = useSession()
	const { addItem: addIndexedItem, updateItem: updateIndexedItem } =
		useIndexedDB({})
	const { customSonner } = useSonner()

	// Shared checksum now imported from '@/lib/checksum'

	// Initial content for different document types
	const initialContent = React.useMemo(() => {
		switch (documentType) {
			case 'text':
				return `# Introduction
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
			case 'image':
				return `# Image Collection
This document contains visual assets and image resources for the project.

## Design Assets
Visual design elements, logos, and branding materials.

## Screenshots
Application screenshots and user interface captures.

## Diagrams
Technical diagrams, flowcharts, and process illustrations.

## Marketing Materials
Promotional images, banners, and marketing visuals.

## Reference Images
Inspiration and reference materials for design work.
`
			case 'spreadsheet':
				return `# Data Analysis
This document contains structured data and analytical information.

## Overview
Summary of data sources, methodology, and key findings.

## Data Sources
Information about where the data was collected and how it was processed.

## Key Metrics
Important measurements and performance indicators.

## Analysis Results
Findings from data analysis, trends, and insights.

## Recommendations
Actionable recommendations based on the data analysis.
`
			default:
				return `# ${documentName || 'New Document'}
This is a new document. Add your content here.
`
		}
	}, [documentType, documentName])

	// Get current document content
	const documentKey = `${projectName}:${documentName}`
	const savedContent = documentContent?.[documentKey]

	// State management
	const [fullMarkdown, setFullMarkdown] = React.useState<string>(
		savedContent || initialContent,
	)
	const [sections, setSections] = React.useState<MarkdownSection[]>(
		parseMarkdownSections(savedContent || initialContent),
	)
	const [activeSection, setActiveSection] = React.useState<string | null>(null)
	const [editableContent, setEditableContent] = React.useState<string>('')
	const [viewMode, setViewMode] = React.useState<'sections' | 'source'>(
		'sections',
	)
	const [cursorPosition, setCursorPosition] = React.useState<number>(0)
	const [isSaving, setIsSaving] = React.useState(false)
	const [showVersions, setShowVersions] = React.useState(false)
	const [versions, setVersions] = React.useState<
		Array<{
			version: number
			updatedAt: string
			checksum: string
			url: string
		}>
	>([])

	// Refs
	const sectionTextareaRef = React.useRef<HTMLTextAreaElement>(null)
	const sourceTextareaRef = React.useRef<HTMLTextAreaElement>(null)
	const isUserTypingRef = React.useRef<boolean>(false)
	const userTypingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
	const prevDocumentKeyRef = React.useRef(documentKey)

	// Cleanup timeout on unmount
	React.useEffect(() => {
		return () => {
			if (userTypingTimeoutRef.current) {
				clearTimeout(userTypingTimeoutRef.current)
			}
		}
	}, [])

	// Document change effect
	React.useEffect(() => {
		console.log('🔄 Document key change effect triggered:', {
			oldKey: prevDocumentKeyRef.current,
			newKey: documentKey,
			hasSavedContent: !!savedContent,
		})

		if (documentKey !== prevDocumentKeyRef.current) {
			setActiveSection(null)
			setEditableContent('')
			prevDocumentKeyRef.current = documentKey
			onActiveSectionChange?.(null)

			if (savedContent) {
				setFullMarkdown(savedContent)
				const parsedSections = parseMarkdownSections(savedContent)
				setSections(parsedSections)
			} else {
				setFullMarkdown(initialContent)
				const parsedSections = parseMarkdownSections(initialContent)
				setSections(parsedSections)

				if (projectName && documentName) {
					setDocumentContent(projectName, documentName, initialContent)
				}
			}
		}
	}, [
		documentKey,
		savedContent,
		initialContent,
		projectName,
		documentName,
		setDocumentContent,
		onActiveSectionChange,
	])

	// External content sync effect
	React.useEffect(() => {
		if (
			savedContent &&
			savedContent !== fullMarkdown &&
			!isUserTypingRef.current
		) {
			React.startTransition(() => {
				setFullMarkdown(savedContent)
				setSections(parseMarkdownSections(savedContent))

				if (activeSection) {
					const updatedSections = parseMarkdownSections(savedContent)
					const newActiveSection = updatedSections.find(
						(s) => s.id === activeSection,
					)
					if (newActiveSection) {
						setEditableContent(newActiveSection.content)
					}
				}
			})
		}
	}, [savedContent, fullMarkdown, activeSection])

	// Helper functions
	const markUserTyping = React.useCallback(() => {
		isUserTypingRef.current = true
		if (userTypingTimeoutRef.current) {
			clearTimeout(userTypingTimeoutRef.current)
		}
		userTypingTimeoutRef.current = setTimeout(() => {
			isUserTypingRef.current = false
		}, 1000)
	}, [])

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		markUserTyping()
		setEditableContent(e.target.value)
		const position = e.target.selectionStart || 0
		setCursorPosition(position)
		setGlobalCursorPosition(position)
	}

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

	const handleSectionClick = (sectionId: string) => {
		const section = sections.find((s) => s.id === sectionId)
		if (section) {
			setActiveSection(sectionId)
			setEditableContent(section.content)
			onActiveSectionChange?.(sectionId)
		}
	}

	const handleSaveSection = React.useCallback(() => {
		if (activeSection) {
			const updatedSections = sections.map((section) =>
				section.id === activeSection
					? { ...section, content: editableContent }
					: section,
			)
			setSections(updatedSections)

			const newMarkdown = combineMarkdownSections(updatedSections)
			setFullMarkdown(newMarkdown)

			if (projectName && documentName) {
				setDocumentContent(projectName, documentName, newMarkdown)
			}

			customSonner({
				type: 'success',
				text: `${documentType} document saved successfully!`,
			})
		}
	}, [
		activeSection,
		editableContent,
		sections,
		projectName,
		documentName,
		setDocumentContent,
		documentType,
		customSonner,
	])

	const debouncedSaveFullSource = React.useCallback(() => {
		let timeoutId: NodeJS.Timeout
		return (content: string) => {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				if (projectName && documentName && content) {
					setDocumentContent(projectName, documentName, content)
				}
			}, 500)
		}
	}, [projectName, documentName, setDocumentContent])

	const handleViewSourceToggle = React.useCallback(
		(fullView: boolean) => {
			if (fullView && activeSection && editableContent.trim()) {
				handleSaveSection()
			} else if (!fullView && projectName && documentName) {
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

	// Create meta prompt function
	const createWorkspaceMetaPrompt = React.useCallback(
		(
			userPrompt: string,
			sectionTitle: string,
			taskType: 'expand' | 'rewrite',
		) => {
			const sectionsContext = sections
				.map(
					(section) =>
						`## ${section.title} (Level ${section.level})\n${section.content}\n`,
				)
				.join('\n')

			const focusedSection = sections.find((s) => s.title === sectionTitle)

			if (!focusedSection) return ''

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

			const taskAction = taskType === 'expand' ? 'expand' : 'rewrite'
			const taskDescription =
				taskType === 'expand'
					? "with detailed, relevant content that fits the document's context and purpose"
					: "to improve clarity, coherence, and alignment with the document's overall purpose and structure"

			const taskInstructions = `
EDITING MODE: SECTION ${taskType.toUpperCase()}
You are ${taskType === 'expand' ? 'expanding' : 'rewriting'} a specific section of a larger document. The user has requested to ${taskAction} the section "${focusedSection.title}".

WORKSPACE CONTEXT:
- Project: ${projectName || 'Untitled Project'}
- Document: ${documentName || 'Untitled Document'}
- Document Type: ${documentType}
- Active Section: ${sectionTitle}
- Total Sections: ${sections.length}

CURRENT SECTION BEING EDITED:
## ${focusedSection.title} (Level ${focusedSection.level})
${focusedSection.content}

USER REQUEST: ${userPrompt}

TASK: ${taskAction.charAt(0).toUpperCase() + taskAction.slice(1)} the "${focusedSection.title}" section ${taskDescription}.`

			const outputFormat = `
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
		[chatbot, projectName, documentName, documentType, sections],
	)

	const handleExpandSection = React.useCallback(
		async (sectionTitle: string) => {
			const prompt = `Proceed to expand ${sectionTitle} section`
			const metaPrompt = createWorkspaceMetaPrompt(
				prompt,
				sectionTitle,
				'expand',
			)

			if (!metaPrompt) return

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

			if (!metaPrompt) return

			await handleWorkspaceEdit(prompt, metaPrompt, cursorPosition)
		},
		[createWorkspaceMetaPrompt, handleWorkspaceEdit, cursorPosition],
	)

	// Unified save function (create thread if needed, verify checksum, versioning, upload, cache)
	const handleSaveDocument = async () => {
		try {
			if (!projectName || !documentName) return

			// Ensure latest section edits are merged into fullMarkdown
			if (activeSection && editableContent.trim()) {
				// Persist current section into full source before saving
				const updatedSections = sections.map((section) =>
					section.id === activeSection
						? { ...section, content: editableContent }
						: section,
				)
				const newMarkdown = combineMarkdownSections(updatedSections)
				setSections(updatedSections)
				setFullMarkdown(newMarkdown)
				if (projectName && documentName) {
					setDocumentContent(projectName, documentName, newMarkdown)
				}
			}

			const content =
				activeSection && editableContent.trim()
					? combineMarkdownSections(
							sections.map((s) =>
								s.id === activeSection ? { ...s, content: editableContent } : s,
							),
						)
					: fullMarkdown

			if (!content?.trim()) return

			// Determine type
			const type: 'text' | 'image' | 'spreadsheet' = documentType || 'text'

			// 1) Sync workspace server cache (drafts): load existing, update document content, post back
			try {
				const { data } = await getWorkspaceState()
				// Build payload from server cache if present, otherwise from local workspace context
				const serverState: WorkspaceStatePayload = data ?? {
					organisationsVersion: 1,
					updatedAt: Date.now(),
					organizations: organizationList ?? [],
					departmentsByOrg: (departmentList as Record<string, string[]>) ?? {},
					projectsByDept: projectsByDept ?? {},
					textDocuments: textDocuments ?? {},
					imageDocuments: imageDocuments ?? {},
					spreadsheetDocuments: spreadsheetDocuments ?? {},
					documentContent: documentContent ?? {},
					activeOrganization,
					activeDepartment,
					activeProject: projectName,
					activeDocument: documentName,
					activeDocumentType:
						(documentType as 'text' | 'image' | 'spreadsheet') ?? 'text',
				}

				// Update doc content in server payload
				const nextState = upsertDocumentDraft(serverState, {
					project: projectName,
					document: documentName,
					content,
					type,
					activeOrganization,
					activeDepartment,
				})

				// Persist to server cache
				await postWorkspaceState(nextState)

				// Align local state with server cache
				setDocumentContent(projectName, documentName, content)
			} catch (err) {
				console.warn('Workspace cache sync failed, continuing save:', err)
			}

			// Prepare checksum and compare with latest version (if any)
			const docId = `${projectName}:${documentName}`
			const currentChecksum = computeChecksum(content)
			let threadDocuments: ThreadDocMeta[] = []
			const meta = (activeThread as unknown as { metadata?: unknown })?.metadata
			if (
				meta &&
				typeof meta === 'object' &&
				Array.isArray((meta as { documents?: unknown }).documents)
			) {
				const docs = (meta as { documents?: unknown }).documents as unknown[]
				threadDocuments = docs.filter(isThreadDocMeta)
			}
			const metaDoc = threadDocuments.find(
				(d) =>
					d?.id === docId || d?.name === documentName || d?.id === documentName,
			)
			let latestChecksum: string | null = null
			if (metaDoc?.versions?.length) {
				// Prefer currentVersion pointer, fallback to latest by updatedAt
				const byVersion = metaDoc.versions.find(
					(v: ThreadDocVersion) => v.version === metaDoc.currentVersion,
				)
				const latest = byVersion
					? byVersion
					: [...metaDoc.versions].sort(
							(a: ThreadDocVersion, b: ThreadDocVersion) =>
								new Date(b.updatedAt).getTime() -
								new Date(a.updatedAt).getTime(),
						)[0]
				latestChecksum = latest?.checksum || null
			}

			if (latestChecksum && latestChecksum === currentChecksum) {
				customSonner({ type: 'info', text: 'No changes to save.' })
				return
			}

			setIsSaving(true)

			// 2) Resolve or create thread; official versions go to thread metadata and bucket
			let threadSlug = activeThread?.slug
			if (!threadSlug) {
				// Need session and chatbot to create a thread
				if (!session?.user?.hasuraJwt || !chatbot) {
					customSonner({
						type: 'error',
						text: 'Cannot create thread: missing session or chatbot.',
					})
					setIsSaving(false)
					return
				}

				const newThreadId = crypto.randomUUID()
				const newThreadSlug = `${chatbot.name
					.toLowerCase()
					.replace(/\s+/g, '-')}-${newThreadId}`

				try {
					// Preseed metadata with workspace context and initial doc entry
					const threadMetadata = {
						documents: [
							{
								id: docId,
								project: projectName,
								name: documentName,
								type,
								currentVersion: 1,
								versions: [],
							},
						],
						organization: activeOrganization,
						department: activeDepartment,
						isWorkspaceThread: true,
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
						try {
							await updateThreadDocumentsMetadata({
								threadSlug,
								documents: threadMetadata.documents,
							})
							// Refresh to pull latest metadata
							await refreshActiveThread(
								createdThread.threadId,
								session.user.hasuraJwt,
							)
						} catch (metadataError) {
							console.warn('Failed to update thread metadata:', metadataError)
						}
					} else {
						customSonner({ type: 'error', text: 'Failed to create thread.' })
						setIsSaving(false)
						return
					}
				} catch (error) {
					console.error('Failed to create thread for document save:', error)
					setIsSaving(false)
					return
				}
			}

			if (!threadSlug) {
				setIsSaving(false)
				return
			}

			// Upload document content to bucket (server handles official versioning + checksum)
			const { document } = await uploadWorkspaceDocumentToBucket({
				threadSlug,
				project: projectName,
				name: documentName,
				content,
				type,
			})

			// Store raw locally (IndexedDB) as data URL
			const base64 = await new Promise<string>((resolve, reject) => {
				try {
					const blob = new Blob([content], { type: 'text/markdown' })
					const reader = new FileReader()
					reader.onloadend = () => resolve(reader.result as string)
					reader.onerror = reject
					reader.readAsDataURL(blob)
				} catch (e) {
					reject(e)
				}
			})

			const id = document?.id || docId
			const item = {
				id,
				name: documentName,
				project: projectName,
				type,
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

			if (document?.versions?.length) {
				setVersions(
					document.versions.map((v: ThreadDocVersion) => ({
						version: v.version,
						updatedAt: v.updatedAt,
						checksum: v.checksum,
						url: v.url,
					})),
				)
			}

			customSonner({ type: 'success', text: `${type} document saved.` })
		} catch (e) {
			console.error('Save failed', e)
			customSonner({ type: 'error', text: 'Failed to save document.' })
		} finally {
			setIsSaving(false)
		}
	}

	const handleRollback = React.useCallback(
		async (versionNumber: number) => {
			if (!projectName || !documentName || !activeThread?.slug) return
			try {
				const updated = versions.map((v) => v)
				await updateThreadDocumentsMetadata({
					threadSlug: activeThread.slug,
					documents: [
						{
							id: `${projectName}:${documentName}`,
							project: projectName,
							name: documentName,
							type: documentType as 'text' | 'image' | 'spreadsheet',
							currentVersion: versionNumber,
							versions: updated.map((u) => ({
								version: u.version,
								updatedAt: u.updatedAt,
								checksum: u.checksum,
								url: u.url,
								contentKey: '',
								size: 0,
							})),
						},
					],
				})
			} catch (e) {
				console.error('Rollback failed', e)
			}
		},
		[projectName, documentName, activeThread?.slug, versions, documentType],
	)

	// Load versions from thread metadata when opening History
	const handleToggleVersions = React.useCallback(() => {
		if (!showVersions) {
			try {
				const meta = (activeThread as unknown as { metadata?: unknown })
					?.metadata
				let threadDocuments: ThreadDocMeta[] = []
				if (
					meta &&
					typeof meta === 'object' &&
					Array.isArray((meta as { documents?: unknown }).documents)
				) {
					const docs = (meta as { documents?: unknown }).documents as unknown[]
					threadDocuments = docs.filter(isThreadDocMeta)
				}
				const docId = `${projectName}:${documentName}`
				const metaDoc = threadDocuments.find(
					(d) =>
						d?.id === docId ||
						d?.name === documentName ||
						d?.id === documentName,
				)
				if (metaDoc?.versions?.length) {
					setVersions(
						metaDoc.versions.map((v) => ({
							version: v.version,
							updatedAt: v.updatedAt,
							checksum: v.checksum,
							url: v.url,
						})),
					)
				} else {
					setVersions([])
				}
			} catch (e) {
				console.warn('Failed to load versions from thread metadata:', e)
			}
		}
		setShowVersions((v) => !v)
	}, [showVersions, activeThread, projectName, documentName])

	return (
		<div className="flex flex-col space-y-4 pb-4 px-4 size-full">
			<WorkspaceContentHeader
				documentType={documentType}
				activeSection={activeSection}
				isSaving={isSaving}
				showVersions={showVersions}
				versions={versions}
				onSave={handleSaveDocument}
				onToggleVersions={handleToggleVersions}
				onRollback={handleRollback}
			/>

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

					<WorkspaceTextEditor
						sections={sections}
						setSections={setSections}
						activeSection={activeSection}
						setActiveSection={setActiveSection}
						editableContent={editableContent}
						setEditableContent={setEditableContent}
						fullMarkdown={fullMarkdown}
						setFullMarkdown={setFullMarkdown}
						viewMode={viewMode}
						sectionTextareaRef={sectionTextareaRef}
						sourceTextareaRef={sourceTextareaRef}
						handleContentChange={handleContentChange}
						handleCursorPositionChange={handleCursorPositionChange}
						handleSectionClick={handleSectionClick}
						markUserTyping={markUserTyping}
						setCursorPosition={setCursorPosition}
						debouncedSaveFullSource={debouncedSaveFullSource}
						handleExpandSection={handleExpandSection}
						handleRewriteSection={handleRewriteSection}
						handleSectionUpdate={handleSectionUpdate}
					/>
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

interface WorkspaceContentProps {
	className?: string
	isLoading?: boolean
	chatbot?: Chatbot
}

export function WorkspaceContent({
	className,
	isLoading = false,
	chatbot,
}: WorkspaceContentProps) {
	return (
		<WorkspaceContentWrapper className={className} isLoading={isLoading}>
			{({ projectName, documentName, documentType }) => (
				<WorkspaceContentInternal
					projectName={projectName}
					documentName={documentName}
					documentType={documentType}
					chatbot={chatbot}
				/>
			)}
		</WorkspaceContentWrapper>
	)
}
