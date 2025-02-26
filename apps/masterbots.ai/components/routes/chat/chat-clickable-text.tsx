import React from 'react'
import {
  cleanClickableText,
  extractClickablePortion,
  extractTextFromReactNodeNormal,
  extractTextFromReactNodeWeb,
  isTextClickable,
  parseClickableText
} from '@/lib/clickable-results'
import { useThread } from '@/lib/hooks/use-thread'
import {cn, UNIQUE_PHRASES} from '@/lib/utils';
import type { ClickableTextProps } from '@/types/types'

/**
 * ClickableText Component - Makes sections of text clickable to generate follow-up queries
 *
 * This component analyzes text content and creates clickable buttons for headers,
 * section titles, and other important parts. When clicked, these elements generate
 * a new query that asks for more details about the clicked content.
 */
export function ClickableText({
  children,
  isListItem,
  sendMessageFromResponse,
  webSearchResults = [],
  onReferenceFound,
  node
}: ClickableTextProps) {
  const { webSearch } = useThread()

  // Extract content based on search context
  const contentText =
    typeof children === 'string'
      ? children
      : extractTextFromReactNodeNormal(children)

  // Create a handler for clicks on text elements
  const handleTextClick = (text: string) => {
    if (sendMessageFromResponse && text.trim()) {
      const cleanedText = cleanClickableText(text)
      sendMessageFromResponse(
        `Explain more in-depth and in detail about ${cleanedText}`
      )
    }
  }

  // Get appropriate CSS class for different content types
  const getContentTypeClass = (text: string): string => {
    // Check for headings (## or ###)
    if (text.match(/^#+\s+/)) {
      return 'markdown-header'
    }

    // Check for numbered sections (1. Title)
    if (text.match(/^\d+\.\s+/)) {
      return 'section-number'
    }

    // Check for unique phrases
    
    for (const phrase of UNIQUE_PHRASES) {
      if (text.includes(phrase)) {
        return 'unique-solution'
      }
    }

    // Check for bullet points
    if (text.match(/^[•\-]\s+/)) {
      return 'bullet-point'
    }

    // Check for colon-separated titles
    if (text.includes(':')) {
      return 'section-title'
    }

    // Check for bold/strong text
    if (text.match(/^\*\*.*\*\*$/)) {
      return 'strong-text'
    }

    return ''
  }

  // Process standard text nodes (paragraphs, plain text)
  const processTextContent = (text: string) => {
    // Don't process empty or very short text
    if (!text || text.length < 3) return text

    // Try to parse clickable portions
    const { clickableText, restText } = parseClickableText(text)

    if (clickableText) {
      const contentTypeClass = getContentTypeClass(text)
      const isSectionTitle = text.includes(':')

      return (
        <>
          <button
            className={cn(
              'clickable-text p-0 m-0 font-semibold text-left bg-transparent border-none cursor-pointer hover:underline',
              contentTypeClass
            )}
            onClick={() => handleTextClick(clickableText)}
            type="button"
            data-section-title={isSectionTitle}
          >
            {clickableText}
          </button>
          {restText}
        </>
      )
    }

    return text
  }

  // Process heading elements (h1, h2, h3)
  const processHeading = (element: React.ReactElement) => {
    const headingText = extractTextFromReactNodeNormal(element.props.children)
    const headingLevel = element.type.toString().charAt(1)

    return React.cloneElement(element, {
      ...element.props,
      children: (
        <button
          className={cn(
            'clickable-text w-full p-0 m-0 text-left bg-transparent border-none cursor-pointer hover:underline',
            'markdown-header',
            `heading-${headingLevel}`
          )}
          onClick={() => handleTextClick(headingText)}
          type="button"
        >
          {element.props.children}
        </button>
      )
    })
  }

  // Process emphasis elements (strong, bold)
  const processEmphasis = (element: React.ReactElement) => {
    const emphasisText = extractTextFromReactNodeNormal(element.props.children)
    
    // If emphasis element contains a colon, make sure we handle it properly
    const colonMatch = emphasisText.match(/^([^:]+):(.*)$/);
    if (colonMatch) {
      return React.cloneElement(element, {
        ...element.props,
        children: (
          <>
            <button
              className="p-0 m-0 bg-transparent border-none cursor-pointer clickable-text hover:underline font-inherit"
              onClick={() => handleTextClick(colonMatch[1].trim())}
              type="button"
            >
              {colonMatch[1]}
            </button>
            {`: ${colonMatch[2]}`}
          </>
        )
      });
    }

    // No colon found, make the entire emphasis text clickable
    return React.cloneElement(element, {
      ...element.props,
      children: (
        <button
          className="p-0 m-0 bg-transparent border-none cursor-pointer clickable-text hover:underline font-inherit"
          onClick={() => handleTextClick(emphasisText)}
          type="button"
        >
          {element.props.children}
        </button>
      )
    })
  }

  // Process list item elements
  const processListItem = (element: React.ReactElement) => {
    // Check for strong/emphasized text within list items
    if (React.Children.toArray(element.props.children).some(
      child => React.isValidElement(child) && (child.type === 'strong' || child.type === 'b')
    )) {
      // Process the children to handle the strong elements properly
      return React.cloneElement(element, {
        ...element.props,
        children: processContent(element.props.children)
      });
    }
    
    const itemText = extractTextFromReactNodeNormal(element.props.children)
    const parsedItem = parseClickableText(itemText)

    if (parsedItem.clickableText) {
      const contentTypeClass = getContentTypeClass(itemText)

      return React.cloneElement(element, {
        ...element.props,
        children: (
          <>
            <button
              className={cn(
                'clickable-text p-0 m-0 font-semibold text-left bg-transparent border-none cursor-pointer hover:underline',
                contentTypeClass,
                isListItem && 'bullet-point'
              )}
              onClick={() => handleTextClick(parsedItem.clickableText)}
              type="button"
            >
              {parsedItem.clickableText}
            </button>
            {parsedItem.restText}
          </>
        )
      })
    }

    return element
  }

  // Process link elements for web search
  const processLink = (element: React.ReactElement) => {
    if (!webSearch) return element

    const href = element.props.href
    const reference = webSearchResults.find(result => result.url === href)

    if (reference && onReferenceFound) {
      onReferenceFound(reference)
      return null
    }

    return element
  }

  // Main processing function for React element trees
  const processContent = (content: React.ReactNode): React.ReactNode => {
    // Process strings directly
    if (typeof content === 'string') {
      return processTextContent(content)
    }

    // Skip non-string primitives
    if (typeof content !== 'object' || content === null) {
      return content
    }

    // Process arrays of elements
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <React.Fragment
          key={`content-${
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
      // Handle different element types
      if (typeof content.type === 'string') {
        // Process headings (h1, h2, h3)
        if (content.type.match(/^h[1-6]$/)) {
          return processHeading(content)
        }

        // Process emphasis (strong, b)
        if (content.type === 'strong' || content.type === 'b') {
          return processEmphasis(content)
        }

        // Process list items
        if (content.type === 'li') {
          return processListItem(content)
        }

        // Process links
        if (content.type === 'a') {
          return processLink(content)
        }

        // Process paragraphs and other elements by checking their children
        // biome-ignore lint/complexity/useOptionalChain: <explanation>
        if (content.props && content.props.children) {
          return React.cloneElement(content, {
            ...content.props,
            children: processContent(content.props.children)
          })
        }
      }
    }

    return content
  }

  // Main rendering logic
  // Handle direct node rendering (e.g., from markdown-react)
  if (node) {
    return processContent(children)
  }

  // Process content differently based on web search context
  const processedContent = webSearch
    ? processContent(extractTextFromReactNodeWeb(children))
    : processContent(children)

  return processedContent
}