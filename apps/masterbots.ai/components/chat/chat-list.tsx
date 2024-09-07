import { type Message } from 'ai'

import { useThread } from '@/lib/hooks/use-thread'
import { cn, createMessagePairs } from '@/lib/utils'
import { Chatbot } from 'mb-genql'
import React from 'react'
import { ShortMessage } from '../short-message'
import { ChatAccordion } from './chat-accordion'
import { ChatMessage } from './chat-message'

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

type MessagePair = {
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
  const { isNewResponse, isLoadingMessages } = useThread()

  React.useEffect(() => {
    if (messages.length) {
      const prePairs: MessagePair[] = createMessagePairs(
        messages
      ) as MessagePair[]
      setPairs(prePairs)
    } else setPairs([])
  }, [messages, allMessages])

  if (!messages.length && allMessages) return null
  return (
    <div
      className={`relative max-w-3xl px-4 mx-auto ${className || ''} ${isThread ? 'flex flex-col gap-3' : ''}`}
    >
      {pairs.map((pair: MessagePair, key: number) => (
        <div key={key}>
          <ChatAccordion
            defaultState={
              key === 0 || (key === pairs.length - 1 && isNewResponse)
            }
            className={` ${isThread ? 'relative' : ''}`}
            triggerClass={`dark:border-b-mirage border-b-gray-300
            ${isThread ? 'sticky top-0 md:-top-10 z-[1] dark:bg-[#18181b] bg-[#f4f4f5] !border-l-[transparent] px-3 [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]' : 'px-[calc(47px-0.25rem)] '}
            py-[0.4375rem] dark:hover:bg-mirage hover:bg-gray-300 ${!isThread && key === 0 ? 'hidden' : ''} ${chatTitleClass || ''}`}
            contentClass="!border-l-[transparent]"
            arrowClass={`${isThread ? 'top-4' : 'right-5 top-4'} ${chatArrowClass || ''}`}
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
              <div className="opacity-50 pb-3 overflow-hidden text-sm mt-[0.375rem]">
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
                chatContentClass,
              )}
            >
              {/* TODO: place a better loader */}
              {isLoadingMessages ? (
                <div className="flex justify-center items-center w-full h-12">
                  <div className="transition-all w-6 h-6 border-2 border-t-[2px] rounded-full border-x-gray-300 animate-spin"></div>
                </div>
              ) : (
                ''
              )}
              {pair.chatGptMessage.length > 0
                ? pair.chatGptMessage.map((message, index) => (
                  <ChatMessage
                    actionRequired={false}
                    key={index}
                    chatbot={chatbot}
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
