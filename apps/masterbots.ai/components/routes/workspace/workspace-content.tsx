'use client'

import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { CheckIcon, EditIcon, PlusIcon, SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useWorkspace } from '@/lib/hooks/use-workspace'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'

interface WorkspaceSection {
	id: string
	type: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'code'
	content: string
	isEditing?: boolean
}

interface WorkspaceDocument {
	title: string
	sections: WorkspaceSection[]
}

interface DocumentTemplate {
	id: string
	name: string
	sections: WorkspaceSection[]
}

interface WorkspaceContentProps {
	projectName: string | null
	documentName: string | null
	className?: string
	isLoading?: boolean
	onSectionSelect?: (sectionId: string) => void
	onCreateDocument?: () => void
	onSelectTemplate?: (templateId: string) => void
}

// Document templates
const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
	{
		id: 'blank',
		name: 'Blank Document',
		sections: [
			{
				id: '1',
				type: 'h1',
				content: 'Untitled Document',
			},
			{
				id: '2',
				type: 'p',
				content: 'Start typing here...',
			},
		],
	},
	{
		id: 'report',
		name: 'Project Report',
		sections: [
			{
				id: '1',
				type: 'h1',
				content: 'Project Report',
			},
			{
				id: '2',
				type: 'h2',
				content: 'Executive Summary',
			},
			{
				id: '3',
				type: 'p',
				content:
					'This document provides an overview of the project, its objectives, and key findings.',
			},
			{
				id: '4',
				type: 'h2',
				content: 'Introduction',
			},
			{
				id: '5',
				type: 'p',
				content: 'Describe the background and context of the project here.',
			},
			{
				id: '6',
				type: 'h2',
				content: 'Methodology',
			},
			{
				id: '7',
				type: 'p',
				content:
					'Explain the approach, methods, and techniques used in the project.',
			},
			{
				id: '8',
				type: 'h2',
				content: 'Results',
			},
			{
				id: '9',
				type: 'p',
				content: 'Present the key findings and outcomes of the project.',
			},
			{
				id: '10',
				type: 'h2',
				content: 'Conclusion',
			},
			{
				id: '11',
				type: 'p',
				content: 'Summarize the main points and implications of the findings.',
			},
		],
	},
	{
		id: 'content',
		name: 'Content Plan',
		sections: [
			{
				id: '1',
				type: 'h1',
				content: 'Content Plan',
			},
			{
				id: '2',
				type: 'h2',
				content: 'Target Audience',
			},
			{
				id: '3',
				type: 'p',
				content: 'Define your target audience here.',
			},
			{
				id: '4',
				type: 'h2',
				content: 'Content Goals',
			},
			{
				id: '5',
				type: 'ul',
				content: '- Goal 1\n- Goal 2\n- Goal 3',
			},
			{
				id: '6',
				type: 'h2',
				content: 'Content Types',
			},
			{
				id: '7',
				type: 'p',
				content: 'List the types of content you plan to create.',
			},
			{
				id: '8',
				type: 'h2',
				content: 'Distribution Channels',
			},
			{
				id: '9',
				type: 'p',
				content: 'Specify where the content will be published and shared.',
			},
		],
	},
]

export function WorkspaceContent({
	projectName,
	documentName,
	className,
	isLoading = false,
	onSectionSelect,
	onCreateDocument,
	onSelectTemplate,
}: WorkspaceContentProps) {
	// Document state
	const [document, setDocument] = useState<WorkspaceDocument | null>(null)
	const [sections, setSections] = useState<WorkspaceSection[]>([])
	const [activeSection, setActiveSection] = useState<string | null>(null)
	const [editableContent, setEditableContent] = useState<string>('')
	const [showTemplates, setShowTemplates] = useState<boolean>(false)

	// Access workspace context for document data
	const { documentContent, setDocumentContent } = useWorkspace()

	// Initialize document when project/document changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: we don't need to re-run this effect on every render
	useEffect(() => {
		if (projectName && documentName) {
			// Check if we already have content for this document
			if (documentContent[documentName]) {
				// Use existing document content
				const existingDocument = documentContent[documentName]
				setSections(existingDocument.sections)
			} else if (!document) {
				// Create a new document with default template if it doesn't exist
				const newDocument: WorkspaceDocument = {
					title: documentName,
					sections: DOCUMENT_TEMPLATES[0].sections,
				}

				// Save to context
				setDocumentContent(documentName, newDocument)

				// Update local state
				setDocument(newDocument)
				setSections(newDocument.sections)
			}
		} else if (!projectName || !documentName) {
			setShowTemplates(true)
		}

		// Reset active section when document changes
		setActiveSection(null)
		setEditableContent('')
	}, [projectName, documentName, documentContent, setDocumentContent])

	const handleSectionClick = (sectionId: string) => {
		const section = sections.find((s) => s.id === sectionId)
		if (section) {
			setActiveSection(sectionId)
			setEditableContent(section.content)

			// Notify parent component if needed
			if (onSectionSelect) {
				onSectionSelect(sectionId)
			}

			// Mark section as being edited
			setSections((prevSections) =>
				prevSections.map((s) =>
					s.id === sectionId
						? { ...s, isEditing: true }
						: { ...s, isEditing: false },
				),
			)
		}
	}

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditableContent(e.target.value)
	}

	const handleSaveSection = () => {
		if (activeSection && documentName) {
			// Update local state
			const updatedSections = sections.map((section) =>
				section.id === activeSection
					? { ...section, content: editableContent, isEditing: false }
					: section,
			)

			setSections(updatedSections)

			// Update document in context
			if (documentContent[documentName]) {
				const updatedDocument = {
					...documentContent[documentName],
					sections: updatedSections,
				}
				setDocumentContent(documentName, updatedDocument)
			}

			setActiveSection(null)
		}
	}

	const handleAddSection = (type: WorkspaceSection['type']) => {
		const newSection: WorkspaceSection = {
			id: `section-${Date.now()}`,
			type,
			content:
				type === 'h1' || type === 'h2' || type === 'h3'
					? 'New Heading'
					: type === 'ul'
						? '- Item 1\n- Item 2\n- Item 3'
						: type === 'ol'
							? '1. Item 1\n2. Item 2\n3. Item 3'
							: type === 'code'
								? '```\ncode block\n```'
								: 'New paragraph',
		}

		// Update local state
		const updatedSections = [...sections, newSection]
		setSections(updatedSections)

		// Update document in context
		if (documentName && documentContent[documentName]) {
			const updatedDocument = {
				...documentContent[documentName],
				sections: updatedSections,
			}
			setDocumentContent(documentName, updatedDocument)
		}

		handleSectionClick(newSection.id)
	}

	const handleSelectTemplate = (templateId: string) => {
		const template = DOCUMENT_TEMPLATES.find((t) => t.id === templateId)
		if (template) {
			// Apply this template to local state
			setSections(template.sections)
			setShowTemplates(false)

			// Create a unique document ID if needed
			if (!documentName) {
				// This would typically be handled by the parent component
				// but we'll prepare the data here
				const newDocTitle = `${template.name}-${Date.now()}`

				// If document gets created, update context with template data
				const newDocument = {
					title: newDocTitle,
					sections: template.sections,
				}

				// Pass template details to parent handlers
				if (onSelectTemplate) {
					onSelectTemplate(templateId)
				}

				if (onCreateDocument) {
					onCreateDocument()

					// Once document is created and named, we can update it in context
					// Note: In a real implementation, this would happen after the document is created
					if (documentName) {
						setDocumentContent(documentName, newDocument)
					}
				}
			} else {
				// Update existing document
				const updatedDocument = {
					title: documentName,
					sections: template.sections,
				}
				setDocumentContent(documentName, updatedDocument)

				// Notify parent component
				if (onSelectTemplate) {
					onSelectTemplate(templateId)
				}
			}
		}
	}

	// Show template selection if no document is selected
	if (showTemplates || (!projectName && !documentName)) {
		return (
			<div className="flex flex-col space-y-6 p-8">
				<h2 className="text-2xl font-semibold text-center">
					Select a Template
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{DOCUMENT_TEMPLATES.map((template) => (
						<div
							key={template.id}
							className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
							onClick={() => handleSelectTemplate(template.id)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleSelectTemplate(template.id)
								}
							}}
							tabIndex={0}
							// biome-ignore lint/a11y/useSemanticElements: having the role here is fine
							role="button"
							aria-label={`Select ${template.name} template`}
						>
							<h3 className="font-medium mb-2">{template.name}</h3>
							<p className="text-sm text-muted-foreground">
								{template.sections.length} sections
							</p>
						</div>
					))}
				</div>
			</div>
		)
	}

	if (!projectName || !documentName) {
		return (
			<div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
				<p>Select a project and document to edit</p>
				<Button className="mt-4" onClick={() => setShowTemplates(true)}>
					Create New Document
				</Button>
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
				<div className="flex gap-2">
					{activeSection ? (
						<Button
							size="sm"
							variant="outline"
							onClick={handleSaveSection}
							className="flex items-center gap-2"
						>
							<SaveIcon className="h-4 w-4" />
							Save Changes
						</Button>
					) : (
						<div className="flex gap-2">
							<Button
								size="sm"
								variant="outline"
								onClick={() => handleAddSection('h2')}
								className="flex items-center gap-1"
							>
								<PlusIcon className="h-3 w-3" />
								Heading
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() => handleAddSection('p')}
								className="flex items-center gap-1"
							>
								<PlusIcon className="h-3 w-3" />
								Paragraph
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() => handleAddSection('ul')}
								className="flex items-center gap-1"
							>
								<PlusIcon className="h-3 w-3" />
								List
							</Button>
						</div>
					)}
				</div>
			</div>

			<div className="grid grid-cols-12 gap-4">
				{/* Section navigation */}
				<div className="col-span-3 border rounded-lg p-2 h-[400px] overflow-y-auto">
					<h3 className="font-medium mb-2 p-2">Document Sections</h3>
					<div className="space-y-1">
						{sections.map((section) => (
							<button
								type="button"
								key={section.id}
								onClick={() => handleSectionClick(section.id)}
								className={cn(
									'w-full text-left px-3 py-2 rounded-md text-sm flex justify-between items-center',
									section.isEditing
										? 'bg-primary/10 text-primary font-medium'
										: activeSection === section.id
											? 'bg-primary/10 text-primary font-medium'
											: 'hover:bg-muted',
								)}
							>
								<span className="truncate">
									{section.content.substring(0, 30)}
									{section.content.length > 30 ? '...' : ''}
								</span>
								{section.isEditing && <EditIcon className="h-3 w-3 ml-2" />}
							</button>
						))}
					</div>
				</div>

				{/* Content area */}
				<div className="col-span-9 border rounded-lg p-4 h-[400px] overflow-y-auto">
					{activeSection ? (
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<div className="text-xs text-muted-foreground">
									Editing{' '}
									{sections
										.find((s) => s.id === activeSection)
										?.type.toUpperCase()}{' '}
									section
								</div>
								<Button
									size="sm"
									variant="ghost"
									onClick={handleSaveSection}
									className="h-6 px-2"
								>
									<CheckIcon className="h-3 w-3 mr-1" />
									Done
								</Button>
							</div>
							<textarea
								value={editableContent}
								onChange={handleContentChange}
								className="w-full h-[300px] p-3 border rounded-md focus:outline-none focus:ring-2 resize-none"
								placeholder="Enter content here..."
								// biome-ignore lint/a11y/noAutofocus: <explanation>
								autoFocus
							/>
						</div>
					) : (
						<div className="space-y-6 p-2">
							{sections.map((section) => (
								<div
									// biome-ignore lint/a11y/useSemanticElements: role is enough for this scenario
									role="button"
									key={section.id}
									className="group relative hover:bg-muted/20 rounded-md p-2 cursor-pointer transition-colors"
									onClick={() => handleSectionClick(section.id)}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											handleSectionClick(section.id)
										}
									}}
									tabIndex={0}
									aria-label={`Edit ${section.type} section`}
								>
									{section.type === 'h1' && (
										<h1 className="text-3xl font-bold">{section.content}</h1>
									)}
									{section.type === 'h2' && (
										<h2 className="text-2xl font-semibold">
											{section.content}
										</h2>
									)}
									{section.type === 'h3' && (
										<h3 className="text-xl font-medium">{section.content}</h3>
									)}
									{section.type === 'p' && (
										<p className="text-base">{section.content}</p>
									)}
									{(section.type === 'ul' ||
										section.type === 'ol' ||
										section.type === 'code') && (
										<MemoizedReactMarkdown
											components={memoizedMarkdownComponents()}
										>
											{section.content}
										</MemoizedReactMarkdown>
									)}
									<Button
										size="sm"
										variant="ghost"
										className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
										onClick={(e) => {
											e.stopPropagation()
											handleSectionClick(section.id)
										}}
									>
										<EditIcon className="h-3 w-3" />
									</Button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
