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

export const GENERAL_PATTERN = /(.*?)([:.,])(?:\s|$)/g

export function parseClickableText(fullText: string): ParsedText {
  // Si ya es una URL, no lo hacemos clickeable
  if (typeof fullText === 'string' && fullText.match(/https?:\/\/[^\s]+/)) {
    return {
      clickableText: '',
      restText: fullText
    }
  }

  // Revisamos si es un texto con dos puntos
  const titlePattern = /^([^:]+?):\s*(.*)/
  const titleMatch = fullText.match(titlePattern)
  
  if (titleMatch) {
    const title = titleMatch[1].trim()
    // No hacemos clickeable si es solo puntos o está vacío
    if (!title || title.match(/^[.\s]+$/)) {
      return {
        clickableText: '',
        restText: fullText
      }
    }
    
    // Si el título está dentro de un strong, lo extraemos
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
  return text.replace(/(:|\.|\,)\s*$/, '').trim()
}

