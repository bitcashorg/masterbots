'use client'

import * as React from 'react'

interface DocumentSection {
	id: string
	type: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'code'
	content: string
}

interface DocumentData {
	title: string
	sections: DocumentSection[]
}

interface WorkspaceContextType {
	isWorkspaceActive: boolean
	toggleWorkspace: () => void
	setIsWorkspaceActive: (active: boolean) => void
	activeProject: string | null
	setActiveProject: (project: string | null) => void
	activeDocument: string | null
	setActiveDocument: (document: string | null) => void
	documentContent: Record<string, DocumentData>
	setDocumentContent: (documentId: string, content: DocumentData) => void
	createDocumentFromMessage: (content: string, useUnassigned?: boolean) => void
	projectList: string[]
	documentList: Record<string, string[]>
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(
	undefined,
)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
	const [isWorkspaceActive, setIsWorkspaceActive] = React.useState(false)
	const [activeProject, setActiveProject] = React.useState<string | null>(null)
	const [activeDocument, setActiveDocument] = React.useState<string | null>(
		null,
	)
	const [documentContent, setDocumentContentState] = React.useState<
		Record<string, DocumentData>
	>({})

	// Mock data - in a real implementation, this would come from an API or database
	const projectList = ['Unassigned', 'Project 1', 'Project 2', 'Project 3']
	const documentList: Record<string, string[]> = {
		Unassigned: [],
		'Project 1': ['Document 1.1', 'Document 1.2', 'Document 1.3'],
		'Project 2': ['Document 2.1', 'Document 2.2'],
		'Project 3': [
			'Document 3.1',
			'Document 3.2',
			'Document 3.3',
			'Document 3.4',
		],
	}

	// Helper to generate basic document structure from text
	const generateDocumentFromText = (text: string): DocumentSection[] => {
		const lines = text.split('\n').filter((line) => line.trim() !== '')
		const sections: DocumentSection[] = []

		// Create a title from the first line
		if (lines.length > 0) {
			sections.push({
				id: `section-${Date.now()}-0`,
				type: 'h1',
				content: lines[0],
			})
		}

		// Add remaining lines as paragraphs
		for (let i = 1; i < lines.length; i++) {
			const line = lines[i]

			// Try to detect if this is a list
			if (line.match(/^(\d+\.\s|\*\s|-\s)/)) {
				// This appears to be a list item
				const listLines = [line]

				// Collect sequential list items
				while (
					i + 1 < lines.length &&
					lines[i + 1].match(/^(\d+\.\s|\*\s|-\s)/)
				) {
					i++
					listLines.push(lines[i])
				}

				// Determine if it's ordered or unordered
				const isOrdered = listLines[0].match(/^\d+\.\s/)

				sections.push({
					id: `section-${Date.now()}-${i}`,
					type: isOrdered ? 'ol' : 'ul',
					content: listLines.join('\n'),
				})
			}
			// Check if it could be a heading
			else if (line.length < 100 && !line.endsWith('.')) {
				sections.push({
					id: `section-${Date.now()}-${i}`,
					type: 'h2',
					content: line,
				})
			}
			// Regular paragraph
			else {
				sections.push({
					id: `section-${Date.now()}-${i}`,
					type: 'p',
					content: line,
				})
			}
		}

		return sections
	}

	// Set document content for a specific document
	const setDocumentContent = React.useCallback(
		(documentId: string, content: DocumentData) => {
			setDocumentContentState((prev) => ({
				...prev,
				[documentId]: content,
			}))
		},
		[],
	)

	// Create a new document from message content
	const createDocumentFromMessage = React.useCallback(
		(content: string, useUnassigned = false) => {
			// Use the Unassigned project for AI response documents if specified, otherwise
			// default to the active project or Project 1
			const project = useUnassigned
				? 'Unassigned'
				: activeProject || 'Project 1'
			setActiveProject(project)

			// Create document title from first line (or truncate if too long)
			const lines = content.split('\n')
			const title = lines[0].slice(0, 50) + (lines[0].length > 50 ? '...' : '')

			// Create a unique document identifier
			const documentId = `${title}-${Date.now()}`

			// Add to document list
			documentList[project] = [documentId, ...(documentList[project] || [])]

			// Generate document sections from the message content
			const sections = generateDocumentFromText(content)

			// Save the document content
			setDocumentContent(documentId, { title, sections })

			// Set as active document
			setActiveDocument(documentId)

			// Activate workspace mode
			setIsWorkspaceActive(true)

			return documentId
		},
		[activeProject, setActiveProject, setIsWorkspaceActive],
	)

	const toggleWorkspace = React.useCallback(() => {
		setIsWorkspaceActive((prev) => {
			const newState = !prev
			console.log('Workspace: changing to: ', newState)
			return newState
		})
	}, [])

	// When project changes, reset the active document
	React.useEffect(() => {
		if (activeProject && documentList[activeProject]?.length > 0) {
			setActiveDocument(documentList[activeProject][0])
		} else {
			setActiveDocument(null)
		}
	}, [activeProject])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const value = React.useMemo(
		() => ({
			isWorkspaceActive,
			toggleWorkspace,
			setIsWorkspaceActive,
			activeProject,
			setActiveProject,
			activeDocument,
			setActiveDocument,
			documentContent,
			setDocumentContent,
			createDocumentFromMessage,
			projectList,
			documentList,
		}),
		[
			isWorkspaceActive,
			toggleWorkspace,
			activeProject,
			activeDocument,
			documentContent,
			setDocumentContent,
			createDocumentFromMessage,
			projectList,
			documentList,
		],
	)

	return (
		<WorkspaceContext.Provider value={value}>
			{children}
		</WorkspaceContext.Provider>
	)
}

export function useWorkspace() {
	const context = React.useContext(WorkspaceContext)
	if (context === undefined) {
		throw new Error('useWorkspace must be used within a WorkspaceProvider')
	}
	return context
}
