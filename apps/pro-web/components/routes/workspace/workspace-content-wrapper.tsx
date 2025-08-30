'use client'

import { useWorkspace } from '@/lib/hooks/use-workspace'
import { Skeleton } from '@masterbots/mb-ui'
import * as React from 'react'

interface WorkspaceContentWrapperProps {
	className?: string
	isLoading?: boolean
	children: (props: {
		projectName: string
		documentName: string
		documentType: 'text' | 'image' | 'spreadsheet'
	}) => React.ReactNode
}

export function WorkspaceContentWrapper({
	className,
	isLoading = false,
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

	// Debug logging to track when wrapper re-renders
	React.useEffect(() => {
		console.log('🔄 WorkspaceContentWrapper re-rendered with:', {
			projectName,
			documentName,
			documentType,
			timestamp: Date.now(),
		})
	}, [projectName, documentName, documentType])

	if (!projectName || !documentName) {
		return (
			<div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
				<p>Select a project and document to edit</p>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="space-y-4 p-4">
				<Skeleton className="h-8 w-1/3" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
			</div>
		)
	}

	return (
		<div className={className}>
			{children({ projectName, documentName, documentType })}
		</div>
	)
}
