import React from 'react'
import { cn } from '@/lib/utils'
import { useThread } from '@/lib/hooks/use-thread'
import {
  cleanClickableText,
  extractTextFromReactNodeNormal,
  extractTextFromReactNodeWeb,
  parseClickableText
} from '@/lib/clickable-results'

interface ClickableTextProps {
  children: React.ReactNode
  isListItem: boolean
  sendMessageFromResponse?: (message: string) => void
}

export function ClickableText({
  children,
  isListItem,
  sendMessageFromResponse
}: ClickableTextProps) {
  const { webSearch } = useThread()

  // Choose extraction method based on webSearch state
  const extractedContent = webSearch
    ? extractTextFromReactNodeWeb(children)
    : extractTextFromReactNodeNormal(children)

  // Handle click
  const createClickHandler = (text: string) => () => {
    if (sendMessageFromResponse && text.trim()) {
      const cleanedText = cleanClickableText(text) // Use the cleanClickableText utility
      sendMessageFromResponse(`Tell me more about ${cleanedText}`)
    }
  }

  // Common render function
  const renderClickableContent = (clickableText: string, restText: string) => (
    <>
      <span
        className={cn(
          'cursor-pointer hover:underline',
          isListItem ? 'text-blue-500' : 'text-link'
        )}
        onClick={createClickHandler(clickableText)}
        role="button"
        tabIndex={0}
      >
        {clickableText}
      </span>
      {restText}
    </>
  )

  // Handle array of content
  if (Array.isArray(extractedContent)) {
    return extractedContent.map((content, index) => {
      if (React.isValidElement(content)) {
        return content
      }

      const { clickableText, restText } = parseClickableText(String(content))

      if (!clickableText.trim()) {
        return content
      }

      return (
        <React.Fragment key={`clickable-${index}`}>
          {renderClickableContent(clickableText, restText)}
        </React.Fragment>
      )
    })
  }

  // Handle single React element
  if (React.isValidElement(extractedContent)) {
    return extractedContent
  }

  // Handle single text content
  const { clickableText, restText } = parseClickableText(
    String(extractedContent)
  )

  if (!clickableText.trim()) {
    return <>{extractedContent}</>
  }

  return renderClickableContent(clickableText, restText)
}
