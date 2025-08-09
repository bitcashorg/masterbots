import type { MarkdownSection } from '@/lib/markdown-utils'

export interface SectionTreeNode {
	section: MarkdownSection
	children: SectionTreeNode[]
	level: number
}

/**
 * Converts a flat array of markdown sections into a hierarchical tree structure
 * @param sections Flat array of markdown sections
 * @returns Hierarchical tree of sections
 */
export function buildSectionTree(
	sections: MarkdownSection[],
): SectionTreeNode[] {
	const tree: SectionTreeNode[] = []
	const stack: SectionTreeNode[] = []

	for (const section of sections) {
		const node: SectionTreeNode = {
			section,
			children: [],
			level: section.level,
		}

		// Find the correct parent for this node
		while (stack.length > 0 && stack[stack.length - 1].level >= section.level) {
			stack.pop()
		}

		if (stack.length === 0) {
			// This is a root level section
			tree.push(node)
		} else {
			// This is a child of the last section in the stack
			stack[stack.length - 1].children.push(node)
		}

		stack.push(node)
	}

	return tree
}

/**
 * Flattens a section tree back into a flat array for easier processing
 * @param tree Hierarchical tree of sections
 * @returns Flat array of sections with their tree level
 */
export function flattenSectionTree(
	tree: SectionTreeNode[],
): Array<{ section: MarkdownSection; treeLevel: number }> {
	const result: Array<{ section: MarkdownSection; treeLevel: number }> = []

	function traverse(nodes: SectionTreeNode[], level: number) {
		for (const node of nodes) {
			result.push({ section: node.section, treeLevel: level })
			traverse(node.children, level + 1)
		}
	}

	traverse(tree, 0)
	return result
}

/**
 * Recursively searches for a section in the tree by ID
 * @param tree Section tree to search
 * @param sectionId ID to search for
 * @returns The tree node containing the section, or null if not found
 */
export function findSectionInTree(
	tree: SectionTreeNode[],
	sectionId: string,
): SectionTreeNode | null {
	for (const node of tree) {
		if (node.section.id === sectionId) {
			return node
		}
		const found = findSectionInTree(node.children, sectionId)
		if (found) {
			return found
		}
	}
	return null
}
