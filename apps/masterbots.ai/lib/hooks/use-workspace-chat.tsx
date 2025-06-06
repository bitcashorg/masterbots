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

interface WorkspaceChatContextType {
	// Chat state
	messages: any[]
	isLoading: boolean
	error: Error | undefined

	// Workspace processing state
	workspaceProcessingState: 'idle' | 'analyzing' | 'generating' | 'updating'
	setWorkspaceProcessingState: (
		state: 'idle' | 'analyzing' | 'generating' | 'updating',
	) => void

	// Active section tracking
	activeWorkspaceSection: string | null
	setActiveWorkspaceSection: (section: string | null) => void

	// Main workspace edit function
	handleWorkspaceEdit: (userPrompt: string, metaPrompt: string) => Promise<void>

	// Document update function
	handleDocumentUpdate: (
		aiResponse: string,
		activeSection: string | null,
		currentContent: string,
		documentKey: string,
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
	} = useWorkspace()

	// Workspace processing state
	const [workspaceProcessingState, setWorkspaceProcessingState] =
		React.useState<'idle' | 'analyzing' | 'generating' | 'updating'>('idle')
	const [activeWorkspaceSection, setActiveWorkspaceSection] = React.useState<
		string | null
	>(null)
	const { selectedModel, clientType } = useModel()
	// Raw useChat hook for workspace mode
	const { messages, isLoading, error, append } = useChat({
		id: nanoid(),
		body: {
			id: nanoid(),
			model: selectedModel,
			clientType,
		},
		// Don't persist workspace messages to avoid interfering with thread chat
		keepLastMessageOnError: false,
		onFinish: (message) => {
			console.log(
				'🎯 onFinish triggered in workspace context:',
				message.content?.substring(0, 100),
			)
			const documentKey = `${activeProject}:${activeDocument}`
			// Get the current document content at the time of response
			const currentContent =
				document.querySelector(`[data-document-key="${documentKey}"]`)
					?.textContent || ''

			// Process the AI response for document update
			handleDocumentUpdate(
				message.content,
				activeWorkspaceSection,
				currentContent,
				documentKey,
			)
		},
	})

	// Document update function
	const handleDocumentUpdate = React.useCallback(
		(
			aiResponse: string,
			activeSection: string | null,
			currentContent: string,
			documentKey: string,
		) => {
			console.log('📝 Processing document update:', {
				responseLength: aiResponse.length,
				activeSection,
				documentKey,
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
							// Plain text response - update section content
							updatedSections[sectionIndex] = {
								...updatedSections[sectionIndex],
								content: aiResponse,
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
					// No active section - handle as full document update
					if (aiResponse.includes('#') && aiResponse.includes('\n')) {
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
	const handleWorkspaceEdit = React.useCallback(
		async (userPrompt: string, metaPrompt: string) => {
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

				// Set generating state before making API call
				setWorkspaceProcessingState('generating')

				// Use raw append with workspace-specific onFinish callback
				await append({
					id: crypto.randomUUID(),
					content: metaPrompt,
					role: 'user',
				})

				console.log('✅ Workspace edit initiated successfully')
			} catch (error) {
				console.error('❌ Error in workspace edit:', error)
				setWorkspaceProcessingState('idle')
			}
		},
		[
			activeProject,
			activeDocument,
			activeWorkspaceSection,
			append,
			handleDocumentUpdate,
		],
	)

	const value = React.useMemo(
		() => ({
			messages,
			isLoading,
			error,
			workspaceProcessingState,
			setWorkspaceProcessingState,
			activeWorkspaceSection,
			setActiveWorkspaceSection,
			handleWorkspaceEdit,
			handleDocumentUpdate,
		}),
		[
			messages,
			isLoading,
			error,
			workspaceProcessingState,
			activeWorkspaceSection,
			handleWorkspaceEdit,
			handleDocumentUpdate,
		],
	)

	return (
		<WorkspaceChatContext.Provider value={value}>
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
