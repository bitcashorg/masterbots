'use client'

import { ChatMessage } from '@/components/routes/chat/chat-message'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ShortMessage } from '@/components/shared/short-message'
import { Separator } from '@/components/ui/separator'
import { useScroll } from '@/lib/hooks/use-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, createMessagePairs } from '@/lib/utils'
import type { Message } from 'ai'
import { GlobeIcon } from 'lucide-react'
import type { Chatbot } from 'mb-genql'
import React, { useEffect, useRef } from 'react'

export interface ChatList {
  messages?: Message[]
  chatbot?: Chatbot
  isThread?: boolean
  className?: string
  chatContentClass?: string
  chatTitleClass?: string
  chatArrowClass?: string
  containerRef?: React.RefObject<HTMLDivElement>
  isNearBottom?: boolean
  isLoadingMessages?: boolean
  sendMessageFn?: (message: string) => void
}

type MessagePair = {
  userMessage: Message
  chatGptMessage: Message[]
}

export function ChatList({
  className,
  messages,
  isThread = true,
  isLoadingMessages = false,
  chatContentClass,
  chatTitleClass,
  chatArrowClass,
  containerRef,
  sendMessageFn,
  isNearBottom,
}: ChatList) {
  const [pairs, setPairs] = React.useState<MessagePair[]>([])
  const [previousConversationPairs, setPreviousConversationPairs] = React.useState<MessagePair[]>([])
  const { isNewResponse, activeThread } = useThread()
  const localContainerRef = useRef<HTMLDivElement>(null)
  const effectiveContainerRef = containerRef || localContainerRef
  const chatMessages = (messages || activeThread?.messages || [])
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  const previousChatMessages = (activeThread?.thread?.messages || [])
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  useScroll({
    containerRef: effectiveContainerRef,
    threadRef: effectiveContainerRef,
    isNewContent: isNewResponse,
    hasMore: false,
    isLast: true,
    loading: isLoadingMessages,
    loadMore: () => { }
  })

  useEffect(() => {
    if (chatMessages?.length) {
      const prePairs: MessagePair[] = createMessagePairs(chatMessages) as MessagePair[]
      setPairs(prevPairs => {
        const prevString = JSON.stringify(prevPairs)
        const newString = JSON.stringify(prePairs)
        if (prevString !== newString) {
          return prePairs
        }
        return prevPairs
      })
    }
  }, [chatMessages])

  useEffect(() => {
    if (previousChatMessages?.length) {
      const prePairs: MessagePair[] = createMessagePairs(previousChatMessages) as MessagePair[]
      setPreviousConversationPairs(prevPairs => {
        const prevString = JSON.stringify(prevPairs)
        const newString = JSON.stringify(prePairs)
        if (prevString !== newString) {
          return prePairs
        }
        return prevPairs
      })
    }
  }, [previousChatMessages])

  if (chatMessages?.length === 0) return null

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
        previousPairs={previousConversationPairs}
        isThread={isThread}
        chatTitleClass={chatTitleClass}
        chatArrowClass={chatArrowClass}
        chatContentClass={chatContentClass}
        sendMessageFn={sendMessageFn}
      />
    </div>
  )
}

function MessagePairs({
  pairs,
  previousPairs,
  isThread,
  chatTitleClass,
  chatArrowClass,
  chatContentClass,
  sendMessageFn,
}: {
  pairs: MessagePair[]
  previousPairs: MessagePair[]
  chatbot?: Chatbot
  isThread: boolean
  chatTitleClass?: string
  chatArrowClass?: string
  chatContentClass?: string
  sendMessageFn?: (message: string) => void
}) {
  const { isNewResponse } = useThread()

  // TODO: Re-arrange the questions when the thread has a previous conversation from a different thread
  return (
    <>
      {previousPairs.map((pair: MessagePair, key: number, pairsArray) => (
        <SharedAccordion
          key={`${pair.userMessage.createdAt}-${pair.chatGptMessage[0]?.id ?? 'pending'}`}
          defaultState={
            key === 0 ||
            key === pairsArray.length - 1 ||
            (key === pairsArray.length - 2 && isNewResponse)
          }
          className={cn({ relative: isThread })}
          triggerClass={cn(
            '!border-accent py-[0.4375rem] hover:bg-accent',
            {
              'sticky top-0 md:-top-10 z-[1] dark:bg-[#18181b] bg-[#f4f4f5] !border-l-[transparent] px-3 [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]':
                isThread,
              'px-[calc(32px-0.25rem)]': !isThread,
              hidden: !isThread && key === 0,
            },
            chatTitleClass,
          )}
          contentClass={cn('!border-l-accent', chatContentClass)}
          arrowClass={cn({ 'top-4': isThread, 'right-5 top-4': !isThread }, chatArrowClass)}
          variant="chat"
        >
          {/* Thread Title */}
          {!isThread && key === 0 ? (
            ''
          ) : (
            <ChatMessage actionRequired={false} message={pair.userMessage} />
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
              chatContentClass,
            )}
          >
            <ChatLoadingState />
            {pair.chatGptMessage.length > 0
              ? pair.chatGptMessage.map((message) => (
                <ChatMessage
                  key={message.id}
                  actionRequired={false}
                  message={message}
                  sendMessageFromResponse={sendMessageFn}
                />
              ))
              : ''}
          </div>
        </SharedAccordion>
      ))}
      {(previousPairs.length > 0 && pairs.length > 0) && (
        <Separator className="my-6 h-1 rounded-full" />
      )}
      {pairs.map((pair: MessagePair, key: number, pairsArray) => (
        <SharedAccordion
          key={`${pair.userMessage.createdAt}-${pair.chatGptMessage[0]?.id ?? 'pending'}`}
          defaultState={key === 0 || key === pairsArray.length - 1 || (key === pairsArray.length - 2 && isNewResponse)}
          className={cn({ 'relative': isThread })}
          triggerClass={cn(
            'dark:border-b-mirage border-b-gray-300 py-[0.4375rem] dark:hover:bg-mirage hover:bg-gray-300',
            {
              'sticky top-0 md:-top-10 z-[1] dark:bg-[#18181b] bg-[#f4f4f5] !border-l-[transparent] px-3 [&[data-state=open]]:!bg-gray-300 dark:[&[data-state=open]]:!bg-mirage [&[data-state=open]]:rounded-t-[8px]': isThread,
              'px-[calc(32px-0.25rem)]': !isThread,
              'hidden': !isThread && key === 0,
            },
            chatTitleClass
          )}
          contentClass={cn(
            '!border-l-transparent',
            chatContentClass
          )}
          arrowClass={cn(
            { 'top-4': isThread, 'right-5 top-4': !isThread },
            chatArrowClass
          )}
          variant="chat"
        >
          {/* Thread Title */}
          {!isThread && key === 0 ? (
            ''
          ) : (
            <ChatMessage
              actionRequired={false}
              message={pair.userMessage}
            />
          )}

          {/* Thread Description */}
          {isThread ? (
            <div className="opacity-50 pb-3 overflow-hidden text-sm mt-[0.375rem]">
              {pair.chatGptMessage[0]?.content ? (
                <div className="flex-1 px-1 space-y-2 overflow-hidden text-left">
                  <ShortMessage content={pair.chatGptMessage[0]?.content} />
                </div>
              ) : ''}
            </div>
          ) : <></>}

          {/* Thread Content */}
          <div
            className={cn(
              'mx-4 md:mx-[46px] px-1 py-4 border-transparent dark:border-x-mirage border-x-gray-300 border h-full',
              { '!border-[transparent]': !isThread && key === 0 },
              chatContentClass
            )}
          >
            <ChatLoadingState />
            {pair.chatGptMessage.length > 0
              ? pair.chatGptMessage.map((message) => (
                <ChatMessage
                  key={message.id}
                  actionRequired={false}
                  message={message}
                  sendMessageFromResponse={sendMessageFn}
                />
              ))
              : ''}
          </div>
        </SharedAccordion>
      ))}
    </>
  )
}

export function ChatLoadingState() {
  const { activeTool, loadingState } = useThread()

  if (!loadingState || !activeTool?.toolName) return null

  if (loadingState?.match(/^(processing|digesting|polishing)/)) {
    return (
      <div className="flex items-center justify-center w-full h-20">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-ping" />
      </div>
    )
  }

  switch (activeTool?.toolName) {
    case 'webSearch':
      return (
        <div className='flex items-center w-full h-20 gap-4 opacity-65'>
          <GlobeIcon className="relative size-6 animate-bounce top-2" />
          <p className="flex flex-col gap-1 leading-none">
            <span>
              Searching on the web{' '}
              {['first-dot', 'second-dot', 'third-dot'].map((key, index) => (
                <span
                  key={key}
                  className="animate-pulse rounded-full text-4xl h-0.5 leading-none"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  .
                </span>
              ))}
            </span>
            <b className="text-xs">
              Searching for &quot;{activeTool.args.query as string}&quot;
            </b>
          </p>
        </div>
      )
    default:
      return (
        <div className="flex items-center justify-center w-full h-20">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-ping" />
        </div>
      )
  }
}