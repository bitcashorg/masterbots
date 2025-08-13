'use client'

import { Textarea } from '@/components/ui/textarea'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useWorkspaceChat } from '@/lib/hooks/use-workspace-chat'
import {
	type MarkdownSection,
	combineMarkdownSections,
	parseMarkdownSections,
} from '@/lib/markdown-utils'
import { buildSectionTree } from '@/lib/section-tree-utils'
import { cn } from '@/lib/utils'
import { FileText } from 'lucide-react'
import * as React from 'react'
import { WorkspaceSectionTree } from './workspace-section-tree'

interface WorkspaceTextEditorProps {
	sections: MarkdownSection[]
	setSections: React.Dispatch<React.SetStateAction<MarkdownSection[]>>
	activeSection: string | null
	setActiveSection: React.Dispatch<React.SetStateAction<string | null>>
	editableContent: string
	setEditableContent: React.Dispatch<React.SetStateAction<string>>
	fullMarkdown: string
	setFullMarkdown: React.Dispatch<React.SetStateAction<string>>
	viewMode: 'sections' | 'source'
	sectionTextareaRef: React.RefObject<HTMLTextAreaElement | null>
	sourceTextareaRef: React.RefObject<HTMLTextAreaElement | null>
	handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	handleCursorPositionChange: (
		e:
			| React.FocusEvent<HTMLTextAreaElement>
			| React.MouseEvent<HTMLTextAreaElement>,
	) => void
	handleSectionClick: (sectionId: string) => void
	markUserTyping: () => void
	setCursorPosition: React.Dispatch<React.SetStateAction<number>>
	debouncedSaveFullSource: () => (content: string) => void
	handleExpandSection: (sectionTitle: string) => Promise<void>
	handleRewriteSection: (sectionTitle: string) => Promise<void>
	handleSectionUpdate: (sectionId: string, newTitle: string) => void
}

export function WorkspaceTextEditor({
	sections,
	setSections,
	activeSection,
	setActiveSection,
	editableContent,
	setEditableContent,
	fullMarkdown,
	setFullMarkdown,
	viewMode,
	sectionTextareaRef,
	sourceTextareaRef,
	handleContentChange,
	handleCursorPositionChange,
	handleSectionClick,
	markUserTyping,
	setCursorPosition,
	debouncedSaveFullSource,
	handleExpandSection,
	handleRewriteSection,
	handleSectionUpdate,
}: WorkspaceTextEditorProps) {
	const { setDocumentContent, activeProject, activeDocument } = useWorkspace()
	const { setCursorPosition: setGlobalCursorPosition } = useWorkspaceChat()

	// Build section tree for overview mode
	const sectionTree = React.useMemo(
		() => buildSectionTree(sections),
		[sections],
	)

	return (
		<div className="space-y-4 h-full">
			{/* Section editor view with enhanced tree UI */}
			{viewMode === 'sections' && (
				<div className="h-[calc(100%-64px)] grid grid-cols-12 gap-4">
					{/* Enhanced section navigation with tree structure */}
					<div className="col-span-4 border rounded-lg p-2 h-full overflow-y-auto">
						<h3 className="font-medium mb-2 p-2">Document Sections</h3>
						<div className="space-y-1">
							<WorkspaceSectionTree
								tree={sectionTree}
								activeSection={activeSection}
								onSectionClick={handleSectionClick}
								onExpandSection={handleExpandSection}
								onRewriteSection={handleRewriteSection}
								onRenameSection={handleSectionUpdate}
							/>
						</div>
					</div>

					{/* Content area */}
					<div className="col-span-8 border rounded-lg p-4 h-full overflow-y-auto">
						{activeSection ? (
							<div className="space-y-4 h-[calc(100%-64px)]">
								<h3 className="font-semibold">
									{sections.find((s) => s.id === activeSection)?.title}
								</h3>
								<textarea
									ref={sectionTextareaRef}
									value={editableContent}
									onChange={handleContentChange}
									onFocus={handleCursorPositionChange}
									onClick={handleCursorPositionChange}
									onKeyUp={(e) => {
										const position =
											(e.target as HTMLTextAreaElement).selectionStart || 0
										setCursorPosition(position)
										setGlobalCursorPosition(position)
									}}
									className="size-full p-3 border rounded-md focus:outline-none focus:ring-2 resize-none font-mono text-sm"
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
				<div className="h-[calc(100%-64px)] border rounded-lg p-4">
					<Textarea
						ref={sourceTextareaRef}
						value={fullMarkdown}
						onChange={(e) => {
							markUserTyping()
							const newValue = e.target.value
							setFullMarkdown(newValue)
							// When source is changed, update sections
							setSections(parseMarkdownSections(newValue))
							// Track cursor position
							const position = e.target.selectionStart || 0
							setCursorPosition(position)
							setGlobalCursorPosition(position)
							// Save changes with debounce
							debouncedSaveFullSource()(newValue)
						}}
						onFocus={handleCursorPositionChange}
						onClick={handleCursorPositionChange}
						onKeyUp={(e) => {
							const position =
								(e.target as HTMLTextAreaElement).selectionStart || 0
							setCursorPosition(position)
							setGlobalCursorPosition(position)
						}}
						className="min-h-[400px] h-[94%] font-mono text-sm"
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
	)
}
