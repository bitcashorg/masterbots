import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import type { ChatMessageProps, WebSearchResult } from '@/types/types'
import React, { useState } from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { ClickableText } from './chat-clickable-text'

/**
 * ImprovedChatMessage Component - Renders chat messages with improved clickable sections
 */
export function ChatMessage({
  message,
  sendMessageFromResponse,
  chatbot,
  actionRequired = true,
  webSearchResults = [],
  ...props
}: ChatMessageProps) {
  // Clean the message content
  const content = cleanPrompt(message.content)
  const cleanMessage = { ...message, content }
  const [references, setReferences] = useState<WebSearchResult[]>([])

  // References section component for web search results
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

  // Enhanced content wrapper
  const EnhancedContent = ({ children }: { children: React.ReactNode }) => {
    if (cleanMessage.role === 'user' || !sendMessageFromResponse) {
      return <>{children}</>
    }

    return (
      <ClickableText sendMessageFromResponse={sendMessageFromResponse} isListItem={false}>
        {children}
      </ClickableText>
    )
  }

  return (
    <div className={cn('group relative flex items-start p-1')} {...props}>
      <div className="flex-1 pr-1 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            // Process paragraph nodes
            p({ children }) {
              return (
                <p className="text-left whitespace-pre-line">
                  <EnhancedContent>{children}</EnhancedContent>
                </p>
              )
            },

            // Process heading nodes
            h1({ children }) {
              return (
                <h1 className="mb-2 text-2xl font-bold">
                  <EnhancedContent>{children}</EnhancedContent>
                </h1>
              )
            },
            h2({ children }) {
              return (
                <h2 className="mb-2 text-xl font-bold">
                  <EnhancedContent>{children}</EnhancedContent>
                </h2>
              )
            },
            h3({ children }) {
              return (
                <h3 className="mb-2 text-lg font-bold">
                  <EnhancedContent>{children}</EnhancedContent>
                </h3>
              )
            },

            // Process strong/emphasis nodes
            strong({ children }) {
              return (
                <strong>
                  <EnhancedContent>{children}</EnhancedContent>
                </strong>
              )
            },

            // Process list nodes
            ul({ children }) {
              return <ul className="ml-2 space-y-2 list-disc">{children}</ul>
            },
            ol({ children }) {
              return <ol className="ml-2 space-y-2 list-decimal">{children}</ol>
            },
            li({ children }) {
              const hasNestedList = React.Children.toArray(children).some(
                child =>
                  React.isValidElement(child) &&
                  (child.type === 'ul' || child.type === 'ol')
              )

              return (
                <li className={cn('ml-4', hasNestedList && 'mt-2')}>
                  <EnhancedContent>{children}</EnhancedContent>
                </li>
              )
            },

            // Process link nodes
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

            // Process code blocks
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
