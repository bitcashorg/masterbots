'use client'

import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useWorkspaceChat } from '@/lib/hooks/use-workspace-chat'
import {
	type MarkdownSection,
	parseMarkdownSections,
} from '@/lib/markdown-utils'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { buildSectionTree } from '@/lib/section-tree-utils'
import { cn } from '@/lib/utils'
import { FileText, TextCursorInputIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { WorkspaceSectionTree } from './workspace-section-tree'

interface WorkspaceTextEditorProps {
	sections: MarkdownSection[]
	setSections: React.Dispatch<React.SetStateAction<MarkdownSection[]>>
	activeSection: string | null
	setActiveSection: React.Dispatch<React.SetStateAction<string | null>>
	editableContent: string
	setEditableContent: React.Dispatch<React.SetStateAction<string>>
	fullMarkdown: string
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
	debouncedSaveFullSource: (content: string) => void
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
	fullMarkdown,
	viewMode,
	sectionTextareaRef,
	sourceTextareaRef,
	handleContentChange,
	handleCursorPositionChange,
	handleSectionClick,
	markUserTyping,
	debouncedSaveFullSource,
	handleExpandSection,
	handleRewriteSection,
	handleSectionUpdate,
}: WorkspaceTextEditorProps) {
	const { setDocumentContent, activeProject } = useWorkspace()
	const {
		setSelectionRange: setGlobalSelectionRange,
		selectionRange: persistedSelection,
		isLoading,
	} = useWorkspaceChat()

	// Overlay state for persistent selection visualization
	const [isFocused, setIsFocused] = useState(false)
	const [isPreview, setIsPreview] = useState(false)
	// Build section tree for overview mode
	const sectionTree = useMemo(() => buildSectionTree(sections), [sections])

	// Local source state for responsive typing; sync from prop on external updates
	const [sourceValue, setSourceValue] = useState(fullMarkdown)

	useEffect(() => {
		if (sourceValue !== fullMarkdown) setSourceValue(fullMarkdown)
	}, [fullMarkdown, sourceValue])

	// Auto-focus section textarea when active section changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log('🔄 Section effect triggered:', { activeSection })
		if (!activeSection) return
		const el = sectionTextareaRef?.current
		if (!el) return
		// Focus the textarea and set cursor at start
		el.focus()
		el.setSelectionRange(0, 0)
		setGlobalSelectionRange({ start: 0, end: 0 })
	}, [activeSection, setGlobalSelectionRange])

	// Simplified overlay renderer for persisted selection
	const renderSelectionOverlay = useCallback(() => {
		if (isFocused || !persistedSelection || isLoading) return null

		const text = editableContent || ''
		const { start, end } = persistedSelection

		// Only show overlay for actual selections (start ≠ end)
		if (start === end) return null

		const before = text.slice(0, start)
		const selected = text.slice(start, end)
		const after = text.slice(end)

		return (
			<div className="absolute inset-0 border text-sm border-transparent font-mono whitespace-pre-wrap pointer-events-none z-10 p-3">
				{before}
				<span className="bg-accent text-accent-foreground rounded-[2px] py-[2.5px] px-0.5">
					{selected}
				</span>
				{after}
			</div>
		)
	}, [isFocused, persistedSelection, editableContent, isLoading])

	return (
		<div className="space-y-4 h-full max-h-max">
			{/* Section editor view with tree UI */}
			{viewMode === 'sections' && (
				<div className="h-full max-h-[calc(100%-60px)] grid grid-cols-12 gap-4 overflow-hidden">
					{/* section navigation with tree structure */}
					<div className="col-span-4 border rounded-lg p-2 h-full overflow-y-auto scrollbar relative">
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
					<div
						className={cn(
							'col-span-8 border rounded-lg p-4 h-full',
							isPreview ? 'overflow-y-auto scrollbar' : '',
						)}
					>
						{activeSection ? (
							<div className="flex flex-col space-y-4 size-full">
								<div className="flex items-center gap-4 justify-between w-full">
									<h3 className="font-semibold">
										{sections.find((s) => s.id === activeSection)?.title}
									</h3>
									<Button
										variant="ghost"
										onClick={() => setIsPreview((prev) => !prev)}
									>
										{isPreview ? (
											<>
												<TextCursorInputIcon className="size-4" />
												edit
											</>
										) : (
											<>
												<FileText className="size-4" />
												preview
											</>
										)}
									</Button>
								</div>
								<div className="relative size-full">
									{isPreview ? (
										<MemoizedReactMarkdown
											className="flex flex-col gap-1 size-full"
											components={memoizedMarkdownComponents()}
										>
											{editableContent}
										</MemoizedReactMarkdown>
									) : (
										<>
											{/* Simplified selection overlay */}
											{renderSelectionOverlay()}

											<Textarea
												ref={sectionTextareaRef}
												value={editableContent}
												onChange={handleContentChange}
												onFocus={(e) => {
													setIsFocused(true)
													handleCursorPositionChange(e)
												}}
												onBlur={(e) => {
													setIsFocused(false)
													const el = e.target as HTMLTextAreaElement
													const start = el.selectionStart || 0
													const end = el.selectionEnd || start
													// Update global selection range
													setGlobalSelectionRange({ start, end })
												}}
												onClick={handleCursorPositionChange}
												onKeyUp={(e) => {
													const position =
														(e.target as HTMLTextAreaElement).selectionStart ||
														0
													const end =
														(e.target as HTMLTextAreaElement).selectionEnd ||
														position
													setGlobalSelectionRange({ start: position, end })
												}}
												className={cn(
													'size-full p-3 border rounded-md focus:outline-none focus:ring-2 scrollbar resize-none font-mono text-sm selection:bg-accent selection:text-accent-foreground',
													!isFocused &&
														persistedSelection &&
														persistedSelection.start !==
															persistedSelection.end &&
														'text-transparent caret-transparent',
												)}
												disabled={isLoading}
											/>
										</>
									)}
								</div>
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
				<>
					<div
						className={cn(
							'flex flex-col gap-4 border rounded-lg p-4',
							isLoading ? 'opacity-50 pointer-events-none' : '',
							isPreview ? 'h-auto' : 'h-[calc(100%-64px)]',
						)}
					>
						<div className="flex items-center gap-4 justify-end w-full">
							<Button
								variant="ghost"
								onClick={() => setIsPreview((prev) => !prev)}
							>
								{isPreview ? (
									<>
										<TextCursorInputIcon className="size-4" />
										edit
									</>
								) : (
									<>
										<FileText className="size-4" />
										preview
									</>
								)}
							</Button>
						</div>
						{isPreview ? (
							<MemoizedReactMarkdown
								className="flex flex-col gap-1 size-full pb-10"
								components={memoizedMarkdownComponents()}
							>
								{fullMarkdown}
							</MemoizedReactMarkdown>
						) : (
							<>
								<Textarea
									ref={sourceTextareaRef}
									value={sourceValue}
									onChange={(e) => {
										markUserTyping()
										const newValue = e.target.value
										setSourceValue(newValue)
										// When source is changed, update sections
										setSections(parseMarkdownSections(newValue))
										// Track cursor position
										const position = e.target.selectionStart || 0
										const end = e.target.selectionEnd || position
										setGlobalSelectionRange({ start: position, end })
										// Save changes with debounce
										debouncedSaveFullSource(newValue)
									}}
									onFocus={handleCursorPositionChange}
									onClick={handleCursorPositionChange}
									onKeyUp={(e) => {
										const position =
											(e.target as HTMLTextAreaElement).selectionStart || 0
										const end =
											(e.target as HTMLTextAreaElement).selectionEnd || position
										setGlobalSelectionRange({ start: position, end })
									}}
									className="min-h-[400px] h-[94%] font-mono text-sm selection:bg-accent selection:text-accent-foreground scrollbar resize-none"
									placeholder="# Document Title..."
								/>
								<div className="mt-2 text-xs text-muted-foreground">
									<p>
										Edit the full markdown source. Changes will be applied when
										you switch back to section view.
									</p>
								</div>
							</>
						)}
					</div>
					{isPreview && <br />}
				</>
			)}
		</div>
	)
}
