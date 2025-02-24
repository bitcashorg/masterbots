'use client'

import { ChatMessage } from '@/components/routes/chat/chat-message'
import { SharedAccordion } from '@/components/shared/shared-accordion'
import { ShortMessage } from '@/components/shared/short-message'
import { Separator } from '@/components/ui/separator'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, createMessagePairs } from '@/lib/utils'
import type { Message } from 'ai'
import { isEqual } from 'lodash'
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
  containerRef: externalContainerRef,
  sendMessageFn
}: ChatList) {
  const [pairs, setPairs] = React.useState<MessagePair[]>([])
  const [previousConversationPairs, setPreviousConversationPairs] =
    React.useState<MessagePair[]>([])
  const { isNewResponse, activeThread } = useThread()
  const chatListRef = useRef<HTMLDivElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)

  //? Uses the external ref if provided, otherwise it uses our internal refs
  const effectiveContainerRef = externalContainerRef || chatListRef
  const effectiveThreadRef = messageContainerRef

  const chatMessages = (messages || activeThread?.messages || []).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  const previousChatMessages = (activeThread?.thread?.messages || []).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  const { isNearBottom } = useMBScroll({
    containerRef: effectiveContainerRef,
    threadRef: effectiveThreadRef,
    isNewContent: isNewResponse,
    hasMore: false,
    isLast: true,
    loading: isLoadingMessages,
    loadMore: () => {}
  })

  useEffect(() => {
    if (chatMessages?.length) {
      const prePairs: MessagePair[] = createMessagePairs(
        chatMessages
      ) as MessagePair[]
      setPairs(prevPairs => {
        if (!isEqual(prevPairs, prePairs)) {
          return prePairs
        }
        return prevPairs
      })
    }
  }, [chatMessages])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (previousChatMessages?.length) {
      const prePairs: MessagePair[] = createMessagePairs(
        previousChatMessages
      ) as MessagePair[]
      setPreviousConversationPairs(prevPairs => {
        if (!isEqual(prevPairs, prePairs)) {
          return prePairs
        }
        return prevPairs
      })
    }
    if (!activeThread?.thread && previousConversationPairs.length > 0) {
      setPreviousConversationPairs([])
    }
  }, [previousChatMessages, activeThread?.thread])

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
      <div ref={effectiveThreadRef} className="min-h-full">
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
  sendMessageFn
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
        <MessagePairAccordion
          key={`${pair.userMessage.createdAt}-${pair.chatGptMessage[0]?.id ?? 'pending'}`}
          pair={pair}
          isThread={isThread}
          index={key}
          arrayLength={pairsArray.length}
          isNewResponse={isNewResponse}
          type="previous"
          chatTitleClass={chatTitleClass}
          chatContentClass={chatContentClass}
          sendMessageFn={sendMessageFn}
        />
      ))}
      {previousPairs.length > 0 && pairs.length > 0 && (
        <Separator className="relative mt-6 -bottom-1.5 h-1.5 z-[2] rounded-sm bg-iron dark:bg-mirage" />
      )}
      {pairs.map((pair: MessagePair, key: number, pairsArray) => pair.chatGptMessage[0] && pair.userMessage ? (
        <>
          <MessagePairAccordion
            key={`${pair.userMessage.createdAt}-${pair.chatGptMessage[0]?.id ?? 'pending'}`}
            pair={pair}
            isThread={isThread}
            index={key}
            arrayLength={pairsArray.length}
            isNewResponse={isNewResponse}
            type="current"
            chatTitleClass={chatTitleClass}
            chatContentClass={chatContentClass}
            sendMessageFn={sendMessageFn}
          />
          {pairsArray.length > 1 && key === pairsArray.length - 1 ? (
            <ChatLoadingState key="chat-loading-state" />
          ) : null}
        </>
      ) : null)}
    </>
  )
}

export function MessagePairAccordion({
  pair,
  isThread,
  index,
  arrayLength,
  isNewResponse,
  type,
  ...props
}: {
  pair: MessagePair
  isThread: boolean
  index: number
  arrayLength: number
  isNewResponse: boolean
  type: 'previous' | 'current'
  chatTitleClass?: string
  chatContentClass?: string
  sendMessageFn?: (message: string) => void
}) {
  const { activeThread } = useThread()
  const isPrevious = type === 'previous'

  return (
    <SharedAccordion
      defaultState={
        // ? Case for when there is more than one message and we want to hide the first message
        // (!index && arrayLength <= 1)
        // ? Case for when we have the first message in the conversation or last and both are not previous 
        ((!index || index === arrayLength - 1) && !isPrevious) ||
        // ? Case for when we have the first message in the previous conversation
        (!index  && isPrevious)
      }
      className={cn(
        { relative: isThread },
        // Adds subtle background tint and left border for previous messages
        isPrevious && 'bg-accent/25 rounded-[8px] border-l-accent/20'
      )}
      triggerClass={cn(
        'py-[0.4375rem]',
        {
          'sticky top-0 md:-top-10 z-[1] px-3 [&[data-state=open]]:rounded-t-[8px]':
            isThread,
          'px-[calc(32px-0.25rem)]': !isThread,
          hidden: !isThread && index === 0, // Style differences for previous vs current messages
          'dark:bg-[#1d283a9a] bg-iron !border-l-[transparent] [&[data-state=open]]:!bg-gray-400/50 dark:[&[data-state=open]]:!bg-mirage':
            !isPrevious,
          'bg-accent/10 dark:bg-accent/10 hover:bg-accent/30 hover:dark:bg-accent/30 border-l-accent/10 dark:border-l-accent/10 [&[data-state=open]]:!bg-accent/30 dark:[&[data-state=open]]:!bg-accent/30':
            isPrevious
        },
        props.chatTitleClass
      )}
      contentClass={cn(
        {
          // Border styling differences
          '!border-l-accent/20': isPrevious,
          '!border-l-transparent': !isPrevious
        },
        props.chatContentClass
      )}
      variant="chat"
    >
      {/* Thread Title with indicator for previous messages */}
      {!isThread && index === 0 ? (
        ''
      ) : (
        <div
          className={cn('flex items-start gap-2')}
        >
          <ChatMessage actionRequired={false} message={pair.userMessage} />
        </div>
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
          'mx-4 md:mx-[46px] px-1 py-4  h-full',
          {
            '!border-[transparent]': !isThread && index === 0,
          },
          props.chatContentClass
        )}
      >
        {isPrevious && index === 0 ? (
          <>
            <span className="absolute top-1 -left-5 px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-accent text-accent-foreground">
              Previous Thread
            </span>
            <div className="pb-3 mt-4 overflow-hidden opacity-50">
              Continued from{' '}
              <b>&ldquo;{pair.userMessage.content.trim()}&rdquo;</b> thread
              {activeThread?.thread?.user?.username
                ? `, by ${activeThread?.thread?.user?.username}.`
                : '.'}
            </div>
          </>
        ) : (
          ''
        )}
        {pair.chatGptMessage.length > 0
          ? pair.chatGptMessage.map(message => (
              <ChatMessage
                key={message.id}
                actionRequired={false}
                message={message}
                sendMessageFromResponse={props.sendMessageFn}
              />
            ))
          : ''}
      </div>
    </SharedAccordion>
  )
}

export function ChatLoadingState() {
  const { activeTool, loadingState } = useThread()

  const isPreProcessing = Boolean(loadingState?.match(/processing|digesting|polishing/))

  switch (activeTool?.toolName) {
    case 'webSearch':
      return (
        <div className="flex items-center w-full h-20 gap-4 opacity-65">
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
      return isPreProcessing ? (
        <div className="flex items-center justify-center w-full h-20">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-ping" />
        </div>
      ) : null
  }
}
