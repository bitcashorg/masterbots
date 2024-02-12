import { type Message } from 'ai'

import { ChatMessage } from '@/components/chat-message'
import { Chatbot } from 'mb-genql'
import React from 'react'
import { createMessagePairs } from '@/lib/utils'
import { ChatAccordion } from './chat-accordion'
import { ShortMessage } from './short-message'

export interface ChatList {
  messages: Message[]
  sendMessageFromResponse?: (message: string) => void
  chatbot?: Chatbot
}

type MessagePair = {
  userMessage: Message
  chatGptMessage: Message[]
}

export function ChatList({
  messages,
  sendMessageFromResponse,
  chatbot
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
    <div className="relative max-w-3xl px-4 mx-auto">
      {pairs.map((pair: MessagePair, key: number) => (
        <div key={key}>
          <ChatAccordion defaultState className="border-none mb-4">
            <ChatMessage
              actionRequired={false}
              chatbot={chatbot}
              message={pair.userMessage}
              sendMessageFromResponse={sendMessageFromResponse}
            />
            <div className="opacity-50 overflow-hidden text-sm">
              {pair.chatGptMessage[0]?.content ? (
                <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden text-left">
                  <ShortMessage content={pair.chatGptMessage[0]?.content} />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="max-h-[75vh] scrollbar">
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
