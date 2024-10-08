'use client'

import { runWordWarePrompt } from '@/app/actions'
import { improveMessage } from '@/app/api/chat/actions/actions'
import { ChatList } from '@/components/routes/chat/chat-list'
import { ChatPanel } from '@/components/routes/chat/chat-panel'
import { ChatScrollAnchor } from '@/components/routes/chat/chat-scroll-anchor'
import { botNames } from '@/lib/bots-names'
import { labelMakerMockedRawData } from '@/lib/helpers/ai-helpers'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { useModel } from '@/lib/hooks/use-model'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, extractBetweenMarkers, scrollToBottomOfElement } from '@/lib/utils'
import { createThread, getThread, saveNewMessage } from '@/services/hasura'
import { AiClientType } from '@/types/types'
import { ChatRequestOptions, CreateMessage } from 'ai'
import { Message, useChat } from 'ai/react'
import { useScroll } from 'framer-motion'
import { uniqBy } from 'lodash'
import { Chatbot } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'


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
    const fullMessage = bulletContent
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
    let processedMessage = userMessage.content

    console.log('Original message:', processedMessage)

    // * Cleaning the user question (thread title) with AI
    try {
      console.log('Original message:', userMessage.content)
      processedMessage = await improveMessage(
        userMessage.content,
        clientType as AiClientType,
        selectedModel
      )
      console.log('Refined message:', processedMessage)

      if (processedMessage === userMessage.content) {
        console.warn('Message was not improved by AI. Using original message.')
      }
    } catch (error) {
      console.error('Error processing message:', error)
      // Fall back to original message if processing fails
      processedMessage = userMessage.content
    }


    // ? Future response: We will use the AI to detect the language of the message and translate it to English if it's not already in English. We will use a pattern from the Ai to know the original language of the refined message and the refined message in English.
    // TODO: ...
    // const [ogProcessedMsgLang, processedMsgEnglish] = processedMessage.split(/{{(.*?)}}/g).filter(Boolean)
    const [ogProcessedMsgLang, processedMsgEnglish] = '{{La cerveza me hace bien?}}{{Is beer good to me?}}'.split(/{{(.*?)}}/g).filter(Boolean)

    console.log('Original message language:', ogProcessedMsgLang)
    // ! If this one returns as undefined, it means the message was already in English. Fallback always to the ogProcessedMsgLang
    console.log('Refined message language (Ai usage only):', processedMsgEnglish)

    // * Getting the user labelling the thread from ICL (categories, sub-category, etc.)
    // TODO: ...
    const getICLExamplesResponse = await new Promise((resolve) => {
      const timeout = setTimeout(() => {
        // Domain => chatbot?.categories[0].category.name
        resolve({ rawData: labelMakerMockedRawData })
        clearTimeout(timeout)
      }, 240)
    }) as { rawData: any }

    // * Getting the user labelling the thread (categories, sub-category, etc.)
    const { fullResponse, parsed, error } = await runWordWarePrompt({
      promptId: '9ac34a9b-dc65-406c-ace3-d13ae15087f4',
      inputs: {
        rawData: getICLExamplesResponse?.rawData,
        question: processedMsgEnglish || ogProcessedMsgLang,
        domain: chatbot?.categories[0].category.name,
      }
    })
    console.log('Full responses from runWordWarePrompt:', { fullResponse, parsed, error })

    // * Connecting to the ICL to send the user labelling the thread and rawData (examples) to the ICL 
    // TODO: ...
    const postICLResponse = await new Promise((resolve) => {
      const timeout = setTimeout(() => {
        // processedMsgEnglish
        // parsed
        // chatbot?.categories[0].category.name
        resolve({ parsed, question: processedMsgEnglish || ogProcessedMsgLang, domain: chatbot?.categories[0].category.name as string, bot: chatbot?.name as string })
        clearTimeout(timeout)
      }, 700)
    }) as { parsed: any, question: string, domain: string, bot: string }

    // * Her we do something with the response from the ICL and attach it to the chat context the required fields and values for future ICL usage.
    console.log('Full responses from postICLResponse:', postICLResponse)

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
      content: processedMessage,
      jwt: session!.user?.hasuraJwt
    })

    setIsNewResponse(true)

    return append(
      isNewChat
        ? { ...userMessage, content: processedMessage }
        : {
          ...userMessage,
          content: `First, think about the following questions and requests: [${getAllUserMessagesAsStringArray(
            allMessages
          )}].  Then answer this question: ${processedMessage}`
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
            sendMessageFn={sendMessageFromResponse}
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
