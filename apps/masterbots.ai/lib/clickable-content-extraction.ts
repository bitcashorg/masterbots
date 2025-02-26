import React from 'react'
import type { ReactNode } from 'react'

/**
 * Extracts text content from React nodes
 */
export function extractTextContent(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join('')
  }
  
  if (React.isValidElement(node) && node.props && node.props.children) {
    return extractTextContent(node.props.children)
  }
  
  return ''
}

/**
 * Extracts the title from a section heading (e.g., "1. Architecture" -> "Architecture")
 */
export function extractTitleFromHeading(headingText: string): string {
  // Match patterns like "1. Title" or "1.1 Title"
  const match = headingText.match(/^\d+(?:\.\d+)*\.\s+(.+)$/)
  if (match?.[1]) {
    return match[1].trim()
  }
  return headingText // Return the original text if pattern doesn't match
}

/**
 * Extracts the context from text after a keyword up to a colon
 */
export function extractContextFromText(fullText: string, keyword: string): string {
  const keywordIndex = fullText.indexOf(keyword)
  
  if (keywordIndex === -1) {
    return ''
  }
  
  const textAfterKeyword = fullText.substring(keywordIndex + keyword.length)
  const colonIndex = textAfterKeyword.indexOf(':')
  
  if (colonIndex === -1) {
    return textAfterKeyword.trim()
  }
  
  return textAfterKeyword.substring(0, colonIndex).trim()
}

/**
 * Formats a follow-up query with the provided keyword and context
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export  function formatFollowUpQuery(keyword: string, context: any = ''): string {
  return context 
    ? `Explain more in-depth and in detail about ${keyword} ${context}`
    : `Explain more in-depth and in detail about ${keyword}`
}

/**
 * Safely invokes a callback function if it exists
 */
export function safeInvoke<T>(
  callback: ((param: T) => void) | undefined, 
  param: T
): void {
  if (typeof callback === 'function') {
    callback(param);
  }
}