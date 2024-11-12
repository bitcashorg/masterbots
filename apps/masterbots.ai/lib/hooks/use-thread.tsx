'use client'

import { useAtBottom } from '@/lib/hooks/use-at-bottom';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import {
  getChatbots,
  getChatbotsCount
} from '@/services/hasura';
import { AiToolCall, ChatLoadingState } from '@/types/types';
import { useScroll } from 'framer-motion';
import type { Chatbot, Thread } from 'mb-genql';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useSetState } from 'react-use';

interface ThreadContext {
  isOpenPopup: boolean
  activeThread: Thread | null
  isNewResponse: boolean
  sectionRef: React.MutableRefObject<HTMLElement | undefined>
  isAtBottom: boolean
  randomChatbot: Chatbot | null
  isAdminMode: boolean
  loadingState?: ChatLoadingState
  activeTool?: AiToolCall
  setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
  setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>>
  setIsNewResponse: React.Dispatch<React.SetStateAction<boolean>>
  getRandomChatbot: () => void
  setActiveTool: (tool?: AiToolCall) => void
  setLoadingState: (state?: ChatLoadingState) => void
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
    },
    setState,
  ] = useSetState<{
    isAdminMode: boolean
    activeThread: Thread | null
    isNewResponse: boolean
    isOpenPopup: boolean
    randomChatbot: Chatbot | null
    loadingState?: ChatLoadingState
    activeTool?: AiToolCall
  }>({
    isAdminMode: false,
    activeThread: null as Thread | null,
    isNewResponse: false,
    isOpenPopup: false,
    randomChatbot: null as Chatbot | null,
    loadingState: undefined,
    activeTool: undefined,
  })
  const sectionRef = React.useRef<HTMLElement>()
  const { data: session } = useSession()

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

  const setActiveThread: React.Dispatch<React.SetStateAction<Thread | null>> = (value) => {
    setState({
      activeThread: typeof value === 'function' ? value(activeThread) : value,
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

  return (
    <ThreadContext.Provider
      value={{
        activeThread,
        isNewResponse,
        isOpenPopup,
        isAtBottom,
        sectionRef,
        randomChatbot,
        isAdminMode,
        loadingState,
        activeTool,
        getRandomChatbot,
        setActiveThread,
        setIsNewResponse,
        setIsOpenPopup,
        setActiveTool,
        setLoadingState,
      }}
    >
      {children}
    </ThreadContext.Provider>
  )
}
