import type { ParsedText } from '@/types/types'
import type { ReactNode } from 'react'
import React from 'react'
import { UNIQUE_PHRASES } from './utils'

/**
 * Extracts text content from React nodes for web parsing
 */
export function extractTextFromReactNodeWeb(node: ReactNode): ReactNode {
  // Return string/number nodes directly
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()

  // Handle arrays of nodes
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNodeWeb)
  }

  // Handle React elements
  if (React.isValidElement(node)) {
    // Process children of the element
    return {
      ...node,
      props: {
        ...node.props,
        children: extractTextFromReactNodeWeb(node.props.children),
      },
    }
  }

  // Handle objects with props
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const children = extractTextFromReactNodeWeb(node.props.children)
    if (React.isValidElement(children) || Array.isArray(children)) {
      return children
    }
    return String(children)
  }

  return ''
}

/**
 * Extracts raw text content from React nodes
 */
export function extractTextFromReactNodeNormal(node: ReactNode): string {
  // Handle string and number nodes
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()

  // Handle arrays
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNodeNormal).join('')
  }

  // Handle React elements
  if (React.isValidElement(node)) {
    return extractTextFromReactNodeNormal(node.props.children)
  }

  // Handle objects with props
  if (typeof node === 'object' && node !== null && 'props' in node) {
    return extractTextFromReactNodeNormal(node.props.children)
  }

  return ''
}

/**
 * Cleans text for use in follow-up queries
 */
export function cleanClickableText(text: string): string {
  return text
    .replace(/^#+\s+/, '') // Remove Markdown heading markers
    .replace(/^\d+\.\s*/, '') // Remove leading numbers
    .replace(/^[•-]\s*/, '') // Remove bullet points
    .replace(/^\*\*|\*\*$/g, '') // Remove Markdown bold markers
    .replace(/[,.()[\]]$/, '') // Remove trailing punctuation
    .trim()
}

/**
 * Determines if text should be made clickable based on patterns
 */
export function isTextClickable(text: string): boolean {
  // Skip short texts, URLs, and empty content
  if (!text || text.length < 3 || text.match(/https?:\/\/[^\s]+/)) {
    return false
  }

  // Check for basic heading patterns
  if (
    text.match(/^#+\s+/) || // Markdown headings (## Title)
    text.match(/^\d+\.\s+/) || // Numbered sections (1. Title)
    text.match(/^[•-]\s+/) || // Bullet points (• Title)
    text.match(/^\*\*.*\*\*/) || // Bold text (**Title**)
    text.match(/^[A-Z][^:.\n]{2,}(?=:)/) // Capitalized text followed by colon
  ) {
    return true
  }

  return false
}

/**
 * Extracts the clickable portion of text for interactive elements
 */
export function extractClickablePortion(text: string): string {
  // For markdown headings
  const headingMatch = text.match(/^(#+\s+[^:\n]+)/)
  if (headingMatch) return headingMatch[1].trim()

  // For numbered sections
  const numberedMatch = text.match(/^(\d+\.\s+[^:\n]+)/)
  if (numberedMatch) return numberedMatch[1].trim()

  // For sections with colons (Title: Description)
  const colonMatch = text.match(/^([^:]+):/)
  if (colonMatch) return colonMatch[1].trim()

  // For bullet points
  const bulletMatch = text.match(/^([•-]\s+[^:\n]+)/)
  if (bulletMatch) return bulletMatch[1].trim()

  // For bold text
  const boldMatch = text.match(/^\*\*([^*]+)\*\*/)
  if (boldMatch) return boldMatch[1].trim()

  return text
}

/**
 * Analyzes text for clickable portions and returns structured result
 */
export function parseClickableText(fullText: string): ParsedText {
  // Skip URLs
  if (typeof fullText === 'string' && fullText.match(/https?:\/\/[^\s]+/)) {
    return {
      clickableText: '',
      restText: fullText,
      fullContext: fullText,
    }
  }

  // Handle Markdown headers (## or ###)
  const markdownHeaderMatch = fullText.match(/^(#{1,3}\s+[^:\n]+)(:?.*)$/s)
  if (markdownHeaderMatch) {
    return {
      clickableText: markdownHeaderMatch[1].trim(),
      restText: markdownHeaderMatch[2] || '',
      fullContext: markdownHeaderMatch[1].trim(),
    }
  }

  // Handle section headers with numbers (e.g., "1. Infection Prevention:")
  const sectionMatch = fullText.match(/^(\d+\.\s+[^:]+):(.*)$/s)
  if (sectionMatch) {
    return {
      clickableText: sectionMatch[1].trim(),
      restText: `: ${sectionMatch[2]}`,
      fullContext: sectionMatch[1].trim(),
    }
  }

  // Handle regular numbered items without colon
  const numberedMatch = fullText.match(/^(\d+\.\s+[^:\n]+)(.*)/s)
  if (numberedMatch) {
    return {
      clickableText: numberedMatch[1].trim(),
      restText: numberedMatch[2] || '',
      fullContext: numberedMatch[1].trim(),
    }
  }

  // Handle bullet points with colon (e.g., "• Water Temperature: While warm water...")
  const bulletColonMatch = fullText.match(/^(\s*[•-]\s+[^:]+):(.*)$/s)
  if (bulletColonMatch) {
    return {
      clickableText: bulletColonMatch[1].trim(),
      restText: `: ${bulletColonMatch[2]}`,
      fullContext: bulletColonMatch[1].trim(),
    }
  }

  // Handle regular bullet points
  const bulletMatch = fullText.match(/^(\s*[•-]\s+[^:\n]+)(.*)/s)
  if (bulletMatch) {
    return {
      clickableText: bulletMatch[1].trim(),
      restText: bulletMatch[2] || '',
      fullContext: bulletMatch[1].trim(),
    }
  }

  // Handle bold text parts (e.g., "**Infection Prevention**: Rinsing hands...")
  const boldColonMatch = fullText.match(/^\*\*([^*:]+)\*\*:(.*)$/s)
  if (boldColonMatch) {
    return {
      clickableText: boldColonMatch[1].trim(),
      restText: `: ${boldColonMatch[2]}`,
      fullContext: boldColonMatch[1].trim(),
    }
  }

  // Handle standard bold text
  const boldMatch = fullText.match(/^\*\*([^*]+)\*\*(.*)/s)
  if (boldMatch) {
    return {
      clickableText: boldMatch[1].trim(),
      restText: boldMatch[2] || '',
      fullContext: boldMatch[1].trim(),
    }
  }

  // Check for any of the UNIQUE_PHRASES
  for (const phrase of UNIQUE_PHRASES) {
    if (fullText.includes(phrase)) {
      const index = fullText.indexOf(phrase)
      const endIndex = fullText.indexOf(':', index + phrase.length)

      if (endIndex !== -1) {
        const clickable = fullText.substring(index, endIndex).trim()
        const rest = fullText.substring(endIndex)
        return {
          clickableText: clickable,
          restText: rest,
          fullContext: clickable,
        }
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        return {
          clickableText: phrase,
          restText: fullText.substring(index + phrase.length),
          fullContext: phrase,
        }
      }
    }
  }

  // Handle section titles with colons (Title: Content)
  const titleColonMatch = fullText.match(/^([^:]{3,}):(.*)$/s)
  if (titleColonMatch) {
    return {
      clickableText: titleColonMatch[1].trim(),
      restText: `: ${titleColonMatch[2]}`,
      fullContext: titleColonMatch[1].trim(),
    }
  }

  // Default case: no specific pattern found
  return {
    clickableText: '',
    restText: fullText,
    fullContext: fullText,
  }
}
