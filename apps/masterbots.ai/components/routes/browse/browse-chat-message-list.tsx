// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import { cn, createMessagePairs } from '@/lib/utils'
import type { Chatbot, Message, User } from 'mb-genql'
import { BrowseChatMessage } from '@/components/routes/browse/browse-chat-message'
import { type MessagePair, convertMessage } from '@/components/routes/browse/browse-chat-messages'
import React from 'react'
import {BrowseAccordion} from '@/components/routes/browse/browse-accordion';

export function BrowseChatMessageList({
  messages,
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
        <BrowseAccordion
          defaultState
          key={key}
          isOpen={key == 0}
          disabled={key === 0}
          isNestedThread={true}
          contentClass={`!border-l-[transparent] ${key === pairs.length - 1 ? '!border-b-[transparent]' : ''}`}
          triggerClass="dark:border-b-mirage border-b-gray-300 py-[0.625rem] px-[47px] gap-4"
          arrowClass="mt-[0.625rem] right-[calc(47px-1rem)] translate-x-[50%]"
        >
          {/* Thread Title */}
          {(key !== 0 || isThread) && (
            <div
              className={cn(
                'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
              )}
            >
              <div className={cn('break-all px-1 text-left')}>
                {pair.userMessage.content}
              </div>
            </div>
          )}

          {/* Thread Description */}
          <div />

          {/* Thread Content */}
          <div className="border-x-DEFAULT ml-6 mr-0 md:mx-[46px] py-5 dark:border-mirage border-gray-300 text-left">
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
        </BrowseAccordion>
      ))}
    </div>
  )
}
