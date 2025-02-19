'use client'

import { useMBScroll } from '@/lib/hooks/use-mb-scroll'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { getChatbots, getChatbotsCount } from '@/services/hasura'
import type { AiToolCall, ChatLoadingState } from '@/types/types'
import type { Chatbot, Thread } from 'mb-genql'
import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useSetState } from 'react-use'


interface ThreadContext {
  webSearch: boolean
  sectionRef: React.RefObject<HTMLElement>
  isAtBottom: boolean
  isAdminMode: boolean
  isOpenPopup: boolean
  activeThread: Thread | null
  isNewResponse: boolean
  randomChatbot: Chatbot | null
  isAtBottomOfSection: boolean
  shouldRefreshThreads: boolean
  activeTool?: AiToolCall
  loadingState?: ChatLoadingState
  setWebSearch: (state?: boolean) => void
  setActiveTool: (tool?: AiToolCall) => void
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
  setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>>
  setLoadingState: (state?: ChatLoadingState) => void
  setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>>
  getRandomChatbot: () => void
  setShouldRefreshThreads: React.Dispatch<React.SetStateAction<boolean>>
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
  const { activeCategory, activeChatbot } = useSidebar()
  const [
    {
      isAdminMode,
      activeThread,
      isNewResponse,
      isOpenPopup,
      randomChatbot,
      loadingState,
      activeTool,
      webSearch,
      shouldRefreshThreads,
    },
    setState,
  ] = useSetState<{
    isAdminMode: boolean
    activeThread: Thread | null
    isNewResponse: boolean
    isOpenPopup: boolean
    webSearch: boolean
    randomChatbot: Chatbot | null
    shouldRefreshThreads: boolean
    loadingState?: ChatLoadingState
    activeTool?: AiToolCall
  }>({
    isAdminMode: false,
    activeThread: null as Thread | null,
    isNewResponse: false,
    isOpenPopup: false,
    webSearch: false,
    shouldRefreshThreads: false,
    randomChatbot: null as Chatbot | null,
    loadingState: undefined,
    activeTool: undefined,
  })
  
  const sectionRef = React.useRef<HTMLElement>(null)
  const threadRef = React.useRef<HTMLElement>(null)
  const { data: session } = useSession()

  const { isNearBottom: isAtBottomOfSection, isNearBottom } = useMBScroll({
    containerRef: sectionRef,
    threadRef,
    isNewContent: false,
    hasMore: false,
    isLast: true,
    loading: false,
    loadMore: () => {},
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (
      !isOpenPopup &&
      activeThread &&
      activeCategory &&
      activeThread.chatbot && 
      activeThread.chatbot.categories &&
      activeCategory !== activeThread.chatbot.categories[0].categoryId
    ) {
      setState({ activeThread: null })
    }
  }, [isOpenPopup, activeThread, activeCategory])

  const getRandomChatbot = async () => {
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    getRandomChatbot()
  }, [activeCategory, activeThread, session])

  const setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>> = (value) => {
    setState({
      activeThread: typeof value === 'function' ? value(activeThread) : value,
    })
  }

  const setShouldRefreshThreads: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
    setState({
      shouldRefreshThreads: typeof value === 'function' ? value(shouldRefreshThreads) : value,
    })
  }

  const setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>> = (value) =>
    setState((prev) => ({
      isNewResponse: typeof value === 'function' ? value(prev.isNewResponse) : value,
    }))

  const setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>> = (isOpen) =>
    setState((prev) => ({
      isOpenPopup: typeof isOpen === 'function' ? isOpen(prev.isOpenPopup) : isOpen,
    }))

  const setActiveTool = (tool?: AiToolCall) => {
    setState({ activeTool: tool })
  }

  const setLoadingState = (state?: ChatLoadingState) => {
    setState({ loadingState: state })
  }

  const setWebSearch = (state?: boolean) => {
    setState({ webSearch: !state || !webSearch })
  }

  return (
    <ThreadContext.Provider
      value={{
        activeThread,
        isNewResponse,
        isOpenPopup,
        isAtBottom: isNearBottom,
        isAtBottomOfSection,
        sectionRef,
        randomChatbot,
        isAdminMode,
        loadingState,
        activeTool,
        webSearch,
        shouldRefreshThreads,
        setShouldRefreshThreads,
        getRandomChatbot,
        setActiveThread,
        setIsNewResponse,
        setIsOpenPopup,
        setActiveTool,
        setLoadingState,
        setWebSearch,
      }}
    >
      {children}
    </ThreadContext.Provider>
  )
}