'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import {
	type MarkdownSection,
	combineMarkdownSections,
	createStructuredMarkdown,
	parseMarkdownSections,
} from '@/lib/markdown-utils'
import { cn } from '@/lib/utils'
import { Clipboard, FileText, PlusIcon, SaveIcon, Image, Table, FileIcon } from 'lucide-react'
import * as React from 'react'

interface WorkspaceContentProps {
	projectName: string | null
	documentName: string | null
	className?: string
	isLoading?: boolean
	documentType?: 'text' | 'image' | 'spreadsheet'
}

export function WorkspaceContent({
	projectName,
	documentName,
	className,
	isLoading = false,
	documentType = 'text'
}: WorkspaceContentProps) {
	// Initial document for new documents
	const initialMarkdown = `# Introduction
This is the introduction section of the document. It provides an overview of the project.

## Background
This section covers the background and context of the project, including relevant history and previous work.

## Methodology
The methodology section details the approach and techniques used in this project.

## Results
This section presents the findings and outcomes of the project work.

## Conclusion
The conclusion summarizes the key points and implications of the project.
`

	// Get document content from workspace context
	const { documentContent } = useWorkspace()

	// Check if we have content for this document
	const documentKey =
		projectName && documentName ? `${projectName}:${documentName}` : null
	const savedContent =
		documentKey && documentContent && documentContent[documentKey]

	// Define document types
	type DocumentType = 'text' | 'image' | 'spreadsheet';

	// State management
	const [fullMarkdown, setFullMarkdown] = React.useState<string>(
		savedContent || initialMarkdown,
	)
	const [sections, setSections] = React.useState<MarkdownSection[]>(
		parseMarkdownSections(savedContent || initialMarkdown),
	)
	const [activeSection, setActiveSection] = React.useState<string | null>(null)
	const [editableContent, setEditableContent] = React.useState<string>('')
	const [isImportDialogOpen, setIsImportDialogOpen] = React.useState(false)
	const [pasteContent, setPasteContent] = React.useState('')
	const [viewMode, setViewMode] = React.useState<'sections' | 'source'>(
		'sections',
	)
	// documentType is now passed as a prop

	// Use a ref to track previous document key to prevent unnecessary resets
	const prevDocumentKeyRef = React.useRef(documentKey);
	
	React.useEffect(() => {
		// Only reset when document actually changes (not on every render)
		if (documentKey !== prevDocumentKeyRef.current) {
			setActiveSection(null)
			setEditableContent('')
			prevDocumentKeyRef.current = documentKey;
			
			// If we have saved content for this document, load it
			if (savedContent) {
				setFullMarkdown(savedContent);
				setSections(parseMarkdownSections(savedContent));
			} else {
				// Reset to initial state for new documents
				setFullMarkdown(initialMarkdown);
				setSections(parseMarkdownSections(initialMarkdown));
			}
		}
	}, [projectName, documentName, documentKey, savedContent, initialMarkdown])

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

	const handleSaveSection = React.useCallback(() => {
		if (activeSection) {
			const updatedSections = sections.map((section) =>
				section.id === activeSection
					? { ...section, content: editableContent }
					: section,
			)
			setSections(updatedSections)

			// Regenerate the full markdown to keep it in sync
			const newMarkdown = combineMarkdownSections(updatedSections)
			setFullMarkdown(newMarkdown)
		}
	}, [activeSection, editableContent, sections])

	const handleImportPaste = () => {
		if (!pasteContent.trim()) return

		// Determine if the pasted content has markdown or if we need to create structure
		const hasHeadings = /^#{1,6}\s+.+$/m.test(pasteContent)
		const markdownContent = hasHeadings
			? pasteContent
			: createStructuredMarkdown(pasteContent)

		// Parse the content into sections
		const newSections = parseMarkdownSections(markdownContent)
		setSections(newSections)
		setFullMarkdown(markdownContent)

		// Reset state
		setPasteContent('')
		setIsImportDialogOpen(false)
		setActiveSection(null)
		setEditableContent('')
	}

	// Memoize to prevent unnecessary function recreation
	const handleViewSourceToggle = React.useCallback((fullView: boolean) => {
		if (fullView && activeSection && editableContent.trim()) {
			// Only save if there's an active section with content
			handleSaveSection() // Save current section changes first
		}
	}, [activeSection, editableContent, handleSaveSection])

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
				<div className="flex items-center gap-2">
					{documentType === 'text' && activeSection && (
						<Button
							size="sm"
							variant="outline"
							onClick={handleSaveSection}
							className="flex items-center gap-2"
						>
							<SaveIcon className="h-4 w-4" />
							Save Section
						</Button>
					)}
				</div>
			</div>

			{/* Text Document View */}
			{documentType === 'text' && (
				<div className="space-y-4">
					{/* Simple tab UI without Radix tabs */}
					<div className="flex space-x-2 border-b">
						<button
							onClick={() => {
								setViewMode('sections')
								handleViewSourceToggle(false)
							}}
							className={cn(
								'px-4 py-2 border-b-2 transition-colors',
								viewMode === 'sections'
									? 'border-primary text-primary font-medium'
									: 'border-transparent hover:border-gray-300',
							)}
						>
							Section Editor
						</button>
						<button
							onClick={() => {
								setViewMode('source')
								handleViewSourceToggle(true)
							}}
							className={cn(
								'px-4 py-2 border-b-2 transition-colors',
								viewMode === 'source'
									? 'border-primary text-primary font-medium'
									: 'border-transparent hover:border-gray-300',
							)}
						>
							Full Source
						</button>
					</div>

					{/* Section editor view */}
					{viewMode === 'sections' && (
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
												'w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-1',
												activeSection === section.id
													? 'bg-primary/10 text-primary font-medium'
													: 'hover:bg-muted',
											)}
										>
											<span className="whitespace-nowrap overflow-hidden text-ellipsis">
												{section.title}
											</span>
											<span className="text-xs text-muted-foreground ml-1">
												{`(h${section.level})`}
											</span>
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
											className="w-full h-[300px] p-3 border rounded-md focus:outline-none focus:ring-2 resize-none font-mono text-sm"
										/>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
										<FileText className="h-12 w-12 opacity-20" />
										<p>Select a section to edit</p>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Source view */}
					{viewMode === 'source' && (
						<div className="border rounded-lg p-4">
							<Textarea
								value={fullMarkdown}
								onChange={(e) => {
									setFullMarkdown(e.target.value)
									// When source is changed, update sections
									setSections(parseMarkdownSections(e.target.value))
								}}
								className="min-h-[400px] font-mono text-sm"
								placeholder="# Document Title..."
							/>
							<div className="mt-2 text-xs text-muted-foreground">
								<p>
									Edit the full markdown source. Changes will be applied when you
									switch back to section view.
								</p>
							</div>
						</div>
					)}
				</div>
			)}

			{/* Image Document View */}
			{documentType === 'image' && (
				<div className="border rounded-lg p-6 h-[500px] flex flex-col items-center justify-center gap-4">
					<Image className="h-20 w-20 opacity-20" />
					<h3 className="text-xl font-medium">Image Document Editor</h3>
					<p className="text-muted-foreground text-center max-w-lg">
						Use AI to generate, edit, and enhance images. Upload existing images or create new ones with detailed text prompts.
					</p>
					<div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-2xl">
						<Button variant="outline" className="h-20 flex flex-col gap-2 items-center justify-center">
							<PlusIcon className="h-6 w-6" />
							<span>Generate New Image</span>
						</Button>
						<Button variant="outline" className="h-20 flex flex-col gap-2 items-center justify-center">
							<FileIcon className="h-6 w-6" />
							<span>Upload Image</span>
						</Button>
					</div>
				</div>
			)}

			{/* Spreadsheet Document View */}
			{documentType === 'spreadsheet' && (
				<div className="border rounded-lg p-6 h-[500px] flex flex-col items-center justify-center gap-4">
					<Table className="h-20 w-20 opacity-20" />
					<h3 className="text-xl font-medium">Spreadsheet Editor</h3>
					<p className="text-muted-foreground text-center max-w-lg">
						Create and edit data in a structured format. Define tables, create formulas, and visualize data with charts.
					</p>
					<div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-2xl">
						<Button variant="outline" className="h-20 flex flex-col gap-2 items-center justify-center">
							<PlusIcon className="h-6 w-6" />
							<span>Create New Table</span>
						</Button>
						<Button variant="outline" className="h-20 flex flex-col gap-2 items-center justify-center">
							<FileIcon className="h-6 w-6" />
							<span>Import Data</span>
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}