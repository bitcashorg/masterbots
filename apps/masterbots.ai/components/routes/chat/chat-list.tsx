'use client'

//* ChatList component renders a chat interface, managing message pairs and displaying them in an accordion format.

import { ChatAccordion } from '@/components/routes/chat/chat-accordion'
import { ChatMessage } from '@/components/routes/chat/chat-message'
import { ShortMessage } from '@/components/shared/short-message'
import { useScroll } from '@/lib/hooks/use-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, createMessagePairs } from '@/lib/utils'
import type { Message } from 'ai'
import { GlobeIcon } from 'lucide-react'
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
  isNearBottom,
}: ChatList) {
  const [pairs, setPairs] = React.useState<MessagePair[]>([])
  const {
    isNewResponse,
    isLoadingMessages,
    allMessages,
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
    loadMore: () => { }
  })

  const messageList = messages.length > 0 ? messages : allMessages

  React.useEffect(() => {
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
    }
  }, [messageList])

  if (messages.length === 0 && allMessages.length === 0) return null

  return (
    <div
      ref={effectiveContainerRef}
      className={cn(
        'relative max-w-3xl px-4 mx-auto',
        className,
        { 'flex flex-col gap-3': isThread }
      )}
    >
      <MessagePairs
        pairs={pairs}
        chatbot={chatbot}
        sendMessageFn={sendMessageFn}
        isThread={isThread}
        chatTitleClass={chatTitleClass}
        chatArrowClass={chatArrowClass}
        chatContentClass={chatContentClass}
      />
    </div>
  )
}

function MessagePairs({
  pairs,
  chatbot,
  sendMessageFn,
  isThread,
  chatTitleClass,
  chatArrowClass,
  chatContentClass,
}: {
  pairs: MessagePair[]
  chatbot?: Chatbot
  sendMessageFn?: (message: string) => void
  isThread: boolean
  chatTitleClass?: string
  chatArrowClass?: string
  chatContentClass?: string
}) {
  const {
    isNewResponse,
    isLoadingMessages,
    activeTool,
    sendMessageFromResponse
  } = useThread()

  const ChatLoadingState = () => (isLoadingMessages || activeTool) && (
    <div className='w-full h-24 flex gap-3 items-center'>
      {(() => {
        switch (activeTool) {
          case 'webSearch':
            return (
              <>
                <GlobeIcon className="w-6 h-6 text-gray-500 animate-bounce" />
                <p className="text-center text-gray-500">
                  Searching the web
                  {Array.from({ length: 3 }).map((_, index) => (
                    <span key={index} className="animate-pulse rounded-full bg-primary size-0.5" style={{ animationDelay: `${index * 100}ms` }} />
                  ))}
                </p>
              </>
            )
          default:
            return (
              <div className="flex items-center justify-center w-full h-12">
                <div className="transition-all w-6 h-6 border-2 border-t-[2px] rounded-full border-x-gray-300 animate-spin" />
              </div>
            )
        }
      })()}
    </div>
  )


  return <>
    {pairs.map((pair: MessagePair, key: number) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <ChatAccordion
        key={`message-pair-${key}`}
        defaultState={
          key === 0 || (key === pairs.length - 1 && isNewResponse)
        }
        className={cn({ 'relative': isThread })}
        triggerClass={cn(
          'dark:border-b-mirage border-b-gray-300 py-[0.4375rem] dark:hover:bg-mirage hover:bg-gray-300',
          {
            'sticky top-0 md:-top-10 z-[1] dark:bg-[#18181b] bg-[#f4f4f5] !border-l-[transparent] px-3 [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]': isThread,
            'px-[calc(47px-0.25rem)]': !isThread,
            'hidden': !isThread && key === 0,
          },
          chatTitleClass
        )}
        contentClass="!border-l-[transparent]"
        arrowClass={cn(
          { 'top-4': isThread, 'right-5 top-4': !isThread },
          chatArrowClass
        )}
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
            'mx-4 md:mx-[46px] px-1 py-4 border-transparent dark:border-x-mirage border-x-gray-300 border h-full',
            { '!border-[transparent]': !isThread && key === 0 },
            chatContentClass
          )}
        >
          {/* TODO: place a better loader */}
          <ChatLoadingState />
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
    ))}
  </>
}
