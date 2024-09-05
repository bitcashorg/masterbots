'use client'

import { Message, useChat } from 'ai/react'
import { useScroll } from 'framer-motion'

import { ChatList } from './chat-list'
import { ChatPanel } from './chat-panel'
import { ChatScrollAnchor } from './chat-scroll-anchor'
import { cn, extractBetweenMarkers, scrollToBottomOfElement } from '@/lib/utils'

import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { createThread, getThread, saveNewMessage } from '@/services/hasura'
import { ChatRequestOptions, CreateMessage } from 'ai'
import { uniqBy } from 'lodash'
import { Chatbot } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useThread } from '@/lib/hooks/use-thread'
import { botNames } from '@/lib/bots-names'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useModel } from '@/lib/hooks/use-model'

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
  const { data: session } = useSession()
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
  const { selectedModel, clientType } = useModel()

  const { messages, append, reload, stop, isLoading, input, setInput } =
  
  useChat({
    initialMessages:
      params.threadId || isNewChat
        ? initialMessages?.filter(m => m.role === 'system')
        : threadInitialMessages.filter(m => m.role === 'system'),
    id: params.threadId || isNewChat ? threadId : activeThread?.threadId,
    body: {
      id: params.threadId || isNewChat ? threadId : activeThread?.threadId,
      model: selectedModel,
      clientType
    },
    onResponse(response) {
      if (response.status === 401) {
        toast.error(response.statusText)
      }
    },
    onFinish(message) {
      saveNewMessage({
        role: 'assistant',
        threadId:
          params.threadId || isNewChat ? threadId : activeThread?.threadId,
        content: message.content,
        jwt: session!.user?.hasuraJwt
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
      ? uniqBy(initialMessages?.concat(messages), 'content').filter(
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
      threadId:
        params.threadId || isNewChat ? threadId : activeThread?.threadId,
      content: fullMessage,
      jwt: session!.user?.hasuraJwt
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
        jwt: session!.user?.hasuraJwt,
        userId: session!.user.id,
        isPublic: activeChatbot?.name !== 'BlankBot'
      })
      const thread = await getThread({
        threadId,
        jwt: session!.user?.hasuraJwt
      })
      setActiveThread(thread)
      setIsOpenPopup(true)
    }
    if (activeThread?.threadId) {
      setIsOpenPopup(true)
    }
    await saveNewMessage({
      role: 'user',
      threadId:
        params.threadId || isNewChat ? threadId : activeThread?.threadId,
      content: userMessage.content,
      jwt: session!.user?.hasuraJwt
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isOpenPopup, scrollToBottomOfPopup])

  return (
    <>
      {params.threadId ? (
        <div
          ref={containerRef as React.Ref<HTMLDivElement>}
          className={cn(
            'pb-[200px] pt-4 md:pt-10 h-full overflow-auto',
            className
          )}
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

      {((isOpenPopup && isPopup) || (!isOpenPopup && !isPopup)) && (
        <ChatPanel
          className={`${!activeThread && !activeChatbot ? 'hidden' : ''} ${chatPanelClassName}`}
          scrollToBottom={
            isOpenPopup && isPopup && scrollToBottomOfPopup
              ? scrollToBottomOfPopup
              : scrollToBottom
          }
          id={params.threadId || isNewChat ? threadId : activeThread?.threadId}
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
          isAtBottom={
            params.threadId
              ? isAtBottom
              : isPopup
                ? Boolean(isAtBottomOfPopup)
                : isAtBottomOfSection
          }
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

export function getAllUserMessagesAsStringArray(allMessages: Message[]) {
  const userMessages = allMessages.filter(m => m.role === 'user')
  const cleanMessages = userMessages.map(m =>
    extractBetweenMarkers(m.content, 'Then answer this question:')
  )
  return cleanMessages.join(', ')
}
