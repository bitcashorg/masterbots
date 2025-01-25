'use client'

/**
 * Chat Component
 *
 * A complex chat interface that handles:
 * - Message management for new and existing chat threads
 * - Integration with AI models for message processing and responses
 * - Loading states for message generation and processing
 * - Chatbot configuration and metadata handling
 * - Chat history and message persistence
 * - ICL integration for metadata extraction and labelling
 * - Real-time message streaming and history management
 * - Chat thread creation and state management
 * - Message improvement and metadata extraction using AI
 * - Automatic scrolling behavior
 *
 * Key Features:
 * - Supports both popup and inline chat modes
 * - Handles message processing states (processing, digesting, generating, etc.)
 * - Manages chat thread creation and persistence
 * - Integrates with multiple chatbot models
 * - Provides real-time message streaming
 * - Maintains chat history and system prompts
 *
 * State Management:
 * - Uses useChat for message handling
 * - Manages loading states for UI feedback
 * - Tracks scroll position and bottom visibility
 * - Handles chat thread state and persistence
 */

//TODO: Refactor and optimize the Chat component into smaller sections for better performance and readability

import { ChatList } from '@/components/routes/chat/chat-list'
import { ChatPanel } from '@/components/routes/chat/chat-panel'
import { ChatScrollAnchor } from '@/components/routes/chat/chat-scroll-anchor'
import { botNames } from '@/lib/constants/bots-names'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { cn, scrollToBottomOfElement } from '@/lib/utils'
import type { ChatProps } from '@/types/types'
import type { Message as UiUtilsMessage } from '@ai-sdk/ui-utils'
import { useScroll } from 'framer-motion'
import type { Chatbot } from 'mb-genql'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAsync } from 'react-use'

export function Chat({
  chatbot: chatbotProps,
  className,
  chatPanelClassName,
  isPopup,
  scrollToBottom: scrollToBottomOfPopup,
  isAtBottom: isAtBottomOfPopup,
}: ChatProps) {
  const {
    activeThread,
    loadingState,
    isOpenPopup,
    sectionRef,
    isAtBottom: isAtBottomOfSection,
    setActiveThread,
    setIsOpenPopup,
    setLoadingState,
  } = useThread()
  const { activeChatbot } = useSidebar()
  const { isContinuousThread } = useThreadVisibility()
  const containerRef = React.useRef<HTMLDivElement>()
  const params = useParams<{ chatbot: string; threadId: string }>()
  const chatbot = chatbotProps || activeThread?.chatbot || (activeChatbot as Chatbot)
  const [
    { newChatThreadId: threadId, input, isLoading, allMessages, isNewChat },
    { appendWithMbContextPrompts, appendAsContinuousThread, reload, setInput },
  ] = useMBChat({
    chatbot,
  })
  const chatbotNames = useAsync(async () => (await botNames).get(params.chatbot), [])

  const { scrollY } = useScroll({
    container: containerRef as React.RefObject<HTMLElement>,
  })

  const { isAtBottom } = useAtBottom({
    ref: containerRef,
    scrollY,
  })

  // ? saffer way to debounce scroll to bottom
  let timeoutId: any
  const debounceScrollToBottom = (element: HTMLElement | undefined) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      scrollToBottomOfElement(element)
      clearTimeout(timeoutId)
    }, 150) //? Adjustable delay as necessary
  }

  const scrollToBottom = () => {
    if ((params.threadId && containerRef.current) || (!params.threadId && sectionRef.current)) {
      let element: any
      if (sectionRef.current) {
        element = sectionRef.current
      } else {
        element = containerRef.current
      }
      debounceScrollToBottom(element)
    }
  }

  const chatSearchMessage = (
    isNewChat: boolean,
    isContinuousThread: boolean,
    allMessages: UiUtilsMessage[],
  ) => {
    const threadTitle = allMessages.filter((m) => m.role === 'user')[0]?.content
    if (isContinuousThread && allMessages) {
      return `Create new thread from "${threadTitle}" by making a new question.`
    }
    if (isNewChat) {
      return `Start New Chat with ${chatbot.name}`
    }

    return `Continue This Chat with ${chatbot.name}`
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Not required here
  useEffect(() => {
    if (
      params.chatbot &&
      activeThread &&
      chatbotNames.value === activeThread?.chatbot.name
    ) {
      setIsOpenPopup(false)
      setActiveThread(null)
    }
  }, [chatbotNames])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Not required here
  useEffect(() => {
    if (isLoading && isOpenPopup && scrollToBottomOfPopup) {
      const timeout = setTimeout(() => {
        scrollToBottomOfPopup()
        clearTimeout(timeout)
      }, 150)
    }
  }, [isLoading, isOpenPopup])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Not required here
  useEffect(() => {
    if (!isLoading && loadingState) {
      setLoadingState(undefined)
    }
  }, [isLoading])

  return (
    <>
      {params.threadId && (
        <div
          ref={containerRef as React.Ref<HTMLDivElement>}
          className={cn('pb-[200px] pt-4 md:pt-10 h-full overflow-auto', className)}
        >
          <ChatList />
          <ChatScrollAnchor
            isAtBottom={
              params.threadId
                ? isAtBottom
                : isPopup
                  ? Boolean(isAtBottomOfPopup)
                  : isAtBottomOfSection
            }
            trackVisibility={isLoading}
          />
        </div>
      )}
      <ChatPanel
        className={`${activeThread || activeChatbot ? '' : 'hidden'} ${chatPanelClassName}`}
        scrollToBottom={
          isOpenPopup && isPopup && scrollToBottomOfPopup ? scrollToBottomOfPopup : scrollToBottom
        }
        id={params.threadId || isNewChat ? threadId : activeThread?.threadId}
        isLoading={isLoading}
        stop={stop}
        append={isContinuousThread ? appendAsContinuousThread : appendWithMbContextPrompts}
        reload={reload}
        messages={allMessages}
        input={input}
        setInput={setInput}
        chatbot={chatbot}
        placeholder={chatbot ? chatSearchMessage(isNewChat, isContinuousThread, allMessages) : ''}
        showReload={!isNewChat}
        isAtBottom={
          params.threadId ? isAtBottom : isPopup ? Boolean(isAtBottomOfPopup) : isAtBottomOfSection
        }
      />
    </>
  )
}
