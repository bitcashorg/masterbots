'use client'

import { Button } from '@/components/ui/button'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { SaveIcon } from 'lucide-react'
import * as React from 'react'

interface WorkspaceContentHeaderProps {
	documentType: 'text' | 'image' | 'spreadsheet'
	activeSection: string | null
	isSaving: boolean
	showVersions: boolean
	versions: Array<{
		version: number
		updatedAt: string
		checksum: string
		url: string
	}>
	onSave: () => void
	onToggleVersions: () => void
	onRollback: (version: number) => void
}

export function WorkspaceContentHeader({
	documentType,
	activeSection,
	isSaving,
	showVersions,
	versions,
	onSave,
	onToggleVersions,
	onRollback,
}: WorkspaceContentHeaderProps) {
	const {
		activeProject: projectName,
		activeDocument: documentName,
		activeOrganization,
		activeDepartment,
		setActiveOrganization,
		setActiveDepartment,
		setActiveProject,
		setActiveDocument,
		organizationList,
		departmentList,
		projectsByDept,
		documentList,
	} = useWorkspace()
	const { activeThread } = useThread()

	// ISSUE 2 & 3 FIX: Dynamic breadcrumb navigation from thread metadata
	const breadcrumbItems = React.useMemo(() => {
		const items = []

		// Get documents from thread metadata if available
		const threadDocuments = activeThread?.metadata?.documents || []

		// If we have thread documents, use them to populate breadcrumbs
		if (threadDocuments.length > 0) {
			const doc = threadDocuments[0] // Use first document for breadcrumb context
			items.push(
				{
					type: 'organization',
					value: activeOrganization,
					label: activeOrganization || 'Organization',
				},
				{
					type: 'department',
					value: activeDepartment,
					label: activeDepartment || 'Department',
				},
				{ type: 'project', value: doc.project, label: doc.project },
				{ type: 'document', value: doc.name, label: doc.name },
			)
		} else {
			// Fallback to current workspace state
			items.push(
				{
					type: 'organization',
					value: activeOrganization,
					label: activeOrganization || 'Organization',
				},
				{
					type: 'department',
					value: activeDepartment,
					label: activeDepartment || 'Department',
				},
				{
					type: 'project',
					value: projectName,
					label: projectName || 'Project',
				},
				{
					type: 'document',
					value: documentName,
					label: documentName || 'Document',
				},
			)
		}

		return items.filter((item) => item.value) // Only show items with values
	}, [
		activeThread,
		activeOrganization,
		activeDepartment,
		projectName,
		documentName,
	])

	// ISSUE 5 FIX: No document should be selected by default - breadcrumb navigation
	const handleBreadcrumbClick = (type: string, value: string) => {
		switch (type) {
			case 'organization':
				setActiveOrganization(value)
				// Clear downstream selections
				setActiveDepartment(null)
				setActiveProject(null)
				setActiveDocument(null)
				break
			case 'department':
				setActiveDepartment(value)
				// Clear downstream selections
				setActiveProject(null)
				setActiveDocument(null)
				break
			case 'project':
				setActiveProject(value)
				// Clear document selection
				setActiveDocument(null)
				break
			case 'document':
				setActiveDocument(value)
				break
		}
	}

	return (
		<>
			<div className="flex justify-between items-center">
				{/* ISSUE 3 FIX: Dynamic breadcrumb navigation */}
				<div className="flex items-center space-x-2">
					{breadcrumbItems.map((item, index) => (
						<React.Fragment key={item.type}>
							<button
								type="button"
								onClick={() => handleBreadcrumbClick(item.type, item.value)}
								className="text-sm hover:underline text-blue-600 hover:text-blue-800"
							>
								{item.label}
							</button>
							{index < breadcrumbItems.length - 1 && (
								<span className="text-gray-400">/</span>
							)}
						</React.Fragment>
					))}
				</div>
				<div className="flex items-center gap-2">
					{documentType === 'text' && activeSection && (
						<Button
							size="sm"
							variant="outline"
							onClick={onSave}
							disabled={isSaving}
							className="flex items-center gap-2"
						>
							<SaveIcon className="h-4 w-4" />
							{isSaving ? 'Saving...' : 'Save'}
						</Button>
					)}
					<Button
						variant="ghost"
						size="sm"
						onClick={onToggleVersions}
						className="ml-1"
					>
						History
					</Button>
				</div>
			</div>

			{showVersions && versions.length > 0 && (
				<div className="border rounded-md p-3 text-sm">
					<div className="font-medium mb-2">Version History</div>
					<ul className="space-y-1">
						{[...versions]
							.sort((a, b) => b.version - a.version)
							.map((v) => (
								<li
									key={v.version}
									className="flex items-center justify-between"
								>
									<span>
										v{v.version} • {new Date(v.updatedAt).toLocaleString()} •
										checksum {v.checksum}
									</span>
									<div className="flex items-center gap-2">
										<a
											href={v.url}
											target="_blank"
											rel="noreferrer"
											className="text-xs underline"
										>
											View
										</a>
										<Button
											variant="outline"
											size="sm"
											onClick={() => onRollback(v.version)}
										>
											Rollback
										</Button>
									</div>
								</li>
							))}
					</ul>
				</div>
			)}
		</>
	)
}
