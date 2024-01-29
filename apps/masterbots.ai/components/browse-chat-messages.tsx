// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { cn, createMessagePairs } from '@/lib/utils'
import { IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'
import React from 'react'
import * as AI from 'ai'
import { Message, User } from 'mb-genql'
import Image from 'next/image'
import { ChatMessage } from './chat-message'

type MessagePair = {
  userMessage: Message
  chatGptMessage: Message | null
}

function convertMessage(message: Message) {
  return {
    id: message.messageId,
    content: message.content,
    createAt: message.createdAt,
    role: message.role
  } as AI.Message
}

export function BrowseChatMessages({
  messages,
  user
}: {
  messages: Message[]
  user?: User
}) {
  const [pairs, setPairs] = React.useState<MessagePair[]>([])

  React.useEffect(() => {
    if (messages.length) {
      const prePairs: MessagePair[] = createMessagePairs(messages)
      setPairs(prePairs)
    } else setPairs([])
  }, [messages])

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {pairs.map((pair: MessagePair, key) => (
          <AccordionItem key={key} value={pair.userMessage.messageId}>
            <AccordionTrigger className="hover:no-underline">
              {user?.profilePicture ? (
                <Image
                  className="w-6 h-6 transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
                  src={user?.profilePicture || ''}
                  alt={user?.username ?? 'Avatar'}
                  height={48}
                  width={48}
                />
              ) : (
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
                    'bg-background'
                  )}
                >
                  <IconUser />
                </div>
              )}
              <div className="flex-1 px-1 ml-4 space-y-2 text-left text-[1.25rem] ">
                {pair.userMessage.content}
                {/* <span className="opacity-30 ml-4 font-normal">
                  by {user?.username.replace('_', ' ')}
                </span> */}
              </div>
              <ChatMessageActions message={convertMessage(pair.userMessage)} />
            </AccordionTrigger>
            <AccordionContent className="relative">
              <div className="md:ml-16">
                {pair.chatGptMessage ? (
                  <ChatMessage message={convertMessage(pair.chatGptMessage)} />
                ) : (
                  ''
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
