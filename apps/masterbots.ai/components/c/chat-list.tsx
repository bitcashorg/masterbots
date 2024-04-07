import { type Message } from 'ai'
import type { Chatbot } from '@repo/mb-genql'
import React from 'react'
import { ChatMessage } from '@/components/c/chat-message'
import { cn, createMessagePairs } from '@/lib/utils'
import { useThread } from '@/hooks/use-thread'
import { ShortMessage } from '../shared/thread-dialog/thread-excerpt'
import { ChatAccordion } from '../shared/thread-dialog/thread-accordion'

export interface ChatList {
  messages: Message[]
  sendMessageFromResponse?: (message: string) => void
  chatbot?: Chatbot
  isThread?: boolean
  className?: string
  chatContentClass?: string
  chatTitleClass?: string
  chatArrowClass?: string
}

interface MessagePair {
  userMessage: Message
  chatGptMessage: Message[]
}

export function ChatList({
  className,
  messages,
  sendMessageFromResponse,
  chatbot,
  isThread = true,
  chatContentClass,
  chatTitleClass,
  chatArrowClass
}: ChatList) {
  const [pairs, setPairs] = React.useState<MessagePair[]>([])
  const { isNewResponse } = useThread()

  React.useEffect(() => {
    if (messages.length) {
      const prePairs: MessagePair[] = createMessagePairs(
        messages
      ) as MessagePair[]
      setPairs(prePairs)
    } else setPairs([])
  }, [messages])

  if (!messages.length) return null
  return (
    <div
      className={`relative max-w-3xl px-4 mx-auto ${className || ''} ${isThread ? 'flex flex-col gap-3' : ''}`}
    >
      {pairs.map((pair: MessagePair, key: number) => (
        <div key={key}>
          <ChatAccordion
            arrowClass={`${isThread ? 'top-4' : 'right-5 top-4'} ${chatArrowClass || ''}`}
            className={` ${isThread ? 'relative' : ''}`}
            contentClass="!border-l-[transparent]"
            defaultState={
              key === 0 || (key === pairs.length - 1 && isNewResponse)
            }
            triggerClass={`dark:border-b-mirage border-b-gray-300
            ${isThread ? 'sticky top-0 md:-top-10 z-[1] dark:bg-[#18181b] bg-[#f4f4f5] !border-l-[transparent] px-3 [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]' : 'px-[calc(47px-0.25rem)] '}
            py-[0.4375rem] dark:hover:bg-mirage hover:bg-gray-300 ${!isThread && key === 0 ? 'hidden' : ''} ${chatTitleClass || ''}`}
          >
            {/* Thread Title */}
            {!isThread && key === 0 ? (
              ''
            ) : (
              <ChatMessage
                actionRequired={false}
                chatbot={chatbot}
                message={pair.userMessage}
                sendMessageFromResponse={sendMessageFromResponse}
              />
            )}

            {/* Thread Description */}
            {isThread ? (
              <div className="opacity-50 pb-3 overflow-hidden text-sm mt-1.5">
                {pair.chatGptMessage[0]?.content ? (
                  <div className="flex-1 px-1 space-y-2 overflow-hidden text-left">
                    <ShortMessage content={pair.chatGptMessage[0]?.content} />
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <></>
            )}

            {/* Thread Content */}
            <div
              className={cn(
                'mx-4 md:mx-[46px] px-1 py-4 border-transparent dark:border-x-mirage border-x-gray-300 border',
                { '!border-[transparent]': !isThread && key === 0 },
                chatContentClass
              )}
            >
              {pair.chatGptMessage.length > 0
                ? pair.chatGptMessage.map((message, index) => (
                    <ChatMessage
                      actionRequired={false}
                      chatbot={chatbot}
                      key={index}
                      message={message}
                      sendMessageFromResponse={sendMessageFromResponse}
                    />
                  ))
                : ''}
            </div>
          </ChatAccordion>
        </div>
      ))}
    </div>
  )
}
