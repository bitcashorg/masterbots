'use client'

import { useChat } from 'ai/react'
import type { CreateMessage, Message } from 'ai/react'
import { useScroll } from 'framer-motion'
import type { ChatRequestOptions } from 'ai'
import { uniqBy } from 'lodash'
import type { Chatbot } from '@repo/mb-genql'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { ChatList } from '@/components/c/chat-list'
import { ChatPanel } from '@/components/c/chat-panel'
import { ChatScrollAnchor } from '@/components/c/chat-scroll-anchor'
import { cn, extractBetweenMarkers, scrollToBottomOfElement } from '@/lib/utils'
import { useAtBottom } from '@/hooks/use-at-bottom'
import { createThread, getThread, saveNewMessage } from '@/services/hasura'
import { useThread } from '@/hooks/use-thread'
import { botNames } from '@/lib/bots-names'
import { useSidebar } from '@/hooks/use-sidebar'
import { useGlobalStore } from '@/hooks/use-global-store'

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
  const { hasuraJwt, user } = useGlobalStore()
  const {
    allMessages: threadAllMessages,
    initialMessages: threadInitialMessages,
    activeThread,
    setActiveThread,
    setIsNewResponse,
    setIsOpenPopup,
    isOpenPopup,
    sectionRef,
    isAtBottom: isAtBottomOfSection
  } = useThread()
  const { activeChatbot } = useSidebar()
  const containerRef = React.useRef<HTMLDivElement>()

  const params = useParams<{ chatbot: string; threadId: string }>()
  const isNewChat = Boolean(!params.threadId && !activeThread)

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      // we remove previous assistant responses to get better responses thru
      // our prompting strategy
      initialMessages:
        params.threadId || isNewChat
          ? initialMessages.filter(m => m.role === 'system')
          : threadInitialMessages.filter(m => m.role === 'system'),
      id: params.threadId || isNewChat ? threadId : activeThread.threadId,
      body: {
        id: params.threadId || isNewChat ? threadId : activeThread.threadId
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      async onFinish(message: Message) {
        await saveNewMessage({
          role: 'assistant',
          threadId:
            params.threadId || isNewChat ? threadId : activeThread.threadId,
          content: message.content,
          jwt: hasuraJwt
        })
      }
    })

  const { scrollY } = useScroll({
    container: containerRef as React.RefObject<HTMLElement>
  })

  const { isAtBottom } = useAtBottom({
    ref: containerRef,
    scrollY
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
    if (
      (params.threadId && containerRef.current) ||
      (!params.threadId && sectionRef.current)
    ) {
      let element: any
      if (sectionRef.current) {
        element = sectionRef.current
      } else {
        element = containerRef.current
      }
      debounceScrollToBottom(element)
    }
  }

  // we merge past assistant and user messages for ui only
  // we remove system prompts from ui
  const allMessages =
    params.threadId || isNewChat
      ? uniqBy(initialMessages.concat(messages), 'content').filter(
          m => m.role !== 'system'
        )
      : uniqBy(threadAllMessages.concat(messages), 'content').filter(
          m => m.role !== 'system'
        )

  const sendMessageFromResponse = async (bulletContent: string) => {
    setIsNewResponse(true)
    const fullMessage = `Tell me more about ${bulletContent}`
    await saveNewMessage({
      role: 'user',
      threadId: params.threadId || isNewChat ? threadId : activeThread.threadId,
      content: fullMessage,
      jwt: hasuraJwt
    })
    append({
      role: 'user',
      content: `First, think about the following questions and requests: [${getAllUserMessagesAsStringArray(
        allMessages
      )}].  Then answer this question: ${fullMessage}`
    })
  }

  // we extend append function to add our system prompts
  const appendWithMbContextPrompts = async (
    userMessage: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    if (isNewChat && chatbot) {
      await createThread({
        threadId,
        chatbotId: chatbot.chatbotId,
        jwt: hasuraJwt,
        userId: user.userId,
        isPublic: activeChatbot.name !== 'BlankBot'
      })
      const thread = await getThread({
        threadId
      })
      setActiveThread(thread)
      setIsOpenPopup(true)
    }
    if (activeThread.threadId) {
      setIsOpenPopup(true)
    }
    await saveNewMessage({
      role: 'user',
      threadId: params.threadId || isNewChat ? threadId : activeThread.threadId,
      content: userMessage.content,
      jwt: hasuraJwt
    })

    setIsNewResponse(true)

    return append(
      isNewChat
        ? userMessage
        : {
            ...userMessage,
            content: `First, think about the following questions and requests: [${getAllUserMessagesAsStringArray(
              allMessages
            )}].  Then answer this question: ${userMessage.content}`
          }
    )
  }

  useEffect(() => {
    if (
      params.chatbot &&
      activeThread &&
      botNames.get(params.chatbot) !== activeThread.chatbot.name
    ) {
      setIsOpenPopup(false)
      setActiveThread(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoading && isOpenPopup && scrollToBottomOfPopup) {
      const timeout = setTimeout(() => {
        scrollToBottomOfPopup()
        clearTimeout(timeout)
      }, 150)
    }
  }, [isLoading, isOpenPopup, scrollToBottomOfPopup])

  return (
    <>
      {params.threadId ? (
        <div
          className={cn(
            'pb-[200px] pt-4 md:pt-10 h-full overflow-auto',
            className
          )}
          ref={containerRef as React.Ref<HTMLDivElement>}
        >
          <ChatList
            chatbot={chatbot}
            messages={allMessages}
            sendMessageFromResponse={sendMessageFromResponse}
          />
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
      ) : null}

      {(isOpenPopup && isPopup) || (!isOpenPopup && !isPopup) ? (
        <ChatPanel
          append={appendWithMbContextPrompts}
          chatbot={chatbot}
          className={`${!activeThread && !activeChatbot ? 'hidden' : ''} ${chatPanelClassName}`}
          id={params.threadId || isNewChat ? threadId : activeThread.threadId}
          input={input}
          isAtBottom={
            params.threadId
              ? isAtBottom
              : isPopup
                ? Boolean(isAtBottomOfPopup)
                : isAtBottomOfSection
          }
          isLoading={isLoading}
          messages={allMessages}
          placeholder={
            chatbot
              ? isNewChat
                ? `Start New Chat with ${chatbot.name}`
                : `Continue This Chat with ${chatbot.name}`
              : ''
          }
          reload={reload}
          scrollToBottom={
            isOpenPopup && isPopup && scrollToBottomOfPopup
              ? scrollToBottomOfPopup
              : scrollToBottom
          }
          setInput={setInput}
          showReload={!isNewChat}
          stop={stop}
        />
      ) : null}
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

export function getAllUserMessagesAsStringArray(allMessages: Message[]) {
  const userMessages = allMessages.filter(m => m.role === 'user')
  const cleanMessages = userMessages.map(m =>
    extractBetweenMarkers(m.content, 'Then answer this question:')
  )
  return cleanMessages.join(', ')
}
