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
	const indentPx = indentLevel * 8 // 8px per level

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

	// Render section button (same for both collapsible and non-collapsible)
	const sectionButton = (
		<button
			type="button"
			className={cn(
				'w-full group flex items-center gap-1 text-left px-1.5 py-2 rounded-md text-sm transition-colors cursor-pointer',
				isActive
					? 'bg-primary/10 text-primary font-medium border-primary'
					: 'hover:bg-muted',
				'border-l-2 rounded-l-sm border-transparent',
				{
					'font-normal': section.level === 4,
					'font-medium': section.level === 3,
					'font-semibold': section.level === 2,
					'font-bold': section.level === 1,
				},
			)}
			style={{
				marginLeft: `${indentPx}px`,
				maxWidth: `calc(100% - ${indentPx}px)`,
			}}
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
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
		>
			{/* Side Action buttons (show on hover or when editing) */}
			<div
				className={cn(
					'flex items-center transition-all duration-200',
					isHovered ? 'opacity-100' : 'opacity-0',
				)}
			>
				<Button
					variant="ghost"
					size="sm"
					className="absolute -left-3 size-5 p-0 text-destructive-foreground/70 hover:text-destructive-foreground hover:bg-destructive"
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
					'absolute right-1 flex items-center gap-1 transition-opacity duration-200',
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

	if (!hasChildren) {
		// Non-collapsible item (no children) - return the button directly
		return sectionButton
	}

	// Collapsible item (has children) - wrap in accordion
	return (
		<Accordion
			type="single"
			collapsible
			defaultValue={section.id}
			className="min-w-fit w-auto rounded-md"
		>
			<AccordionItem value={section.id} className="border-none">
				<AccordionTrigger
					className={cn('hover:no-underline p-0 rounded-md [&>svg]:hidden', {
						'font-medium': section.level === 3,
						'font-semibold': section.level === 2,
						'font-bold': section.level === 1,
					})}
				>
					{sectionButton}
					<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
				</AccordionTrigger>
				<AccordionContent className="pb-0 pt-0 pl-2 ml-0 w-full">
					{children}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
