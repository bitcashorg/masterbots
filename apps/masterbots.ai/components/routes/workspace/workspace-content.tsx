'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { SaveIcon } from 'lucide-react'
import * as React from 'react'

interface WorkspaceSection {
	id: string
	title: string
	content: string
}

interface WorkspaceContentProps {
	projectName: string | null
	documentName: string | null
	className?: string
	isLoading?: boolean
}

export function WorkspaceContent({
	projectName,
	documentName,
	className,
	isLoading = false,
}: WorkspaceContentProps) {
	// Mock document sections - in a real implementation, fetch these from an API
	const [sections, setSections] = React.useState<WorkspaceSection[]>([
		{
			id: '1',
			title: 'Introduction',
			content:
				'This is the introduction section of the document. It provides an overview of the project.',
		},
		{
			id: '2',
			title: 'Background',
			content:
				'This section covers the background and context of the project, including relevant history and previous work.',
		},
		{
			id: '3',
			title: 'Methodology',
			content:
				'The methodology section details the approach and techniques used in this project.',
		},
		{
			id: '4',
			title: 'Results',
			content:
				'This section presents the findings and outcomes of the project work.',
		},
		{
			id: '5',
			title: 'Conclusion',
			content:
				'The conclusion summarizes the key points and implications of the project.',
		},
	])

	const [activeSection, setActiveSection] = React.useState<string | null>(null)
	const [editableContent, setEditableContent] = React.useState<string>('')

	React.useEffect(() => {
		// Reset active section when document changes
		setActiveSection(null)
		setEditableContent('')
	}, [projectName, documentName])

	const handleSectionClick = (sectionId: string) => {
		const section = sections.find((s) => s.id === sectionId)
		if (section) {
			setActiveSection(sectionId)
			setEditableContent(section.content)
		}
	}

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditableContent(e.target.value)
	}

	const handleSaveSection = () => {
		if (activeSection) {
			setSections(
				sections.map((section) =>
					section.id === activeSection
						? { ...section, content: editableContent }
						: section,
				),
			)
		}
	}

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
		<div className={cn('flex flex-col space-y-4 p-4', className)}>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">
					{projectName} / {documentName}
				</h2>
				{activeSection && (
					<Button
						size="sm"
						variant="outline"
						onClick={handleSaveSection}
						className="flex items-center gap-2"
					>
						<SaveIcon className="h-4 w-4" />
						Save Changes
					</Button>
				)}
			</div>

			<div className="grid grid-cols-12 gap-4">
				{/* Section navigation */}
				<div className="col-span-3 border rounded-lg p-2 h-[400px] overflow-y-auto">
					<h3 className="font-medium mb-2 p-2">Document Sections</h3>
					<div className="space-y-1">
						{sections.map((section) => (
							<button
								key={section.id}
								onClick={() => handleSectionClick(section.id)}
								className={cn(
									'w-full text-left px-3 py-2 rounded-md text-sm',
									activeSection === section.id
										? 'bg-primary/10 text-primary font-medium'
										: 'hover:bg-muted',
								)}
							>
								{section.title}
							</button>
						))}
					</div>
				</div>

				{/* Content area */}
				<div className="col-span-9 border rounded-lg p-4 h-[400px] overflow-y-auto">
					{activeSection ? (
						<div className="space-y-4">
							<h3 className="font-semibold">
								{sections.find((s) => s.id === activeSection)?.title}
							</h3>
							<textarea
								value={editableContent}
								onChange={handleContentChange}
								className="w-full h-[300px] p-3 border rounded-md focus:outline-none focus:ring-2 resize-none"
							/>
						</div>
					) : (
						<div className="flex items-center justify-center h-full text-muted-foreground">
							Select a section to edit
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
