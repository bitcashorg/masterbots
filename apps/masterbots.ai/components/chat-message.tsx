// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { cleanPrompt, cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'

export interface ChatMessageProps {
  message: Message
  sendMessageFromResponse?: (message: string) => void
}

function extractTextFromReactNode(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node
  }

  if (typeof node === 'number') {
    return node.toString()
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join('')
  }

  if (typeof node === 'object' && node !== null && 'props' in node) {
    return extractTextFromReactNode(node.props.children)
  }

  return ''
}

export function ChatMessage({
  message,
  sendMessageFromResponse,
  ...props
}: ChatMessageProps) {
  const cleanMessage = { ...message, content: cleanPrompt(message.content) }

  const ClickableText: React.FC<{
    children: React.ReactNode
    isListItem: boolean
    sendMessageFromResponse?: (message: string) => void
  }> = ({ children, isListItem, sendMessageFromResponse }) => {
    const fullText: string = extractTextFromReactNode(children)
    const regexPattern = isListItem ? /.*?[:.,](?:\s|$)/ : /.*?[.](?:\s|$)/
    const match = fullText.match(regexPattern)
    const clickableText = match ? match[0] : ''
    const restText = match ? fullText.slice(match[0].length) : ''

    const handleClick = () => {
      if (sendMessageFromResponse && match) {
        sendMessageFromResponse(clickableText.replace(/[:.,]\s*$/, ''))
      }
    }
    if (!clickableText.trim()) {
      return <>{fullText}</>
    }

    return (
      <>
        <span
          className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
          onClick={handleClick}
        >
          {clickableText}
        </span>
        {restText}
      </>
    )
  }

  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex size-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          cleanMessage.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {cleanMessage.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ node, children }) {
              return (
                <p className="mb-2 text-left whitespace-pre-line last:mb-0">
                  <ClickableText
                    isListItem={false}
                    sendMessageFromResponse={sendMessageFromResponse}
                  >
                    {children}
                  </ClickableText>
                </p>
              )
            },
            li({ node, children }) {
              return (
                <li className="list-disc">
                  <ClickableText
                    isListItem={true}
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
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}
