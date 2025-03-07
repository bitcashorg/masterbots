'use client'

import { MessagePairs } from '@/components/routes/chat/chat-list/message-pairs'
import { type FileAttachment, getUserIndexedDBKeys } from '@/lib/hooks/use-chat-attachments'
import { useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, createMessagePairs } from '@/lib/utils'
import type { Message } from 'ai'
import { isEqual } from 'lodash'
import type { Chatbot } from 'mb-genql'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'
import { useAsyncFn } from 'react-use'

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
  sendMessageFn,
}: ChatList) {
  const { data: session } = useSession()
  const indexedDBKeys = getUserIndexedDBKeys(session?.user?.id)
  const { getAllItems } = useIndexedDB(indexedDBKeys)
  const [userAttachments, setUserAttachments] = React.useState<FileAttachment[]>([])
  const [_, getUserAttachments] = useAsyncFn(async () => {
    const attachments = await getAllItems()
    setUserAttachments(attachments as FileAttachment[])

    return attachments
  }, [session])
  const [pairs, setPairs] = React.useState<MessagePair[]>([])
  const [previousConversationPairs, setPreviousConversationPairs] = React.useState<MessagePair[]>(
    [],
  )
  const { isNewResponse, activeThread } = useThread()
  const chatListRef = useRef<HTMLDivElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (session) {
      getUserAttachments()
    }
  }, [session, messages, activeThread])

  //? Uses the external ref if provided, otherwise it uses our internal refs
  const effectiveContainerRef = externalContainerRef || chatListRef
  const effectiveThreadRef = messageContainerRef

  const chatMessages = (messages || activeThread?.messages || []).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )
  const previousChatMessages = (activeThread?.thread?.messages || []).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  const { isNearBottom } = useMBScroll({
    containerRef: effectiveContainerRef,
    threadRef: effectiveThreadRef,
    isNewContent: isNewResponse,
    hasMore: false,
    isLast: true,
    loading: isLoadingMessages,
    loadMore: () => {},
  })

  useEffect(() => {
    if (chatMessages?.length) {
      const prePairs: MessagePair[] = createMessagePairs(chatMessages) as MessagePair[]
      setPairs((prevPairs) => {
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
      const prePairs: MessagePair[] = createMessagePairs(previousChatMessages) as MessagePair[]
      setPreviousConversationPairs((prevPairs) => {
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
      className={cn('relative max-w-3xl px-4 mx-auto', className, {
        'flex flex-col gap-3': isThread,
      })}
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
          userAttachments={userAttachments as FileAttachment[]}
        />
      </div>
    </div>
  )
}
