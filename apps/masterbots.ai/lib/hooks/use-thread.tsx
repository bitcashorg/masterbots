'use client'

import { useChat } from 'ai/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { getMessages, saveNewMessage } from '@/services/hasura'
import { Message as AIMessage } from 'ai'
import { uniqBy } from 'lodash'
import toast from 'react-hot-toast'
import { Message, Thread } from 'mb-genql'

interface ThreadContext {
  activeThread: Thread | null
  setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>>
  allMessages: AIMessage[]
  initialMessages: AIMessage[]
  sendMessageFromResponse: (bulletContent: string) => void
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
  const [activeThread, setActiveThread] = React.useState<Thread | null>(null)
  const { data: session } = useSession()

  const [messagesFromDB, setMessagesFromDB] = React.useState<Message[]>([])

  const chatbotSystemPrompts: AIMessage[] =
    activeThread?.chatbot.prompts.map(({ prompt }) => ({
      id: prompt.promptId.toString(),
      role: 'system',
      content: prompt.content,
      createdAt: new Date()
    })) ?? []

  const userPreferencesPrompts: AIMessage[] = [
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

  // format all user prompts and chatgpt 'assistant' messages
  const userAndAssistantMessages: AIMessage[] = messagesFromDB.map(m => ({
    id: m.messageId,
    role: m.role as AIMessage['role'],
    content: m.content,
    createdAt: m.createdAt
  }))

  // concatenate all message to pass it to chat component
  const initialMessages: AIMessage[] = chatbotSystemPrompts
    .concat(userPreferencesPrompts)
    .concat(userAndAssistantMessages)

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
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
  }

  const sendMessageFromResponse = (bulletContent: string) => {
    const fullMessage = `Tell me more about ${bulletContent}`
    append({ content: fullMessage, role: 'user' })
  }

  React.useEffect(() => {
    if (activeThread) {
      fetchMessages()
    } else {
      setMessagesFromDB([])
    }
  }, [activeThread])

  const allMessages = uniqBy(
    initialMessages?.concat(messages),
    'content'
  ).filter(m => m.role !== 'system')

  return (
    <ThreadContext.Provider
      value={{
        activeThread,
        setActiveThread,
        allMessages,
        sendMessageFromResponse,
        initialMessages
      }}
    >
      {children}
    </ThreadContext.Provider>
  )
}
