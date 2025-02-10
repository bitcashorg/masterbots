import {
  cleanClickableText,
  extractTextFromReactNodeNormal,
  extractTextFromReactNodeWeb,
  parseClickableText,
  transformLink
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
  onReferenceFound
}: ClickableTextProps) {
  const { webSearch } = useThread()

  const extractedContent = webSearch
    ? extractTextFromReactNodeWeb(children)
    : extractTextFromReactNodeNormal(children)

  const createClickHandler = (text: string) => () => {
    if (sendMessageFromResponse && text.trim()) {
      const cleanedText = cleanClickableText(text)
      sendMessageFromResponse(
        `Explain more in-depth and in detail about ${cleanedText}`
      )
    }
  }

  const processNestedContent = (content: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(content)) {
      if (content.type === 'ul' || content.type === 'ol') {
        return React.cloneElement(content, {
          ...content.props,
          className: cn(
            content.props.className,
            'mt-2 ml-4',
            content.type === 'ul' ? 'list-disc' : 'list-decimal',
            'nested-list'
          ),
          children: React.Children.map(content.props.children, child =>
            processNestedContent(child)
          )
        })
      }

      if (content.type === 'li') {
        const hasNestedList = React.Children.toArray(
          content.props.children
        ).some(
          child =>
            React.isValidElement(child) &&
            (child.type === 'ul' || child.type === 'ol')
        )

        return React.cloneElement(content, {
          ...content.props,
          className: cn(
            content.props.className,
            'ml-4',
            hasNestedList && 'mt-2'
          ),
          children: processNestedContent(content.props.children)
        })
      }
    }

    return content
  }

  const processLink = (linkElement: React.ReactElement) => {
    const href = linkElement.props.href
    const reference = webSearchResults.find(result => result.url === href)

    if (reference && onReferenceFound) {
      onReferenceFound(reference)
      return null
    }

    return linkElement
  }

  const renderClickableContent = (clickableText: string, restText: string) => (
    <span className="inline">
      <button
        className={cn(
          'inline-block cursor-pointer hover:underline bg-transparent border-none p-0 m-0',
          isListItem ? 'text-blue-500' : 'text-link'
        )}
        onClick={createClickHandler(clickableText)}
        type="button"
      >
        {clickableText}
      </button>
      {restText.startsWith(':') ? restText.replace(/^:/, ': ') : restText}
    </span>
  )

  if (Array.isArray(extractedContent)) {
    return extractedContent.map((content, index) => {
      if (React.isValidElement(content)) {
        if (content.type === 'ul' || content.type === 'ol') {
          return processNestedContent(content)
        }

        if (content.type === 'a' && webSearch) {
          return processLink(content)
        }

        if (content.type === 'strong') {
          const strongContent = extractTextFromReactNodeNormal(
            (content.props as { children: React.ReactNode }).children
          )
          const { clickableText, restText } = parseClickableText(
            strongContent + ':'
          )

          if (clickableText.trim()) {
            return (
              <button
                key={`clickable-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                  }`}
                className={cn(
                  'cursor-pointer hover:underline',
                  isListItem ? 'text-blue-500' : 'text-link'
                )}
                onClick={createClickHandler(clickableText)}
                type="button"
                tabIndex={0}
              >
                {strongContent}
              </button>
            )
          }
          return content
        }

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
        <React.Fragment
          key={`clickable-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
            }`}
        >
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
