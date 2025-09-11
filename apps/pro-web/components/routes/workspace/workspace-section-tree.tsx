'use client'

import type { SectionTreeNode } from '@/lib/section-tree-utils'
import type React from 'react'
import { WorkspaceSectionItem } from './workspace-section-item'

interface WorkspaceSectionTreeProps {
	tree: SectionTreeNode[]
	activeSection: string | null
	onSectionClick: (sectionId: string) => void
	onExpandSection: (sectionTitle: string) => void
	onRewriteSection: (sectionTitle: string) => void
	onRenameSection: (sectionId: string, newTitle: string) => void
	onDeleteSection: (sectionId: string) => void
}

export function WorkspaceSectionTree({
	tree,
	activeSection,
	onSectionClick,
	onExpandSection,
	onRewriteSection,
	onRenameSection,
	onDeleteSection,
}: WorkspaceSectionTreeProps) {
	const renderSectionNodes = (
		nodes: SectionTreeNode[],
		level = 0,
	): React.ReactNode[] => {
		return nodes.map((node) => (
			<WorkspaceSectionItem
				key={node.section.id}
				section={node.section}
				isActive={activeSection === node.section.id}
				onSectionClick={onSectionClick}
				onDeleteSection={onDeleteSection}
				onExpandSection={onExpandSection}
				onRewriteSection={onRewriteSection}
				onRenameSection={onRenameSection}
				level={level}
			>
				{node.children.length > 0
					? renderSectionNodes(node.children, level + 1)
					: null}
			</WorkspaceSectionItem>
		))
	}

	return (
		<div className="min-size-full w-full flex flex-col gap-1 overflow-auto scrollbar">
			{renderSectionNodes(tree)}
		</div>
	)
}
