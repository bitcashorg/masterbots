'use client'

import { CreateMessage, useChat, type Message } from 'ai/react'
import { useScroll } from 'framer-motion'

import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { cn, extractBetweenMarkers } from '@/lib/utils'

import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { createThread, saveNewMessage } from '@/services/hasura'
import { ChatRequestOptions } from 'ai'
import { uniqBy } from 'lodash'
import { Chatbot } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useThread } from '@/lib/hooks/use-thread'

export function Chat({
  initialMessages,
  className,
  chatbot,
  threadId,
  isChatPage
}: ChatProps) {
  const { data: session } = useSession()
  const {
    allMessages: threadAllMessages,
    initialMessages: threadInitialMessages,
    activeThread,
    setActiveThread
  } = useThread()
  const containerRef = React.useRef<HTMLDivElement>()
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      // we remove previous assistant responses to get better responses thru
      // our prompting strategy
      initialMessages: threadInitialMessages.length
        ? threadInitialMessages.filter(m => m.role === 'system')
        : initialMessages?.filter(m => m.role === 'system'),
      id: threadId,
      body: {
        id: threadId
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      },
      async onFinish(message: Message) {
        await saveNewMessage({
          role: 'assistant',
          threadId,
          content: message.content,
          jwt: session!.user.hasuraJwt
        })
      }
    })
  const router = useRouter()
  const params = useParams<{ chatbotName: string; threadId: string }>()
  const isNewChat = Boolean(!params.threadId && !activeThread)

  const { scrollY } = useScroll({
    container: containerRef as React.RefObject<HTMLElement>
  })

  const { isAtBottom } = useAtBottom({
    ref: containerRef,
    scrollY
  })

  const scrollToBottom = () => {
    if (containerRef.current) {
      const element = containerRef.current
      const targetScroll = element.scrollHeight - element.clientHeight
      const duration = 500 // Set the duration of the animation in milliseconds

      const startTime = performance.now()

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime

        element.scrollTop = easeInOutQuad(elapsed, 0, targetScroll, duration)

        if (elapsed < duration) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  // Easing function for smooth animation
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  // we merge past assistant and user messages for ui only
  // we remove system prompts from ui
  const allMessages = threadAllMessages.length
    ? uniqBy(threadAllMessages?.concat(messages), 'content').filter(
        m => m.role !== 'system'
      )
    : uniqBy(initialMessages?.concat(messages), 'content').filter(
        m => m.role !== 'system'
      )

  const sendMessageFromResponse = (bulletContent: string) => {
    const fullMessage = `Tell me more about ${bulletContent}`
    append({ content: fullMessage, role: 'user' })
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
      router.push(`/${chatbot.name.trim().toLowerCase()}/${threadId}`, {
        shallow: true,
        scroll: false
      })
      router.refresh()
    }

    await saveNewMessage({
      role: 'user',
      threadId: activeThread?.threadId || threadId,
      content: userMessage.content,
      jwt: session!.user.hasuraJwt
    })

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

  React.useEffect(() => {
    return () => {
      if (isChatPage) {
        setActiveThread(null)
      }
    }
  }, [])

  return (
    <>
      {!isNewChat && params?.threadId ? (
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
        scrollToBottom={scrollToBottom}
        id={activeThread?.threadId || threadId}
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
            ? `Start a new chat with ${chatbot.name}`
            : `Send new message to ${chatbot.name}`
        }
        showReload={!isNewChat}
        isAtBottom={isAtBottom}
      />
    </>
  )
}

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  chatbot: Chatbot
  threadId: string
  newThread?: boolean
  isChatPage?: boolean
}

function getAllUserMessagesAsStringArray(allMessages: Message[]) {
  const userMessages = allMessages.filter(m => m.role === 'user')
  const cleanMessages = userMessages.map(m =>
    extractBetweenMarkers(m.content, 'Then answer this question:')
  )
  return cleanMessages.join(', ')
}
