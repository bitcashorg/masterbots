'use client'

import { useModel } from '@/lib/hooks/use-model'
import {
	combineMarkdownSections,
	parseMarkdownSections,
} from '@/lib/markdown-utils'
import { useChat } from '@ai-sdk/react'
import { nanoid } from 'nanoid'
import * as React from 'react'
import { useWorkspace } from './use-workspace'
import type { ChatRequestOptions } from 'ai'
import { useSonner } from '@/lib/hooks/useSonner'

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
	const { selectedModel, clientType } = useModel()
	const { customSonner } = useSonner()

	// Create a stable chat ID that persists across renders
	const chatId = React.useMemo(() => nanoid(), [])

	// Raw useChat hook for workspace mode
	const { messages, isLoading, error, append, input, setInput } = useChat({
		id: chatId,
		body: {
			id: chatId,
			model: selectedModel,
			clientType,
		},
		onResponse(response) {
			if (response.status === 401) {
				customSonner({ type: 'error', text: response.statusText })
			} else if (!response.ok) {
				customSonner({ type: 'error', text: 'Failed to process request' })
			}
		},
		onError(error) {
			console.error('❌ Error in workspace chat:', error)
			customSonner({ type: 'error', text: 'An error occurred' })
		},
		async onFinish(message) {
			console.log(
				'✅ onFinish: AI response complete, handling persistence and cleanup:',
				message.content?.substring(0, 100),
			)

			// const documentKey = `${activeProject}:${activeDocument}`
			// // Get the current document content at the time of response
			// const currentContent =
			// 	document.querySelector(`[data-document-key="${documentKey}"]`)
			// 		?.textContent || ''

			// // Process the AI response for document update
			// handleDocumentUpdate(
			// 	message.content,
			// 	activeWorkspaceSection,
			// 	currentContent,
			// 	documentKey,
			// )

			// Reset processing state
			setWorkspaceProcessingState('idle')
			// Note: Live updates are handled in workspace-content.tsx via messages array
			// This onFinish event is only for persistence and cleanup operations

			// TODO: Here we can add logic for:
			// - Saving final document state to database
			// - Document versioning
			// - Analytics/tracking
			// - Any cleanup operations

			console.log('✅ onFinish: Workspace ready for next request')
		},
	})

	console.log('🔄 WorkspaceChatProvider messages:', messages)

	// Document update function
	const handleDocumentUpdate = React.useCallback(
		(
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

			setWorkspaceProcessingState('updating')

			try {
				// Parse the current document into sections
				const sections = parseMarkdownSections(currentContent)

				// If there's an active section, try to update that specific section
				if (activeSection && sections.length > 0) {
					const sectionIndex = sections.findIndex((s) => s.id === activeSection)
					if (sectionIndex !== -1) {
						// Update the specific section with AI response
						const updatedSections = [...sections]
						const currentSection = updatedSections[sectionIndex]

						// Check if AI response is a complete replacement or just content
						if (aiResponse.includes('#')) {
							// AI provided structured content - parse and merge
							const aiSections = parseMarkdownSections(aiResponse)
							if (aiSections.length === 1) {
								// Single section response - replace the target section
								updatedSections[sectionIndex] = {
									...updatedSections[sectionIndex],
									content: aiSections[0].content,
									title:
										aiSections[0].title || updatedSections[sectionIndex].title,
								}
							} else {
								// Multiple sections - insert after current section
								updatedSections.splice(sectionIndex + 1, 0, ...aiSections)
							}
						} else {
							// Plain text response - insert at cursor position if available
							if (cursorPosition !== undefined && cursorPosition >= 0) {
								const beforeCursor = currentSection.content.substring(
									0,
									cursorPosition,
								)
								const afterCursor =
									currentSection.content.substring(cursorPosition)
								updatedSections[sectionIndex] = {
									...currentSection,
									content: `${beforeCursor}${aiResponse}${afterCursor}`,
								}
							} else {
								// No cursor position, append to section content
								updatedSections[sectionIndex] = {
									...updatedSections[sectionIndex],
									content: `${currentSection.content}\n\n${aiResponse}`,
								}
							}
						}

						// Reconstruct the document
						const newMarkdown = combineMarkdownSections(updatedSections)
						if (activeProject && activeDocument) {
							setDocumentContent(activeProject, activeDocument, newMarkdown)
						}
					} else {
						// Section not found, append to document
						const updatedContent = `${currentContent}\n\n## AI Update\n\n${aiResponse}`
						if (activeProject && activeDocument) {
							setDocumentContent(activeProject, activeDocument, updatedContent)
						}
					}
				} else {
					// No active section - handle as full document update or cursor position in source
					if (cursorPosition !== undefined && cursorPosition >= 0) {
						// Insert at cursor position in full document
						const beforeCursor = currentContent.substring(0, cursorPosition)
						const afterCursor = currentContent.substring(cursorPosition)
						const updatedContent = `${beforeCursor}${aiResponse}${afterCursor}`
						if (activeProject && activeDocument) {
							setDocumentContent(activeProject, activeDocument, updatedContent)
						}
					} else if (aiResponse.includes('#') && aiResponse.includes('\n')) {
						// AI provided structured content - use it as new document content
						if (activeProject && activeDocument) {
							setDocumentContent(activeProject, activeDocument, aiResponse)
						}
					} else {
						// Plain text response - append to document
						const updatedContent = `${currentContent}\n\n## AI Update\n\n${aiResponse}`
						if (activeProject && activeDocument) {
							setDocumentContent(activeProject, activeDocument, updatedContent)
						}
					}
				}

				console.log('✅ Document updated successfully')
				setWorkspaceProcessingState('idle')
			} catch (error) {
				console.error('❌ Error updating document:', error)
				setWorkspaceProcessingState('idle')
			}
		},
		[activeProject, activeDocument, setDocumentContent],
	)

	// Main workspace edit function
	const handleWorkspaceEdit = async (
		userPrompt: string,
		metaPrompt: string,
		cursorPosition?: number,
	) => {
		console.log('🚀 handleWorkspaceEdit called with:', {
			userPrompt,
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

			// Use raw append with workspace-specific onFinish callback
			await append({
				id: nanoid(),
				content: metaPrompt,
				role: 'user',
				createdAt: new Date(),
			})

			console.log('✅ Workspace edit initiated successfully')
		} catch (error) {
			console.error('❌ Error in workspace edit:', error)
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
