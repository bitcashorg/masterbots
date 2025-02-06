import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import type { ChatMessageProps, WebSearchResult } from '@/types/types'
import { useState } from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { ClickableText } from './chat-clickable-text'

// TODO: Check if we are safe to remove this component as the thread message is doing the job


export function ChatMessage({
  message,
  sendMessageFromResponse,
  chatbot,
  actionRequired = true,
  webSearchResults = [],
  ...props
}: ChatMessageProps) {
  const cleanMessage = { ...message, content: cleanPrompt(message.content) }
  const [references, setReferences] = useState<WebSearchResult[]>([])

  const ReferencesSection = () => {
    if (references.length === 0) return null

    return (
      <div className="pt-4 mt-4 border-t border-gray-200">
        <h3 className="mb-2 text-lg font-semibold">References</h3>
        <div className="space-y-4">
          {references.map((ref, index) => (
            <div key={index} className="flex gap-4">
              {ref.thumbnail?.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ref.thumbnail.src}
                  alt={ref.title}
                  className="object-cover w-20 h-20 rounded"
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

  const ReasoningSection = () => {
    //? Only show for DeepSeek responses that include reasoning
    if (!message.reasoning || message.role !== 'assistant') return null

    return (
      <div className="pt-4 mt-4 border-t border-gray-200">
        <details className="group">
          <summary className="font-medium transition-colors cursor-pointer hover:text-gray-700">
            View AI Reasoning Process
            <span className="ml-1 text-gray-400 group-open:hidden">▼</span>
            <span className="hidden ml-1 text-gray-400 group-open:inline">
              ▲
            </span>
          </summary>
          <div className="p-4 mt-2 text-sm text-gray-600 rounded-md bg-gray-50">
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
              remarkPlugins={[remarkGfm, remarkMath]}
            >
              {message.reasoning}
            </MemoizedReactMarkdown>
          </div>
        </details>
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
            p({ children }) {
              return (
                <p className="text-left whitespace-pre-line">
                  {cleanMessage.role === 'user' ? (
                    children
                  ) : (
                    <ClickableText
                      isListItem={false}
                      sendMessageFromResponse={sendMessageFromResponse}
                      webSearchResults={webSearchResults}
                      onReferenceFound={ref =>
                        setReferences(prev => [...prev, ref])
                      }
                    >
                      {children}
                    </ClickableText>
                  )}
                </p>
              )
            },
            li({ children }) {
              return (
                <li className="ml-6 list-disc list-outside">
                  <ClickableText
                    isListItem
                    sendMessageFromResponse={sendMessageFromResponse}
                  >
                    {children}
                  </ClickableText>
                </li>
              )
            },
            ul({ children }) {
              return <ul className="ml-2 space-y-2">{children}</ul>
            },
            ol({ children }) {
              return (
                <ol className="ml-6 space-y-2 list-decimal list-outside">
                  {children}
                </ol>
              )
            },
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
            // @ts-ignore
            code({ inline, className, children, ...props }) {
              // @ts-ignore
              if (children.length) {
                // @ts-ignore
                if (children[0] === '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }
                // @ts-ignore
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
        <ReasoningSection />
        {actionRequired ? (
          <ChatMessageActions className="md:!right-0" message={message} />
        ) : null}
        <ReferencesSection />
      </div>
    </div>
  )
}
