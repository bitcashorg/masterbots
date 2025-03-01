import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import type { ChatMessageProps, WebSearchResult } from '@/types/types'
import React, { useState } from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  extractFollowUpContext,
  getTextFromChildren
} from '@/lib/chat-clickable-text'

/**
 * Processes React node children to combine elements separated by a colon.
 */
const preprocessChildren = (children: React.ReactNode): React.ReactNode => {
  if (!Array.isArray(children)) return children

  const result: React.ReactNode[] = []
  let i = 0

  while (i < children.length) {
    const current = children[i]
    const next = i + 1 < children.length ? children[i + 1] : null

    // If we detect a pattern where a node is immediately followed by ":"
    if (next && typeof next === 'string' && next.trim() === ':') {
      if (typeof current === 'string') {
        result.push(current + ':')
      } else if (React.isValidElement(current)) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const element = current as React.ReactElement<any>
        const currentChildren = element.props.children
        result.push(
          React.cloneElement(element, {
            children:
              typeof currentChildren === 'string'
                ? currentChildren + ':'
                : currentChildren
          })
        )
      } else {
        result.push(current)
        result.push(next)
      }
      i += 2
    } else {
      result.push(current)
      i += 1
    }
  }

  return result
}

/**
 * ChatMessage Component - Renders chat messages with markdown content
 */
export function ChatMessage({
  message,
  sendMessageFromResponse,
  chatbot,
  actionRequired = true,
  webSearchResults = [],
  ...props
}: ChatMessageProps) {
  // Clean the message content and update the message object.
  const content = cleanPrompt(message.content)
  const cleanMessage = { ...message, content }
  const [references, setReferences] = useState<WebSearchResult[]>([])

  // Handler for clickable text elements.
  const handleClickableClick = (clickableText: string) => {
    const context = extractFollowUpContext(message.content, clickableText)
    const followUpPrompt = `Could you please elaborate on "${clickableText}"? ${context}`
    sendMessageFromResponse?.(followUpPrompt)
  }

  // References section component.
  const ReferencesSection = () => {
    if (references.length === 0) return null

    return (
      <div className="pt-4 mt-4 border-t border-gray-200">
        <h3 className="mb-2 text-lg font-semibold">References</h3>
        <div className="space-y-4">
          {references.map(ref => (
            <div
              key={ref.profile.name.toLowerCase().replace(/\s/g, '-')}
              className="flex gap-4"
            >
              {ref.thumbnail?.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ref.thumbnail.src}
                  alt={ref.title}
                  className="object-cover rounded size-20"
                />
              )}
              <div>
                <h4 className="font-medium">{ref.title}</h4>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {ref.profile.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('group relative flex items-start p-1')} {...props}>
      <div className="flex-1 pr-1 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            // Process paragraph nodes.
            p({ children }) {
              return (
                <p className="text-left whitespace-pre-line">
                  {preprocessChildren(children)}
                </p>
              )
            },
            // Process heading nodes with clickable functionality.
            h1({ children }) {
              const text = getTextFromChildren(children)
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <h1
                  className="mb-2 text-2xl font-bold cursor-pointer clickable-text"
                  onClick={() => handleClickableClick(text)}
                >
                  {preprocessChildren(children)}
                </h1>
              )
            },
            h2({ children }) {
              const text = getTextFromChildren(children)
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <h2
                  className="mb-2 text-xl font-bold cursor-pointer clickable-text"
                  onClick={() => handleClickableClick(text)}
                >
                  {preprocessChildren(children)}
                </h2>
              )
            },
            h3({ children }) {
              const text = getTextFromChildren(children)
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <h3
                  className="mb-2 text-lg font-bold cursor-pointer clickable-text"
                  onClick={() => handleClickableClick(text)}
                >
                  {preprocessChildren(children)}
                </h3>
              )
            },
            // Process strong/emphasis nodes.
            strong({ children }) {
              return <strong>{preprocessChildren(children)}</strong>
            },
            // List handling.
            ul({ children }) {
              return (
                <ul className="ml-2 space-y-2 list-disc nested-list">
                  {children}
                </ul>
              )
            },
            ol({ children }) {
              return (
                <ol className="ml-2 space-y-2 list-decimal nested-list">
                  {children}
                </ol>
              )
            },
            li({ children }) {
              const processedChildren = preprocessChildren(children)
              const text = getTextFromChildren(processedChildren)
              const hasNestedList = React.Children.toArray(
                processedChildren
              ).some(
                child =>
                  React.isValidElement(child) &&
                  (child.type === 'ul' || child.type === 'ol')
              )

              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <li
                  className={cn(
                    'ml-4',
                    hasNestedList && 'mt-2',
                    'clickable-text'
                  )}
                  onClick={() => handleClickableClick(text)}
                >
                  {processedChildren}
                </li>
              )
            },
            // Process link nodes.
            a({ href, children, ...props }) {
              return (
                <a
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={href}
                  {...props}
                >
                  {children}
                </a>
              )
            },
            // Process code blocks.
            code({ inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] === '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }
                children[0] = (children[0] as string).replace('▍', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')
              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
              return (
                <CodeBlock
                  key={Math.random()}
                  language={match?.[1] || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {cleanMessage.content}
        </MemoizedReactMarkdown>

        {actionRequired && (
          <ChatMessageActions className="md:!right-0" message={message} />
        )}

        <ReferencesSection />
      </div>
    </div>
  )
}
