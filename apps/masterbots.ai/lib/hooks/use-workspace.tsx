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

	// Document lists for each project
	const documentList: Record<string, string[]> = {
		// Company 1 docs
		'Project 1A': ['Proposal', 'Timeline', 'Budget'],
		'Project 1B': ['Requirements', 'Specifications'],
		'Campaign A': ['Creative Brief', 'Assets', 'Schedule'],
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
			setDocumentContentState((prev) => ({
				...prev,
				[documentKey]: content,
			}))

			// Only update project if it's different to avoid triggering effects unnecessarily
			if (project !== activeProject) {
				setActiveProject(project)
			}

			// Only update document if it's different to avoid triggering effects unnecessarily
			if (document !== activeDocument) {
				setActiveDocument(document)
			}

			// Activate workspace if it's not active
			if (!isWorkspaceActive) {
				setIsWorkspaceActive(true)
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

	// When organization changes, set department if needed
	React.useEffect(() => {
		// Skip if no organization selected
		if (!activeOrganization) {
			console.log('No organization selected, skipping effect')
			return
		}

		// Skip if departmentsByOrg isn't loaded yet
		if (!departmentsByOrg) {
			console.log('Departments not loaded yet, skipping effect')
			return
		}

		console.log('Organization changed to:', activeOrganization)

		// Get departments for the selected organization
		const orgDepts = departmentsByOrg[activeOrganization]

		// Skip if no departments exist for this organization
		if (!orgDepts || orgDepts.length === 0) {
			console.log('No departments for this organization')
			setActiveDepartment(null)
			return
		}

		// Check if current department is valid for this organization
		const isCurrentDeptValid =
			activeDepartment && orgDepts.includes(activeDepartment)

		// Only update if current department is invalid for this organization
		if (!isCurrentDeptValid) {
			console.log('Setting default department for new org')
			setActiveDepartment(orgDepts[0])
		}
	}, [activeOrganization, departmentsByOrg])

	// When department changes, set default project only if current project is invalid
	React.useEffect(() => {
		console.log('Department changed to:', activeDepartment)

		// Skip if no department selected
		if (!activeDepartment) {
			console.log('No department selected, skipping effect')
			return
		}

		// Skip if no organization selected (should never happen given the cascade)
		if (!activeOrganization) {
			console.log('No organization selected, skipping effect')
			return
		}

		// Skip if projectsByDept isn't loaded yet
		if (!projectsByDept) {
			console.log('Projects not loaded yet, skipping effect')
			return
		}

		// Get organization's departments first
		const orgProjects = projectsByDept[activeOrganization]
		if (!orgProjects) {
			console.log('No projects for this organization')
			setActiveProject(null)
			return
		}

		// Get projects for this department
		const deptProjects = orgProjects[activeDepartment]
		if (!deptProjects || deptProjects.length === 0) {
			console.log('No projects for this department')
			setActiveProject(null)
			return
		}

		// Check if current project is valid for this department
		const isCurrentProjectValid =
			activeProject && deptProjects.includes(activeProject)

		// Only update if current project is invalid for this department
		if (!isCurrentProjectValid) {
			console.log('Setting default project for new department')
			setActiveProject(deptProjects[0])
		}
	}, [activeOrganization, activeDepartment, projectsByDept])

	// When project changes, set default document only if current document is invalid
	React.useEffect(() => {
		console.log('Project changed to:', activeProject)

		// Skip if no project selected
		if (!activeProject) {
			console.log('No project selected, skipping effect')
			return
		}

		// Skip if documentList isn't loaded yet
		if (!documentList) {
			console.log('Documents not loaded yet, skipping effect')
			return
		}

		// Get documents for this project
		const projectDocs = documentList[activeProject]
		if (!projectDocs || projectDocs.length === 0) {
			console.log('No documents for this project')
			setActiveDocument(null)
			return
		}

		// Check if current document is valid for this project
		const isCurrentDocValid =
			activeDocument && projectDocs.includes(activeDocument)

		// Only update if current document is invalid for this project
		if (!isCurrentDocValid) {
			console.log('Setting default document for new project')
			setActiveDocument(projectDocs[0])
		}
	}, [activeProject, documentList])

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
			organizationList,
			departmentList,
			projectList,
			documentList,
			projectsByDept,
			documentContent,
			setDocumentContent,
		}),
		[
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
			organizationList,
			departmentList,
			projectList,
			documentList,
			projectsByDept,
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
