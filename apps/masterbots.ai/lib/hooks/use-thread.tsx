'use client'

import { followingQuestionsPrompt, setDefaultUserPreferencesPrompt } from '@/lib/constants/prompts';
import { useAtBottom } from '@/lib/hooks/use-at-bottom';
import { useModel } from '@/lib/hooks/use-model';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import {
  approveThread,
  getChatbots,
  getChatbotsCount,
  getMessages,
  saveNewMessage,
} from '@/services/hasura';
import type { Message as AIMessage } from 'ai';
import { useChat } from 'ai/react';
import { useScroll } from 'framer-motion';
import { uniqBy } from 'lodash';
import type { Chatbot, Message, Thread } from 'mb-genql';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useSetState } from 'react-use';

interface ThreadContext {
  isOpenPopup: boolean
  isLoadingMessages: boolean
  activeThread: Thread | null
  allMessages: AIMessage[]
  initialMessages: AIMessage[]
  isNewResponse: boolean
  sectionRef: React.MutableRefObject<HTMLElement | undefined>
  isAtBottom: boolean
  isLoading: boolean
  randomChatbot: Chatbot | null
  isAdminMode: boolean
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
  setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>>
  sendMessageFromResponse: (bulletContent: string) => void
  setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>>
  getRandomChatbot: () => void
  handleToggleAdminMode: () => void
  adminApproveThread: (threadId: string) => void
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
  const params = useParams<{ chatbot: string; threadId: string }>()
  const { activeCategory } = useSidebar()
  const [
    {
      isAdminMode,
      activeThread,
      messagesFromDB,
      isNewResponse,
      isOpenPopup,
      randomChatbot,
      isLoadingMessages,
    },
    setState,
  ] = useSetState({
    isAdminMode: false,
    activeThread: null as Thread | null,
    messagesFromDB: [] as Message[],
    isNewResponse: false,
    isOpenPopup: false,
    randomChatbot: null as Chatbot | null,
    isLoadingMessages: false,
  })
  const sectionRef = React.useRef<HTMLElement>()
  const { data: session } = useSession()
  const { selectedModel, clientType } = useModel()

  const isNewChat = Boolean(!params.threadId || !activeThread)

  const chatbotSystemPrompts: AIMessage[] =
    activeThread?.chatbot?.prompts?.map(({ prompt }) => ({
      id: prompt.promptId.toString(),
      role: 'system',
      content: prompt.content,
      createdAt: new Date(),
    })) ?? []

  const userPreferencesPrompts: AIMessage[] = activeThread
    ? [setDefaultUserPreferencesPrompt(activeThread.chatbot)]
    : []

  // format all user prompts and chatgpt 'assistant' messages
  const userAndAssistantMessages: AIMessage[] = activeThread
    ? messagesFromDB.map((m) => ({
      id: m.messageId,
      role: m.role as AIMessage['role'],
      content: m.content,
      createdAt: m.createdAt,
    }))
    : []

  // concatenate all message to pass it to chat component
  const initialMessages: AIMessage[] = chatbotSystemPrompts
    .concat(userPreferencesPrompts)
    .concat(userAndAssistantMessages)

  const { messages, append, reload, stop, isLoading, input, setInput, setMessages } = useChat({
    // we remove previous assistant responses to get better responses thru
    // our prompting strategy
    initialMessages: initialMessages?.filter((m) => m.role === 'system'),
    id: activeThread?.threadId,
    body: {
      id: activeThread?.threadId,
      model: selectedModel,
      clientType,
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
        jwt: session?.user?.hasuraJwt || '',
      })
    },
  })

  const fetchMessages = async () => {
    setState({ isLoadingMessages: true })
    try {
      const messagesFromDB = await getMessages({
        threadId: activeThread?.threadId,
      })
      setState({ messagesFromDB })
      setMessages(chatbotSystemPrompts)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast.error('Failed to load messages. Please try again.')
    } finally {
      setState({ isLoadingMessages: false })
    }
  }

  const allMessages = uniqBy(initialMessages?.concat(messages), 'content').filter(
    (m) => m.role !== 'system',
  )

  const sendMessageFromResponse = React.useCallback(
    async (bulletContent: string) => {
      const fullMessage = bulletContent

      setState({ isNewResponse: true, isOpenPopup: true })
      await saveNewMessage({
        role: 'user',
        threadId: activeThread?.threadId,
        content: fullMessage,
        jwt: session?.user?.hasuraJwt || '',
      })
      append({
        role: 'user',
        content: followingQuestionsPrompt(fullMessage, allMessages),
      })
    },
    [activeThread?.threadId, allMessages, append, session],
  )

  React.useEffect(() => {
    if (activeThread?.chatbot?.prompts?.length || activeThread?.chatbot?.name === 'BlankBot') {
      fetchMessages()
    } else {
      setState({ messagesFromDB: [] })
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
      setState({ activeThread: null })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopup])

  const getRandomChatbot = async () => {
    // console.log('session?.user?.hasuraJwt', session?.user?.hasuraJwt)
    if (activeThread || !session?.user?.hasuraJwt) return
    const chatbotsCount = await getChatbotsCount({
      categoryId: activeCategory,
      jwt: session?.user?.hasuraJwt,
    })
    const offset = Math.floor(Math.random() * chatbotsCount)
    const chatbots = await getChatbots({
      limit: 1,
      offset,
      categoryId: activeCategory,
    })

    if (chatbots.length) {
      setState({ randomChatbot: chatbots[0] })
    } else {
      setState({ randomChatbot: null })
    }
  }

  React.useEffect(() => {
    getRandomChatbot()
  }, [activeCategory, activeThread, session])

  const { scrollY } = useScroll({
    container: sectionRef as React.RefObject<HTMLElement>,
  })

  const { isAtBottom } = useAtBottom({
    ref: sectionRef,
    scrollY,
  })

  const setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>> = (value) =>
    setState((prev) => ({
      activeThread: typeof value === 'function' ? value(prev.activeThread) : value,
    }))

  const setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>> = (value) =>
    setState((prev) => ({
      isNewResponse: typeof value === 'function' ? value(prev.isNewResponse) : value,
    }))

  const setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>> = (isOpen) =>
    setState((prev) => ({
      isOpenPopup: typeof isOpen === 'function' ? isOpen(prev.isOpenPopup) : isOpen,
    }))

  const handleToggleAdminMode = () => {
    setState({ isAdminMode: !isAdminMode })
  }

  const adminApproveThread = async (threadId: string) => {
    try {
      if (!session || !session.user?.hasuraJwt) {
        toast.error('User session not found. Please log in again.')
        return
      }
      await approveThread({
        threadId,
        jwt: session.user?.hasuraJwt,
      })
      toast.success('Thread approved successfully.')
      window.location.reload()
    } catch (error) {
      console.error('Error approving thread:', error)
      toast.error('Failed to approve thread. Please try again.')
    }
  }

  const value = React.useMemo(
    () => ({
      isLoadingMessages,
      activeThread,
      allMessages,
      initialMessages,
      isNewResponse,
      isOpenPopup,
      isAtBottom,
      isLoading,
      sectionRef,
      randomChatbot,
      isAdminMode,
      sendMessageFromResponse,
      getRandomChatbot,
      setActiveThread,
      setIsNewResponse,
      setIsOpenPopup,
      handleToggleAdminMode,
      adminApproveThread,
    }),
    [
      isLoadingMessages,
      activeThread,
      allMessages,
      initialMessages,
      isNewResponse,
      isOpenPopup,
      isAtBottom,
      isLoading,
      sectionRef,
      randomChatbot,
      isAdminMode,
      sendMessageFromResponse,
    ],
  )

  return <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
}
