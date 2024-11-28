import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import { ClickableText } from './chat-clickable-text'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { useState } from 'react'
import { ChatMessageProps, WebSearchResult } from '@/types/types'

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
            code({ inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
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
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {cleanMessage.content}
        </MemoizedReactMarkdown>
        {actionRequired ? (
          <ChatMessageActions className="md:!right-0" message={message} />
        ) : null}
        <ReferencesSection />
      </div>
    </div>
  )
}
