import type { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import type { Chatbot } from '@repo/mb-genql'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/shared/markdown'
import { cleanPrompt } from '@/lib/threads'

export interface ChatMessageProps {
  message: Message
  chatbot?: Chatbot
}

export function BrowseChatMessage({
  message,
  chatbot,
  ...props
}: ChatMessageProps) {
  const cleanMessage = { ...message, content: cleanPrompt(message.content) }

  return (
    <div className={cn('group relative pt-4 flex items-start')} {...props}>
      <div className="flex-1 px-1 md:ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="min-w-full prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 !max-w-5xl"
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
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
            }
          }}
          remarkPlugins={[remarkGfm, remarkMath]}
        >
          {cleanMessage.content}
        </MemoizedReactMarkdown>
        {/* <ChatMessageActions className="md:!right-0" message={cleanMessage} /> */}
      </div>
    </div>
  )
}
