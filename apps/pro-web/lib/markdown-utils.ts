/**
 * Utilities for parsing and manipulating markdown content
 */

export interface MarkdownSection {
	id: string
	title: string
	content: string
	level: number
	/** Absolute index in the original markdown where the heading line starts */
	headingStart: number
	/** Absolute index right after the heading line (start of content) */
	contentStart: number
	/** Absolute index where this section's content ends (exclusive) */
	contentEnd: number
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

	const sections: MarkdownSection[] = []
	const usedIds = new Set<string>()

	// Global regex to find all headings with their positions
	const headingRegex = /^(#{1,6})\s+(.+)$/gm
	const matches: Array<{
		level: number
		title: string
		headingStart: number
		headingText: string
	}> = []

	let match: RegExpExecArray | null = headingRegex.exec(markdown)
	while (match) {
		const idx = typeof match.index === 'number' ? match.index : 0
		matches.push({
			level: match[1].length,
			title: match[2].trim(),
			headingStart: idx,
			headingText: match[0],
		})
		match = headingRegex.exec(markdown)
	}

	// If no headings found, create a default single section spanning the whole document
	if (matches.length === 0) {
		const defaultId = generateStableSectionId('Document', usedIds)
		sections.push({
			id: defaultId,
			title: 'Document',
			level: 1,
			content: markdown,
			headingStart: 0,
			contentStart: 0,
			contentEnd: markdown.length,
		})
		return sections
	}

	// Helper: compute index of first character after this heading line (skip trailing CR/LF)
	const afterHeading = (
		startIndex: number,
		headingTextLength: number,
	): number => {
		let idx = startIndex + headingTextLength
		// Advance past optional \r and/or \n
		if (markdown.charCodeAt(idx) === 13 /* \r */) idx++
		if (markdown.charCodeAt(idx) === 10 /* \n */) idx++
		return idx
	}

	for (let i = 0; i < matches.length; i++) {
		const m = matches[i]
		const next = matches[i + 1]
		const contentStart = afterHeading(m.headingStart, m.headingText.length)
		const contentEnd = next ? next.headingStart : markdown.length

		const stableId = generateStableSectionId(m.title, usedIds)

		const content = markdown.substring(contentStart, contentEnd)
		sections.push({
			id: stableId,
			title: m.title,
			level: m.level,
			content,
			headingStart: m.headingStart,
			contentStart,
			contentEnd,
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
 * Replace a section's content within the full markdown using absolute offsets
 * This function replaces a section and all of its child sections (deeper levels)
 */
export function replaceSectionContent(
	fullMarkdown: string,
	section: Pick<MarkdownSection, 'contentStart' | 'contentEnd' | 'level'>,
	newContent: string,
): string {
	const start = Math.max(0, Math.min(section.contentStart, fullMarkdown.length))

	// Find the actual end including all child sections
	// We need to skip past any headings that are DEEPER than this section's level
	let end = Math.max(start, Math.min(section.contentEnd, fullMarkdown.length))

	// Look ahead from contentEnd to find the next heading at same or higher level
	const afterSectionContent = fullMarkdown.slice(end)
	const headingRegex = /^(#{1,6})\s+(.+)$/gm
	let match = headingRegex.exec(afterSectionContent)

	while (match) {
		const matchLevel = match[1].length
		const matchPosition = end + (match.index ?? 0)

		// If we found a heading at same or higher level (lower number), stop here
		if (matchLevel <= section.level) {
			break
		}

		// Otherwise, this is a child section - extend our end point past it
		end = matchPosition
		match = headingRegex.exec(afterSectionContent)
	}

	// If we didn't find a same/higher level heading, extend to end of document
	if (!match && afterSectionContent.length > 0) {
		end = fullMarkdown.length
	}

	const afterSection = fullMarkdown.slice(end)

	// Only add newline spacing if there's content after AND it's a heading at the SAME or HIGHER level
	// Child headings (deeper level) should stay directly attached to avoid duplication
	const needsNewline =
		afterSection &&
		!afterSection.startsWith('\n') &&
		!newContent.endsWith('\n') &&
		/^#{1,6}\s/.test(afterSection)

	return `${fullMarkdown.slice(0, start) + newContent}${needsNewline ? '\n\n' : ''}${afterSection}`
}

/**
 * Replace a section's heading title within the full markdown using offsets
 */
export function replaceSectionHeading(
	fullMarkdown: string,
	section: Pick<MarkdownSection, 'headingStart' | 'contentStart' | 'level'>,
	newTitle: string,
): string {
	const start = Math.max(0, Math.min(section.headingStart, fullMarkdown.length))
	const end = Math.max(
		start,
		Math.min(section.contentStart, fullMarkdown.length),
	)
	// Ensure heading ends with a single newline
	const newHeading = `${'#'.repeat(section.level)} ${newTitle}\n`
	return fullMarkdown.slice(0, start) + newHeading + fullMarkdown.slice(end)
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

	// Clean the input text
	const cleanText = text.trim()

	// Check if the text already has good structure (contains multiple ## or ###)
	const hasGoodStructure = (cleanText.match(/^#{2,3}\s/gm) || []).length >= 2
	if (hasGoodStructure) {
		// Just add a main heading if it doesn't have one
		return cleanText.startsWith('#') ? cleanText : `# Document\n\n${cleanText}`
	}

	// Split by major separators first
	const majorParts = cleanText.split(/\n---\n|\n={3,}\n/)
	let result = '# Business Plan\n\n'

	for (const [partIndex, part] of majorParts.entries()) {
		if (!part.trim()) continue

		const partContent = part.trim()

		// Look for numbered bold sections like "1. **Business Concept**"
		const numberedSections = partContent.split(/(?=^\d+\.\s*\*\*[^*]+\*\*)/m)

		// Handle the first part (usually intro text before numbered sections)
		if (numberedSections[0] && !numberedSections[0].match(/^\d+\.\s*\*\*/)) {
			const introText = numberedSections[0].trim()
			if (introText) {
				const sectionTitle = partIndex === 0 ? 'Overview' : 'Introduction'
				result += `## ${sectionTitle}\n\n${introText}\n\n`
			}
			numberedSections.shift() // Remove the intro part
		}

		// Process numbered sections
		for (const section of numberedSections) {
			if (!section.trim()) continue

			// Extract title from numbered bold pattern
			const titleMatch = section.match(/^\d+\.\s*\*\*([^*]+)\*\*/)
			if (titleMatch) {
				const title = titleMatch[1].trim()
				result += `## ${title}\n\n${section.trim()}\n\n`
			} else {
				// Handle sections that start with markdown headers or bold text
				const lines = section.split('\n')
				const firstLine = lines[0].trim()

				let title = 'Additional Information'

				// Check for markdown headers
				const headerMatch = firstLine.match(/^#{1,6}\s+(.+)$/)
				if (headerMatch) {
					title = headerMatch[1].trim()
				}
				// Check for standalone bold headers
				else if (firstLine.match(/^\*\*([^*]+)\*\*$/)) {
					const boldMatch = firstLine.match(/^\*\*([^*]+)\*\*$/)
					if (boldMatch) {
						title = boldMatch[1].trim()
					}
				}
				// Check for lines that look like titles (short, no special chars at end except :)
				else if (
					firstLine.length < 80 &&
					firstLine.length > 5 &&
					!firstLine.includes('?') &&
					!firstLine.includes('.') &&
					(firstLine.endsWith(':') || /^[A-Z]/.test(firstLine))
				) {
					title = firstLine.replace(':', '').trim()
				}

				result += `## ${title}\n\n${section.trim()}\n\n`
			}
		}
	}

	return result.trim()
}
