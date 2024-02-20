import { type Message } from 'ai'

import { ChatMessage } from '@/components/chat-message'
import { createMessagePairs } from '@/lib/utils'
import { Chatbot } from 'mb-genql'
import React from 'react'
import { ChatAccordion } from './chat-accordion'
import { ShortMessage } from './short-message'

export interface ChatList {
  messages: Message[]
  sendMessageFromResponse?: (message: string) => void
  chatbot?: Chatbot
  isThread?: boolean
  className?: string
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
  isThread = true
}: ChatList) {
  const [pairs, setPairs] = React.useState<MessagePair[]>([])

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
    <div className={`relative max-w-3xl px-4 mx-auto ${className || ''}`}>
      {pairs.map((pair: MessagePair, key: number) => (
        <div key={key}>
          <ChatAccordion
            defaultState={key === 0}
            className="border-none mb-4"
            triggerClass={`dark:border-mirage border-gray-300 hover:rounded-xl border-b px-3 pt-3 dark:hover:bg-mirage hover:bg-gray-300 ${!isThread && key === 0 ? 'hidden' : ''}`}
            contentClass="!pb-0"
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
            <div className="max-h-[75vh] scrollbar mx-[2.125rem] px-4 py-5 dark:border-mirage border-gray-300 border-x">
              {pair.chatGptMessage.length > 0
                ? pair.chatGptMessage.map((message, index) => (
                    <ChatMessage
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
