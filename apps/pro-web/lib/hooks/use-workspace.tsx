'use client'

import type { WorkspaceStatePayload } from '@/app/api/workspace/state/route'
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
	const [organizationList, setOrganizationList] = React.useState<string[]>([])
	const [departmentsByOrg, setDepartmentsByOrg] = React.useState<
		Record<string, string[]>
	>({})
	const [projectsByDept, setProjectsByDept] = React.useState<
		Record<string, Record<string, string[]>>
	>({})
	// Document maps (type segregated)
	const [textDocuments, setTextDocuments] = React.useState<
		Record<string, string[]>
	>({})
	const [imageDocuments, setImageDocuments] = React.useState<
		Record<string, string[]>
	>({})
	const [spreadsheetDocuments, setSpreadsheetDocuments] = React.useState<
		Record<string, string[]>
	>({})
	const { data: session } = useSession()
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

	const addDocument = (
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

		// Initialize document with type-appropriate content
		const documentKey = `${project}:${name}`
		let initialContent = ''

		switch (type) {
			case 'text':
				initialContent = `# ${name}
This is a new text document for ${project}.

## Overview
Document overview and purpose.

## Details
Detailed content goes here.

## Conclusion
Summary and next steps.
`
				break
			case 'image':
				initialContent = `# ${name}
Visual assets and images for ${project}.

## Image Collection
Collection of images related to this document.

## Design Assets
Brand and design materials.

## Reference Materials
Reference images and inspiration.
`
				break
			case 'spreadsheet':
				initialContent = `# ${name}
Data and analysis for ${project}.

## Data Overview
Summary of data sources and structure.

## Key Metrics
Important measurements and KPIs.

## Analysis
Data analysis and insights.
`
				break
		}

		// Set the initial content
		setDocumentContentState((prev) => ({
			...prev,
			[documentKey]: initialContent,
		}))
		if (!isWorkspaceActive) {
			setIsWorkspaceActive(true)
		}
	}

	// Initial document content with sample content for different types
	const [documentContent, setDocumentContentState] = React.useState<
		Record<string, string>
	>(() => {
		// Initialize with some sample content for demonstration
		const initialContent: Record<string, string> = {}

		// Add sample text document content
		initialContent['Project 1A:Proposal'] = `# Project Proposal
This document outlines the project proposal with key objectives and deliverables.

## Executive Summary
Brief overview of the project goals and expected outcomes.

## Scope of Work
Detailed description of tasks and responsibilities.

## Timeline
Project milestones and delivery schedule.

## Budget
Cost breakdown and resource allocation.
`

		// Add sample image document content
		initialContent['Campaign A:Assets'] = `# Visual Assets Collection
This document manages visual assets for the Campaign A project.

## Brand Assets
Logo variations, brand colors, and typography guidelines.

## Marketing Materials
Banner designs, social media graphics, and promotional materials.

## Product Images
High-resolution product photos and lifestyle shots.

## Design Variations
Different design concepts and A/B testing materials.
`

		// Add sample spreadsheet document content
		initialContent['Budget 2024:Financial Projections'] =
			`# Financial Projections 2024
This document contains financial data and projections for 2024.

## Revenue Forecasting
Monthly and quarterly revenue projections based on market analysis.

## Expense Tracking
Detailed breakdown of operational costs and budget allocations.

## Performance Metrics
Key performance indicators and financial health metrics.

## Risk Analysis
Financial risk assessment and mitigation strategies.
`

		return initialContent
	})

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
	}, [activeOrganization, activeDepartment, activeProject, deptProjects])

	// Memoize project documents to prevent unnecessary recalculations (respect type filter)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
		activeDepartment,
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
	}

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

	const updateBreadcrumbNavigation = (data: WorkspaceStatePayload) => {
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
	React.useEffect(() => {
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
					// If remote is newer than local, adopt it
					if (!localTimestamp || remote.data.updatedAt > localTimestamp) {
						const d = remote.data as WorkspaceStatePayload
						updateBreadcrumbNavigation(d)
					}
				})
				.catch(() => {})
		} catch (e) {
			console.warn('Workspace persistence hydrate failed', e)
		} finally {
			setHydrated(true)
		}
	}, [session?.user?.id])

	// Persist when key structures change (debounced via requestAnimationFrame batch)
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (!hydrated) return
		let frame: number | null = null
		const save = () => {
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
		<WorkspaceContext.Provider
			value={{
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
			}}
		>
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
