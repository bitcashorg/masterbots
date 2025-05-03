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
import { Clipboard, FileText, PlusIcon, SaveIcon } from 'lucide-react'
import * as React from 'react'

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
	}

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

	const handleViewSourceToggle = (fullView: boolean) => {
		if (fullView) {
			// When switching to full source view, update the markdown
			if (activeSection) {
				handleSaveSection() // Save current section changes first
			}
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
				<div className="flex items-center gap-2">
					{activeSection && (
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
					<Dialog
						open={isImportDialogOpen}
						onOpenChange={setIsImportDialogOpen}
					>
						<DialogTrigger asChild>
							<Button
								size="sm"
								variant="outline"
								className="flex items-center gap-2"
							>
								<Clipboard className="h-4 w-4" />
								Import Text
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Import Text</DialogTitle>
							</DialogHeader>
							<div className="py-4">
								<p className="text-sm text-muted-foreground mb-4">
									Paste your text or markdown. The system will automatically
									identify and structure sections based on markdown headings. If
									no headings are detected, it will intelligently create
									sections from paragraphs.
								</p>
								<Textarea
									value={pasteContent}
									onChange={(e) => setPasteContent(e.target.value)}
									placeholder="Paste your text or markdown here..."
									className="min-h-[300px]"
								/>
							</div>
							<DialogFooter>
								<Button
									onClick={handleImportPaste}
									disabled={!pasteContent.trim()}
								>
									Import Document
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

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
		</div>
	)
}
