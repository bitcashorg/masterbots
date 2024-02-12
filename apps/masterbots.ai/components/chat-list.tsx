import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { Chatbot } from 'mb-genql'
import React from 'react'
import { createMessagePairs } from '@/lib/utils'
import { ChatAccordion } from './chat-accordion'

export interface ChatList {
  messages: Message[]
  sendMessageFromResponse?: (message: string) => void
  chatbot?: Chatbot
}

type MessagePair = {
  userMessage: Message
  chatGptMessage: Message | null
}

export function ChatList({
  messages,
  sendMessageFromResponse,
  chatbot
}: ChatList) {
  if (!messages.length) return null
  const [pairs, setPairs] = React.useState<MessagePair[]>([])

  React.useEffect(() => {
    if (messages.length) {
      const prePairs: MessagePair[] = createMessagePairs(
        messages
      ) as MessagePair[]
      setPairs(prePairs)
    } else setPairs([])
  }, [messages])

  return (
    <div className="relative max-w-2xl px-4 mx-auto">
      {pairs.map((pair: MessagePair, key: number) => (
        <div>
          <ChatAccordion defaultState key={key} className="border-none">
            <ChatMessage
              actionRequired={false}
              chatbot={chatbot}
              message={pair.userMessage}
              sendMessageFromResponse={sendMessageFromResponse}
            />
            <>
              {pair.chatGptMessage ? (
                <ChatMessage
                  chatbot={chatbot}
                  message={pair.chatGptMessage}
                  sendMessageFromResponse={sendMessageFromResponse}
                />
              ) : (
                ''
              )}
            </>
          </ChatAccordion>
          {key < pairs.length - 1 && <Separator className="my-4 md:my-8" />}
        </div>
      ))}
    </div>
  )
}
