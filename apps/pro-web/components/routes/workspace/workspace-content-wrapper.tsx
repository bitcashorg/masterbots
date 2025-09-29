'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import type * as React from 'react'

interface WorkspaceContentWrapperProps {
	className?: string
	children: (props: {
		projectName: string
		documentName: string
		documentType: 'text' | 'image' | 'spreadsheet'
	}) => React.ReactNode
}

export function WorkspaceContentWrapper({
	className,
	children,
}: WorkspaceContentWrapperProps) {
	const {
		activeProject: projectName,
		activeDocument: documentName,
		activeDocumentType,
	} = useWorkspace()

	// Convert 'all' type to default 'text' type for rendering
	const documentType =
		activeDocumentType === 'all' ? 'text' : activeDocumentType

	if (!projectName || !documentName) {
		return (
			<div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
				<p>
					{!projectName && !documentName
						? 'Select a project and document to edit'
						: null}
					{!projectName ? 'Select a project to start editing' : null}
					{!documentName
						? 'Select or create a document to start editing'
						: null}
				</p>
			</div>
		)
	}

	return children({ projectName, documentName, documentType })
}
