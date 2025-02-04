'use client'

/**
 * BrowseChatMessageList Component
 *
 * This component displays a list of chat messages exchanged between the user and the chatbot.
 * It organizes messages into pairs, allowing for a structured presentation of user and chatbot interactions.
 *
 * Props:
 * - messages: An array of Message objects representing the chat messages.
 * - chatbot: An optional Chatbot object containing details about the chatbot.
 * - isThread: A boolean indicating if the messages are part of a thread (default is false).
 */

import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ThreadMessage } from '@/components/routes/thread/thread-message'
import {
  type MessagePair,
  convertMessage
} from '@/components/routes/browse/browse-chat-messages'
import { cn, createMessagePairs } from '@/lib/utils'
import type { Chatbot, Message, User } from 'mb-genql'
import React from 'react'

export function BrowseChatMessageList({
  messages,
  chatbot,
  user,
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
    <>
      {pairs.map((pair: MessagePair, key: number) => (
        <SharedAccordion
          defaultState
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={key}
          isOpen={key === 0}
          disabled={key === 0}
          isNestedThread={true}
          variant="browse"
          contentClass={cn(
            "!border-l-transparent",
            key === pairs.length - 1 && "!border-b-transparent"
          )}
          triggerClass={cn(
            "dark:border-b-mirage border-b-gray-300 py-2.5 px-[47px] gap-4",
            // Base background color for nested threads
            'bg-gray-200/90 dark:bg-gray-800/90',
            // Hover effects
            'hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
          arrowClass="mt-[0.625rem] left-[57.5rem] translate-x-[50%]"
        >
          {/* Thread Title */}
          {(key !== 0 || isThread) && (
            <div className={cn(
              'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
            )}>
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
                  <ThreadMessage
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    message={convertMessage(message)}
                    chatbot={chatbot}
                    isBrowseView={true}
                  />
                ))
              : ''}
          </div>
        </SharedAccordion>
      ))}
    </>
  )
}