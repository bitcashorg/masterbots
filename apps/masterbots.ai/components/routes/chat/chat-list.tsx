'use client'

//* ChatList component renders a chat interface, managing message pairs and displaying them in an accordion format.

import { ChatAccordion } from '@/components/routes/chat/chat-accordion'
import { ChatMessage } from '@/components/routes/chat/chat-message'
import { ShortMessage } from '@/components/shared/short-message'
import { useScroll } from '@/lib/hooks/use-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, createMessagePairs } from '@/lib/utils'
import type { Message } from 'ai'
import type { Chatbot } from 'mb-genql'
import React, { useRef } from 'react'

export interface ChatList {
  messages?: Message[] //* Array of messages to display in the chat
  sendMessageFn?: (message: string) => void //* Optional function to send messages
  chatbot?: Chatbot //* Chatbot configuration, used to format message display
  isThread?: boolean //* Indicates if messages are displayed in thread format
  className?: string //* Additional class for styling main container
  chatContentClass?: string //* Class for styling chat content section
  chatTitleClass?: string //* Class for styling chat title
  chatArrowClass?: string //* Class for styling arrow icon in the chat
  containerRef?: React.RefObject<HTMLDivElement> //* Optional ref for chat container
  isNearBottom?: boolean //* Tracks if user is near the bottom of the chat for auto-scroll
}

type MessagePair = {
  userMessage: Message // User's message in the chat pair
  chatGptMessage: Message[] // Array of chatbot responses for a user message
}

export function ChatList({
  className,
  messages = [],
  sendMessageFn,
  chatbot,
  isThread = true,
  chatContentClass,
  chatTitleClass,
  chatArrowClass,
  containerRef,
  isNearBottom
}: ChatList) {
  const [pairs, setPairs] = React.useState<MessagePair[]>([])
  const {
    isNewResponse,
    isLoadingMessages,
    allMessages,
    sendMessageFromResponse
  } = useThread()
  const localContainerRef = useRef<HTMLDivElement>(null)

  const effectiveContainerRef = containerRef || localContainerRef

  useScroll({
    containerRef: effectiveContainerRef,
    threadRef: effectiveContainerRef,
    isNewContent: isNewResponse,
    hasMore: false,
    isLast: true,
    loading: isLoadingMessages,
    loadMore: () => {}
  })

  React.useEffect(() => {
    const messageList = messages.length > 0 ? messages : allMessages
    // *Prevent unnecessary updates: only set pairs if the new message list is different
    if (messageList.length) {
      const prePairs: MessagePair[] = createMessagePairs(
        messageList
      ) as MessagePair[]
      setPairs(prevPairs => {
        const prevString = JSON.stringify(prevPairs)
        const newString = JSON.stringify(prePairs)
        if (prevString !== newString) {
          return prePairs
        }
        return prevPairs
      })
    } else {
      setPairs([])
    }
  }, [messages, allMessages])

  if (messages.length === 0 && allMessages.length === 0) return null

  return (
    <div
      ref={effectiveContainerRef}
      className={`relative max-w-3xl px-4 mx-auto ${className || ''} ${isThread ? 'flex flex-col gap-3' : ''}`}
    >
      {pairs.map((pair: MessagePair, key: number) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={key}>
          <ChatAccordion
            defaultState={
              key === 0 || (key === pairs.length - 1 && isNewResponse)
            }
            className={` ${isThread ? 'relative' : ''}`}
            triggerClass={`dark:border-b-mirage border-b-gray-300
          ${isThread ? 'sticky top-0 md:-top-10 z-[1] dark:bg-[#18181b] bg-[#f4f4f5] !border-l-[transparent] px-3 [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]' : 'px-[calc(47px-0.25rem)] '}
          py-[0.4375rem] dark:hover:bg-mirage hover:bg-gray-300 ${!isThread && key === 0 ? 'hidden' : ''} ${chatTitleClass || ''}`}
            contentClass="!border-l-[transparent]"
            arrowClass={`${isThread ? 'top-4' : 'right-5 top-4'} ${chatArrowClass || ''}`}
          >
            {/* Thread Title */}
            {!isThread && key === 0 ? (
              ''
            ) : (
              <ChatMessage
                actionRequired={false}
                chatbot={chatbot}
                message={pair.userMessage}
                sendMessageFromResponse={
                  sendMessageFn ? sendMessageFn : sendMessageFromResponse
                }
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
            <div
              className={cn(
                'mx-4 md:mx-[46px] px-1 py-4 border-transparent dark:border-x-mirage border-x-gray-300 border',
                { '!border-[transparent]': !isThread && key === 0 },
                chatContentClass
              )}
            >
              {/* TODO: place a better loader */}
              {isLoadingMessages ? (
                <div className="flex items-center justify-center w-full h-12">
                  <div className="transition-all w-6 h-6 border-2 border-t-[2px] rounded-full border-x-gray-300 animate-spin" />
                </div>
              ) : (
                ''
              )}
              {pair.chatGptMessage.length > 0
                ? pair.chatGptMessage.map((message, index) => (
                    <ChatMessage
                      actionRequired={false}
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={index}
                      chatbot={chatbot}
                      message={message}
                      sendMessageFromResponse={
                        sendMessageFn ? sendMessageFn : sendMessageFromResponse
                      }
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
