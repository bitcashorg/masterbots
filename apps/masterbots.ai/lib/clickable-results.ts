import type { ReactNode } from 'react'
import React from 'react'

export const GENERAL_PATTERN = /(.*?)([:.,])(?:\s|$)/g

// * List of predefined unique phrases to detect in text
export const UNIQUE_PHRASES = [
  'Unique, lesser-known',
  'Unique insight',
  'Unique Tip',
  'Unique, lesser-known solution',
  'Unique Solution',
  'Unique, lesser-known option',
  'Unique Insight: Lesser-Known Solution',
  'Unique Recommendation',
  'Lesser-Known Gem',
  'For a UNIQUE, LESSER-KNOWN phrase',
  'Unique, Lesser-Known Destination',
  'For more detailed insights'
] as const

export interface ParsedText {
  clickableText: string
  restText: string
}

// ? It recursively extracts text from a ReactNode, preserving React elements and returning plain text for strings, numbers, and arrays.
export function extractTextFromReactNodeWeb(node: ReactNode): ReactNode {
  // Si es un elemento React válido
  if (React.isValidElement(node)) {
    // Si es un strong, preservamos su contenido original
    if (node.type === 'strong') {
      return {
        ...node,
        props: {
          ...node.props,
          children: extractTextFromReactNodeWeb(node.props.children)
        }
      }
    }
    return node
  }

  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNodeWeb)
  }
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const children = extractTextFromReactNodeWeb(node.props.children)
    if (React.isValidElement(children) || Array.isArray(children)) {
      return children
    }
    return String(children)
  }
  return ''
}

// ? Tthis does the following: extracts plain text from a ReactNode, ignoring React elements and returning concatenated strings from arrays
export function extractTextFromReactNodeNormal(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (Array.isArray(node))
    return node.map(extractTextFromReactNodeNormal).join('')
  if (typeof node === 'object' && node !== null && 'props' in node) {
    return extractTextFromReactNodeNormal(node.props.children)
  }
  return ''
}

// * Creates a regex pattern for unique phrases
export function createUniquePattern(): RegExp {
  return new RegExp(`(?:${UNIQUE_PHRASES.join('|')}):\\s*([^.:]+[.])`, 'i')
}

export function parseClickableText(fullText: string): ParsedText {
  if (typeof fullText === 'string' && fullText.match(/https?:\/\/[^\s]+/)) {
    return {
      clickableText: '',
      restText: fullText
    }
  }

  const titlePattern = /^([^:]+?):\s*(.*)/
  const titleMatch = fullText.match(titlePattern)

  if (titleMatch) {
    const title = titleMatch[1].trim()
    if (!title || title.match(/^[.\s]+$/)) {
      return {
        clickableText: '',
        restText: fullText
      }
    }

    const strongPattern = /<strong>(.*?)<\/strong>/
    const strongMatch = title.match(strongPattern)
    const finalTitle = strongMatch ? strongMatch[1] : title

    return {
      clickableText: finalTitle,
      restText: ':' + titleMatch[2]
    }
  }

  return {
    clickableText: '',
    restText: fullText
  }
}

export function cleanClickableText(text: string): string {
  return text.replace(/[,.()[\]]$/, '').trim()
}

/**
 * transformLink transforms a given link element by updating its text content based on the context.
 * If the original text includes 'read more' or 'learn more', it leaves the link unchanged.
 * Otherwise, it generates a new descriptive text based on the content context and updates the link.
 */
export function transformLink(
  linkElement: React.ReactElement,
  contentContext: string
): React.ReactElement {
  const href = linkElement.props.href
  const currentText = extractTextFromReactNodeNormal(linkElement.props.children)

  if (
    currentText.toLowerCase().includes('read more') ||
    currentText.toLowerCase().includes('learn more')
  ) {
    return linkElement
  }

  const descriptiveText = `Read more about ${contentContext.split(':')[0].toLowerCase()} here`

  return React.cloneElement(linkElement, {
    ...linkElement.props,
    children: descriptiveText
  })
}
