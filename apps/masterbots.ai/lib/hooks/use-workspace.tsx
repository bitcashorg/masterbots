'use client'

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
	) => void
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(
	undefined,
)

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
	const [isWorkspaceActive, setIsWorkspaceActive] = React.useState(true)
	const [activeOrganization, setActiveOrganization] = React.useState<
		string | null
	>('Company 1')
	const [activeDepartment, setActiveDepartment] = React.useState<string | null>(
		'General & Admin',
	)
	const [activeProject, setActiveProject] = React.useState<string | null>(
		'Project 1A',
	)
	const [activeDocument, setActiveDocument] = React.useState<string | null>(
		'Proposal',
	)
	// New: selected document type filter for the workspace (breadcrumb)
	const [activeDocumentType, setActiveDocumentType] = React.useState<
		'all' | 'text' | 'image' | 'spreadsheet'
	>('all')

	// Static -> stateful datasets to enable dynamic additions
	const [organizationList, setOrganizationList] = React.useState<string[]>([
		'Company 1',
		'Company 2',
		'Client 1',
		'Client 2',
	])
	const [departmentsByOrg, setDepartmentsByOrg] = React.useState<
		Record<string, string[]>
	>({
		'Company 1': ['General & Admin', 'Sales & Marketing', 'Product/Service'],
		'Company 2': ['Finance', 'HR', 'Operations'],
		'Client 1': ['Legal', 'Support', 'Implementation'],
		'Client 2': ['Design', 'Development', 'QA'],
	})
	const [projectsByDept, setProjectsByDept] = React.useState<
		Record<string, Record<string, string[]>>
	>({
		'Company 1': {
			'General & Admin': ['Project 1A', 'Project 1B'],
			'Sales & Marketing': ['Campaign A', 'Campaign B'],
			'Product/Service': ['Product X', 'Service Y'],
		},
		'Company 2': {
			Finance: ['Budget 2024', 'Forecasting'],
			HR: ['Recruiting', 'Training'],
			Operations: ['Logistics', 'Supply Chain'],
		},
		'Client 1': {
			Legal: ['Contracts', 'Compliance'],
			Support: ['Tickets', 'Knowledge Base'],
			Implementation: ['Onboarding', 'Integration'],
		},
		'Client 2': {
			Design: ['UI Mockups', 'Branding'],
			Development: ['Frontend', 'Backend'],
			QA: ['Testing', 'Bug Tracking'],
		},
	})
	// Document maps (type segregated)
	const [textDocuments, setTextDocuments] = React.useState<
		Record<string, string[]>
	>({
		'Project 1A': ['Proposal', 'Timeline', 'Budget'],
		'Project 1B': ['Requirements', 'Specifications'],
		'Campaign A': ['Creative Brief', 'Schedule'],
		'Campaign B': ['Market Analysis', 'Audience Segments'],
		'Product X': ['Features', 'Roadmap', 'Pricing'],
		'Service Y': ['Service Tiers', 'Implementation Guide'],
		'Budget 2024': ['Q1 Forecast', 'Q2 Forecast', 'Annual Summary'],
		Forecasting: ['Models', 'Assumptions'],
		Recruiting: ['Job Descriptions', 'Interview Questions'],
		Training: ['Onboarding Materials', 'Development Plans'],
		Logistics: ['Shipping Routes', 'Warehouse Plans'],
		'Supply Chain': ['Vendor List', 'Procurement Process'],
		Contracts: ['MSA Template', 'SOW Template', 'NDA'],
		Compliance: ['Requirements', 'Audit Checklist'],
		Tickets: ['Open Issues', 'Resolved Cases'],
		'Knowledge Base': ['FAQ', 'Troubleshooting Guide'],
		Onboarding: ['Client Setup', 'Training Schedule'],
		Integration: ['API Documentation', 'Implementation Steps'],
		'UI Mockups': ['Homepage', 'Dashboard', 'Settings'],
		Branding: ['Logo Guidelines', 'Color Palette'],
		Frontend: ['Component Library', 'State Management'],
		Backend: ['API Endpoints', 'Database Schema'],
		Testing: ['Test Cases', 'QA Process'],
		'Bug Tracking': ['Current Sprint', 'Backlog'],
	})
	const [imageDocuments, setImageDocuments] = React.useState<
		Record<string, string[]>
	>({
		'Campaign A': ['Assets', 'Banner Images', 'Social Media Graphics'],
		Branding: ['Logo Variants', 'Brand Illustrations', 'Icon Set'],
		'UI Mockups': ['Design Concepts', 'Mobile Screens', 'User Flow Diagrams'],
		'Product X': ['Product Photos', 'Marketing Visuals', 'Infographics'],
		Frontend: ['UI Components', 'Animation Examples'],
	})
	const [spreadsheetDocuments, setSpreadsheetDocuments] = React.useState<
		Record<string, string[]>
	>({
		'Budget 2024': [
			'Financial Projections',
			'Expense Tracker',
			'Investment Calculator',
		],
		'Project 1A': ['Project Timeline', 'Resource Allocation', 'Cost Analysis'],
		'Campaign B': ['Campaign Metrics', 'ROI Calculator', 'Target Demographics'],
		'Supply Chain': [
			'Inventory Management',
			'Supplier Comparison',
			'Shipping Logistics',
		],
		Forecasting: ['Sales Projections', 'Growth Models', 'Trend Analysis'],
	})
	// Derived projectList (flatten) recomputed on changes
	const projectList = React.useMemo(() => {
		return Object.values(projectsByDept).flatMap((deptMap) =>
			Object.values(deptMap).flat(),
		)
	}, [projectsByDept])
	const documentList: Record<string, string[]> = React.useMemo(
		() => ({ ...textDocuments, ...imageDocuments, ...spreadsheetDocuments }),
		[textDocuments, imageDocuments, spreadsheetDocuments],
	)

	// Dynamic add helpers
	const addOrganization = React.useCallback((name: string) => {
		if (!name) return
		setOrganizationList((prev) =>
			prev.includes(name) ? prev : [...prev, name].sort(),
		)
		setDepartmentsByOrg((prev) => (prev[name] ? prev : { ...prev, [name]: [] }))
		setProjectsByDept((prev) => (prev[name] ? prev : { ...prev, [name]: {} }))
	}, [])

	const addDepartment = React.useCallback((org: string, name: string) => {
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

	const addProject = React.useCallback(
		(org: string, dept: string, name: string) => {
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
		},
		[],
	)

	const addDocument = React.useCallback(
		(
			project: string,
			name: string,
			type: 'text' | 'image' | 'spreadsheet' = 'text',
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
		},
		[],
	)

	// Initial document content
	const [documentContent, setDocumentContentState] = React.useState<
		Record<string, string>
	>({})

	// Function to set document content
	const setDocumentContent = React.useCallback(
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

			// Only update navigation state if we're not already on the correct project/document
			// This prevents infinite loops when updating content for the currently active document
			if (project !== activeProject || document !== activeDocument) {
				console.log('📋 Navigation update needed for setDocumentContent:', {
					currentProject: activeProject,
					targetProject: project,
					currentDocument: activeDocument,
					targetDocument: document,
				})

				// Use a debounced update approach with multiple checks
				// This prevents cascading updates and infinite loops
				let updateCancelled = false

				// First check if we need to activate the workspace
				if (!isWorkspaceActive) {
					requestAnimationFrame(() => {
						if (!updateCancelled) {
							setIsWorkspaceActive(true)
						}
					})
				}

				// Batch the navigation updates using requestAnimationFrame
				const updateNavigationFrame = requestAnimationFrame(() => {
					if (updateCancelled) return

					// Update project if needed, with strict equality check
					const projectNeedsUpdate = project !== activeProject
					if (projectNeedsUpdate) {
						console.log(
							'Updating active project in setDocumentContent:',
							project,
						)
						setActiveProject(project)
					}

					// Use nested frame for document update to ensure it happens after project update settles
					const documentUpdateFrame = requestAnimationFrame(() => {
						if (updateCancelled) return

						// Update document if needed, with strict equality check
						const documentNeedsUpdate = document !== activeDocument
						if (documentNeedsUpdate) {
							console.log(
								'Updating active document in setDocumentContent:',
								document,
							)
							setActiveDocument(document)
						}
					})

					// Clean up document frame on component unmount
					return () => {
						cancelAnimationFrame(documentUpdateFrame)
					}
				})

				// Return cleanup function to cancel all pending updates if component unmounts
				return () => {
					updateCancelled = true
					cancelAnimationFrame(updateNavigationFrame)
				}
			}
			// No navigation update needed - already on target document
			console.log('📋 No navigation update needed - already on target document')
		},
		[isWorkspaceActive, activeProject, activeDocument],
	)

	const toggleWorkspace = React.useCallback(() => {
		// Log the action before making the change
		console.log('Workspace: toggling workspace state')
		setIsWorkspaceActive((prev) => {
			const newState = !prev
			console.log('Workspace: changing to: ', newState)
			return newState
		})
	}, [])

	// Memoize organization departments to prevent unnecessary recalculations
	const orgDepts = React.useMemo(() => {
		if (!activeOrganization || !departmentsByOrg) return null
		return (
			departmentsByOrg[activeOrganization as keyof typeof departmentsByOrg] ||
			null
		)
	}, [activeOrganization, departmentsByOrg])

	// When organization changes, set department if needed
	React.useEffect(() => {
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
	const deptProjects = React.useMemo(() => {
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
	React.useEffect(() => {
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
	}, [activeOrganization, activeDepartment, deptProjects, activeProject])

	// Memoize project documents to prevent unnecessary recalculations (respect type filter)
	const projectDocs = React.useMemo(() => {
		if (!activeProject) return null
		if (activeDocumentType === 'all') return documentList[activeProject] || null
		const source =
			activeDocumentType === 'text'
				? textDocuments
				: activeDocumentType === 'image'
					? imageDocuments
					: spreadsheetDocuments
		return source[activeProject] || null
	}, [
		activeProject,
		activeDocumentType,
		documentList,
		textDocuments,
		imageDocuments,
		spreadsheetDocuments,
	])

	// When project changes, set default document only if current document is invalid
	React.useEffect(() => {
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

			// Check if current document is valid for this project
			const isCurrentDocValid =
				activeDocument && projectDocs.includes(activeDocument)

			// Only update if current document is invalid for this project
			if (!isCurrentDocValid) {
				const defaultDoc = projectDocs[0]
				// Avoid unnecessary state update if document is already set to default
				if (activeDocument !== defaultDoc) {
					console.log('Setting default document for new project:', defaultDoc)
					setActiveDocument(defaultDoc)
				}
			}
		})

		// Clean up the animation frame on unmount
		return () => cancelAnimationFrame(frameId)
	}, [activeProject, projectDocs, activeDocument])

	// Stable reference to state update functions
	const stableSetters = React.useMemo(
		() => ({
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
		}),
		[
			addOrganization,
			addDepartment,
			addProject,
			addDocument,
			toggleWorkspace,
			setDocumentContent,
		],
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const value = React.useMemo(
		() => ({
			projectList,
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
			setDocumentContent,
		}),
		[
			isWorkspaceActive,
			activeOrganization,
			activeDepartment,
			activeProject,
			activeDocument,
			organizationList,
			departmentsByOrg,
			projectList,
			textDocuments,
			imageDocuments,
			spreadsheetDocuments,
			projectsByDept,
			documentContent,
			stableSetters,
			activeDocumentType,
		],
	)

	// Persistence constants
	const PERSIST_KEY = 'mb.workspace.v1'
	const [hydrated, setHydrated] = React.useState(false)
	const [lastSyncedChecksum, setLastSyncedChecksum] = React.useState<
		string | null
	>(null)
	const [lastUpdatedAt, setLastUpdatedAt] = React.useState<number>(() =>
		Date.now(),
	)

	const computeChecksum = React.useCallback((obj: unknown) => {
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

	// Hydrate from localStorage on mount
	React.useEffect(() => {
		try {
			const raw =
				typeof window !== 'undefined' ? localStorage.getItem(PERSIST_KEY) : null
			let localTimestamp: number | null = null
			if (raw) {
				const data = JSON.parse(raw)
				localTimestamp = data.updatedAt || null
				if (data.organizations) setOrganizationList(data.organizations)
				if (data.departmentsByOrg) setDepartmentsByOrg(data.departmentsByOrg)
				if (data.projectsByDept) setProjectsByDept(data.projectsByDept)
				if (data.textDocuments) setTextDocuments(data.textDocuments)
				if (data.imageDocuments) setImageDocuments(data.imageDocuments)
				if (data.spreadsheetDocuments)
					setSpreadsheetDocuments(data.spreadsheetDocuments)
				if (data.documentContent) setDocumentContentState(data.documentContent)
				if (data.activeOrganization)
					setActiveOrganization(data.activeOrganization)
				if (data.activeDepartment) setActiveDepartment(data.activeDepartment)
				if (data.activeProject) setActiveProject(data.activeProject)
				if (data.activeDocument) setActiveDocument(data.activeDocument)
				if (data.activeDocumentType)
					setActiveDocumentType(data.activeDocumentType)
				if (data.updatedAt) setLastUpdatedAt(data.updatedAt)
			}
			// Attempt server hydrate
			fetch('/api/workspace/state')
				.then((r) => (r.ok ? r.json() : null))
				.then((remote) => {
					if (!remote || !remote.data) return
					// If remote is newer than local, adopt it
					if (!localTimestamp || remote.data.updatedAt > localTimestamp) {
						const d = remote.data
						if (d.organizations) setOrganizationList(d.organizations)
						if (d.departmentsByOrg) setDepartmentsByOrg(d.departmentsByOrg)
						if (d.projectsByDept) setProjectsByDept(d.projectsByDept)
						if (d.textDocuments) setTextDocuments(d.textDocuments)
						if (d.imageDocuments) setImageDocuments(d.imageDocuments)
						if (d.spreadsheetDocuments)
							setSpreadsheetDocuments(d.spreadsheetDocuments)
						if (d.documentContent) setDocumentContentState(d.documentContent)
						if (d.activeOrganization)
							setActiveOrganization(d.activeOrganization)
						if (d.activeDepartment) setActiveDepartment(d.activeDepartment)
						if (d.activeProject) setActiveProject(d.activeProject)
						if (d.activeDocument) setActiveDocument(d.activeDocument)
						if (d.activeDocumentType)
							setActiveDocumentType(d.activeDocumentType)
						if (d.updatedAt) setLastUpdatedAt(d.updatedAt)
					}
				})
				.catch(() => {})
		} catch (e) {
			console.warn('Workspace persistence hydrate failed', e)
		} finally {
			setHydrated(true)
		}
	}, [])

	// Persist when key structures change (debounced via requestAnimationFrame batch)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (!hydrated) return
		let frame: number | null = null
		const save = () => {
			try {
				const payload = {
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
		}
		frame = requestAnimationFrame(save)
		return () => {
			if (frame) cancelAnimationFrame(frame)
		}
	}, [
		hydrated,
		activeOrganization,
		activeDepartment,
		activeProject,
		activeDocument,
		documentContent,
	])

	return (
		<WorkspaceContext.Provider value={value}>
			{children}
		</WorkspaceContext.Provider>
	)
}

export function useWorkspace() {
	const context = React.useContext(WorkspaceContext)
	if (!context) {
		throw new Error('useWorkspace must be used within a WorkspaceProvider')
	}
	return context
}
