'use client'

import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useModel } from '@/lib/hooks/use-model'
import { useSonner } from '@/lib/hooks/useSonner'
import {
	parseMarkdownSections,
	replaceSectionContent,
} from '@/lib/markdown-utils'
import { getDocumentPreviousVersion } from '@/lib/workspace-state'
import type { useChat } from '@ai-sdk/react'
import type { Attachment, Message, UIMessage } from 'ai'
import { debounce } from 'lodash'
import { nanoid } from 'nanoid'
import * as React from 'react'
import { useWorkspace } from './use-workspace'

// Helper to safely encode a string to Base64, handling Unicode characters
function toBase64(str: string) {
	return btoa(
		new Uint8Array(new TextEncoder().encode(str)).reduce(
			(data, byte) => data + String.fromCharCode(byte),
			'',
		),
	)
}

interface WorkspaceChatContextType extends Partial<ReturnType<typeof useChat>> {
	// Chat state
	error: Error | undefined

	// Workspace processing state
	workspaceProcessingState: 'idle' | 'analyzing' | 'generating' | 'updating'
	setWorkspaceProcessingState: (
		state: 'idle' | 'analyzing' | 'generating' | 'updating',
	) => void

	// Active section tracking
	activeWorkspaceSection: string | null
	setActiveWorkspaceSection: (section: string | null) => void

	// Finish workspace chat request: updates the current active document
	onFinishWorkspaceChatRequest: (message: Message) => void

	// Selection range tracking (replaces simple cursor position)
	selectionRange: { start: number; end: number } | null
	setSelectionRange: (range: { start: number; end: number } | null) => void

	// Local UI update callback for section content
	onSectionContentUpdate?: (sectionId: string, content: string) => void
	setOnSectionContentUpdate: (
		callback: ((sectionId: string, content: string) => void) | undefined,
	) => void

	// Main workspace edit function
	handleWorkspaceEdit: (
		userPrompt: string,
		metaPrompt: string,
		selectionRange?: { start: number; end: number } | null,
	) => Promise<void>

	// Document update function
	handleDocumentUpdate: (
		aiResponse: string,
		activeSection: string | null,
		currentContent: string,
		documentKey: string,
		selectionRange?: { start: number; end: number } | null,
	) => void
}

const WorkspaceChatContext = React.createContext<
	WorkspaceChatContextType | undefined
>(undefined)

export function WorkspaceChatProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const {
		activeProject,
		activeDocument,
		setDocumentContent,
		isWorkspaceActive,
		documentContent,
	} = useWorkspace()

	// Workspace processing state
	const [workspaceProcessingState, setWorkspaceProcessingState] =
		React.useState<'idle' | 'analyzing' | 'generating' | 'updating'>('idle')
	const [activeWorkspaceSection, setActiveWorkspaceSection] = React.useState<
		string | null
	>(null)
	const [selectionRange, setSelectionRange] = React.useState<{
		start: number
		end: number
	} | null>(null)

	// Local UI update callback for section content
	const [onSectionContentUpdate, setOnSectionContentUpdate] = React.useState<
		((sectionId: string, content: string) => void) | undefined
	>(undefined)

	// Refs to preserve content structure during streaming updates
	const preservedAfterSelectionRef = React.useRef<string>('')
	const preservedBeforeSelectionRef = React.useRef<string>('')
	const initialSelectionRangeRef = React.useRef<{
		start: number
		end: number
	} | null>(null)

	// Add logging for active workspace section changes
	React.useEffect(() => {
		console.log(
			'🎯 useWorkspaceChat: activeWorkspaceSection changed to:',
			activeWorkspaceSection,
		)
	}, [activeWorkspaceSection])
	const { customSonner } = useSonner()

	// Create a stable chat ID that persists across renders
	const chatId = React.useMemo(() => nanoid(), [])

	// Store the current metaPrompt for system context
	const [currentMetaPrompt, setCurrentMetaPrompt] = React.useState<string>('')
	// Raw useChat hook for workspace mode with system message support
	const [
		{ allMessages: messages, isLoading, input, error },
		{ appendWithMbContextPrompts: append, setInput, setMessages },
	] = useMBChat()

	const onFinishWorkspaceChatRequest = (message: Message) => {
		console.log(
			'✅ onFinish: AI response complete, handling document update:',
			message.content?.substring(0, 100),
		)

		// Get current document info
		const documentKey = `${activeProject}:${activeDocument}`
		const currentContent = documentContent?.[documentKey] || ''

		// Process the AI response for document update
		if (activeProject && activeDocument && message.content) {
			console.log('📝 Processing document update in onFinish')
			handleDocumentUpdate(
				message.content,
				activeWorkspaceSection,
				currentContent,
				documentKey,
				selectionRange,
			)
		}

		// Note: Document updates are handled here instead of in workspace-content.tsx
		// to prevent infinite loops and ensure proper state management

		console.log('✅ onFinish: Document update complete')
	}

	// console.log('🔄 WorkspaceChatProvider messages:', messages)

	// Document update function with improved dependency management
	const handleDocumentUpdate = (
		aiResponse: string,
		activeSection: string | null,
		currentContent: string,
		documentKey: string,
		selectionRange?: { start: number; end: number } | null,
	) => {
		console.log('📝 Processing document update:', {
			responseLength: aiResponse.length,
			activeSection,
			documentKey,
			selectionRange,
		})

		if (workspaceProcessingState !== 'updating') {
			setWorkspaceProcessingState('updating')
		}

		try {
			// Parse the current document into sections
			const sections = parseMarkdownSections(currentContent)

			console.log('📝 Section parsing results:', {
				totalSections: sections.length,
				sectionIds: sections.map((s) => s.id),
				sectionTitles: sections.map((s) => s.title),
				activeSection,
			})

			// If there's an active section, update that specific section only
			const sectionIndex = sections.findIndex((s) => s.id === activeSection)

			console.log('📍 Section matching:', {
				activeSection,
				sectionIndex,
				foundSection: sectionIndex !== -1 ? sections[sectionIndex] : null,
			})

			if (sectionIndex !== -1) {
				console.log(`📍 Updating section: ${sections[sectionIndex].title}`)

				// Update the specific section with AI response
				const updatedSections = [...sections]
				const currentSection = updatedSections[sectionIndex]

				// Clean the AI response - remove any heading that matches the section title
				let cleanedResponse = aiResponse.trim()

				// Remove section heading if AI included it
				const sectionTitleRegex = new RegExp(
					`^#{1,6}\\s*${currentSection.title}\\s*\n?`,
					'i',
				)
				cleanedResponse = cleanedResponse
					.replace(sectionTitleRegex, '')
					// Remove any leading # characters that might indicate structure
					.replace(/^#+\s*/, '')

				// Handle text insertion/replacement within the section
				let newSectionContent: string
				const sectionContent = currentSection.content

				if (selectionRange && selectionRange.start !== selectionRange.end) {
					// We have a text selection (start ≠ end) - replace the selected text
					// For section editing, selection range should be relative to section content
					const validStart = Math.max(
						0,
						Math.min(selectionRange.start, sectionContent.length),
					)

					// On first call, preserve the content structure
					if (
						workspaceProcessingState === 'updating' &&
						!preservedAfterSelectionRef.current
					) {
						const originalValidEnd = Math.max(
							validStart,
							Math.min(selectionRange.end, sectionContent.length),
						)
						preservedBeforeSelectionRef.current = sectionContent.substring(
							0,
							validStart,
						)
						preservedAfterSelectionRef.current =
							sectionContent.substring(originalValidEnd)
						initialSelectionRangeRef.current = {
							start: validStart,
							end: originalValidEnd,
						}
						console.log(
							`📍 Preserving content structure: before="${preservedBeforeSelectionRef.current.substring(0, 50)}..." after="${preservedAfterSelectionRef.current.substring(0, 50)}..."`,
						)
					}

					// For streaming updates, use preserved content structure
					newSectionContent = `${preservedBeforeSelectionRef.current}${cleanedResponse}${preservedAfterSelectionRef.current}`
					console.log(
						`📍 Replacing selected text using preserved structure (start: ${validStart})`,
					)
				} else if (
					selectionRange &&
					selectionRange.start === selectionRange.end
				) {
					// We have only a cursor position (start === end)
					// For section operations like expand/rewrite, we typically want to replace the entire section
					// unless the cursor position indicates a specific insertion point
					const cursorPosition = Math.max(
						0,
						Math.min(selectionRange.start, sectionContent.length),
					)

					// On first call, preserve the content structure for cursor-based operations
					if (
						workspaceProcessingState === 'updating' &&
						!preservedAfterSelectionRef.current
					) {
						preservedBeforeSelectionRef.current = sectionContent.substring(
							0,
							cursorPosition,
						)
						preservedAfterSelectionRef.current =
							sectionContent.substring(cursorPosition)
						initialSelectionRangeRef.current = {
							start: cursorPosition,
							end: cursorPosition,
						}
					}

					// If cursor is at the beginning (0) or we're doing expand/rewrite operations,
					// replace the entire section content
					if (cursorPosition === 0 || sectionContent.trim() === '') {
						newSectionContent = cleanedResponse
						console.log(
							'📍 Replacing entire section content (cursor at start or empty section)',
						)
					} else if (cursorPosition === sectionContent.length) {
						// Cursor at end - append content, but use preserved structure for consistency
						newSectionContent = `${preservedBeforeSelectionRef.current}\n\n${cleanedResponse}${preservedAfterSelectionRef.current}`
						console.log('📍 Appending to end of section (cursor at end)')
					} else {
						// Cursor in middle - insert at position using preserved structure
						newSectionContent = `${preservedBeforeSelectionRef.current}\n${cleanedResponse}\n${preservedAfterSelectionRef.current}`
						console.log(
							`📍 Inserting at cursor position ${cursorPosition} within section`,
						)
					}
				} else {
					// No selection range - replace entire section content (expand/rewrite behavior)
					newSectionContent = cleanedResponse
					console.log(
						'📍 No selection range, replacing entire section content (expand/rewrite mode)',
					)
				}

				// Replace within the full markdown using absolute offsets
				const newMarkdown = replaceSectionContent(
					currentContent,
					currentSection,
					newSectionContent,
				)

				console.log(`✅ Section "${currentSection.title}" updated successfully`)

				// Persist updated markdown
				if (activeProject && activeDocument)
					setDocumentContent(activeProject, activeDocument, newMarkdown)

				// Update local UI state for the active section
				if (onSectionContentUpdate && activeSection) {
					onSectionContentUpdate(activeSection, newSectionContent)
				}
			} else {
				console.warn(`⚠️ Section with ID "${activeSection}" not found`)
				// No active section - use full document mode with preserved content structure
				if (selectionRange && selectionRange.start !== selectionRange.end) {
					// Replace selected text in full document
					const validStart = Math.max(
						0,
						Math.min(selectionRange.start, currentContent.length),
					)

					// On first call, preserve the content structure for full document
					if (
						workspaceProcessingState === 'updating' &&
						!preservedAfterSelectionRef.current
					) {
						const originalValidEnd = Math.max(
							validStart,
							Math.min(selectionRange.end, currentContent.length),
						)
						preservedBeforeSelectionRef.current = currentContent.substring(
							0,
							validStart,
						)
						preservedAfterSelectionRef.current =
							currentContent.substring(originalValidEnd)
						initialSelectionRangeRef.current = {
							start: validStart,
							end: originalValidEnd,
						}
					}

					const newContentMarkdown = `${preservedBeforeSelectionRef.current}${aiResponse.trim()}${preservedAfterSelectionRef.current}`
					if (activeProject && activeDocument) {
						setDocumentContent(
							activeProject,
							activeDocument,
							newContentMarkdown,
						)
					}
					console.log(
						'📍 Replaced selected text using preserved structure in full document',
					)
				} else if (
					selectionRange &&
					selectionRange.start === selectionRange.end
				) {
					// Insert at cursor position in full document
					const cursorPosition = Math.max(
						0,
						Math.min(selectionRange.start, currentContent.length),
					)

					// On first call, preserve the content structure
					if (
						workspaceProcessingState === 'updating' &&
						!preservedAfterSelectionRef.current
					) {
						preservedBeforeSelectionRef.current = currentContent.substring(
							0,
							cursorPosition,
						)
						preservedAfterSelectionRef.current =
							currentContent.substring(cursorPosition)
						initialSelectionRangeRef.current = {
							start: cursorPosition,
							end: cursorPosition,
						}
					}

					const newContentMarkdown = `${preservedBeforeSelectionRef.current}${aiResponse.trim()}${preservedAfterSelectionRef.current}`
					if (activeProject && activeDocument) {
						setDocumentContent(
							activeProject,
							activeDocument,
							newContentMarkdown,
						)
					}
					console.log(
						'📍 Inserted at cursor position using preserved structure in full document',
					)
				} else {
					// No selection range, append at end
					const newContentMarkdown = `${currentContent}\n\n${aiResponse.trim()}`
					if (activeProject && activeDocument) {
						setDocumentContent(
							activeProject,
							activeDocument,
							newContentMarkdown,
						)
					}
					console.log('📍 Appended to end of document')
				}
			}

			console.log('✅ Document updated successfully')
		} catch (error) {
			console.error('❌ Error updating document:', error)
		} finally {
			setWorkspaceProcessingState('idle')
			// Reset preserved content refs after operation is complete
			preservedAfterSelectionRef.current = ''
			preservedBeforeSelectionRef.current = ''
			initialSelectionRangeRef.current = null
		}
	}

	// Main workspace edit function
	const handleWorkspaceEdit = async (
		userPrompt: string,
		metaPrompt: string,
		selectionRange?: { start: number; end: number } | null,
	) => {
		console.log('🚀 handleWorkspaceEdit called with:', {
			userPrompt,
			metaPrompt: `${metaPrompt.substring(0, 100)}...`,
			activeProject,
			activeDocument,
			selectionRange,
		})

		if (!activeProject || !activeDocument) {
			console.error('❌ No active project or document selected')
			return
		}

		console.log('📝 Setting analyzing state...')
		setWorkspaceProcessingState('analyzing')

		// Reset preserved content refs for new operation
		preservedAfterSelectionRef.current = ''
		preservedBeforeSelectionRef.current = ''
		initialSelectionRangeRef.current = null

		try {
			// Get current document content for context
			const documentKey = `${activeProject}:${activeDocument}`
			const currentContent = documentContent?.[documentKey] || ''

			console.log('📄 Document context:', {
				documentKey,
				activeSection: activeWorkspaceSection,
			})

			// set the selection range if provided
			if (selectionRange) {
				setSelectionRange(selectionRange)
			} else {
				// Default to cursor at 0 if no selection range is provided
				setSelectionRange(null)
			}

			// Set generating state before making API call
			setWorkspaceProcessingState('generating')

			// TODO: Add IndexedDB to get the documents from there if no workspace/state found
			const previousVersionContent = await getDocumentPreviousVersion(
				activeProject,
				activeDocument,
			)

			const documentAttachments: FileAttachment[] = []

			if (activeProject && activeDocument && currentContent) {
				documentAttachments.push({
					id: nanoid(),
					name: `${activeDocument}.md`,
					size: new Blob([currentContent]).size,
					contentType: 'text/markdown',
					content: `data:text/markdown;base64,${toBase64(currentContent)}`,
					url: `data:text/markdown;base64,${toBase64(currentContent)}`,
					messageIds: [],
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days
				})
			}

			if (previousVersionContent) {
				documentAttachments.push({
					id: nanoid(),
					name: `${activeDocument} (previous-version).md`,
					size: new Blob([previousVersionContent]).size,
					contentType: 'text/markdown',
					content: `data:text/markdown;base64,${toBase64(
						previousVersionContent,
					)}`,
					url: `data:text/markdown;base64,${toBase64(previousVersionContent)}`,
					messageIds: [],
					expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days
				})
			}

			console.log('📝 Setting up workspace context and sending user prompt:', {
				systemPromptLength: metaPrompt.length,
				userPromptLength: userPrompt.length,
				userPrompt,
			})

			// First, set up the system context if it's not already set or has changed
			setCurrentMetaPrompt(metaPrompt)
			// Now send the user prompt as a separate user message
			await append(
				{
					id: nanoid(),
					content: userPrompt,
					role: 'user',
					createdAt: new Date(),
				},
				{
					experimental_attachments: documentAttachments as Attachment[],
				},
				[
					{
						id: `system-${nanoid()}-workspace`,
						role: 'system',
						content: metaPrompt,
						createdAt: new Date(),
					} as UIMessage,
				],
			)

			console.log('✅ Workspace edit request sent successfully')
		} catch (error) {
			console.error('❌ Error in handleWorkspaceEdit:', error)
			setWorkspaceProcessingState('idle')
		}
	}

	return (
		<WorkspaceChatContext.Provider
			value={{
				append,
				setInput,
				selectionRange,
				setSelectionRange,
				handleWorkspaceEdit,
				handleDocumentUpdate,
				setActiveWorkspaceSection,
				setWorkspaceProcessingState,
				onFinishWorkspaceChatRequest,
				onSectionContentUpdate,
				setOnSectionContentUpdate,
				input,
				error,
				messages,
				isLoading,
				workspaceProcessingState,
				activeWorkspaceSection,
			}}
		>
			{children}
		</WorkspaceChatContext.Provider>
	)
}

export function useWorkspaceChat() {
	const context = React.useContext(WorkspaceChatContext)
	if (context === undefined) {
		throw new Error(
			'useWorkspaceChat must be used within a WorkspaceChatProvider',
		)
	}
	return context
}
