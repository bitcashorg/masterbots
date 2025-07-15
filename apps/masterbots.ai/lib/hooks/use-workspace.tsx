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

	// Mock data - in a real implementation, this would come from an API or database
	const organizationList = ['Company 1', 'Company 2', 'Client 1', 'Client 2']

	// Define departmentsByOrg first before using it
	const departmentsByOrg = {
		'Company 1': ['General & Admin', 'Sales & Marketing', 'Product/Service'],
		'Company 2': ['Finance', 'HR', 'Operations'],
		'Client 1': ['Legal', 'Support', 'Implementation'],
		'Client 2': ['Design', 'Development', 'QA'],
	}

	const departmentList = departmentsByOrg

	// Create a comprehensive project list by combining all projects from all departments
	const projectList = [
		// Company 1
		'Project 1A',
		'Project 1B',
		'Campaign A',
		'Campaign B',
		'Product X',
		'Service Y',
		// Company 2
		'Budget 2024',
		'Forecasting',
		'Recruiting',
		'Training',
		'Logistics',
		'Supply Chain',
		// Client 1
		'Contracts',
		'Compliance',
		'Tickets',
		'Knowledge Base',
		'Onboarding',
		'Integration',
		// Client 2
		'UI Mockups',
		'Branding',
		'Frontend',
		'Backend',
		'Testing',
		'Bug Tracking',
	]

	// Document lists for each project, categorized by type
	const textDocuments: Record<string, string[]> = {
		// Company 1 docs
		'Project 1A': ['Proposal', 'Timeline', 'Budget'],
		'Project 1B': ['Requirements', 'Specifications'],
		'Campaign A': ['Creative Brief', 'Schedule'],
		'Campaign B': ['Market Analysis', 'Audience Segments'],
		'Product X': ['Features', 'Roadmap', 'Pricing'],
		'Service Y': ['Service Tiers', 'Implementation Guide'],

		// Company 2 docs
		'Budget 2024': ['Q1 Forecast', 'Q2 Forecast', 'Annual Summary'],
		Forecasting: ['Models', 'Assumptions'],
		Recruiting: ['Job Descriptions', 'Interview Questions'],
		Training: ['Onboarding Materials', 'Development Plans'],
		Logistics: ['Shipping Routes', 'Warehouse Plans'],
		'Supply Chain': ['Vendor List', 'Procurement Process'],

		// Client 1 docs
		Contracts: ['MSA Template', 'SOW Template', 'NDA'],
		Compliance: ['Requirements', 'Audit Checklist'],
		Tickets: ['Open Issues', 'Resolved Cases'],
		'Knowledge Base': ['FAQ', 'Troubleshooting Guide'],
		Onboarding: ['Client Setup', 'Training Schedule'],
		Integration: ['API Documentation', 'Implementation Steps'],

		// Client 2 docs
		'UI Mockups': ['Homepage', 'Dashboard', 'Settings'],
		Branding: ['Logo Guidelines', 'Color Palette'],
		Frontend: ['Component Library', 'State Management'],
		Backend: ['API Endpoints', 'Database Schema'],
		Testing: ['Test Cases', 'QA Process'],
		'Bug Tracking': ['Current Sprint', 'Backlog'],
	}

	const imageDocuments: Record<string, string[]> = {
		// Sample image documents
		'Campaign A': ['Assets', 'Banner Images', 'Social Media Graphics'],
		Branding: ['Logo Variants', 'Brand Illustrations', 'Icon Set'],
		'UI Mockups': ['Design Concepts', 'Mobile Screens', 'User Flow Diagrams'],
		'Product X': ['Product Photos', 'Marketing Visuals', 'Infographics'],
		Frontend: ['UI Components', 'Animation Examples'],
	}

	const spreadsheetDocuments: Record<string, string[]> = {
		// Sample spreadsheet documents
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
	}

	// Combined document list for backward compatibility
	const documentList: Record<string, string[]> = {
		...textDocuments,
		...imageDocuments,
		...spreadsheetDocuments,
	}

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

	// This declaration was moved to the top of the file

	// Rather than overwriting the existing departmentList, just map it for consistency
	const projectsByDept = {
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
	}

	// Memoize organization departments to prevent unnecessary recalculations
	const orgDepts = React.useMemo(() => {
		if (!activeOrganization || !departmentsByOrg) return null
		return departmentsByOrg[activeOrganization] || null
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
		const orgProjects = projectsByDept[activeOrganization]
		if (!orgProjects) return null
		return orgProjects[activeDepartment] || null
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
		if (deptProjects.length === 0) {
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

	// Memoize project documents to prevent unnecessary recalculations
	const projectDocs = React.useMemo(() => {
		if (!activeProject || !documentList) return null
		return documentList[activeProject] || null
	}, [activeProject, documentList])

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
		}),
		[],
	)

	const value = React.useMemo(
		() => ({
			isWorkspaceActive,
			toggleWorkspace: stableSetters.toggleWorkspace,
			activeOrganization,
			setActiveOrganization: stableSetters.setActiveOrganization,
			activeDepartment,
			setActiveDepartment: stableSetters.setActiveDepartment,
			activeProject,
			setActiveProject: stableSetters.setActiveProject,
			activeDocument,
			setActiveDocument: stableSetters.setActiveDocument,
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
		}),
		[
			isWorkspaceActive,
			activeOrganization,
			activeDepartment,
			activeProject,
			activeDocument,
			organizationList,
			departmentList,
			projectList,
			documentList,
			textDocuments,
			imageDocuments,
			spreadsheetDocuments,
			projectsByDept,
			documentContent,
			stableSetters, // Using stable reference instead of individual functions
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
