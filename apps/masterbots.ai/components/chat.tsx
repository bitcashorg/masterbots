'use client'

import { CreateMessage, useChat, type Message } from 'ai/react'
import { useScroll } from 'framer-motion'

import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { cn, extractBetweenMarkers, scrollToBottomOfElement } from '@/lib/utils'

import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { createThread, getThread, saveNewMessage } from '@/services/hasura'
import { ChatRequestOptions } from 'ai'
import { uniqBy } from 'lodash'
import { Chatbot } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useThread } from '@/lib/hooks/use-thread'
import { botNames } from '@/lib/bots-names'

export function Chat({
  initialMessages,
  className,
  chatbot,
  threadId,
  chatPanelClassName,
  scrollToBottom: scrollToBottomFromParent,
  isAtBottom: isAtBottomFromParent
}: ChatProps) {
  const { data: session } = useSession()
  const {
    allMessages: threadAllMessages,
    initialMessages: threadInitialMessages,
    activeThread,
    setActiveThread,
    setIsNewResponse,
    setIsOpenPopup,
    sectionRef
  } = useThread()
  const containerRef = React.useRef<HTMLDivElement>()

  const router = useRouter()
  const params = useParams<{ chatbot: string; threadId: string }>()
  const isNewChat = Boolean(!params.threadId && !activeThread)

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      // we remove previous assistant responses to get better responses thru
      // our prompting strategy
      initialMessages:
        params.threadId || isNewChat
          ? initialMessages?.filter(m => m.role === 'system')
          : threadInitialMessages.filter(m => m.role === 'system'),
      id: params.threadId || isNewChat ? threadId : activeThread?.threadId,
      body: {
        id: params.threadId || isNewChat ? threadId : activeThread?.threadId
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
            params.threadId || isNewChat ? threadId : activeThread?.threadId,
          content: message.content,
          jwt: session!.user.hasuraJwt
        })
      }
    })

  const { scrollY } = useScroll({
    container: params.threadId
      ? (containerRef as React.RefObject<HTMLElement>)
      : (sectionRef as React.RefObject<HTMLElement>)
  })

  const { isAtBottom } = useAtBottom({
    ref: params.threadId ? containerRef : sectionRef,
    scrollY
  })

  const scrollToBottom = () => {
    if (!params.threadId && scrollToBottomFromParent) {
      scrollToBottomFromParent()
    } else if (
      (params.threadId && containerRef.current) ||
      (!params.threadId && sectionRef.current)
    ) {
      let element: any
      if (sectionRef.current) {
        element = sectionRef.current
      } else {
        element = containerRef.current
      }
      scrollToBottomOfElement(element)
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
      jwt: session!.user.hasuraJwt
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
    if (isNewChat) {
      // if (status !== 'authenticated') throw new Error('Unauthenticated User')

      await createThread({
        threadId,
        chatbotId: chatbot.chatbotId,
        jwt: session!.user.hasuraJwt,
        userId: session!.user.id
      })
      // router.push(`/${chatbot.name.trim().toLowerCase()}/${threadId}`, {
      //   shallow: true,
      //   scroll: false
      // })
      // router.refresh()
      const thread = await getThread({
        threadId,
        jwt: session!.user.hasuraJwt
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
      jwt: session!.user.hasuraJwt
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
  }, [])

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
            isAtBottom={isAtBottom}
            trackVisibility={isLoading}
          />
        </div>
      ) : null}

      <ChatPanel
        className={chatPanelClassName}
        scrollToBottom={scrollToBottom}
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
          isNewChat
            ? `Start New Chat with ${chatbot.name}`
            : `Continue This Chat with ${chatbot.name}`
        }
        showReload={!isNewChat}
        isAtBottom={
          scrollToBottomFromParent ? isAtBottomFromParent : isAtBottom
        }
      />
    </>
  )
}

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  chatbot: Chatbot
  threadId: string
  newThread?: boolean
  chatPanelClassName?: string
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
