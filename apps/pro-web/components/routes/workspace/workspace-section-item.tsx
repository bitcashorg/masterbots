'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useWorkspaceChat } from '@/lib/hooks/use-workspace-chat'
import type { MarkdownSection } from '@/lib/markdown-utils'
import { cn } from '@/lib/utils'
import {
	CheckIcon,
	ChevronDown,
	Edit3Icon,
	PlusIcon,
	RotateCcwIcon,
	Trash2Icon,
	XIcon,
} from 'lucide-react'
import React, { useState } from 'react'

interface WorkspaceSectionItemProps {
	section: MarkdownSection
	isActive: boolean
	onSectionClick: (sectionId: string) => void
	onExpandSection: (sectionTitle: string) => void
	onRewriteSection: (sectionTitle: string) => void
	onDeleteSection: (sectionTitle: string) => void
	onRenameSection: (sectionId: string, newTitle: string) => void
	level: number
	children?: React.ReactNode
}

export function WorkspaceSectionItem({
	section,
	isActive,
	onSectionClick,
	onExpandSection,
	onRewriteSection,
	onRenameSection,
	onDeleteSection,
	level,
	children,
}: WorkspaceSectionItemProps) {
	const { setInput, workspaceProcessingState, isLoading } = useWorkspaceChat()
	const [isHovered, setIsHovered] = useState(false)

	// Calculate indentation based on section level (h2=0, h3=1, h4=2)
	const indentLevel = Math.max(0, section.level - 2)
	const indentPx = indentLevel * 16 // 16px per level

	const handleSectionClick = () => {
		onSectionClick(section.id)
	}

	const handleExpandClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		onExpandSection(section.title)
	}

	const handleRewriteClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		onRewriteSection(section.title)
	}

	const handleEditClick = (e: React.MouseEvent) => {
		e.stopPropagation()

		// Focus the chat textarea using the same pattern as chat-panel-pro.tsx
		setTimeout(() => {
			// Look for the prompt form textarea by its ID pattern
			const textarea = document.querySelector(
				'[id^=prompt-textarea-]',
			) as HTMLTextAreaElement
			if (textarea) {
				textarea.focus()
				const currentValue = textarea.value
				const editPrompt = `Edit the "${section.title}" section to `

				if (!currentValue.includes(editPrompt) && setInput) {
					console.log('ℹ️ changing prompt to [editPrompt]: ', editPrompt)
					setInput(editPrompt)
				}
			}
		}, 0)
	}

	const hasChildren = children && React.Children.count(children) > 0

	if (!hasChildren) {
		// Non-collapsible item (no children)
		return (
			<button
				type="button"
				className={cn(
					'min-w-full group flex items-center gap-1 text-left ml-3 px-1.5 py-2 rounded-md text-sm transition-colors cursor-pointer',
					isActive
						? 'bg-primary/10 text-primary font-medium'
						: 'hover:bg-muted',
					'border-l-2 rounded-l-sm',
					isActive ? 'border-primary' : 'border-transparent',
				)}
				style={{ marginLeft: `${indentPx}px` }}
				onClick={handleSectionClick}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault()
						handleSectionClick()
					}
				}}
				aria-pressed={isActive}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{/* Side Action buttons (show on hover or when editing) */}
				<div
					className={cn(
						'flex items-center transition-opacity duration-200',
						isHovered ? 'opacity-100' : 'opacity-0',
					)}
				>
					<Button
						variant="ghost"
						size="sm"
						className="absolute left-1 size-6 p-0 text-destructive-foreground/70 hover:text-destructive-foreground hover:bg-destructive"
						onClick={(e) => {
							e.stopPropagation()
							onDeleteSection(section.title)
						}}
						title={`Delete ${section.title} section`}
						disabled={isLoading || workspaceProcessingState !== 'idle'}
					>
						<XIcon className="size-3" />
					</Button>
				</div>

				{/* Section title (editable or display) */}
				<div className="w-full flex items-center text-left gap-2 whitespace-nowrap">
					{section.title}
				</div>

				{/* Action buttons (show on hover or when editing) */}
				<div
					className={cn(
						'sticky right-1 flex items-center gap-1 transition-opacity duration-200',
						isHovered ? 'opacity-100' : 'opacity-0',
					)}
				>
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 p-0 hover:bg-blue-100 hover:text-blue-600"
						onClick={handleExpandClick}
						title={`Expand ${section.title} section`}
						disabled={isLoading || workspaceProcessingState !== 'idle'}
					>
						<PlusIcon className="h-3 w-3" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 p-0 hover:bg-orange-100 hover:text-orange-600"
						onClick={handleRewriteClick}
						title={`Rewrite ${section.title} section`}
						disabled={isLoading || workspaceProcessingState !== 'idle'}
					>
						<RotateCcwIcon className="h-3 w-3" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 p-0 hover:bg-purple-100 hover:text-purple-600"
						onClick={handleEditClick}
						title={`Edit ${section.title} title`}
						disabled={isLoading || workspaceProcessingState !== 'idle'}
					>
						<Edit3Icon className="h-3 w-3" />
					</Button>
				</div>
			</button>
		)
	}
}
