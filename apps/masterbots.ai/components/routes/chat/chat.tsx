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

import { ChatPanel } from '@/components/routes/chat/chat-panel'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import type { ChatProps } from '@/types/types'
import type { Message as UiUtilsMessage } from '@ai-sdk/ui-utils'
import type { Message as AiMessage } from 'ai'
import type { Chatbot } from 'mb-genql'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export function Chat({
  chatbot: chatbotProps,
  className,
  chatPanelClassName,
  isPopup,
  scrollToBottomOfPopup,
  isAtBottom: isAtBottomOfPopup,
}: ChatProps) {
  const {
    activeThread,
    loadingState,
    isOpenPopup,
    sectionRef,
    isAtBottomOfSection,
    setActiveThread,
    setIsOpenPopup,
    setLoadingState,
  } = useThread()
  const { activeChatbot } = useSidebar()
  const { isContinuousThread } = useThreadVisibility()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const threadRef = React.useRef<HTMLDivElement>(null)
  const params = useParams<{ chatbot: string; threadId: string }>()
  const chatbot = chatbotProps || activeThread?.chatbot || (activeChatbot as Chatbot)
  const [
    { newChatThreadId: threadId, input, isLoading, allMessages, isNewChat },
    { appendWithMbContextPrompts, appendAsContinuousThread, reload, setInput },
  ] = useMBChat()
  // * useThread has duplicated logic for isAtBottom, isAtBottomOfSection, and isAtBottomOfPopup (basically useMBScroll)
  const pathname = usePathname()
  const prevPathname = React.useRef(pathname)

  const { isNearBottom, smoothScrollToBottom, scrollToTop } = useMBScroll({
    containerRef,
    threadRef,
    isNewContent: isLoading,
    hasMore: false, //* true for implementing infinite scroll
    isLast: true,
    loading: isLoading,
    loadMore: () => {}, //* Implement if adding infinite scroll
  })

  // ? safer way to debounce scroll to bottom
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let timeoutId: any
  const debounceScrollToBottom = (element: HTMLElement | null) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (element) {
        smoothScrollToBottom()
      }
      clearTimeout(timeoutId)
    }, 150)
  }

  const scrollToBottom = () => {
    console.log('Scrolling to bottom')
    if (containerRef.current || sectionRef.current) {
      const element: HTMLElement | null = sectionRef.current ?? containerRef.current
      debounceScrollToBottom(element)
    }
  }

  const chatSearchMessage = (
    isNewChat: boolean,
    isContinuousThread: boolean,
    allMessages: AiMessage[],
  ) => {
    const threadTitle = allMessages.filter((m) => m.role === 'user')[0]?.content
    if (isContinuousThread && allMessages) {
      // return `Create new thread from "${threadTitle}" by making a new question.`
      return 'Continue this thread here'
    }
    if (isNewChat) {
      return `Start New Chat with ${chatbot.name}`
    }

    return `Continue This Chat with ${chatbot.name}`
  }

  const resetState = () => {
    setIsOpenPopup(false)
    setActiveThread(null)
  }

  const resetLoadState = () => {
    setLoadingState(undefined)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Not required here
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname

      resetState()
    }
  }, [pathname])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Not required here
  useEffect(() => {
    if (!isLoading && loadingState) {
      resetLoadState()
    }
  }, [isLoading])

  return (
    <>
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
          params.threadId
            ? isNearBottom
            : isPopup
              ? Boolean(isAtBottomOfPopup)
              : isAtBottomOfSection
        }
      />
    </>
  )
}
