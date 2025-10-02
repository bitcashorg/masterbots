'use client'

import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { useWorkspaceChat } from '@/lib/hooks/use-workspace-chat'
import {
	type MarkdownSection,
	combineMarkdownSections,
	parseMarkdownSections,
} from '@/lib/markdown-utils'
import { memoizedMarkdownComponents } from '@/lib/memoized-markdown-components'
import { buildSectionTree } from '@/lib/section-tree-utils'
import { cn } from '@/lib/utils'
import { FileText, TextCursorInputIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
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
	const { setDocumentContent, activeProject, activeDocument } = useWorkspace()
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
		// Only update sourceValue if user is not typing and content changed externally
		if (fullMarkdown !== sourceValue && !isUserTypingInSource.current) {
			setSourceValue(fullMarkdown)
		}
	}, [fullMarkdown, sourceValue])

	// Track if user is actively typing in source mode to avoid disrupting their work
	const isUserTypingInSource = useRef(false)
	const sourceTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	// Track previous active section to avoid refocus loops while typing
	const prevActiveSectionRef = useRef<string | null>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!activeSection) return
		if (prevActiveSectionRef.current === activeSection) return // only run when activeSection actually changes
		prevActiveSectionRef.current = activeSection

		requestAnimationFrame(() => {
			const el = sectionTextareaRef.current
			if (!el) return
			el.focus()
			// Restore selection only once on switch
			if (persistedSelection) {
				const start = Math.min(persistedSelection.start, editableContent.length)
				const end = Math.min(persistedSelection.end, editableContent.length)
				if (start !== end || start > 0) {
					el.setSelectionRange(start, end)
					setGlobalSelectionRange({ start, end })
				}
			}
		})
	}, [
		activeSection,
		editableContent,
		persistedSelection,
		setGlobalSelectionRange,
	]) // intentionally omitting sectionTextareaRef.current
	// Note: sectionTextareaRef is intentionally stable

	// Function to calculate absolute position in full document
	const calculateAbsolutePosition = useCallback(() => {
		if (!activeSection || !persistedSelection) return 0

		const activeSectionData = sections.find((s) => s.id === activeSection)
		if (!activeSectionData) return 0

		// Find the section's start position in the full markdown
		const sectionStartIndex = fullMarkdown.indexOf(activeSectionData.title)
		if (sectionStartIndex === -1) return 0

		// Find where the section body starts (after the title line)
		const titleEndIndex = fullMarkdown.indexOf('\n', sectionStartIndex)
		const sectionBodyStart =
			titleEndIndex !== -1 ? titleEndIndex + 1 : sectionStartIndex

		// Add the selection offset within the section
		const selectionOffset = persistedSelection.start || 0

		return sectionBodyStart + selectionOffset
	}, [activeSection, persistedSelection, sections, fullMarkdown])

	// One-shot auto-scroll per active section in source view
	const autoScrolledSectionRef = useRef<string | null>(null)
	const lastSelectionStartRef = useRef<number>(0)
	// Cached character metrics for soft-wrap estimation
	const charWidthRef = useRef<number | null>(null)
	const measureCharWidth = useCallback(
		(textarea: HTMLTextAreaElement, styles: CSSStyleDeclaration) => {
			if (charWidthRef.current) return charWidthRef.current
			try {
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				if (ctx) {
					ctx.font = `${styles.fontSize} ${styles.fontFamily}`
					charWidthRef.current = ctx.measureText('M').width || 8
					return charWidthRef.current
				}
			} catch {}
			charWidthRef.current = 8
			return charWidthRef.current
		},
		[],
	)
	const countDisplayLines = useCallback(
		(
			textarea: HTMLTextAreaElement,
			styles: CSSStyleDeclaration,
			text: string,
		) => {
			const paddingLeft = Number.parseInt(styles.paddingLeft) || 0
			const paddingRight = Number.parseInt(styles.paddingRight) || 0
			const innerWidth = Math.max(
				1,
				textarea.clientWidth - paddingLeft - paddingRight,
			)
			const charWidth = measureCharWidth(textarea, styles)
			const charsPerLine = Math.max(1, Math.floor(innerWidth / charWidth))
			let lines = 0
			for (const segment of text.split('\n')) {
				lines += Math.max(1, Math.ceil(segment.length / charsPerLine))
			}
			return lines
		},
		[measureCharWidth],
	)
	// Transient highlight for active section heading in source view
	const [showSourceHighlight, setShowSourceHighlight] = useState(false)
	const sourceHighlightRef = useRef<HTMLDivElement | null>(null)
	const sourceHighlightMetricsRef = useRef<{
		lineStart: number
		lineCount: number
		lineHeight: number
		paddingTop: number
	}>({ lineStart: 0, lineCount: 1, lineHeight: 20, paddingTop: 0 })

	// Auto-scroll effect (wrap-aware)
	useEffect(() => {
		if (viewMode !== 'source' || isPreview || !activeSection) return
		if (autoScrolledSectionRef.current === activeSection) return
		const textarea = sourceTextareaRef.current
		if (!textarea) return
		autoScrolledSectionRef.current = activeSection

		requestAnimationFrame(() => {
			const activeSectionData = sections.find((s) => s.id === activeSection)
			if (!activeSectionData) return
			const titleIdx = fullMarkdown.indexOf(activeSectionData.title)
			if (titleIdx === -1) return
			const titleEndIdx = fullMarkdown.indexOf('\n', titleIdx)
			const bodyStart = titleEndIdx === -1 ? titleIdx : titleEndIdx + 1
			const selOffset = lastSelectionStartRef.current || 0
			const absolutePosition = Math.min(
				bodyStart + selOffset,
				textarea.value.length,
			)
			const styles = window.getComputedStyle(textarea)
			const lineHeight = Number.parseInt(styles.lineHeight) || 20
			const paddingTop = Number.parseInt(styles.paddingTop) || 0
			const contentBeforeHeading = fullMarkdown.slice(0, titleIdx)
			const headingDisplayLineIndex =
				countDisplayLines(textarea, styles, contentBeforeHeading) - 1
			const contentBeforeCursor = textarea.value.slice(0, absolutePosition)
			const cursorDisplayLineIndex =
				countDisplayLines(textarea, styles, contentBeforeCursor) - 1
			const targetScrollTop = Math.max(
				0,
				cursorDisplayLineIndex * lineHeight -
					textarea.clientHeight / 1.8 +
					paddingTop,
			)

			// Set cursor first, then scroll after a brief delay
			textarea.focus()
			textarea.setSelectionRange(absolutePosition, absolutePosition)

			// Force scroll with multiple fallbacks
			const doScroll = () => {
				// console.log(
				// 	'🔄 Attempting scroll to:',
				// 	targetScrollTop,
				// 	'current:',
				// 	textarea.scrollTop,
				// )

				// Try smooth scroll first
				try {
					textarea.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
				} catch {
					// Fallback to instant scroll
					textarea.scrollTop = targetScrollTop
				}

				// Verify scroll happened after a delay
				setTimeout(() => {
					// console.log(
					// 	'📊 Post-scroll position:',
					// 	textarea.scrollTop,
					// 	'target was:',
					// 	targetScrollTop,
					// )
					// If smooth scroll failed, force instant scroll
					if (Math.abs(textarea.scrollTop - targetScrollTop) > 50) {
						// console.log('🔧 Smooth scroll failed, forcing instant scroll')
						textarea.scrollTop = targetScrollTop
					}
				}, 100)
			}

			// Try immediate scroll
			doScroll()

			// Also try after a small delay in case there are render conflicts
			setTimeout(doScroll, 50)
			sourceHighlightMetricsRef.current = {
				lineStart: Math.max(0, headingDisplayLineIndex),
				lineCount: 1,
				lineHeight,
				paddingTop,
			}
			setShowSourceHighlight(true)
			const updateHighlightPos = () => {
				const el = sourceHighlightRef.current
				if (!el) return
				const {
					lineStart,
					lineHeight: lh,
					paddingTop: pt,
				} = sourceHighlightMetricsRef.current
				el.style.top = `${pt + lineStart * lh - textarea.scrollTop}px`
				el.style.height = `${lh}px`
			}
			updateHighlightPos()
			const onScroll = () => updateHighlightPos()
			textarea.addEventListener('scroll', onScroll)
			setTimeout(() => textarea.removeEventListener('scroll', onScroll), 1700)
			setTimeout(() => setShowSourceHighlight(false), 1600)
			setGlobalSelectionRange({
				start: absolutePosition,
				end: absolutePosition,
			})
			console.log('📍 Source auto-scroll (wrap-aware)', {
				activeSection,
				absolutePosition,
				cursorDisplayLineIndex,
				headingDisplayLineIndex,
				targetScrollTop,
			})
		})
	}, [
		viewMode,
		isPreview,
		activeSection,
		sections,
		fullMarkdown,
		sourceTextareaRef,
		setGlobalSelectionRange,
		countDisplayLines,
	])

	// Reset marker when leaving source view so returning later re-scrolls
	useEffect(() => {
		if (viewMode !== 'source') autoScrolledSectionRef.current = null
	}, [viewMode])

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleSectionDelete = useCallback(
		async (sectionTitle: string) => {
			if (!activeProject) return
			if (
				!confirm(
					`Are you sure you want to delete the section "${sectionTitle}"? This action cannot be undone.`,
				)
			) {
				return
			}

			// Find the section to delete
			const sectionToDelete = sections.find((s) => s.title === sectionTitle)
			if (!sectionToDelete) {
				alert(`Section "${sectionTitle}" not found.`)
				return
			}

			// Remove the section from local state
			const updatedSections = sections.filter(
				(s) => s.id !== sectionToDelete.id,
			)
			setSections(updatedSections)

			// Update the full markdown content
			const newMarkdown = combineMarkdownSections(updatedSections)
			setDocumentContent(activeProject, activeDocument as string, newMarkdown)

			// Clear active section if it was the deleted one
			if (activeSection === sectionToDelete.id) {
				setActiveSection(null)
			}

			// Ideally, also send a request to backend to delete the section from persistent storage
			// await api.deleteSection(activeProject.id, sectionToDelete.id)

			toast.success(`Section "${sectionTitle}" has been deleted.`)
		},
		[
			activeProject,
			sections,
			setSections,
			setDocumentContent,
			activeSection,
			setActiveSection,
		],
	)

	return (
		<div className="space-y-4 h-full max-h-[calc(100%-60px)]">
			{/* Section editor view with tree UI */}
			{viewMode === 'sections' && (
				<div className="size-full h-full inline-flex gap-4">
					{/* section navigation with tree structure */}
					<div className="w-4/12 h-full gap-2 content-start border rounded-lg">
						<h1 className="font-medium mb-2 px-4 py-2 text-xl">
							Document Sections
						</h1>
						<WorkspaceSectionTree
							tree={sectionTree}
							activeSection={activeSection}
							onSectionClick={handleSectionClick}
							onExpandSection={handleExpandSection}
							onRewriteSection={handleRewriteSection}
							onRenameSection={handleSectionUpdate}
							onDeleteSection={handleSectionDelete}
						/>
					</div>

					{/* Content area */}
					<div
						className={cn(
							'flex flex-col items-center w-8/12 border rounded-lg p-4 h-full',
						)}
					>
						{activeSection ? (
							<div className="flex flex-col gap-4 w-full h-full">
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
											className="flex flex-col gap-2.5 py-4 h-[calc(100%-62px)] flex flex-col w-full border-t px-4 overflow-y-auto scrollbar"
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
												rows={10}
												className={cn(
													'size-full min-h-full p-3 border rounded-md focus:outline-none focus:ring-2 scrollbar resize-y font-mono text-sm selection:bg-accent selection:text-accent-foreground',
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
							'flex flex-col space-y-4 size-full border rounded-lg p-4',
							isLoading ? 'opacity-50 pointer-events-none' : '',
						)}
					>
						<div className="flex items-center space-y-4 px-4 justify-end w-full">
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
								className="flex flex-col gap-2.5 size-full py-10 flex flex-col w-full border-t px-4 h-full overflow-y-auto scrollbar"
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
										// Track cursor position
										const position = e.target.selectionStart || 0
										const end = e.target.selectionEnd || position
										setGlobalSelectionRange({ start: position, end })
										// Save changes with debounce (sections will be parsed when switching views)
										debouncedSaveFullSource(newValue)
										// Mark that user is typing to prevent external updates
										isUserTypingInSource.current = true
										if (sourceTypingTimeoutRef.current) {
											clearTimeout(sourceTypingTimeoutRef.current)
										}
										sourceTypingTimeoutRef.current = setTimeout(() => {
											isUserTypingInSource.current = false
										}, 1000)
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
