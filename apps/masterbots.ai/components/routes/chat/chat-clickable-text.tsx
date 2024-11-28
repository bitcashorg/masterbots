import React from 'react'
import { cn } from '@/lib/utils'
import { useThread } from '@/lib/hooks/use-thread'
import {
  cleanClickableText,
  extractTextFromReactNodeNormal,
  extractTextFromReactNodeWeb,
  parseClickableText,
  transformLink
} from '@/lib/clickable-results'
import { ClickableTextProps } from '@/types/types'

export function ClickableText({
  children,
  isListItem,
  sendMessageFromResponse,
  webSearchResults = [],
  onReferenceFound
}: ClickableTextProps) {
  const { webSearch } = useThread()

  const extractedContent = webSearch
    ? extractTextFromReactNodeWeb(children)
    : extractTextFromReactNodeNormal(children)

  const createClickHandler = (text: string) => () => {
    if (sendMessageFromResponse && text.trim()) {
      const cleanedText = cleanClickableText(text)
      sendMessageFromResponse(`Tell me more about ${cleanedText}`)
    }
  }

  const processLink = (linkElement: React.ReactElement) => {
    const href = linkElement.props.href
    // Buscar la referencia correspondiente
    const reference = webSearchResults.find(result => result.url === href)

    if (reference && onReferenceFound) {
      onReferenceFound(reference)
      return null // Remover el link inline
    }

    return linkElement // Mantener links que no son de búsqueda web
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
        if (content.type === 'a' && webSearch) {
          return processLink(content)
        }
        // Manejo de elementos strong
        if (content.type === 'strong') {
          const strongContent = extractTextFromReactNodeNormal(
            (content.props as { children: React.ReactNode }).children
          )
          const { clickableText, restText } = parseClickableText(
            strongContent + ':'
          )

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

        // Manejo de links cuando webSearch está activo
        if (content.type === 'a' && webSearch) {
          const parentContext = extractedContent
            .filter(
              item =>
                typeof item === 'string' ||
                (React.isValidElement(item) && item.type === 'strong')
            )
            .map(item =>
              typeof item === 'string'
                ? item
                : extractTextFromReactNodeNormal(
                    (item.props as { children: React.ReactNode }).children
                  )
            )
            .join(' ')
          return transformLink(content, parentContext)
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
