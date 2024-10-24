// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { cn } from '@/lib/utils'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

export interface ChatMessageProps {
  message: Message
  chatbot?: Chatbot
}

export function BrowseChatMessage({ message, chatbot, ...props }: ChatMessageProps) {
  const cleanMessage = { ...message, content: cleanPrompt(message.content) }

  return (
    <div className={cn('group relative my-4 flex items-start')} {...props}>
      <div className="flex-1 px-1 space-y-2 overflow-hidden md:ml-4">
        <MemoizedReactMarkdown
          className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 !max-w-5xl"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
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
        {/* <ChatMessageActions className="md:!right-0" message={cleanMessage} /> */}
      </div>
    </div>
  )
}
