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
export function parseMarkdownSections(markdown: string): MarkdownSection[] {
	if (!markdown || markdown.trim() === '') {
		return []
	}

	const lines = markdown.split('\n')
	const sections: MarkdownSection[] = []
	let currentSection: MarkdownSection | null = null
	let currentContent: string[] = []
	let sectionId = 1

	// Handle case with no headings by creating a default section
	let hasHeadings = false

	// Process each line
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
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

			// Create new section
			currentSection = {
				id: `section-${sectionId++}`,
				title: headingMatch[2].trim(),
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
		sections.push({
			id: `section-1`,
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
			const heading = '#'.repeat(section.level) + ' ' + section.title
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
