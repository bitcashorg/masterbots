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

  // * Choose extraction method based on webSearch state
  const extractedContent = webSearch
    ? extractTextFromReactNodeWeb(children)
    : extractTextFromReactNodeNormal(children)

  const createClickHandler = (text: string) => () => {
    if (sendMessageFromResponse && text.trim()) {
      const cleanedText = cleanClickableText(text)
      sendMessageFromResponse(`Tell me more about ${cleanedText}`)
    }
  }

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

  if (Array.isArray(extractedContent)) {
    return extractedContent.map((content, index) => {
      if (React.isValidElement(content)) {
        // Si es un strong, procesamos su contenido manteniendo el texto original
        if (content.type === 'strong') {
          const strongContent = extractTextFromReactNodeNormal((content.props as { children: React.ReactNode }).children)
          const { clickableText, restText } = parseClickableText(strongContent + ':')
          
          if (clickableText.trim()) {
            return (
              <span
                key={`clickable-${index}`}
                className={cn(
                  'cursor-pointer hover:underline',
                  isListItem ? 'text-blue-500' : 'text-link'
                )}
                onClick={createClickHandler(clickableText)}
                role="button"
                tabIndex={0}
              >
                {strongContent}
              </span>
            )
          }
          return content
        }
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

  if (React.isValidElement(extractedContent)) {
    return extractedContent
  }

  const { clickableText, restText } = parseClickableText(
    String(extractedContent)
  )

  if (!clickableText.trim()) {
    return <>{extractedContent}</>
  }

  return renderClickableContent(clickableText, restText)
}
