import React from 'react'

/**
 * Extracts the follow-up context from the full content based on the clicked text.
 *
 * @param content The full text of the message.
 * @param clickableText The text that was clicked.
 * @returns The text following the clickable text until the next period.
 */
export function extractFollowUpContext(
  content: string,
  clickableText: string
): string {
  const startIdx = content.indexOf(clickableText)
  if (startIdx === -1) return ''

  // Get the text following the clickable text.
  const textAfter = content.slice(startIdx + clickableText.length)
  const periodIdx = textAfter.indexOf('.')
  if (periodIdx === -1) return textAfter.trim()
  return textAfter.slice(0, periodIdx).trim()
}

/**
 * Recursively extracts plain text from React node children.
 *
 * @param children The React children.
 * @returns A plain text string representation.
 */
export function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children
  }
  if (Array.isArray(children)) {
    return children.map(child => getTextFromChildren(child)).join('')
  }
  if (React.isValidElement(children)) {
    return getTextFromChildren(children.props.children)
  }
  return ''
}

/**
 * Cleans the clickable text by removing trailing punctuation.
 *
 * @param text The clickable text.
 * @returns The cleaned text.
 */

export function cleanClickableText(text: string): string {
  return text.replace(/[,.()[\]]$/, '').trim()
}
