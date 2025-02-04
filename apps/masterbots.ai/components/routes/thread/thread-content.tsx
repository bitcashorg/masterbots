import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import type { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import type { WebSearchResult } from '@/types/types'
import { ClickableText } from '../chat/chat-clickable-text'

interface ThreadContentProps {
  message: Message
  isBrowseView: boolean
  sendMessageFromResponse?: (content: string) => void
  webSearchResults?: WebSearchResult[]
  onReferenceFound?: (ref: WebSearchResult) => void
}

export function ThreadContent({
  message,
  isBrowseView,
  sendMessageFromResponse,
  webSearchResults = [],
  onReferenceFound
}: ThreadContentProps) {
  return (
    <MemoizedReactMarkdown
      className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return (
            <p
              className={
                isBrowseView
                  ? 'mb-2 whitespace-pre-line last:mb-0'
                  : 'text-left whitespace-pre-line'
              }
            >
              {message.role === 'user' || isBrowseView ? (
                children
              ) : (
                <ClickableText
                  isListItem={false}
                  sendMessageFromResponse={sendMessageFromResponse}
                  webSearchResults={webSearchResults}
                  onReferenceFound={onReferenceFound}
                >
                  {children}
                </ClickableText>
              )}
            </p>
          )
        },
        ol({ children }) {
          return (
            <ol
              className={
                isBrowseView
                  ? 'text-left list-decimal list-inside'
                  : 'ml-6 space-y-2 list-decimal list-outside'
              }
            >
              {children}
            </ol>
          )
        },
        ul({ children }) {
          return (
            <ul
              className={
                isBrowseView
                  ? 'text-left list-disc list-inside'
                  : 'ml-2 space-y-2'
              }
            >
              {children}
            </ul>
          )
        },
        li({ children }) {
          if (isBrowseView) return <li>{children}</li>

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
        code({ node, inline = false, className, children, ...props }) {
          // @ts-ignore
          if (children.length) {
            // @ts-ignore
            if (children[0] === '▍') {
              return (
                <span className="mt-1 cursor-default animate-pulse">▍</span>
              )
            }

            // @ts-ignore
            children[0] = (children[0] as string).replace('`▍`', '▍')
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
      {message.content}
    </MemoizedReactMarkdown>
  )
}
