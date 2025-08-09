/**
 * Utilities for parsing and manipulating markdown content
 */

export interface MarkdownSection {
	id: string
	title: string
	content: string
	level: number
}

/**
 * Parses a markdown string into sections based on headings
 * @param markdown The markdown string to parse
 * @returns An array of markdown sections
 */
/**
 * Generates a stable ID from heading text by converting to lowercase,
 * replacing spaces and special characters with hyphens, and removing duplicates
 */
function generateStableSectionId(
	title: string,
	existingIds: Set<string>,
): string {
	// Convert to lowercase and replace spaces/special chars with hyphens
	let baseId = title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, and hyphens
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, '') // Remove leading/trailing hyphens

	// Ensure the ID is not empty
	if (!baseId) {
		baseId = 'section'
	}

	// Handle duplicates by adding a counter
	let finalId = baseId
	let counter = 1
	while (existingIds.has(finalId)) {
		finalId = `${baseId}-${counter}`
		counter++
	}

	existingIds.add(finalId)
	return finalId
}

export function parseMarkdownSections(markdown: string): MarkdownSection[] {
	if (!markdown || markdown.trim() === '') {
		return []
	}

	const lines = markdown.split('\n')
	const sections: MarkdownSection[] = []
	let currentSection: MarkdownSection | null = null
	let currentContent: string[] = []
	const usedIds = new Set<string>()

	// Handle case with no headings by creating a default section
	let hasHeadings = false

	// Process each line
	for (const [i, line] of lines.entries()) {
		const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)

		if (headingMatch) {
			hasHeadings = true

			// If we have a current section, save it before starting a new one
			if (currentSection) {
				sections.push({
					...currentSection,
					content: currentContent.join('\n'),
				})
				currentContent = []
			}

			// Create new section with stable ID based on title
			const title = headingMatch[2].trim()
			const stableId = generateStableSectionId(title, usedIds)

			currentSection = {
				id: stableId,
				title: title,
				level: headingMatch[1].length,
				content: '',
			}
		} else if (currentSection) {
			// Add line to current section content
			currentContent.push(line)
		} else {
			// Before first heading, collect content
			currentContent.push(line)
		}
	}

	// Add the last section
	if (currentSection) {
		sections.push({
			...currentSection,
			content: currentContent.join('\n'),
		})
	} else if (!hasHeadings && currentContent.length > 0) {
		// No headings found, create a default section
		const defaultId = generateStableSectionId('Document', usedIds)
		sections.push({
			id: defaultId,
			title: 'Document',
			level: 1,
			content: currentContent.join('\n'),
		})
	}

	return sections
}

/**
 * Recreates a markdown document from individual sections
 * @param sections An array of markdown sections
 * @returns A markdown string combining all sections
 */
export function combineMarkdownSections(sections: MarkdownSection[]): string {
	if (!sections.length) return ''

	return sections
		.map((section) => {
			const heading = `${'#'.repeat(section.level)} ${section.title}`
			return `${heading}\n${section.content}`
		})
		.join('\n\n')
}

/**
 * Creates a new document from text with no markdown structure
 * by adding headers for paragraphs
 * @param text The plain text to convert to a structured markdown document
 * @returns A formatted markdown document
 */
export function createStructuredMarkdown(text: string): string {
	if (!text || text.trim() === '') {
		return ''
	}

	// Split text into paragraphs
	const paragraphs = text.split(/\n{2,}/g).filter((p) => p.trim() !== '')

	// If there's only one paragraph, return it with a single heading
	if (paragraphs.length === 1) {
		return `# Document\n\n${paragraphs[0]}`
	}

	// For multiple paragraphs, create sections
	let result = ''
	paragraphs.forEach((paragraph, index) => {
		// Try to extract a title from the first few words
		const words = paragraph.split(' ')
		const possibleTitle = words.slice(0, Math.min(5, words.length)).join(' ')
		const title =
			possibleTitle.length > 30 ? `Section ${index + 1}` : possibleTitle

		result += `## ${title}\n\n${paragraph}\n\n`
	})

	return result.trim()
}
