'use client'

import type { MarkdownSection } from '@/lib/markdown-utils'
import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import {
	CheckIcon,
	ChevronDown,
	Edit3Icon,
	PlusIcon,
	RotateCcwIcon,
	XIcon,
} from 'lucide-react'
import React, { useState } from 'react'

interface WorkspaceSectionItemProps {
	section: MarkdownSection
	isActive: boolean
	onSectionClick: (sectionId: string) => void
	onExpandSection: (sectionTitle: string) => void
	onRewriteSection: (sectionTitle: string) => void
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
	level,
	children,
}: WorkspaceSectionItemProps) {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editingTitle, setEditingTitle] = useState(section.title)
	const [isHovered, setIsHovered] = useState(false)

	// Calculate indentation based on section level (h2=0, h3=1, h4=2)
	const indentLevel = Math.max(0, section.level - 2)
	const indentPx = indentLevel * 16 // 16px per level

	const handleToggleCollapse = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsCollapsed(!isCollapsed)
	}

	const handleSectionClick = () => {
		if (!isEditing) {
			onSectionClick(section.id)
		}
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
		setIsEditing(true)
		setEditingTitle(section.title)
	}

	const handleEditSave = () => {
		if (editingTitle.trim() && editingTitle !== section.title) {
			onRenameSection(section.id, editingTitle.trim())
		}
		setIsEditing(false)
	}

	const handleEditCancel = () => {
		setIsEditing(false)
		setEditingTitle(section.title)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleEditSave()
		} else if (e.key === 'Escape') {
			e.preventDefault()
			handleEditCancel()
		}
	}

	const hasChildren = children && React.Children.count(children) > 0

	return (
		<div className="w-full relative">
			{/* Main section item */}
			<button
				type="button"
				className={cn(
					'group flex-1 flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer',
					isActive
						? 'bg-primary/10 text-primary font-medium'
						: 'hover:bg-muted',
					'border-l-2',
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
				{/* Collapse/Expand Arrow */}
				{hasChildren && (
					<Button
						variant="ghost"
						size="sm"
						className="h-4 w-4 p-0 hover:bg-transparent"
						onClick={handleToggleCollapse}
					>
						<ChevronDown
							className={cn(
								'h-3 w-3 transition-transform duration-200',
								isCollapsed ? '-rotate-90' : 'rotate-0',
							)}
						/>
					</Button>
				)}

				{/* Section level indicator */}
				{/* <span className="text-xs text-muted-foreground font-mono min-w-[24px]">
					h{section.level}
				</span> */}

				{/* Section title (editable or display) */}
				<div className="w-full flex-1 flex items-center gap-2">
					{isEditing ? (
						<input
							type="text"
							value={editingTitle}
							onChange={(e) => setEditingTitle(e.target.value)}
							onKeyDown={handleKeyDown}
							onBlur={handleEditSave}
							className="flex-1 bg-background border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
						/>
					) : (
						<span className="whitespace-nowrap overflow-hidden text-ellipsis">
							{section.title}
						</span>
					)}
				</div>

				{/* Action buttons (show on hover or when editing) */}
				<div
					className={cn(
						'sticky right-1 flex items-center gap-1 transition-opacity duration-200',
						isHovered || isEditing ? 'opacity-100' : 'opacity-0',
					)}
				>
					{isEditing ? (
						<>
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 hover:bg-green-100 hover:text-green-600"
								onClick={(e) => {
									e.stopPropagation()
									handleEditSave()
								}}
								title="Save changes"
							>
								<CheckIcon className="h-3 w-3" />
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
								onClick={(e) => {
									e.stopPropagation()
									handleEditCancel()
								}}
								title="Cancel editing"
							>
								<XIcon className="h-3 w-3" />
							</Button>
						</>
					) : (
						<>
							{/* Expand CTA */}
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 hover:bg-blue-100 hover:text-blue-600"
								onClick={handleExpandClick}
								title={`Expand ${section.title} section`}
							>
								<PlusIcon className="h-3 w-3" />
							</Button>

							{/* Rewrite CTA */}
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 hover:bg-orange-100 hover:text-orange-600"
								onClick={handleRewriteClick}
								title={`Rewrite ${section.title} section`}
							>
								<RotateCcwIcon className="h-3 w-3" />
							</Button>

							{/* Edit CTA */}
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 hover:bg-purple-100 hover:text-purple-600"
								onClick={handleEditClick}
								title={`Edit ${section.title} title`}
							>
								<Edit3Icon className="h-3 w-3" />
							</Button>
						</>
					)}
				</div>
			</button>

			{/* Children sections (collapsible) */}
			{hasChildren && !isCollapsed && <div className="ml-4">{children}</div>}
		</div>
	)
}
