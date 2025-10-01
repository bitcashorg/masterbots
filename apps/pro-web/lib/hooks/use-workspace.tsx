'use client'

import type { WorkspaceStatePayload } from '@/app/api/workspace/state/route'
import { workspaceDocTemplates } from '@/lib/constants/workspace-templates'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspaceDocuments } from '@/lib/hooks/use-workspace-documents'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import type * as React from 'react'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

export interface WorkspaceContextType {
	isWorkspaceActive: boolean
	toggleWorkspace: (isWorkspaceMode?: boolean) => void
	activeOrganization: string | null
	setActiveOrganization: (organization: string | null) => void
	activeDepartment: string | null
	setActiveDepartment: (department: string | null) => void
	activeProject: string | null
	setActiveProject: (project: string | null) => void
	activeDocument: string | null
	setActiveDocument: (document: string | null) => void
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
	// New: active document type filter for breadcrumb (All/Text/Image/Spreadsheet)
	activeDocumentType: 'all' | 'text' | 'image' | 'spreadsheet'
	setActiveDocumentType: (v: 'all' | 'text' | 'image' | 'spreadsheet') => void
	addOrganization: (name: string) => void
	addDepartment: (org: string, name: string) => void
	addProject: (org: string, dept: string, name: string) => void
	addDocument: (
		project: string,
		name: string,
		type?: 'text' | 'image' | 'spreadsheet',
		templateContent?: string,
	) => void
	templates: Record<
		'text' | 'image' | 'spreadsheet',
		Record<
			string,
			{ name: string; content: (name: string, project: string) => string }
		>
	>
	// Add getWorkspaceState helper for external access
	getWorkspaceState: () => {
		organizationList: string[]
		departmentList: Record<string, string[]>
		projectsByDept: Record<string, Record<string, string[]>>
		activeOrganization: string | null
		activeDepartment: string | null
		activeProject: string | null
	}
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
	undefined,
)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
	const [isWorkspaceActive, setIsWorkspaceActive] = useState(false)
	const [activeOrganization, setActiveOrganization] = useState<string | null>(
		null,
	)
	const [activeDepartment, setActiveDepartment] = useState<string | null>(null)
	const [activeProject, setActiveProject] = useState<string | null>(null)
	const [activeDocument, setActiveDocument] = useState<string | null>(null)
	const [activeDocumentType, setActiveDocumentType] = useState<
		'all' | 'text' | 'image' | 'spreadsheet'
	>('all')
	const [organizationList, setOrganizationList] = useState<string[]>([])
	const [departmentsByOrg, setDepartmentsByOrg] = useState<
		Record<string, string[]>
	>({})
	const [projectsByDept, setProjectsByDept] = useState<
		Record<string, Record<string, string[]>>
	>({})
	// Document maps (type segregated)
	const [textDocuments, setTextDocuments] = useState<Record<string, string[]>>(
		{},
	)
	const [imageDocuments, setImageDocuments] = useState<
		Record<string, string[]>
	>({})
	const [spreadsheetDocuments, setSpreadsheetDocuments] = useState<
		Record<string, string[]>
	>({})
	const { data: session } = useSession()
	const templates = useMemo(() => workspaceDocTemplates, [])
	// Derived projectList (flatten) recomputed on changes
	const projectList = useMemo(() => {
		return Object.values(projectsByDept).flatMap((deptMap) =>
			Object.values(deptMap).flat(),
		)
	}, [projectsByDept])
	const documentList: Record<string, string[]> = useMemo(
		() => ({ ...textDocuments, ...imageDocuments, ...spreadsheetDocuments }),
		[textDocuments, imageDocuments, spreadsheetDocuments],
	)
	const { activeThread } = useThread()

	// Dynamic add helpers
	const addOrganization = useCallback((name: string) => {
		if (!name) return
		setOrganizationList((prev) =>
			prev.includes(name) ? prev : [...prev, name].sort(),
		)
		setDepartmentsByOrg((prev) => (prev[name] ? prev : { ...prev, [name]: [] }))
		setProjectsByDept((prev) => (prev[name] ? prev : { ...prev, [name]: {} }))
	}, [])

	const addDepartment = useCallback((org: string, name: string) => {
		if (!org || !name) return
		setDepartmentsByOrg((prev) => {
			const existing = prev[org] || []
			if (existing.includes(name)) return prev
			return { ...prev, [org]: [...existing, name].sort() }
		})
		setProjectsByDept((prev) => {
			const orgMap = prev[org] || {}
			return prev[org] ? prev : { ...prev, [org]: orgMap } // ensure org key exists
		})
	}, [])

	const addProject = useCallback((org: string, dept: string, name: string) => {
		if (!org || !dept || !name) return
		setProjectsByDept((prev) => {
			const orgMap = prev[org] || {}
			const existing = orgMap[dept] || []
			if (existing.includes(name)) return prev
			return {
				...prev,
				[org]: { ...orgMap, [dept]: [...existing, name].sort() },
			}
		})
		// initialize empty document arrays
		setTextDocuments((prev) => (prev[name] ? prev : { ...prev, [name]: [] }))
		setImageDocuments((prev) => (prev[name] ? prev : { ...prev, [name]: [] }))
		setSpreadsheetDocuments((prev) =>
			prev[name] ? prev : { ...prev, [name]: [] },
		)
	}, [])

	const addDocument = (
		project: string,
		name: string,
		type: 'text' | 'image' | 'spreadsheet' = 'text',
		templateId?: string,
	) => {
		if (!project || !name) return
		const updater = <T extends Record<string, string[]>>(
			setFn: React.Dispatch<React.SetStateAction<T>>,
		) => {
			setFn((prev: T) => {
				const existing = prev[project] || []
				if (existing.includes(name)) return prev
				return { ...prev, [project]: [...existing, name] } as T
			})
		}
		if (type === 'text') updater(setTextDocuments)
		if (type === 'image') updater(setImageDocuments)
		if (type === 'spreadsheet') updater(setSpreadsheetDocuments)

		// Initialize document with type-appropriate content
		const documentKey = `${project}:${name}`
		const selectedTemplate = templateId ? templates[type]?.[templateId] : null
		const initialContent = selectedTemplate
			? selectedTemplate.content(name, project)
			: templates[type].blank.content(name, project)

		// Set the initial content
		setDocumentContentState((prev) => ({
			...prev,
			[documentKey]: initialContent,
		}))
		setIsWorkspaceActive(true)
	}

	// Initial document content with sample content for different types
	const [documentContent, setDocumentContentState] = useState<
		Record<string, string>
	>(() => {
		if (!activeProject || !activeDocument) return {}

		// Initialize with some sample content for demonstration
		const documentType: keyof typeof templates =
			activeDocumentType === 'all' ? 'text' : activeDocumentType

		return {
			[activeProject]: templates[documentType].blank.content(
				activeDocument,
				activeProject,
			),
		}
	})

	// Function to set document content
	const setDocumentContent = useCallback(
		(project: string, document: string, content: string) => {
			// Skip if any required params are missing
			if (!project || !document || content === undefined) {
				console.log('Missing required parameters for setDocumentContent')
				return
			}

			const documentKey = `${project}:${document}`

			// First, check if the content is actually different to avoid unnecessary updates
			setDocumentContentState((prev) => {
				// Only update if content is different
				if (prev[documentKey] === content) {
					return prev // No change needed
				}
				return {
					...prev,
					[documentKey]: content,
				}
			})

			// Simplified navigation state updates - always update to ensure UI reflects current state
			console.log('📋 Navigation update for setDocumentContent:', {
				currentProject: activeProject,
				targetProject: project,
				currentDocument: activeDocument,
				targetDocument: document,
			})

			// Activate workspace if needed
			if (!isWorkspaceActive) {
				setIsWorkspaceActive(true)
			}

			// Update project and document states directly
			if (project !== activeProject) {
				console.log('Updating active project in setDocumentContent:', project)
				setActiveProject(project)
			}

			if (document !== activeDocument) {
				console.log('Updating active document in setDocumentContent:', document)
				setActiveDocument(document)
			}
		},
		[isWorkspaceActive, activeProject, activeDocument],
	)

	const toggleWorkspace = useCallback((isWorkspaceMode?: boolean) => {
		// Log the action before making the change
		console.log('Workspace: toggling workspace state')
		setIsWorkspaceActive((prev) => {
			const newState = isWorkspaceMode !== undefined ? isWorkspaceMode : !prev
			console.log('Workspace: changing to: ', newState)
			return newState
		})
	}, [])

	// Stable reference to state update functions
	const stableSetters = {
		setActiveOrganization,
		setActiveDepartment,
		setActiveProject,
		setActiveDocument,
		setDocumentContent,
		toggleWorkspace,
		addOrganization,
		addDepartment,
		addProject,
		addDocument,
		setActiveDocumentType,
		getWorkspaceState: () => ({
			organizationList,
			departmentList: departmentsByOrg,
			projectsByDept,
			activeOrganization,
			activeDepartment,
			activeProject,
		}),
	}
	const contextValue = {
		projectList,
		templates,
		documentList,
		activeProject,
		textDocuments,
		imageDocuments,
		activeDocument,
		departmentList: departmentsByOrg,
		projectsByDept,
		documentContent,
		activeDepartment,
		organizationList,
		isWorkspaceActive,
		activeOrganization,
		spreadsheetDocuments,
		activeDocumentType,
		...stableSetters,
	}
	const { userDocuments } = useWorkspaceDocuments(contextValue)

	// Memoize organization departments to prevent unnecessary recalculations
	const orgDepts = useMemo(() => {
		if (!activeOrganization || !departmentsByOrg) return null
		return (
			departmentsByOrg[activeOrganization as keyof typeof departmentsByOrg] ||
			null
		)
	}, [activeOrganization, departmentsByOrg])

	// When organization changes, set department if needed
	useEffect(() => {
		// Skip if no organization selected or departments not loaded
		if (!activeOrganization || !orgDepts) {
			console.log('Organization or departments not available, skipping effect')
			return
		}

		console.log('Organization changed to:', activeOrganization)

		// Skip if no departments exist for this organization
		if (orgDepts.length === 0) {
			console.log('No departments for this organization')
			if (activeDepartment !== null) {
				setActiveDepartment(null)
			}
			return
		}

		// Check if current department is valid for this organization
		const isCurrentDeptValid =
			activeDepartment && orgDepts.includes(activeDepartment)

		// Only update if current department is invalid for this organization
		if (!isCurrentDeptValid) {
			// Avoid state update if we already have the default value (prevents loop)
			const defaultDept = orgDepts[0]
			if (activeDepartment !== defaultDept) {
				console.log('Setting default department for new org:', defaultDept)
				setActiveDepartment(defaultDept)
			}
		}
	}, [activeOrganization, orgDepts, activeDepartment])

	// Memoize department projects to prevent unnecessary recalculations
	const deptProjects = useMemo(() => {
		if (!activeOrganization || !activeDepartment || !projectsByDept) return null
		const orgProjects =
			projectsByDept[activeOrganization as keyof typeof projectsByDept]
		if (!orgProjects) return null
		return (
			(orgProjects[activeDepartment as keyof typeof orgProjects] as string[]) ||
			null
		)
	}, [activeOrganization, activeDepartment, projectsByDept])

	// When department changes, set default project only if current project is invalid
	useEffect(() => {
		// Skip if any required data is missing
		if (!activeDepartment || !activeOrganization || !deptProjects) {
			console.log('Department change effect: Missing required data')
			return
		}

		console.log('Department changed to:', activeDepartment)

		// Handle case where there are no projects for this department
		if (deptProjects?.length === 0) {
			console.log('No projects for this department')
			if (activeProject !== null) {
				setActiveProject(null)
			}
			return
		}

		// Check if current project is valid for this department
		const isCurrentProjectValid =
			activeProject && deptProjects.includes(activeProject)

		// Only update if current project is invalid for this department
		if (!isCurrentProjectValid) {
			const defaultProject = deptProjects[0]
			// Avoid unnecessary state update if project is already set to default
			if (activeProject !== defaultProject) {
				console.log(
					'Setting default project for new department:',
					defaultProject,
				)
				setActiveProject(defaultProject)
			}
		}
	}, [activeOrganization, activeDepartment, activeProject, deptProjects])

	// Memoize project documents to prevent unnecessary recalculations (respect type filter)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const projectDocs = useMemo(() => {
		if (!activeProject) return null

		// Get static documents from workspace state
		let staticDocs: string[] = []
		if (activeDocumentType === 'all') {
			staticDocs = documentList[activeProject] || []
		} else {
			const source =
				activeDocumentType === 'text'
					? textDocuments
					: activeDocumentType === 'image'
						? imageDocuments
						: spreadsheetDocuments
			staticDocs = source[activeProject] || []
		}

		// Get dynamic documents from userDocuments (filtered by project and type)
		const dynamicDocs =
			userDocuments
				?.filter((doc) => {
					// Filter by project
					if (doc.project !== activeProject) return false
					// Filter by document type if not 'all'
					if (activeDocumentType !== 'all' && doc.type !== activeDocumentType)
						return false
					return true
				})
				.map((doc) => doc.name) || []

		// Merge and deduplicate
		const allDocs = [...new Set([...staticDocs, ...dynamicDocs])]
		return allDocs.length > 0 ? allDocs : null
	}, [
		activeDepartment,
		activeProject,
		activeDocumentType,
		documentList,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
		activeThread,
		userDocuments,
	])

	// When project changes, set default document only if current document is invalid
	useEffect(() => {
		// Use requestAnimationFrame to throttle updates and avoid cascading effects
		const frameId = requestAnimationFrame(() => {
			// Skip if no project selected or docs not loaded
			if (!activeProject || !projectDocs) {
				console.log('Project change effect: Missing required data')
				return
			}

			console.log('Project changed to:', activeProject)

			// Handle case where there are no documents for this project
			if (projectDocs.length === 0) {
				console.log('No documents for this project')
				if (activeDocument !== null) {
					setActiveDocument(null)
				}
				return
			}
			console.log('projectDocs', projectDocs)

			// Check if current document is valid for this project
			const isCurrentDocValid =
				activeDocument && projectDocs.includes(activeDocument)

			// Only update if current document is invalid for this project
			if (!isCurrentDocValid) {
				const defaultDoc = projectDocs[0]
				// Avoid unnecessary state update if document is already set to default
				if (activeDocument && activeDocument !== defaultDoc) {
					console.log('Setting default document for new project:', defaultDoc)
					setActiveDocument(defaultDoc)
				}
			}
		})

		// Clean up the animation frame on unmount
		return () => cancelAnimationFrame(frameId)
	}, [activeProject, projectDocs, activeDocument])

	// Persistence constants
	const PERSIST_KEY = 'mb.workspace.v1'
	const [hydrated, setHydrated] = useState(false)
	const [lastSyncedChecksum, setLastSyncedChecksum] = useState<string | null>(
		null,
	)
	const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(() => Date.now())

	const computeChecksum = useCallback((obj: unknown) => {
		try {
			const json = JSON.stringify(obj)
			let hash = 0
			for (let i = 0; i < json.length; i++) {
				const chr = json.charCodeAt(i)
				hash = (hash << 5) - hash + chr
				hash |= 0
			}
			return hash.toString()
		} catch {
			return '0'
		}
	}, [])

	const updateBreadcrumbNavigation = (data: WorkspaceStatePayload) => {
		console.info('Updating breadcrumb navigation')
		setOrganizationList(data.organizations)
		setDepartmentsByOrg(data.departmentsByOrg)
		setProjectsByDept(data.projectsByDept)
		setTextDocuments(data.textDocuments)
		setImageDocuments(data.imageDocuments)
		setSpreadsheetDocuments(data.spreadsheetDocuments)
		setDocumentContentState(data.documentContent)
		setActiveOrganization(data.activeOrganization)
		setActiveDepartment(data.activeDepartment)
		setActiveProject(data.activeProject)
		setActiveDocument(data.activeDocument)
		setActiveDocumentType(data.activeDocumentType)
		setLastUpdatedAt(data.updatedAt)
	}

	// Hydrate from localStorage on mount
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		try {
			const raw =
				typeof window !== 'undefined' ? localStorage.getItem(PERSIST_KEY) : null
			let localTimestamp: number | null = null
			if (raw) {
				const data = JSON.parse(raw)
				localTimestamp = data.updatedAt || null
				updateBreadcrumbNavigation(data)
			}
			// Attempt server hydrate
			fetch('/api/workspace/state')
				.then((r) => (r.ok ? r.json() : null))
				.then((remote) => {
					if (!remote || !remote.data) return
					if (!localTimestamp || remote.data.updatedAt > localTimestamp) {
						// TODO: Add here the Read of remote threads instead only activeThread to update the doc list and breadcrumb navigation
						// ! [use-workspace-documents.tsx -> userDocuments] should take care of that
						// If remote is newer than local, adopt it
						const remoteData = remote.data as WorkspaceStatePayload

						if (activeThread) {
							const activeThreadDocuments =
								activeThread.metadata?.documents || []
							// If the document's project exists, ensure the document is set and we remove any document not related to the active thread (and drafts documents)
							const draftDocuments = Object.keys(
								remoteData.documentContent || {},
							).filter((key) =>
								userDocuments.some(
									(d) =>
										`${d.project}:${d.name}` === key &&
										!d.versions?.length &&
										activeDocumentType !== 'all' &&
										d.type === activeDocumentType,
								),
							)

							for (const doc of activeThreadDocuments) {
								const breadcrumbNavigationData = remoteData.projectsByDept?.[
									doc.organization
								]?.[doc.department]?.includes(doc.project)
								if (!breadcrumbNavigationData) {
									remoteData.activeOrganization = doc.organization
									remoteData.activeDepartment = doc.department
									remoteData.activeProject = doc.project
								} else {
									remoteData.documentContent = {
										[`${doc.project}:${doc.name}`]: doc.content || '',
										...draftDocuments.reduce(
											(acc, curr) => {
												acc[curr] = remoteData.documentContent?.[curr] || ''
												return acc
											},
											{} as Record<string, string>,
										),
									}
								}
								// Selecting the first document on the list when having a doc related to the active thread
								remoteData.activeDocument =
									activeThreadDocuments[0]?.name || draftDocuments[0] || null
							}
						}

						updateBreadcrumbNavigation(remoteData)
					}
				})
				.catch((error: Error) => {
					console.warn(
						'Workspace persistence fetch failed. Getting remote state',
						error,
					)
				})
		} catch (e) {
			console.warn('Workspace persistence hydrate failed', e)
		} finally {
			setHydrated(true)
		}
	}, [session?.user?.id, activeThread])

	// Persist when key structures change (debounced via requestAnimationFrame batch)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!hydrated) return
		let frame: number | null = null
		const save = debounce(
			() => {
				try {
					const payload: WorkspaceStatePayload = {
						organisationsVersion: 1,
						updatedAt: Date.now(),
						organizations: organizationList,
						departmentsByOrg,
						projectsByDept,
						textDocuments,
						imageDocuments,
						spreadsheetDocuments,
						documentContent,
						activeOrganization,
						activeDepartment,
						activeProject,
						activeDocument,
						activeDocumentType,
					}
					localStorage.setItem(PERSIST_KEY, JSON.stringify(payload))
					setLastUpdatedAt(payload.updatedAt)
					const checksum = computeChecksum(payload)
					if (checksum !== lastSyncedChecksum) {
						fetch('/api/workspace/state', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(payload),
						})
							.then((r) => (r.ok ? r.json() : null))
							.then(() => setLastSyncedChecksum(checksum))
							.catch(() => {})
					}
				} catch (e) {
					console.warn('Workspace persistence save failed', e)
				}
			},
			2000,
			{ maxWait: 5000 },
		)

		frame = requestAnimationFrame(save)
		return () => {
			if (frame) cancelAnimationFrame(frame)
			save.cancel()
		}
	}, [
		hydrated,
		activeOrganization,
		activeDepartment,
		activeProject,
		activeDocument,
		documentContent,
		activeThread,
	])

	return (
		<WorkspaceContext.Provider value={contextValue}>
			{children}
		</WorkspaceContext.Provider>
	)
}

export function useWorkspace() {
	const context = useContext(WorkspaceContext)
	if (!context) {
		throw new Error('useWorkspace must be used within a WorkspaceProvider')
	}
	return context
}
