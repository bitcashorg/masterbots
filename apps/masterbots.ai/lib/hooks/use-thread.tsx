'use client'

import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { getMessages, saveNewMessage } from '@/services/hasura'
import { Message as AIMessage } from 'ai'
import { uniqBy } from 'lodash'
import toast from 'react-hot-toast'
import { Message, Thread } from 'mb-genql'
import { getAllUserMessagesAsStringArray } from '@/components/chat'
import { useRouter } from 'next/navigation'

interface ThreadContext {
  activeThread: Thread | null
  setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>>
  allMessages: AIMessage[]
  initialMessages: AIMessage[]
  sendMessageFromResponse: (bulletContent: string) => void
  isNewResponse: boolean
  setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>>
}

const ThreadContext = React.createContext<ThreadContext | undefined>(undefined)

export function useThread() {
  const context = React.useContext(ThreadContext)
  if (!context) {
    throw new Error('useThreadContext must be used within a ThreadProvider')
  }
  return context
}

interface ThreadProviderProps {
  children: React.ReactNode
}

export function ThreadProvider({ children }: ThreadProviderProps) {
  const router = useRouter()

  const [activeThread, setActiveThread] = React.useState<Thread | null>(null)
  const { data: session } = useSession()

  const [messagesFromDB, setMessagesFromDB] = React.useState<Message[]>([])
  const [isNewResponse, setIsNewResponse] = React.useState<boolean>(false)

  const chatbotSystemPrompts: AIMessage[] =
    activeThread?.chatbot.prompts.map(({ prompt }) => ({
      id: prompt.promptId.toString(),
      role: 'system',
      content: prompt.content,
      createdAt: new Date()
    })) ?? []

  const userPreferencesPrompts: AIMessage[] = activeThread
    ? [
        {
          id: activeThread?.threadId,
          role: 'system',
          content:
            `Your response tone will be ${activeThread?.chatbot.defaultTone}. ` +
            `Your response length will be ${activeThread?.chatbot.defaultLength}. ` +
            `Your response format will be ${activeThread?.chatbot.defaultType}. ` +
            `Your response complexity level will be ${activeThread?.chatbot.defaultComplexity}.`,
          createdAt: new Date()
        }
      ]
    : []

  // format all user prompts and chatgpt 'assistant' messages
  const userAndAssistantMessages: AIMessage[] = activeThread
    ? messagesFromDB.map(m => ({
        id: m.messageId,
        role: m.role as AIMessage['role'],
        content: m.content,
        createdAt: m.createdAt
      }))
    : []

  // concatenate all message to pass it to chat component
  const initialMessages: AIMessage[] = chatbotSystemPrompts
    .concat(userPreferencesPrompts)
    .concat(userAndAssistantMessages)

  const {
    messages,
    append,
    reload,
    stop,
    isLoading,
    input,
    setInput,
    setMessages
  } = useChat({
    // we remove previous assistant responses to get better responses thru
    // our prompting strategy
    initialMessages: initialMessages?.filter(m => m.role === 'system'),
    id: activeThread?.threadId,
    body: {
      id: activeThread?.threadId
    },
    onResponse(response) {
      if (response.status === 401) {
        toast.error(response.statusText)
      }
    },
    async onFinish(message: AIMessage) {
      await saveNewMessage({
        role: 'assistant',
        threadId: activeThread?.threadId,
        content: message.content,
        jwt: session!.user.hasuraJwt
      })
    }
  })

  const fetchMessages = async () => {
    const messagesFromDB = await getMessages({
      threadId: activeThread?.threadId
    })
    setMessagesFromDB(messagesFromDB)
    setMessages(chatbotSystemPrompts)
  }

  const allMessages = uniqBy(
    initialMessages?.concat(messages),
    'content'
  ).filter(m => m.role !== 'system')

  const sendMessageFromResponse = React.useCallback(
    async (bulletContent: string) => {
      const fullMessage = `Tell me more about ${bulletContent}`
      setIsNewResponse(true)

      await saveNewMessage({
        role: 'user',
        threadId: activeThread?.threadId,
        content: fullMessage,
        jwt: session!.user.hasuraJwt
      })
      append({
        role: 'user',
        content: `First, think about the following questions and requests: [${getAllUserMessagesAsStringArray(
          allMessages
        )}].  Then answer this question: ${fullMessage}`
      })
    },
    [activeThread?.threadId, allMessages, append, session]
  )

  React.useEffect(() => {
    if (activeThread) {
      fetchMessages()
    } else {
      setMessagesFromDB([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeThread])

  const value = React.useMemo(
    () => ({
      activeThread,
      setActiveThread,
      allMessages,
      sendMessageFromResponse,
      initialMessages,
      isNewResponse,
      setIsNewResponse
    }),
    [
      activeThread,
      setActiveThread,
      allMessages,
      sendMessageFromResponse,
      initialMessages,
      isNewResponse,
      setIsNewResponse
    ]
  )

  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  )
}
