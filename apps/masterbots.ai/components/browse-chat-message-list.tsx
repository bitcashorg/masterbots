// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatcleanMessage.tsx

import { IconUser } from '@/components/ui/icons'
import { cn, createMessagePairs } from '@/lib/utils'
import { Chatbot, Message, User } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BrowseChatMessage } from './browse-chat-message'
import { MessagePair, convertMessage } from './browse-chat-messages'
import { ChatAccordion } from './chat-accordion'

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
          defaultState
          key={key}
          contentClass={`!border-l-[transparent] ${key === pairs.length - 1 ? '!border-b-[transparent]' : ''}`}
          triggerClass={`dark:border-b-mirage border-b-gray-300 py-[0.625rem] px-[47px] gap-4 ${key === 0 && !isThread ? 'hidden' : ''}`}
          arrowClass="mt-[0.625rem] right-[calc(47px-1rem)] translate-x-[50%]"
        >
          {/* Thread Title */}
          {(key !== 0 || isThread) && (
            <div
              className={cn(
                'relative flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4'
              )}
            >
              <div className="font-medium">
                {pair.userMessage.content}
              </div>
              <span className="opacity-50 text-[0.875rem]">by</span>
              {user?.profilePicture ? (
                <Link
                  href={`/browse/${encodeURIComponent(user.username)}?type=user`}
                  title={user?.username.replace('_', ' ')}
                  className={cn(
                    'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
                  )}
                >
                  <Image
                    className="transition-opacity duration-300 rounded-full select-none hover:opacity-80"
                    src={user?.profilePicture}
                    alt={user?.username ?? 'Avatar'}
                    height={32}
                    width={32}
                  />
                </Link>
              ) : (
                <Link
                  href={`/browse/${encodeURIComponent(user?.username ?? 'Default')}?type=user`}
                  title={user?.username}
                  className={cn(
                    'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow',
                    'bg-background'
                  )}
                >
                  <IconUser />
                </Link>
              )}
            </div>
          )}

          {/* Thread Description */}
          <></>

          {/* Thread Content */}
          <div className="border-x-[1px] mx-[46px] py-5 dark:border-mirage border-gray-300">
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
