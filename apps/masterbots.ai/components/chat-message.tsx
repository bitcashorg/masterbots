// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import { ClickableText } from '@/components/chat-clickable-text'
import { ChatMessageActions } from '@/components/chat-message-actions'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { cleanPrompt, cn } from '@/lib/utils'
import { Message } from 'ai'
import { Chatbot } from 'mb-genql'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
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
  const { data: session } = useSession()

  return (
    <div className={cn('group relative mb-4 flex items-start p-1')} {...props}>
      <div
        className={cn(
          'flex size-8 w-8 shrink-0 select-none items-center justify-center border shadow rounded-full',
          cleanMessage.role === 'user'
            ? 'bg-background dark:bg-primary-foreground'
            : 'bg-primary text-primary-foreground dark:bg-background dark:text-primary-foreground'
        )}
      >
        {cleanMessage.role === 'user' ? (
          session?.user.image ? (
            <Image
              className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
              src={session?.user.image}
              alt={session?.user.name ?? 'UserName'}
              height={32}
              width={32}
            />
          ) : (
            <IconUser />
          )
        ) : chatbot?.avatar ? (
          <Image
            className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
            src={chatbot?.avatar}
            alt={chatbot?.name ?? 'BotAvatar'}
            height={32}
            width={32}
          />
        ) : (
          <IconOpenAI />
        )}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ node, children }) {
              return (
                <p className="mb-2 text-left whitespace-pre-line last:mb-0">
                  {cleanMessage.role === 'user'
                    ? children
                    : (
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
                  <ClickableText
                    isListItem
                    sendMessageFromResponse={sendMessageFromResponse}
                  >
                    {children}
                  </ClickableText>
                </li>
              )
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
        >
          {cleanMessage.content}
        </MemoizedReactMarkdown>
        {actionRequired ? (
          <ChatMessageActions className="md:!right-0" message={message} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
