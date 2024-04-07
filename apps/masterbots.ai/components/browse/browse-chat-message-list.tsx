// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import type { Chatbot, Message, User } from '@repo/mb-genql'

import React from 'react'
import { cn, createMessagePairs } from '@/lib/utils'
import { ChatAccordion } from '../shared/thread-dialog/thread-accordion'
import type { MessagePair } from './browse-chat-messages'
import { convertMessage } from './browse-chat-messages'
import { BrowseChatMessage } from './browse-chat-message'

export function BrowseChatMessageList({
  messages,
  user,
  chatbot,
  isThread = false
}: {
  messages: Message[]
  user?: User
  chatbot?: Chatbot
  isThread?: boolean
}) {
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
    <div>
      {pairs.map((pair: MessagePair, key: number) => (
        <ChatAccordion
          arrowClass="mt-[0.625rem] right-[calc(47px-1rem)] translate-x-[50%]"
          contentClass={`!border-l-[transparent] ${key === pairs.length - 1 ? '!border-b-[transparent]' : ''}`}
          defaultState
          key={key}
          triggerClass={`dark:border-b-mirage border-b-gray-300 py-[0.625rem] px-[47px] gap-4 ${key === 0 && !isThread ? 'hidden' : ''}`}
        >
          {/* Thread Title */}
          {key !== 0 || isThread ? (
            <div
              className={cn(
                'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
              )}
            >
              <div className={cn('break-all px-1')}>
                {pair.userMessage.content}
              </div>
            </div>
          ) : null}

          {/* Thread Description */}
          <></>

          {/* Thread Content */}
          <div className="border-x-DEFAULT mx-6 md:mx-[46px] py-5 dark:border-mirage border-gray-300">
            {pair.chatGptMessage.length > 0
              ? pair.chatGptMessage.map((message, index) => (
                  <BrowseChatMessage
                    chatbot={chatbot}
                    key={index}
                    message={convertMessage(message)}
                  />
                ))
              : ''}
          </div>
        </ChatAccordion>
      ))}
    </div>
  )
}
