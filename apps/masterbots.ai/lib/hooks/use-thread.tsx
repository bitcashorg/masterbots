'use client'

import { getAllUserMessagesAsStringArray } from '@/lib/threads'
import { useModel } from '@/lib/hooks/use-model'
import {
  getChatbots,
  getChatbotsCount,
  getMessages,
  saveNewMessage,
  approveThread
} from '@/services/hasura'
import { Message as AIMessage } from 'ai'
import { useChat } from 'ai/react'
import { useScroll } from 'framer-motion'
import { uniqBy } from 'lodash'
import { Chatbot, Message, Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import toast from 'react-hot-toast'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { useSidebar } from '@/lib/hooks/use-sidebar'

interface ThreadContext {
  isOpenPopup: boolean
  isLoadingMessages: boolean
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
  activeThread: Thread | null
  setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>>
  allMessages: AIMessage[]
  initialMessages: AIMessage[]
  sendMessageFromResponse: (bulletContent: string) => void
  isNewResponse: boolean
  setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>>
  sectionRef: React.MutableRefObject<HTMLElement | undefined>
  isAtBottom: boolean
  isLoading: boolean
  randomChatbot: Chatbot | null
  getRandomChatbot: () => void
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
  const { activeCategory } = useSidebar()
  const [activeThread, setActiveThread] = React.useState<Thread | null>(null)
  const sectionRef = React.useRef<HTMLElement>()
  const { data: session } = useSession()
  const { selectedModel, clientType } = useModel()

  // ! TODO: refactor this to use { useSetState } from 'react-use'
  const [messagesFromDB, setMessagesFromDB] = React.useState<Message[]>([])
  const [isNewResponse, setIsNewResponse] = React.useState<boolean>(false)
  const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false)
  const [randomChatbot, setRandomChatbot] = React.useState<Chatbot | null>(null)
  const [isLoadingMessages, setIsLoadingMessages] = React.useState(false)

  const chatbotSystemPrompts: AIMessage[] =
    activeThread?.chatbot?.prompts?.map(({ prompt }) => ({
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
      id: activeThread?.threadId,
      model: selectedModel,
      clientType
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
        jwt: session!.user?.hasuraJwt
      })
    }
  })

  const fetchMessages = async () => {
    setIsLoadingMessages(true)
    try {
      const messagesFromDB = await getMessages({
        threadId: activeThread?.threadId
      })
      setMessagesFromDB(messagesFromDB)
      setMessages(chatbotSystemPrompts)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast.error('Failed to load messages. Please try again.')
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const allMessages = uniqBy(
    initialMessages?.concat(messages),
    'content'
  ).filter(m => m.role !== 'system')

  const sendMessageFromResponse = React.useCallback(
    async (bulletContent: string) => {
      const fullMessage = bulletContent
      setIsNewResponse(true)
      setIsOpenPopup(true)
      await saveNewMessage({
        role: 'user',
        threadId: activeThread?.threadId,
        content: fullMessage,
        jwt: session!.user?.hasuraJwt
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
    if (
      activeThread?.chatbot?.prompts?.length ||
      activeThread?.chatbot?.name === 'BlankBot'
    ) {
      fetchMessages()
    } else {
      setMessagesFromDB([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeThread])

  React.useEffect(() => {
    if (
      !isOpenPopup &&
      activeThread &&
      activeCategory &&
      activeCategory !== activeThread.chatbot.categories[0].categoryId
    ) {
      setActiveThread(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopup])

  const getRandomChatbot = async () => {
    // console.log('session?.user?.hasuraJwt', session?.user?.hasuraJwt)
    if (activeThread || !session?.user?.hasuraJwt) return
    const chatbotsCount = await getChatbotsCount({
      categoryId: activeCategory,
      jwt: session!.user?.hasuraJwt
    })
    const offset = Math.floor(Math.random() * chatbotsCount)
    const chatbots = await getChatbots({
      limit: 1,
      offset,
      categoryId: activeCategory
    })

    if (chatbots.length) {
      setRandomChatbot(chatbots[0])
    } else {
      setRandomChatbot(null)
    }
  }

  React.useEffect(() => {
    getRandomChatbot()
  }, [activeCategory, activeThread, session])

  const { scrollY } = useScroll({
    container: sectionRef as React.RefObject<HTMLElement>
  })

  const { isAtBottom } = useAtBottom({
    ref: sectionRef,
    scrollY
  })
 

  const value = React.useMemo(
    () => ({
      isLoadingMessages,
      activeThread,
      setActiveThread,
      allMessages,
      sendMessageFromResponse,
      initialMessages,
      isNewResponse,
      setIsNewResponse,
      isOpenPopup,
      setIsOpenPopup,
      isAtBottom,
      isLoading,
      sectionRef,
      randomChatbot,
      getRandomChatbot,
    }),
    [
      isLoadingMessages,
      activeThread,
      setActiveThread,
      allMessages,
      sendMessageFromResponse,
      initialMessages,
      isNewResponse,
      setIsNewResponse,
      isOpenPopup,
      setIsOpenPopup,
      isAtBottom,
      isLoading,
      sectionRef,
      randomChatbot,
      getRandomChatbot,
    ]
  )

  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  )
}
