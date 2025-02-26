import {
  cleanClickableText,
  extractTextFromReactNodeNormal,
  parseClickableText
} from '@/lib/clickable-results'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import type { ClickableTextProps } from '@/types/types'
import React from 'react'

export function ClickableText({
  children,
  isListItem,
  sendMessageFromResponse,
  webSearchResults = [],
  node,
  onReferenceFound
}: ClickableTextProps) {
  const { webSearch } = useThread()

  // Creates a click handler that uses the clickable text and its full context.
  const createClickHandler = (text: string, fullContext: string) => () => {
    if (sendMessageFromResponse && text.trim()) {
      const cleanedText = cleanClickableText(text)
      const contextToUse = fullContext || cleanedText
      sendMessageFromResponse(
        `Explain more in-depth and in detail about ${contextToUse}`
      )
    }
  }

  /**
   * Recursively process all content nodes.
   * If a string contains a colon-delimited pattern, it wraps the text before the first colon in a clickable button.
   * For <strong> or <b> elements, it applies the same logic based on their text content.
   * All other nodes are recursively processed to ensure nothing is dropped.
   */
  const processContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content === 'string') {
      // Parse the string to see if it matches the clickable pattern.
      const { clickableText, restText, fullContext } =
        parseClickableText(content)
      // If nothing qualifies as clickable, return the string as-is.
      if (!clickableText.trim()) {
        return content
      }
      return (
        <span>
          <button
            className={cn(
              'inline-block cursor-pointer hover:underline bg-transparent border-none p-0 m-0 text-left',
              isListItem ? 'text-blue-500' : 'text-link'
            )}
            onClick={createClickHandler(clickableText, fullContext)}
            type="button"
          >
            {clickableText}
          </button>
          {restText}
        </span>
      )
    }

    // If the content is a valid React element...
    if (React.isValidElement(content)) {
      // For <strong> or <b> elements, process their text content.
      if (content.type === 'strong' || content.type === 'b') {
        const strongText = extractTextFromReactNodeNormal(
          content.props.children
        )
        // Append a colon if one is missing so that our parser can work correctly.
        const textToParse = strongText.includes(':')
          ? strongText
          : strongText + ':'
        const { clickableText, restText, fullContext } =
          parseClickableText(textToParse)
        if (clickableText.trim()) {
          return (
            <button
              className={cn(
                'cursor-pointer hover:underline',
                isListItem ? 'text-blue-500' : 'text-link'
              )}
              onClick={createClickHandler(
                clickableText,
                fullContext || strongText
              )}
              type="button"
            >
              {strongText}
            </button>
          )
        }
        return content
      }

      // Otherwise, if the element has children, recursively process them.
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      if (content.props && content.props.children) {
        return React.cloneElement(content, {
          ...content.props,
          children: React.Children.map(content.props.children, child =>
            processContent(child)
          )
        })
      }
      return content
    }

    // If content is an array, process each item recursively.
    if (Array.isArray(content)) {
      return content.map((child, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <React.Fragment key={index}>{processContent(child)}</React.Fragment>
      ))
    }

    // For any other type, just return it.
    return content
  }

  return <>{processContent(children)}</>
}
