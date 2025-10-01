import { updateThreadDocumentsMetadata } from '@/app/actions/thread.actions'
import { Button } from '@/components/ui/button'
import { uploadWorkspaceDocument } from '@/lib/api/documents'
import { computeChecksum } from '@/lib/checksum'
import {
	type WorkspaceTaskType,
	createWorkspaceMetaPrompt,
} from '@/lib/constants/prompts'
import { workspaceDocTemplates } from '@/lib/constants/workspace-templates'
import { getUserIndexedDBKeys } from '@/lib/hooks/use-chat-attachments'
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
	replaceSectionContent,
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
import type {
	WorkspaceDocumentMetadata,
	WorkspaceDocumentVersion,
} from '@/types/thread.types'
import { debounce } from 'lodash'
import { FileIcon, Image, PlusIcon, Table } from 'lucide-react'
import type { Chatbot } from 'mb-genql'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import type React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { WorkspaceContentHeader } from './workspace-content-header'
import { WorkspaceContentWrapper } from './workspace-content-wrapper'
import { WorkspaceTextEditor } from './workspace-text-editor'

function WorkspaceContentInternal({
	projectName,
	documentName,
	documentType,
	chatbot,
	className,
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
	// console.log('useWorkspace documentContent', documentContent)
	// console.log('workspace context slice loaded')
	const {
		messages,
		isLoading,
		onFinishWorkspaceChatRequest,
		selectionRange: globalSelectionRange,
		setSelectionRange: setGlobalSelectionRange,
		handleWorkspaceEdit,
		workspaceProcessingState,
		setActiveWorkspaceSection: onActiveSectionChange,
		setOnSectionContentUpdate,
		setOnStreamingComplete,
	} = useWorkspaceChat()
	const { activeThread, refreshActiveThread } = useThread()
	const { data: session } = useSession()
	// Use the same per-user DB naming as readers (attachments/documents) so saved docs are discoverable
	const dbKeys = useMemo(
		() => getUserIndexedDBKeys(session?.user?.id),
		[session?.user?.id],
	)
	const { addItem: addIndexedItem, updateItem: updateIndexedItem } =
		useIndexedDB(dbKeys)
	const { customSonner } = useSonner()
	const newAssistantMessage = useMemo(() => {
		const lastAssistantMessage = messages
			?.filter((msg) => msg.role === 'assistant')
			.pop()

		return !activeThread?.messages.find(
			(msg) =>
				msg.messageId ===
				// @ts-ignore
				(lastAssistantMessage?.id || lastAssistantMessage?.messageId),
		)
			? lastAssistantMessage
			: undefined
	}, [messages, activeThread])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!newAssistantMessage) return
		let frame = null
		frame = requestAnimationFrame(() =>
			onFinishWorkspaceChatRequest(newAssistantMessage),
		)
		// setFullMarkdown(newAssistantMessage.content)

		return () => {
			if (frame) cancelAnimationFrame(frame)
		}
	}, [newAssistantMessage])

	// Shared checksum now imported from '@/lib/checksum'

	// Initial content for different document types
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const initialContent = useMemo(() => {
		switch (documentType) {
			case 'text':
				return workspaceDocTemplates.text.blank.content(
					documentName,
					projectName,
				)
			case 'image':
				return workspaceDocTemplates.image.blank.content(
					documentName,
					projectName,
				)
			case 'spreadsheet':
				return workspaceDocTemplates.spreadsheet.blank.content(
					documentName,
					projectName,
				)
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
	// Derive fullMarkdown from savedContent (SSoT) so UI reacts to workspace/state updates
	const fullMarkdown = useMemo(
		() =>
			savedContent?.startsWith('data:text/markdown;base64')
				? atob(savedContent.split(',')[1])
				: (savedContent ?? initialContent),
		[savedContent, initialContent],
	)
	const [sections, setSections] = useState<MarkdownSection[]>(
		parseMarkdownSections(savedContent || initialContent),
	)
	const [activeSection, setActiveSection] = useState<string | null>(null)
	const [editableContent, setEditableContent] = useState<string>('')
	const [viewMode, setViewMode] = useState<'sections' | 'source'>('sections')
	const [cursorPosition, setCursorPosition] = useState<number>(0)
	const [isSaving, setIsSaving] = useState(false)
	const [showVersions, setShowVersions] = useState(false)
	const [versions, setVersions] = useState<WorkspaceDocumentVersion[]>([])

	// Refs
	const sectionTextareaRef = useRef<HTMLTextAreaElement>(null)
	const sourceTextareaRef = useRef<HTMLTextAreaElement>(null)
	const isUserTypingRef = useRef<boolean>(false)
	const userTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const sectionSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const prevDocumentKeyRef = useRef(documentKey)
	// Streaming control/throttle
	const streamingActiveRef = useRef<boolean>(false)
	const streamThrottleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const streamLastUpdateRef = useRef<number>(0)

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (userTypingTimeoutRef.current) {
				clearTimeout(userTypingTimeoutRef.current)
			}
		}
	}, [])

	// Set up callback for updating local editable content when AI updates sections (streaming)
	useEffect(() => {
		const updateSectionContent = (sectionId: string, content: string) => {
			// Mark stream active and throttle UI-only updates
			streamingActiveRef.current = true
			if (sectionId === activeSection) {
				const now = Date.now()
				const elapsed = now - streamLastUpdateRef.current
				const pushUpdate = () => {
					setEditableContent(content)
					streamLastUpdateRef.current = Date.now()
				}
				// Throttle to ~20fps
				if (elapsed >= 50) {
					pushUpdate()
				} else {
					if (streamThrottleTimeoutRef.current)
						clearTimeout(streamThrottleTimeoutRef.current)
					streamThrottleTimeoutRef.current = setTimeout(
						pushUpdate,
						50 - elapsed,
					)
				}
			}
			// Keep sections content in sync for title/preview without re-parsing
			setSections((prev) =>
				prev.map((s) => (s.id === sectionId ? { ...s, content } : s)),
			)
		}

		setOnSectionContentUpdate(updateSectionContent)
		return () => setOnSectionContentUpdate(undefined)
	}, [activeSection, setOnSectionContentUpdate])

	// Set up streaming complete callback to ensure final state consistency
	// biome-ignore lint/correctness/useExhaustiveDependencies: Every time we trigger a new document content and we reset the onStreamComplete callback, we check if the processing state is idle, so we can trigger a side-effect callback... currently not in use but in future it will...
	useEffect(() => {
		if (streamingActiveRef.current || workspaceProcessingState !== 'idle')
			return
		const handleStreamingComplete = () => {
			console.log('🎯 Streaming complete - final state sync')
			const documentKey = `${projectName}:${documentName}`
			console.log(
				'✅ Streaming complete - state synchronized via fullMarkdown effect',
			)
		}

		setOnStreamingComplete(handleStreamingComplete)
		return () => setOnStreamingComplete(undefined)
	}, [
		projectName,
		documentName,
		workspaceProcessingState,
		setDocumentContent,
		setOnStreamingComplete,
	])

	// When streaming ends, persist once and re-parse sections
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!isLoading && streamingActiveRef.current) {
			try {
				if (activeSection && projectName && documentName) {
					const freshSections = parseMarkdownSections(fullMarkdown)
					const target = freshSections.find((s) => s.id === activeSection)
					if (target) {
						const newMd = replaceSectionContent(
							fullMarkdown,
							target,
							editableContent,
						)
						setDocumentContent(projectName, documentName, newMd)
					}
				}
			} finally {
				// Cleanup throttle state
				streamingActiveRef.current = false
				if (streamThrottleTimeoutRef.current) {
					clearTimeout(streamThrottleTimeoutRef.current)
					streamThrottleTimeoutRef.current = null
				}
				streamLastUpdateRef.current = 0
			}
		}
	}, [
		isLoading,
		activeSection,
		projectName,
		documentName,
		fullMarkdown,
		editableContent,
	])

	// Always keep sections and editableContent in sync with fullMarkdown when it changes
	useEffect(() => {
		const parsed = parseMarkdownSections(fullMarkdown)
		setSections(parsed)
		if (activeSection) {
			const s = parsed.find((sec) => sec.id === activeSection)
			if (s) setEditableContent(s.content)
		}
	}, [fullMarkdown, activeSection])

	// Auto-save fullMarkdown changes (with debouncing)
	useEffect(() => {
		if (!projectName || !documentName) return

		const isGenerating = workspaceProcessingState !== 'idle'
		const debounceTime = isGenerating ? 3000 : 1000 // 3s during generation, 1s otherwise

		const saveTimeout = setTimeout(() => {
			if (fullMarkdown && fullMarkdown !== (savedContent ?? initialContent)) {
				console.log('💾 Auto-saving document changes', {
					isGenerating,
					debounceTime,
				})
				setDocumentContent(projectName, documentName, fullMarkdown)
			}
		}, debounceTime)

		return () => clearTimeout(saveTimeout)
	}, [
		fullMarkdown,
		projectName,
		documentName,
		savedContent,
		initialContent,
		setDocumentContent,
		workspaceProcessingState,
	])

	// Helper functions
	const markUserTyping = useCallback(() => {
		isUserTypingRef.current = true
		if (userTypingTimeoutRef.current) {
			clearTimeout(userTypingTimeoutRef.current)
		}
		userTypingTimeoutRef.current = setTimeout(() => {
			isUserTypingRef.current = false
		}, 1000)
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleContentChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			markUserTyping()
			const value = e.target.value
			setEditableContent(value)
			const position = e.target.selectionStart || 0
			const end = e.target.selectionEnd || position
			setCursorPosition(position)
			setGlobalSelectionRange({ start: position, end })

			// Persist into full markdown using absolute offsets for the active section
			if (activeSection) {
				const freshSections = parseMarkdownSections(fullMarkdown)
				const target = freshSections.find((s) => s.id === activeSection)
				if (target) {
					const newMd = replaceSectionContent(fullMarkdown, target, value)

					const isGenerating = workspaceProcessingState !== 'idle'
					const debounceTime = isGenerating ? 1000 : 400

					// Debounce persisting to workspace store
					if (sectionSaveTimeoutRef.current)
						clearTimeout(sectionSaveTimeoutRef.current)
					sectionSaveTimeoutRef.current = setTimeout(() => {
						if (projectName && documentName) {
							setDocumentContent(projectName, documentName, newMd)
						}
					}, debounceTime)
				}
			}
		},
		[
			markUserTyping,
			setEditableContent,
			setGlobalSelectionRange,
			activeSection,
			projectName,
			documentName,
			setDocumentContent,
			workspaceProcessingState,
		],
	)

	const handleCursorPositionChange = useCallback(
		(
			e:
				| React.FocusEvent<HTMLTextAreaElement>
				| React.MouseEvent<HTMLTextAreaElement>,
		) => {
			const target = e.target as HTMLTextAreaElement
			const position = target.selectionStart || 0
			const end = target.selectionEnd || position
			setGlobalSelectionRange({ start: position, end })
		},
		[setGlobalSelectionRange],
	)

	const handleSectionClick = (sectionId: string) => {
		const section = sections.find((s) => s.id === sectionId)
		if (section) {
			setActiveSection(sectionId)
			setEditableContent(section.content)
			onActiveSectionChange?.(sectionId)
		}

		// Focus the section textarea and set default cursor position at start
		requestAnimationFrame(() => {
			if (sectionTextareaRef.current) {
				sectionTextareaRef.current.focus()
				sectionTextareaRef.current.setSelectionRange(0, 0)
				setGlobalSelectionRange({ start: 0, end: 0 })
			}
		})
	}

	// Update a section title in place
	const handleSectionUpdate = useCallback(
		(sectionId: string, newTitle: string) => {
			// Title changes will be persisted when switching views/saving by rebuilding markdown
			setSections((prev) =>
				prev.map((s) => (s.id === sectionId ? { ...s, title: newTitle } : s)),
			)
		},
		[],
	)

	// Debounced save for full source editing
	// biome-ignore lint/correctness/useExhaustiveDependencies: debounces when hearing changes to sync them with the setDocumentContent on other effects
	const debouncedSaveFullSource = useCallback(
		debounce((content: string) => {
			if (projectName && documentName && content) {
				setDocumentContent(projectName, documentName, content)
			}
		}, 500),
		[projectName, documentName, setDocumentContent],
	)

	// Toggle between Section Editor and Full Source, ensuring persistence
	const handleViewSourceToggle = (fullView: boolean) => {
		if (fullView && activeSection) {
			// Persist current section edits into fullMarkdown using offsets
			const fresh = parseMarkdownSections(fullMarkdown)
			const target = fresh.find((s) => s.id === activeSection)
			if (target) {
				const newMd = replaceSectionContent(
					fullMarkdown,
					target,
					editableContent,
				)
				if (projectName && documentName)
					setDocumentContent(projectName, documentName, newMd)
			}
		} else if (!fullView && projectName && documentName) {
			// Switching back to section view: parse sections from latest source
			const parsed = parseMarkdownSections(fullMarkdown)
			setSections(parsed)
			if (activeSection) {
				const s = parsed.find((sec) => sec.id === activeSection)
				if (s) setEditableContent(s.content)
			}
			setDocumentContent(projectName, documentName, fullMarkdown)
		}

		// Set view mode after content is synchronized
		setViewMode(fullView ? 'source' : 'sections')
	}

	const handleExpandSection = async (sectionTitle: string) => {
		const sectionByTitle = sections.find((s) => s.title === sectionTitle)
		if (sectionByTitle && sectionByTitle.id !== activeSection) {
			setActiveSection(sectionByTitle.id)
			onActiveSectionChange?.(sectionByTitle.id)
			setEditableContent(sectionByTitle.content)
		}

		// For expand operations, we want to replace the entire section content
		// Pass null as selection range to signal full section replacement
		const effectiveSelectionRange = null

		const prompt = `Proceed to expand ${sectionTitle} section`
		const metaPrompt = createWorkspaceMetaPrompt({
			userPrompt: prompt,
			taskType: 'expand',
			projectName,
			documentName,
			documentType,
			sections,
			activeSectionTitle: sectionTitle,
		})

		if (!metaPrompt) return

		await handleWorkspaceEdit(prompt, metaPrompt, effectiveSelectionRange)
	}

	const handleRewriteSection = async (sectionTitle: string) => {
		const sectionByTitle = sections.find((s) => s.title === sectionTitle)
		if (sectionByTitle && sectionByTitle.id !== activeSection) {
			setActiveSection(sectionByTitle.id)
			onActiveSectionChange?.(sectionByTitle.id)
			setEditableContent(sectionByTitle.content)
		}

		// For rewrite operations, we want to replace the entire section content
		// Pass null as selection range to signal full section replacement
		const effectiveSelectionRange = null

		const prompt = `Rewrite ${sectionTitle} section`
		const metaPrompt = createWorkspaceMetaPrompt({
			userPrompt: prompt,
			taskType: 'rewrite',
			projectName,
			documentName,
			documentType,
			sections,
			activeSectionTitle: sectionTitle,
		})

		if (!metaPrompt) return

		await handleWorkspaceEdit(prompt, metaPrompt, effectiveSelectionRange)
	}

	// Unified save function (create thread if needed, verify checksum, versioning, upload, cache)
	const handleSaveDocument = async () => {
		try {
			if (!projectName || !documentName) return

			// Start with current fullMarkdown
			let content = fullMarkdown

			// Ensure latest section edits are merged into fullMarkdown via offsets
			if (activeSection) {
				const fresh = parseMarkdownSections(fullMarkdown)
				const target = fresh.find((s) => s.id === activeSection)
				if (target) {
					const newMd = replaceSectionContent(
						fullMarkdown,
						target,
						editableContent,
					)
					if (projectName && documentName)
						setDocumentContent(projectName, documentName, newMd)
					content = newMd
				}
			}

			if (!content?.trim()) return

			// Determine type
			const type: 'text' | 'image' | 'spreadsheet' = documentType || 'text'

			// Sync workspace server cache (drafts): load existing, update document content, post back
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
			let threadDocuments: WorkspaceDocumentMetadata[] = []
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
				(d) => d.name === documentName && d.project === projectName,
			)
			const docId = metaDoc?.id || nanoid()
			const currentChecksum = computeChecksum(content)

			let latestChecksum: string | null = null
			if (metaDoc?.versions?.length) {
				// Prefer currentVersion pointer, fallback to latest by updatedAt
				const byVersion = metaDoc.versions.find(
					(v: WorkspaceDocumentVersion) => v.version === metaDoc.currentVersion,
				)
				const latest = byVersion
					? byVersion
					: [...metaDoc.versions].sort(
							(a: WorkspaceDocumentVersion, b: WorkspaceDocumentVersion) =>
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

			const threadSlug = activeThread?.slug
			if (!threadSlug) {
				console.log(
					'📝 No active thread yet - document will be saved locally only. Thread will be created when first message is sent.',
				)
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

				const item = {
					id: docId,
					name: documentName,
					organization: activeOrganization,
					department: activeDepartment,
					project: projectName,
					type,
					url: base64,
					content: base64,
					size: new Blob([content]).size,
					messageIds: [],
					expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
					threadSlug: undefined,
					version: 1,
				} as unknown as IndexedDBItem

				try {
					updateIndexedItem(docId, item)
				} catch {
					addIndexedItem(item)
				}

				customSonner({
					type: 'success',
					text: 'Document saved locally. Will sync when thread is created.',
				})
				setIsSaving(false)
				return
			}

			// Upload document content to bucket (server handles official versioning + checksum)
			const uploadResult = await uploadWorkspaceDocument(
				{
					name: documentName,
					content,
					type,
				},
				{
					organization: activeOrganization as string,
					department: activeDepartment as string,
					project: projectName,
				},
				{ slug: threadSlug },
			)

			if (uploadResult.error) {
				customSonner({
					type: 'error',
					text: uploadResult.error,
				})
				setIsSaving(false)
				return
			}

			const document = uploadResult.data
			if (!document) {
				customSonner({
					type: 'error',
					text: 'Failed to upload document.',
				})
				setIsSaving(false)
				return
			}

			// Check if document existed (similar logic to original)
			if (document.currentVersion && document.currentVersion > 1) {
				customSonner({
					type: 'info',
					text: 'Document updated with new version.',
				})
			}

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
			const documentVersion = document?.currentVersion || 1
			const item = {
				id,
				name: documentName,
				organization: activeOrganization,
				department: activeDepartment,
				project: projectName,
				type,
				url: base64,
				content: base64,
				size: new Blob([content]).size,
				messageIds: [],
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
				threadSlug,
				version: documentVersion,
			} as unknown as IndexedDBItem

			try {
				updateIndexedItem(id, item)
			} catch {
				addIndexedItem(item)
			}

			if (document?.versions?.length) {
				setVersions(document.versions)
			}

			// Show success message for new saves
			if (document.currentVersion === 1) {
				customSonner({ type: 'success', text: `${type} document saved.` })
			}
		} catch (e) {
			console.error('Save failed', e)
			customSonner({ type: 'error', text: 'Failed to save document.' })
		} finally {
			setIsSaving(false)
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleRollback = useCallback(
		async (versionNumber: number) => {
			if (!projectName || !documentName || !activeThread?.slug) return
			try {
				const versionToRollback = versions.find(
					(v) => v.version === versionNumber,
				)
				if (!versionToRollback || !versionToRollback.url) {
					customSonner({ type: 'error', text: 'Version content not found.' })
					return
				}

				// Fetch the content of the version to rollback to
				const response = await fetch(versionToRollback.url)
				if (!response.ok) {
					customSonner({
						type: 'error',
						text: 'Failed to fetch version content.',
					})
					return
				}
				const newContent = await response.text()

				// Update local state and persist
				if (projectName && documentName) {
					setDocumentContent(projectName, documentName, newContent)
				}
				if (viewMode === 'sections') {
					setActiveSection(null)
					setEditableContent('')
				}

				const updated = versions.map((v) => v)

				await updateThreadDocumentsMetadata({
					threadSlug: activeThread.slug,
					documents: [
						{
							id: `${projectName}:${documentName}`,
							url: versionToRollback.url,
							content: versionToRollback.content,
							expires: new Date(
								Date.now() + 7 * 24 * 60 * 60 * 1000,
							).toISOString(),
							threadSlug: activeThread.slug,
							organization: activeOrganization as string,
							department: activeDepartment as string,
							project: projectName,
							name: documentName,
							type: documentType as 'text' | 'image' | 'spreadsheet',
							currentVersion: versionNumber,
							versions: updated,
						} as WorkspaceDocumentMetadata,
					],
				})
				customSonner({
					type: 'success',
					text: `Rolled back to version ${versionNumber}.`,
				})
			} catch (e) {
				console.error('Rollback failed', e)
				customSonner({ type: 'error', text: 'Rollback failed.' })
			}
		},
		[
			projectName,
			documentName,
			activeThread?.slug,
			versions,
			documentType,
			customSonner,
			setDocumentContent,
			viewMode,
		],
	)

	// Load versions from thread metadata when opening History
	const handleToggleVersions = () => {
		if (!showVersions) {
			try {
				const meta = (activeThread as unknown as { metadata?: unknown })
					?.metadata
				let threadDocuments: WorkspaceDocumentMetadata[] = []
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
					setVersions(metaDoc.versions)
				} else {
					setVersions([])
				}
			} catch (e) {
				console.warn('Failed to load versions from thread metadata:', e)
			}
		}
		setShowVersions((v) => !v)
	}

	return (
		<div className={cn('flex flex-col gap-4 p-4 size-full', className)}>
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
						viewMode={viewMode}
						sections={sections}
						fullMarkdown={fullMarkdown}
						activeSection={activeSection}
						editableContent={editableContent}
						sourceTextareaRef={sourceTextareaRef}
						sectionTextareaRef={sectionTextareaRef}
						setSections={setSections}
						markUserTyping={markUserTyping}
						setActiveSection={setActiveSection}
						handleSectionClick={handleSectionClick}
						setEditableContent={setEditableContent}
						handleSectionUpdate={handleSectionUpdate}
						handleExpandSection={handleExpandSection}
						handleContentChange={handleContentChange}
						handleRewriteSection={handleRewriteSection}
						debouncedSaveFullSource={debouncedSaveFullSource}
						handleCursorPositionChange={handleCursorPositionChange}
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

export function WorkspaceContent({
	className,
	chatbot,
}: WorkspaceContentProps) {
	return (
		<WorkspaceContentWrapper>
			{({ projectName, documentName, documentType }) => (
				<WorkspaceContentInternal
					projectName={projectName}
					documentName={documentName}
					documentType={documentType}
					chatbot={chatbot}
					className={className}
				/>
			)}
		</WorkspaceContentWrapper>
	)
}

function isThreadDocVersion(v: unknown): v is WorkspaceDocumentVersion {
	return (
		!!v &&
		typeof (v as WorkspaceDocumentVersion).version === 'number' &&
		typeof (v as WorkspaceDocumentVersion).updatedAt === 'string' &&
		typeof (v as WorkspaceDocumentVersion).checksum === 'string' &&
		typeof (v as WorkspaceDocumentVersion).url === 'string'
	)
}

function isThreadDocMeta(d: unknown): d is WorkspaceDocumentMetadata {
	const doc = d as WorkspaceDocumentMetadata
	const versionsOk =
		!doc.versions ||
		(Array.isArray(doc.versions) && doc.versions.every(isThreadDocVersion))
	return !!doc && typeof doc.id === 'string' && versionsOk
}

interface WorkspaceContentProps {
	className?: string
	chatbot?: Chatbot
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
	className?: string
}
