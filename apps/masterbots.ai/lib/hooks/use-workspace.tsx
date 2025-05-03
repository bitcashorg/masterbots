'use client'

import * as React from 'react'

interface WorkspaceContextType {
	isWorkspaceActive: boolean
	toggleWorkspace: () => void
	activeProject: string | null
	setActiveProject: (project: string | null) => void
	activeDocument: string | null
	setActiveDocument: (document: string | null) => void
	projectList: string[]
	documentList: Record<string, string[]>
	documentContent: Record<string, string>
	setDocumentContent: (
		project: string,
		document: string,
		content: string,
	) => void
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(
	undefined,
)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
	const [isWorkspaceActive, setIsWorkspaceActive] = React.useState(true)
	const [activeProject, setActiveProject] = React.useState<string | null>(null)
	const [activeDocument, setActiveDocument] = React.useState<string | null>(
		null,
	)

	// Mock data - in a real implementation, this would come from an API or database
	const projectList = ['Project 1', 'Project 2', 'Project 3']
	const documentList: Record<string, string[]> = {
		'Project 1': ['Document 1.1', 'Document 1.2', 'Document 1.3'],
		'Project 2': ['Document 2.1', 'Document 2.2'],
		'Project 3': [
			'Document 3.1',
			'Document 3.2',
			'Document 3.3',
			'Document 3.4',
		],
	}

	// Initial document content
	const [documentContent, setDocumentContentState] = React.useState<
		Record<string, string>
	>({})

	// Function to set document content
	const setDocumentContent = React.useCallback(
		(project: string, document: string, content: string) => {
			const documentKey = `${project}:${document}`
			setDocumentContentState((prev) => ({
				...prev,
				[documentKey]: content,
			}))

			// Automatically switch to this project and document
			setActiveProject(project)
			setActiveDocument(document)

			// Activate workspace if it's not active
			if (!isWorkspaceActive) {
				setIsWorkspaceActive(true)
			}
		},
		[isWorkspaceActive],
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

	const value = React.useMemo(
		() => ({
			isWorkspaceActive,
			toggleWorkspace,
			activeProject,
			setActiveProject,
			activeDocument,
			setActiveDocument,
			projectList,
			documentList,
			documentContent,
			setDocumentContent,
		}),
		[
			isWorkspaceActive,
			toggleWorkspace,
			activeProject,
			setActiveProject,
			activeDocument,
			setActiveDocument,
			projectList,
			documentList,
			documentContent,
			setDocumentContent,
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
