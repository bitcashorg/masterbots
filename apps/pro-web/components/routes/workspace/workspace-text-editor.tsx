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

	// Local state to persist selection after blur (for chat prompt context)
	const [isSectionFocused, setIsSectionFocused] = React.useState(false)
	const [selectionRange, setSelectionRange] = React.useState<{
		start: number
		end: number
	} | null>(null)
	const overlayRef = React.useRef<HTMLDivElement>(null)

	// Build section tree for overview mode
	const sectionTree = React.useMemo(
		() => buildSectionTree(sections),
		[sections],
	)

	// Auto-focus section textarea when active section changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (!activeSection) return
		const el = sectionTextareaRef?.current
		if (!el) return
		// Focus the textarea
		el.focus()
		// Preserve user selection if any; otherwise set default caret at start
		const hasSelection = el.selectionStart !== el.selectionEnd
		if (!hasSelection) {
			el.setSelectionRange(0, 0)
			setCursorPosition(0)
			setGlobalCursorPosition(0)
		} else {
			// Sync current selection start to cursor positions
			const pos = el.selectionStart || 0
			setCursorPosition(pos)
			setGlobalCursorPosition(pos)
		}

		// Reset persisted selection when switching sections
		setSelectionRange(null)
	}, [activeSection, sectionTextareaRef])

	// Helpers to mirror selection highlight when blurred
	const clampRange = React.useCallback(
		(text: string, start: number, end: number) => {
			const s = Math.max(0, Math.min(start ?? 0, text.length))
			const e = Math.max(s, Math.min(end ?? s, text.length))
			return { s, e }
		},
		[],
	)

	const renderOverlayContent = React.useCallback(() => {
		const text = editableContent || ''
		const hasPersisted = !!selectionRange
		if (!hasPersisted) return null
		const { s, e } = clampRange(
			text,
			selectionRange!.start,
			selectionRange!.end,
		)
		const before = text.slice(0, s)
		const selected = text.slice(s, e)
		const after = text.slice(e)
		const hasSelection = s !== e
		return (
			<span className="whitespace-pre-wrap">
				{before}
				{hasSelection ? (
					<span className="bg-accent text-accent-foreground rounded-[2px] py-[2.5px] px-0.5">
						{selected}
					</span>
				) : (
					// Caret indicator at cursor position when no selection
					<span
						className="inline-block align-text-bottom animate-pulse"
						style={{
							display: 'inline-block',
							width: 1,
							height: '1em',
							background: 'hsl(var(--accent))',
						}}
					/>
				)}
				{after}
			</span>
		)
	}, [editableContent, selectionRange, clampRange])

	const overlayActive = !isSectionFocused && !!selectionRange

	return (
		<div className="space-y-4 h-full">
			{/* Section editor view with enhanced tree UI */}
			{viewMode === 'sections' && (
				<div className="h-[calc(100%-64px)] grid grid-cols-12 gap-4">
					{/* Enhanced section navigation with tree structure */}
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
					<div className="col-span-8 border rounded-lg p-4 h-full overflow-y-auto">
						{activeSection ? (
							<div className="space-y-4 h-[calc(100%-64px)]">
								<h3 className="font-semibold">
									{sections.find((s) => s.id === activeSection)?.title}
								</h3>
								<div className="relative size-full">
									{/* Overlay to persist selection highlight when textarea is blurred */}
									<div
										ref={overlayRef}
										aria-hidden
										className={cn(
											'absolute inset-0 p-3 font-mono text-sm whitespace-pre-wrap pointer-events-none rounded-md',
											overlayActive ? '' : 'hidden',
										)}
									>
										{renderOverlayContent()}
									</div>

									<textarea
										ref={sectionTextareaRef}
										value={editableContent}
										onChange={handleContentChange}
										onFocus={(e) => {
											setIsSectionFocused(true)
											handleCursorPositionChange(e)
										}}
										onBlur={(e) => {
											const el = e.target as HTMLTextAreaElement
											const start = el.selectionStart || 0
											const end = el.selectionEnd || start
											setSelectionRange({ start, end })
											setIsSectionFocused(false)
											// Persist cursor position globally as selection start
											setCursorPosition(start)
											setGlobalCursorPosition(start)
										}}
										onClick={handleCursorPositionChange}
										onKeyUp={(e) => {
											const position =
												(e.target as HTMLTextAreaElement).selectionStart || 0
											setCursorPosition(position)
											setGlobalCursorPosition(position)
										}}
										onScroll={(e) => {
											const target = e.target as HTMLTextAreaElement
											if (overlayRef.current) {
												overlayRef.current.scrollTop = target.scrollTop
												overlayRef.current.scrollLeft = target.scrollLeft
											}
										}}
										className={cn(
											'size-full p-3 border rounded-md focus:outline-none focus:ring-2 resize-none font-mono text-sm selection:bg-accent selection:text-accent-foreground',
											overlayActive &&
												'text-transparent caret-transparent selection:bg-transparent',
										)}
									/>
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
						className="min-h-[400px] h-[94%] font-mono text-sm selection:bg-accent selection:text-accent-foreground"
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
