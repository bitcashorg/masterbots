'use client'

import {
	getUserWorkspaceBreadcrumbs,
	type WorkspaceDocumentMetadata,
} from '@/app/actions/thread.actions'
import { useSession } from 'next-auth/react'
import * as React from 'react'

interface WorkspaceContextType {
	isWorkspaceActive: boolean
	toggleWorkspace: () => void
	activeOrganization: string | null
	setActiveOrganization: (organization: string | null) => void
	activeDepartment: string | null
	setActiveDepartment: (department: string | null) => void
	activeProject: string | null
	setActiveProject: (project: string | null) => void
	activeDocument: string | null
	setActiveDocument: (document: string | null) => void
	activeDocumentType: 'all' | 'text' | 'image' | 'spreadsheet'
	setActiveDocumentType: (
		type: 'all' | 'text' | 'image' | 'spreadsheet',
	) => void
	organizationList: string[]
	departmentList: Record<string, string[]>
	projectList: string[]
	documentList: Record<string, string[]>
	textDocuments: Record<string, string[]>
	imageDocuments: Record<string, string[]>
	spreadsheetDocuments: Record<string, string[]>
	projectsByDept: Record<string, Record<string, string[]>>
	documentContent: Record<string, string>
	setDocumentContent: (
		project: string,
		document: string,
		content: string,
	) => void
	// Real data loading states
	isLoading: boolean
	error: string | null
	// Add functions for creating new items
	addOrganization: (name: string) => void
	addDepartment: (organization: string, name: string) => void
	addProject: (organization: string, department: string, name: string) => void
	addDocument: (
		project: string,
		name: string,
		type: 'text' | 'image' | 'spreadsheet',
	) => void
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(
	undefined,
)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession()
	const [isWorkspaceActive, setIsWorkspaceActive] = React.useState(false)
	const [activeOrganization, setActiveOrganization] = React.useState<
		string | null
	>(null)
	const [activeDepartment, setActiveDepartment] = React.useState<string | null>(
		null,
	)
	const [activeProject, setActiveProject] = React.useState<string | null>(null)
	const [activeDocument, setActiveDocument] = React.useState<string | null>(
		null,
	)
	const [activeDocumentType, setActiveDocumentType] = React.useState<
		'all' | 'text' | 'image' | 'spreadsheet'
	>('all')

	// Real data states
	const [isLoading, setIsLoading] = React.useState(false)
	const [error, setError] = React.useState<string | null>(null)
	const [realWorkspaceData, setRealWorkspaceData] = React.useState<{
		organizations: string[]
		departments: string[]
		projects: string[]
		documentsByProject: Record<string, string[]>
		threadsWithDocuments: Array<{
			threadId: string
			slug: string
			documents: WorkspaceDocumentMetadata[]
		}>
	} | null>(null)

	// Document content state
	const [documentContent, setDocumentContentState] = React.useState<
		Record<string, string>
	>({})

	// Load real workspace data when user session is available
	React.useEffect(() => {
		const loadWorkspaceData = async () => {
			if (!session?.user?.id) {
				console.log('No user session available for workspace data loading')
				return
			}

			setIsLoading(true)
			setError(null)

			try {
				console.log('Loading workspace breadcrumbs for user:', session.user.id)
				const data = await getUserWorkspaceBreadcrumbs(session.user.id)
				console.log('Loaded workspace data:', data)
				setRealWorkspaceData(data)

				// Issue 5 fix: Don't auto-select documents, let user choose
				// Only set defaults if nothing is selected
				if (!activeOrganization && data.organizations.length > 0) {
					setActiveOrganization(data.organizations[0])
				}
				if (!activeDepartment && data.departments.length > 0) {
					setActiveDepartment(data.departments[0])
				}
				// Note: Don't auto-select project and document - let user choose
			} catch (err) {
				console.error('Error loading workspace data:', err)
				setError(
					err instanceof Error ? err.message : 'Failed to load workspace data',
				)
			} finally {
				setIsLoading(false)
			}
		}

		loadWorkspaceData()
	}, [session?.user?.id, activeOrganization, activeDepartment])

	// Derive data from real workspace data
	const organizationList = realWorkspaceData?.organizations || []
	const departmentList: Record<string, string[]> = React.useMemo(() => {
		// For now, we create a simple mapping since we don't store org->dept relationships
		// In a real implementation, this would come from the database
		const result: Record<string, string[]> = {}
		if (realWorkspaceData) {
			for (const org of realWorkspaceData.organizations) {
				result[org] = realWorkspaceData.departments
			}
		}
		return result
	}, [realWorkspaceData])

	const projectList = realWorkspaceData?.projects || []
	const documentList = realWorkspaceData?.documentsByProject || {}

	// Categorize documents by type (for now, we'll treat all as text since we don't store types in metadata)
	const textDocuments = documentList
	const imageDocuments: Record<string, string[]> = {}
	const spreadsheetDocuments: Record<string, string[]> = {}

	// Create projects by department mapping (simplified since we don't have this relationship stored)
	const projectsByDept: Record<
		string,
		Record<string, string[]>
	> = React.useMemo(() => {
		const result: Record<string, Record<string, string[]>> = {}
		if (realWorkspaceData) {
			for (const org of realWorkspaceData.organizations) {
				result[org] = {}
				for (const dept of realWorkspaceData.departments) {
					result[org][dept] = realWorkspaceData.projects
				}
			}
		}
		return result
	}, [realWorkspaceData])

	// Function to set document content
	const setDocumentContent = React.useCallback(
		(project: string, document: string, content: string) => {
			if (!project || !document || content === undefined) {
				console.log('Missing required parameters for setDocumentContent')
				return
			}

			const documentKey = `${project}:${document}`
			setDocumentContentState((prev) => {
				if (prev[documentKey] === content) {
					return prev
				}
				return {
					...prev,
					[documentKey]: content,
				}
			})

			// Update navigation if needed
			if (!isWorkspaceActive) {
				setIsWorkspaceActive(true)
			}
			if (project !== activeProject) {
				setActiveProject(project)
			}
			if (document !== activeDocument) {
				setActiveDocument(document)
			}
		},
		[isWorkspaceActive, activeProject, activeDocument],
	)

	// Add functions for creating new items (these would need server actions in a real implementation)
	const addOrganization = React.useCallback((name: string) => {
		console.log('Adding organization:', name)
		// In a real implementation, this would call a server action to create the organization
		// For now, we'll just update local state
		setRealWorkspaceData((prev) => {
			if (!prev) return prev
			return {
				...prev,
				organizations: [...prev.organizations, name],
			}
		})
		setActiveOrganization(name)
	}, [])

	const addDepartment = React.useCallback(
		(organization: string, name: string) => {
			console.log('Adding department:', name, 'to organization:', organization)
			// In a real implementation, this would call a server action
			setRealWorkspaceData((prev) => {
				if (!prev) return prev
				return {
					...prev,
					departments: [...prev.departments, name],
				}
			})
			setActiveDepartment(name)
		},
		[],
	)

	const addProject = React.useCallback(
		(organization: string, department: string, name: string) => {
			console.log(
				'Adding project:',
				name,
				'to department:',
				department,
				'in organization:',
				organization,
			)
			// In a real implementation, this would call a server action
			setRealWorkspaceData((prev) => {
				if (!prev) return prev
				return {
					...prev,
					projects: [...prev.projects, name],
					documentsByProject: {
						...prev.documentsByProject,
						[name]: [],
					},
				}
			})
			setActiveProject(name)
		},
		[],
	)

	const addDocument = React.useCallback(
		(project: string, name: string, type: 'text' | 'image' | 'spreadsheet') => {
			console.log(
				'Adding document:',
				name,
				'to project:',
				project,
				'with type:',
				type,
			)
			// In a real implementation, this would call a server action
			setRealWorkspaceData((prev) => {
				if (!prev) return prev
				const currentProjectDocs = prev.documentsByProject[project] || []
				return {
					...prev,
					documentsByProject: {
						...prev.documentsByProject,
						[project]: [...currentProjectDocs, name],
					},
				}
			})
			setActiveDocument(name)
		},
		[],
	)

	const toggleWorkspace = React.useCallback(() => {
		console.log('Workspace: toggling workspace state')
		setIsWorkspaceActive((prev) => {
			const newState = !prev
			console.log('Workspace: changing to: ', newState)
			return newState
		})
	}, [])

	// When organization changes, set department if needed
	React.useEffect(() => {
		if (!activeOrganization || !departmentList) {
			console.log('Organization or departments not available, skipping effect')
			return
		}

		const orgDepts = departmentList[activeOrganization] || []
		console.log('Organization changed to:', activeOrganization)

		if (orgDepts.length === 0) {
			console.log('No departments for this organization')
			if (activeDepartment !== null) {
				setActiveDepartment(null)
			}
			return
		}

		const isCurrentDeptValid =
			activeDepartment && orgDepts.includes(activeDepartment)

		if (!isCurrentDeptValid) {
			const defaultDept = orgDepts[0]
			if (activeDepartment !== defaultDept) {
				console.log('Setting default department for new org:', defaultDept)
				setActiveDepartment(defaultDept)
			}
		}
	}, [activeOrganization, departmentList, activeDepartment])

	// When department changes, set default project only if current project is invalid
	React.useEffect(() => {
		if (!activeDepartment || !activeOrganization || !projectsByDept) {
			console.log('Department change effect: Missing required data')
			return
		}

		const deptProjects =
			projectsByDept[activeOrganization]?.[activeDepartment] || []
		console.log('Department changed to:', activeDepartment)

		if (deptProjects.length === 0) {
			console.log('No projects for this department')
			if (activeProject !== null) {
				setActiveProject(null)
			}
			return
		}

		const isCurrentProjectValid =
			activeProject && deptProjects.includes(activeProject)

		if (!isCurrentProjectValid) {
			const defaultProject = deptProjects[0]
			if (activeProject !== defaultProject) {
				console.log(
					'Setting default project for new department:',
					defaultProject,
				)
				setActiveProject(defaultProject)
			}
		}
	}, [activeOrganization, activeDepartment, projectsByDept, activeProject])

	// When project changes, set default document only if current document is invalid
	React.useEffect(() => {
		const frameId = requestAnimationFrame(() => {
			if (!activeProject || !documentList) {
				console.log('Project change effect: Missing required data')
				return
			}

			const projectDocs = documentList[activeProject] || []
			console.log('Project changed to:', activeProject)

			if (projectDocs.length === 0) {
				console.log('No documents for this project')
				if (activeDocument !== null) {
					setActiveDocument(null)
				}
				return
			}

			const isCurrentDocValid =
				activeDocument && projectDocs.includes(activeDocument)

			if (!isCurrentDocValid) {
				const defaultDoc = projectDocs[0]
				if (activeDocument !== defaultDoc) {
					console.log('Setting default document for new project:', defaultDoc)
					setActiveDocument(defaultDoc)
				}
			}
		})

		return () => cancelAnimationFrame(frameId)
	}, [activeProject, documentList, activeDocument])

	const value = React.useMemo(
		() => ({
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
			activeDocumentType,
			setActiveDocumentType,
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
			isLoading,
			error,
			addOrganization,
			addDepartment,
			addProject,
			addDocument,
		}),
		[
			isWorkspaceActive,
			toggleWorkspace,
			activeOrganization,
			activeDepartment,
			activeProject,
			activeDocument,
			activeDocumentType,
			organizationList,
			departmentList,
			projectList,
			documentList,
			textDocuments,
			projectsByDept,
			documentContent,
			setDocumentContent,
			isLoading,
			error,
			addOrganization,
			addDepartment,
			addProject,
			addDocument,
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
