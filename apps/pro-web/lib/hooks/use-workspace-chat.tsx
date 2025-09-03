'use client'

import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useModel } from '@/lib/hooks/use-model'
import { useSonner } from '@/lib/hooks/useSonner'
import {
	combineMarkdownSections,
	parseMarkdownSections,
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

	// Cursor position tracking
	cursorPosition: number
	setCursorPosition: (position: number) => void

	// Main workspace edit function
	handleWorkspaceEdit: (
		userPrompt: string,
		metaPrompt: string,
		cursorPosition?: number,
	) => Promise<void>

	// Document update function
	handleDocumentUpdate: (
		aiResponse: string,
		activeSection: string | null,
		currentContent: string,
		documentKey: string,
		cursorPosition?: number,
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
	const [cursorPosition, setCursorPosition] = React.useState<number>(0)

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
				cursorPosition,
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
		cursorPosition?: number,
	) => {
		console.log('📝 Processing document update:', {
			responseLength: aiResponse.length,
			activeSection,
			documentKey,
			cursorPosition,
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

				// For section updates, we replace the content entirely
				// This is because the AI was specifically asked to provide updated content for this section
				updatedSections[sectionIndex] = {
					...currentSection,
					content: cleanedResponse.trim(),
				}

				// Reconstruct the document with the updated section
				const newMarkdown = combineMarkdownSections(updatedSections)

				console.log(`✅ Section "${currentSection.title}" updated successfully`)

				let newContentMarkdown = newMarkdown

				if (cursorPosition !== undefined && cursorPosition >= 0) {
					// Insert at cursor position in full document
					const beforeCursor = currentContent.substring(0, cursorPosition)
					const afterCursor = currentContent.substring(cursorPosition)
					newContentMarkdown = `${beforeCursor}${aiResponse}${afterCursor}`
				}

				// Only update if we have the current project and document
				if (activeProject && activeDocument) {
					setDocumentContent(activeProject, activeDocument, newContentMarkdown)
				}
			} else {
				console.warn(`⚠️ Section with ID "${activeSection}" not found`)
				// Section not found, append as new section
				const newSection = aiResponse.trim()
				const updatedContent = `${currentContent}${newSection}`
				if (activeProject && activeDocument) {
					setDocumentContent(activeProject, activeDocument, updatedContent)
				}
			}

			console.log('✅ Document updated successfully')
		} catch (error) {
			console.error('❌ Error updating document:', error)
		} finally {
			setWorkspaceProcessingState('idle')
		}
	}

	// Main workspace edit function
	const handleWorkspaceEdit = async (
		userPrompt: string,
		metaPrompt: string,
		cursorPosition?: number,
	) => {
		console.log('🚀 handleWorkspaceEdit called with:', {
			userPrompt,
			metaPrompt: `${metaPrompt.substring(0, 100)}...`,
			activeProject,
			activeDocument,
		})

		if (!activeProject || !activeDocument) {
			console.error('❌ No active project or document selected')
			return
		}

		console.log('📝 Setting analyzing state...')
		setWorkspaceProcessingState('analyzing')

		try {
			// Get current document content for context
			const documentKey = `${activeProject}:${activeDocument}`
			const currentContent = documentContent?.[documentKey] || ''

			console.log('📄 Document context:', {
				documentKey,
				activeSection: activeWorkspaceSection,
			})

			// set the cursor position if provided
			if (cursorPosition !== undefined && cursorPosition >= 0) {
				setCursorPosition(cursorPosition)
			} else {
				// Default to 0 if no cursor position is provided
				setCursorPosition(0)
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
				setCursorPosition,
				handleWorkspaceEdit,
				handleDocumentUpdate,
				setActiveWorkspaceSection,
				setWorkspaceProcessingState,
				onFinishWorkspaceChatRequest,
				input,
				error,
				messages,
				isLoading,
				cursorPosition,
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
