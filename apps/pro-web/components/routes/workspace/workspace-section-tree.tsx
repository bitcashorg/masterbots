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
}

export function WorkspaceSectionTree({
	tree,
	activeSection,
	onSectionClick,
	onExpandSection,
	onRewriteSection,
	onRenameSection,
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

	return <div className="space-y-1">{renderSectionNodes(tree)}</div>
}
