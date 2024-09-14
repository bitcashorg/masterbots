'use client'

import React, { useRef, useEffect } from 'react'
import { ChatList } from '@/components/routes/chat/chat-list'
import { ChatPanel } from '@/components/routes/chat/chat-panel'
import { ChatScrollAnchor } from '@/components/routes/chat/chat-scroll-anchor'
import { cn, scrollToBottomOfElement } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { useAIChat } from '@/lib/hooks/use-ai-chat'
import { Message } from 'ai'
import { Chatbot } from 'mb-genql/generated'
import { useThread } from '@/lib/hooks/use-thread'

export function Chat({
  initialMessages,
  className,
  chatbot,
  threadId,
  chatPanelClassName,
  isPopup,
  scrollToBottom: scrollToBottomOfPopup,
  isAtBottom: isAtBottomOfPopup
}: ChatProps) {
  const {
    messages: allMessages,
    append: appendWithMbContextPrompts,
    reload,
    stop,
    isLoading,
    input,
    setInput,
    isNewChat,
  } = useAIChat(initialMessages ?? [], threadId, chatbot as Chatbot);
  const { isOpenPopup, isAtBottom } = useThread();

  const containerRef = useRef<HTMLDivElement>(null)
  const params = useParams<{ chatbot: string; threadId: string }>()

  const sendMessageFromResponse = async (bulletContent: string) => {
    const fullMessage = `Tell me more about ${bulletContent}`
    appendWithMbContextPrompts({
      role: 'user',
      content: fullMessage
    })
  }

  // Debounced scroll to bottom
  let timeoutId: NodeJS.Timeout
  const debounceScrollToBottom = (element: HTMLElement | undefined) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      scrollToBottomOfElement(element)
    }, 150)
  }

  const scrollToBottom = () => {
    if (containerRef.current) {
      debounceScrollToBottom(containerRef.current)
    }
  }

  useEffect(() => {
    if (isLoading && isOpenPopup && scrollToBottomOfPopup) {
      const timeout = setTimeout(() => {
        scrollToBottomOfPopup()
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [isLoading, isOpenPopup, scrollToBottomOfPopup])

  return (
    <>
      {params.threadId && (
        <div
          ref={containerRef}
          className={cn(
            'pb-[200px] pt-4 md:pt-10 h-full overflow-auto',
            className
          )}
        >
          <ChatList
            chatbot={chatbot}
            messages={allMessages}
            sendMessageFn={sendMessageFromResponse}
          />
          <ChatScrollAnchor
            isAtBottom={isPopup ? !!isAtBottomOfPopup : !!isAtBottom}
            trackVisibility={isLoading}
          />
        </div>
      )}

      {((isOpenPopup && isPopup) || (!isOpenPopup && !isPopup)) && (
        <ChatPanel
          className={`${!chatbot ? 'hidden' : ''} ${chatPanelClassName}`}
          scrollToBottom={isPopup && scrollToBottomOfPopup ? scrollToBottomOfPopup : scrollToBottom}
          id={params.threadId || isNewChat ? threadId : undefined}
          isLoading={isLoading}
          stop={stop}
          append={appendWithMbContextPrompts}
          reload={reload}
          messages={allMessages}
          input={input}
          setInput={setInput}
          chatbot={chatbot}
          placeholder={
            chatbot
              ? isNewChat
                ? `Start New Chat with ${chatbot.name}`
                : `Continue This Chat with ${chatbot.name}`
              : ''
          }
          showReload={!isNewChat}
          isAtBottom={isPopup ? isAtBottomOfPopup : isAtBottom}
        />
      )}
    </>
  )
}

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  chatbot?: Chatbot
  threadId: string
  newThread?: boolean
  chatPanelClassName?: string
  isPopup?: boolean
  scrollToBottom?: () => void
  isAtBottom?: boolean
}