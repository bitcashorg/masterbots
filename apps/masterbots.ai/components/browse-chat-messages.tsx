// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import { cn, createMessagePairs, readingTime } from '@/lib/utils'
import { IconUser } from '@/components/ui/icons'
import React from 'react'
import * as AI from 'ai'
import { Chatbot, Message, User } from 'mb-genql'
import Image from 'next/image'
import { BrowseChatMessage } from './browse-chat-message'
import BrowseChatbotDetails from './browse-chatbot-details'
import { ShortMessage } from './short-message'
import { ChatAccordion } from './chat-accordion'

export type MessagePair = {
  userMessage: Message
  chatGptMessage: Message[]
}

export function convertMessage(message: Message) {
  return {
    id: message.messageId,
    content: message.content,
    createAt: message.createdAt,
    role: message.role
  } as AI.Message
}

export function BrowseChatMessages({
  messages,
  user,
  chatbot
}: {
  messages: Message[]
  user?: User
  chatbot?: Chatbot
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
    <div className="w-full">
      <BrowseChatbotDetails chatbot={chatbot} />
      <div className="max-w-2xl px-4 mx-auto mt-8 flex gap-y-4 flex-col">
        {pairs.map((pair: MessagePair, key: number) => (
          <ChatAccordion defaultState key={key} className="border-none">
            <div className="mx-4 mb-2 flex relative w-full">
              {user?.profilePicture ? (
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 select-none items-center justify-center border rounded-full shadow'
                  )}
                >
                  <Image
                    className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                    src={user?.profilePicture || ''}
                    alt={user?.username ?? 'Avatar'}
                    height={32}
                    width={32}
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                    'bg-background'
                  )}
                >
                  <IconUser />
                </div>
              )}
              <div className="flex-1 px-1 ml-4 space-y-2 text-left text-[1.25rem] relative">
                {pair.userMessage.content}
                {/* <span className="opacity-30 ml-4 font-normal">
                  by {user?.username.replace('_', ' ')}
                </span> */}
              </div>
            </div>
            <div className="opacity-50 overflow-hidden text-sm">
              {pair.chatGptMessage[0]?.content ? (
                <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden text-left">
                  <ShortMessage content={pair.chatGptMessage[0]?.content} />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="mr-4 ml-[calc(1rem+2px)] max-h-[75vh] scrollbar">
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
    </div>
  )
}
