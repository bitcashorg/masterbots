import type { ReactNode } from 'react'
import React from 'react'

export const GENERAL_PATTERN = /(.*?)([:.,])(?:\s|$)/g

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

export function extractTextFromReactNodeWeb(node: ReactNode): ReactNode {
  if (React.isValidElement(node)) {
    if (node.type === 'strong') {
      return {
        ...node,
        props: {
          ...node.props,
          children: extractTextFromReactNodeWeb(node.props.children)
        }
      }
    }
    
    // Handle nested lists in web extraction
    if (node.type === 'ul' || node.type === 'ol') {
      return {
        ...node,
        props: {
          ...node.props,
          children: React.Children.map(node.props.children, child =>
            extractTextFromReactNodeWeb(child)
          )
        }
      }
    }

    // Handle list items
    if (node.type === 'li') {
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

export function extractTextFromReactNodeNormal(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  
  if (Array.isArray(node)) {
    return node.map(item => {
      // Add type guard to safely access props
      if (React.isValidElement(item) && 
          'props' in item && 
          'children' in (item.props as { children?: ReactNode })) {
          
        if (item.type === 'ul' || item.type === 'ol') {
          // Now TypeScript knows props and children exist
          return '\n' + extractTextFromReactNodeNormal((item.props as { children: ReactNode }).children)
        }
        if (item.type === 'li') {
          const content = extractTextFromReactNodeNormal((item.props as { children: ReactNode }).children)
          const hasNestedList = content.includes('\n')
          return `\n- ${content}${hasNestedList ? '\n' : ''}`
        }
      }
      return extractTextFromReactNodeNormal(item)
    }).join('')
  }
  
  // Type guard for objects with props
  if (typeof node === 'object' && 
      node !== null && 
      'props' in node && 
      'children' in (node.props as { children?: ReactNode })) {
      
    if (node.type === 'li') {
      const content = extractTextFromReactNodeNormal((node.props as { children: ReactNode }).children)
      return `\n- ${content}`
    }
    return extractTextFromReactNodeNormal((node.props as { children: ReactNode }).children)
  }
  
  return ''
}

export function parseClickableText(fullText: string): ParsedText {
  // Skip URLs
  if (typeof fullText === 'string' && fullText.match(/https?:\/\/[^\s]+/)) {
    return {
      clickableText: '',
      restText: fullText
    }
  }

  // First check for unique phrases
  for (const phrase of UNIQUE_PHRASES) {
    if (fullText.includes(phrase)) {
      // Split content after the phrase
      const [_, ...rest] = fullText.split(phrase)
      return {
        clickableText: phrase,
        restText: rest.join(phrase) // Rejoin in case phrase appears multiple times
      }
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

    return {
      clickableText: title,
      restText: ': ' + titleMatch[2]
    }
  }

  return {
    clickableText: '',
    restText: fullText
  }
}

export function cleanClickableText(text: string): string {
  // Remove trailing punctuation and whitespace
  return text.replace(/[,.()[\]]$/, '').trim()
}

export function transformLink(
  linkElement: React.ReactElement,
  contentContext: string
): React.ReactElement {
  const href = linkElement.props.href
  const currentText = extractTextFromReactNodeNormal(linkElement.props.children)

  // Don't transform "read more" or "learn more" links
  if (
    currentText.toLowerCase().includes('read more') ||
    currentText.toLowerCase().includes('learn more')
  ) {
    return linkElement
  }

  // Create descriptive text based on context
  const descriptiveText = `Read more about ${contentContext.split(':')[0].toLowerCase()} here`

  return React.cloneElement(linkElement, {
    ...linkElement.props,
    children: descriptiveText
  })
}

//? helper function for handling nested lists
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function processNestedList(node: ReactNode, level: any = 0): ReactNode {
  if (!React.isValidElement(node)) return node;

  if (node.type === 'ul' || node.type === 'ol') {
    return React.cloneElement(node, {
      ...node.props,
      className: `ml-${level * 4} ${node.type === 'ul' ? 'list-disc' : 'list-decimal'}`,
      children: React.Children.map(node.props.children, child =>
        processNestedList(child, level + 1)
      )
    });
  }

  if (node.type === 'li') {
    return React.cloneElement(node, {
      ...node.props,
      className: `ml-${level * 2}`,
      children: React.Children.map(node.props.children, child =>
        processNestedList(child, level)
      )
    });
  }

  return node;
}