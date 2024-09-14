import { useCallback, useMemo } from 'react'
import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useThread } from '@/lib/hooks/use-thread'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useModel } from '@/lib/hooks/use-model'
import { improveMessage } from '@/lib/helpers/ai-helpers'
import { createThread, getThread, saveNewMessage } from '@/services/hasura'
import { Message, ChatRequestOptions, CreateMessage } from 'ai'
import { uniqBy } from 'lodash'
import { AiClientType } from '@/types/types'
import { toast } from 'react-hot-toast'
import { Chatbot } from 'mb-genql/generated'

export function useAIChat(
  initialMessages: Message[],
  threadId: string,
  chatbot: Chatbot
) {
  const { data: session } = useSession()
  const {
    allMessages: threadAllMessages,
    initialMessages: threadInitialMessages,
    activeThread,
    setActiveThread,
    setIsNewResponse,
    setIsOpenPopup,
    isOpenPopup
  } = useThread()
  const { activeChatbot } = useSidebar()
  const params = useParams()
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

  // * This function returns the messages from the chat
  const allMessages = useMemo(
    () =>
      (params.threadId || isNewChat
        ? uniqBy(initialMessages?.concat(messages), 'content')
        : uniqBy(threadAllMessages.concat(messages), 'content')
      ).filter(m => m.role !== 'system'),
    [params.threadId, isNewChat, initialMessages, messages, threadAllMessages]
  )

  // * This function appends the message to the chat
  const appendWithMbContextPrompts = useCallback(
    async (
      userMessage: Message | CreateMessage,
      chatRequestOptions?: ChatRequestOptions
    ) => {
      let processedMessage = userMessage.content

      try {
        processedMessage = await improveMessage(
          userMessage.content,
          clientType as AiClientType,
          selectedModel
        )
        if (processedMessage === userMessage.content) {
          console.warn(
            'Message was not improved by AI. Using original message.'
          )
        }
      } catch (error) {
        console.error('Error processing message:', error)
        processedMessage = userMessage.content
      }

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
    },
    [
      isNewChat,
      chatbot,
      activeThread?.threadId,
      params.threadId,
      threadId,
      session,
      setIsNewResponse,
      append,
      allMessages,
      clientType,
      selectedModel,
      activeChatbot?.name,
      setActiveThread,
      setIsOpenPopup
    ]
  )

  return {
    messages: allMessages,
    append: appendWithMbContextPrompts,
    reload,
    stop,
    isLoading,
    input,
    setInput,
    isNewChat,
    isOpenPopup,
    setIsOpenPopup
  }
}

// * This function gets all the user messages as a string array
function getAllUserMessagesAsStringArray(allMessages: Message[]) {
  const userMessages = allMessages.filter(m => m.role === 'user')
  const cleanMessages = userMessages.map(m =>
    extractBetweenMarkers(m.content, 'Then answer this question:')
  )
  return cleanMessages.join(', ')
}

// * This function extracts the message between the markers
function extractBetweenMarkers(str: string, marker: string) {
  const index = str.lastIndexOf(marker)
  return index !== -1 ? str.slice(index + marker.length).trim() : str
}
