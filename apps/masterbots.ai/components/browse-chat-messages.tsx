// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import { cn, createMessagePairs, readingTime } from '@/lib/utils'
import {
  IconChatMessage,
  IconDownVote,
  IconShare,
  IconUpVote,
  IconUser
} from '@/components/ui/icons'
import React from 'react'
import * as AI from 'ai'
import { Chatbot, Message, User } from 'mb-genql'
import Image from 'next/image'
import { BrowseChatMessage } from './browse-chat-message'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { Button } from './ui/button'
import { BrowseAccordion } from './browse-accordion'
import { ChatMessageActions } from './chat-message-actions'

type MessagePair = {
  userMessage: Message
  chatGptMessage: Message | null
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
      const prePairs: MessagePair[] = createMessagePairs(messages)
      setPairs(prePairs)
    } else setPairs([])
  }, [messages])

  return (
    <div className="w-full">
      <div
        className="relative bg-cover py-10"
        style={{ backgroundImage: 'url("/browse-background.svg")' }}
      >
        <div
          className="dark:bg-[#09090B] bg-white rounded-lg p-6 md:w-[600px]
          flex flex-row gap-3 relative mx-auto font-mono"
        >
          <div className="w-2/3 flex flex-col gap-3">
            <div className="text-2xl font-black">{chatbot?.name}</div>
            <Separator className="bg-[#1E293B]" />
            <div className="text-xl font-semibold">
              {chatbot?.categories[0].category.name}.
            </div>
            <div className="text-base">
              <div className="font-medium">
                {chatbot?.description ? <div>{chatbot?.description}</div> : ''}
              </div>
              <div className="font-light">
                Threads:{' '}
                <span className="dark:text-[#71717A]">
                  {chatbot?.threads.length ?? 1}
                </span>
                <div>
                  Views: <span className="dark:text-[#71717A]">0</span>
                </div>
                <div>
                  Read time:{' '}
                  <span className="dark:text-[#71717A]">
                    {readingTime(messages)} min
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 relative flex items-end">
            <div className="flex flex-col text-xs items-center w-full gap-2">
              <Link
                style={{ wordSpacing: '4px' }}
                className="text-[#388DE2]"
                href={`/${chatbot?.name.toLowerCase()}`}
              >
                Go to {chatbot?.name} chat &gt;
              </Link>
              <div className="flex items-center gap-2">
                <IconUpVote className="opacity-60 h-4" />
                <span className="text-[#72C255]">0</span>
                <IconDownVote className="opacity-60 h-4" />
                <span className="text-[#F42F53]">0</span>
                <Button
                  onClick={() => {
                    console.log('Share action required')
                  }}
                  variant="ghost"
                >
                  <IconShare className="opacity-60" />
                </Button>
                <IconChatMessage className="opacity-60" />
              </div>
            </div>
          </div>
          <div className="h-24 w-24 absolute border-[4px] border-[#388DE2] right-0 top-0 translate-x-[25%] rounded-full translate-y-[-25%] dark:bg-[#131316] bg-white">
            <Image
              className="h-full w-full transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
              src={chatbot?.avatar || ''}
              alt={chatbot?.avatar || 'ChatAvatar'}
              height={96}
              width={96}
            />
          </div>
        </div>
      </div>
      <div className="max-w-2xl px-4 mx-auto mt-8 flex gap-y-4 flex-col">
        {pairs.map((pair: MessagePair, key: number) => (
          <BrowseAccordion defaultState key={key} className="border-none">
            <div className="mx-4 flex relative w-full">
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
              <ChatMessageActions message={convertMessage(pair.userMessage)} />
            </div>
            <div className="mr-4 ml-[calc(1rem+2px)]">
              {pair.chatGptMessage ? (
                <BrowseChatMessage
                  message={convertMessage(pair.chatGptMessage)}
                />
              ) : (
                ''
              )}
            </div>
          </BrowseAccordion>
        ))}
      </div>
    </div>
  )
}
