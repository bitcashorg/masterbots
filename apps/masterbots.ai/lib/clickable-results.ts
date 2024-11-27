import type { ReactNode } from 'react'
import React from 'react'

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
  // If it's a React element, preserve it entirely
  if (React.isValidElement(node)) {
    return node
  }

  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNodeWeb)
  }
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const children = extractTextFromReactNodeWeb(node.props.children)
    // If children contains React elements, preserve them
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

export const GENERAL_PATTERN = /(.*?)([:.,])(?:\s|$)/g

export function parseClickableText(fullText: string): ParsedText {
  // First handle URLs - they should remain as regular text
  if (typeof fullText === 'string' && fullText.match(/https?:\/\/[^\s]+/)) {
    return {
      clickableText: '',
      restText: fullText
    }
  }

  // Check for "Title: Description" pattern
  const titlePattern = /^([^:]+?):\s*(.*)/
  const titleMatch = fullText.match(titlePattern)
  if (titleMatch) {
    const title = titleMatch[1].trim()
    // Don't make the title clickable if it's just periods or empty
    if (!title || title.match(/^[.\s]+$/)) {
      return {
        clickableText: '',
        restText: fullText
      }
    }
    return {
      clickableText: title,
      restText: ':' + titleMatch[2]
    }
  }

  // If no patterns match, return original text
  return {
    clickableText: '',
    restText: fullText
  }
}

export function cleanClickableText(text: string): string {
  return text.replace(/(:|\.|\,)\s*$/, '').trim()
}
