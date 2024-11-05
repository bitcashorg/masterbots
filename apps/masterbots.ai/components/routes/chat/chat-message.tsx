// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import { ChatMessageActions } from '@/components/routes/chat/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'
import { ClickableText } from './chat-clickable-text'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

export interface ChatMessageProps {
  message: Message
  sendMessageFromResponse?: (message: string) => void
  chatbot?: Chatbot
  actionRequired?: boolean
}

export function ChatMessage({
  message,
  sendMessageFromResponse,
  chatbot,
  actionRequired = true,
  ...props
}: ChatMessageProps) {
  const cleanMessage = { ...message, content: cleanPrompt(message.content) }

  return (
    <div className={cn('group relative flex items-start p-1')} {...props}>
      <div className="flex-1 pr-1 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ node, children }) {
              return (
                <p className="text-left whitespace-pre-line">
                  {cleanMessage.role === 'user' ? (
                    children
                  ) : (
                    <ClickableText
                      isListItem={false}
                      sendMessageFromResponse={sendMessageFromResponse}
                    >
                      {children}
                    </ClickableText>
                  )}
                </p>
              )
            },
            li({ node, children }) {
              return (
                <li className="list-disc">
                  <ClickableText isListItem sendMessageFromResponse={sendMessageFromResponse}>
                    {children}
                  </ClickableText>
                </li>
              )
            },
            ol({ children }) {
              return <ol className="list-decimal list-inside text-left">{children}</ol>
            },
            ul({ children }) {
              return <ul className="list-disc list-inside text-left">{children}</ul>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return <span className="mt-1 cursor-default animate-pulse">▍</span>
                }

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
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            },
          }}
        >
          {cleanMessage.content}
        </MemoizedReactMarkdown>
        {actionRequired ? <ChatMessageActions className="md:!right-0" message={message} /> : ''}
      </div>
    </div>
  )
}
