import React, { type ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  extractTextContent,
  extractContextFromText,
  extractTitleFromHeading,
  formatFollowUpQuery,
  safeInvoke
} from '@/lib/clickable-content-extraction'

interface EnhancedClickableTextProps {
  children: ReactNode
  sendMessageFromResponse?: (message: string) => void
}

/**
 * EnhancedClickableText Component - Makes text elements clickable based on common AI generation patterns
 *
 * This component identifies and makes clickable:
 * 1. Section headings (like "1. Architecture")
 * 2. List items with bold/strong text as the first element
 * 3. Text patterns with colons separating titles from content
 */
export function EnhancedClickableText({
  children,
  sendMessageFromResponse
}: EnhancedClickableTextProps) {
  // Track hover state for enhanced visual cues
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  // Check if an element is a list item (li)
  const isListItem = (element: React.ReactElement): boolean => {
    return element.type === 'li'
  }

  // Check if an element is a heading (h1, h2, h3, etc.)
  const isHeading = (element: React.ReactElement): boolean => {
    return typeof element.type === 'string' && /^h[1-6]$/.test(element.type)
  }

  // Check if an element is a strong/bold tag
  const isStrong = (element: React.ReactElement): boolean => {
    return element.type === 'strong' || element.type === 'b'
  }

  // Check if a text string matches a section heading pattern (e.g., "1. Architecture")
  const isSectionHeading = (text: string): boolean => {
    return /^\d+\.\s+[A-Z][a-zA-Z\s]+$/.test(text)
  }

  // Handle click events for clickable elements
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleClick = (text: string, contextText: any = '') => {
    if (!sendMessageFromResponse) {
      console.warn('sendMessageFromResponse function is not provided')
      return
    }

    const query = formatFollowUpQuery(text, contextText)
    safeInvoke(sendMessageFromResponse, query.trim())
  }

  // Process section headings (e.g., "1. Architecture")
  const processSectionHeading = (element: React.ReactElement) => {
    const headingText = extractTextContent(element.props.children)

    if (isSectionHeading(headingText)) {
      const title = extractTitleFromHeading(headingText)
      const elementId = `heading-${title.replace(/\s+/g, '-').toLowerCase()}`
      const isHovered = hoveredElement === elementId

      return React.cloneElement(element, {
        ...element.props,
        children: (
          <button
            className={cn(
              'clickable-text p-0 m-0 font-bold text-left bg-transparent',
              'border-none cursor-pointer relative transition-colors duration-200 w-full',
              isHovered
                ? 'text-accent underline'
                : 'hover:text-accent hover:underline'
            )}
            onClick={() => handleClick(title)}
            onMouseEnter={() => setHoveredElement(elementId)}
            onMouseLeave={() => setHoveredElement(null)}
            aria-label={`Get more details about ${title}`}
            type="button"
          >
            {element.props.children}
          </button>
        )
      })
    }

    return element
  }

  // Process list items with bold text
  const processListItemWithBold = (element: React.ReactElement) => {
    // Check if this list item contains a strong/bold element
    let hasStrongElement = false
    let strongText = ''
    let fullItemText = ''

    // First, extract the full text of the list item
    fullItemText = extractTextContent(element.props.children)

    // Process the children to find strong elements
    React.Children.forEach(element.props.children, (child: React.ReactNode) => {
      if (React.isValidElement(child) && isStrong(child)) {
        hasStrongElement = true
        strongText = extractTextContent(
          (child as React.ReactElement).props.children
        )
      }
    })

    if (hasStrongElement) {
      // Extract context using our utility function
      const contextText = extractContextFromText(fullItemText, strongText)

      // Process the children to make the bold elements clickable
      const processedChildren = React.Children.map(
        element.props.children,
        child => {
          if (React.isValidElement(child) && isStrong(child)) {
            const elementId = `strong-${strongText.replace(/\s+/g, '-').toLowerCase()}`
            const isHovered = hoveredElement === elementId

            return React.cloneElement(
              // biome-ignore lint/complexity/noBannedTypes: <explanation>
              child as React.ReactElement<React.PropsWithChildren<{}>>,
              {
                ...(child as React.ReactElement).props,
                children: (
                  <button
                    className={cn(
                      'clickable-text p-0 m-0 font-semibold text-left bg-transparent',
                      'border-none cursor-pointer relative transition-colors duration-200',
                      isHovered
                        ? 'text-accent underline'
                        : 'hover:text-accent hover:underline'
                    )}
                    onClick={() => handleClick(strongText, contextText)}
                    onMouseEnter={() => setHoveredElement(elementId)}
                    onMouseLeave={() => setHoveredElement(null)}
                    aria-label={`Get more details about ${strongText}`}
                    type="button"
                  >
                    {(child as React.ReactElement).props.children}
                  </button>
                )
              }
            )
          }
          return child
        }
      )

      return React.cloneElement(element, {
        ...element.props,
        children: processedChildren
      })
    }

    return element
  }

  // Main processing function for React elements
  const processContent = (content: ReactNode): ReactNode => {
    // Handle string content directly
    if (typeof content === 'string') {
      return content
    }

    // Skip non-string/non-object content
    if (typeof content !== 'object' || content === null) {
      return content
    }

    // Process arrays of elements
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <React.Fragment
          key={`content-item-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }`}
        >
          {processContent(item)}
        </React.Fragment>
      ))
    }

    // Process React elements
    if (React.isValidElement(content)) {
      // Process headings
      if (isHeading(content)) {
        return processSectionHeading(content)
      }

      // Process list items
      if (isListItem(content)) {
        return processListItemWithBold(content)
      }

      // Process children of other elements
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      if (content.props && content.props.children) {
        return React.cloneElement(
          // biome-ignore lint/complexity/noBannedTypes: <explanation>
          content as React.ReactElement<React.PropsWithChildren<{}>>,
          {
            ...(content as React.ReactElement).props,
            children: processContent(
              (content as React.ReactElement).props.children
            )
          }
        )
      }
    }

    return content
  }

  return <>{processContent(children)}</>
}
