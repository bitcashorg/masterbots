'use client'

import { urlBuilders } from '@/lib/url'
import { getCategories, getUserBySlug } from '@/services/hasura'
import type { Category, Chatbot } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { useAsync } from 'react-use'

const LOCAL_STORAGE_KEY = 'sidebar'

export interface NavigationParams {
  page: string | undefined
  usernameSlug: string | undefined
  categoryName?: string
  chatbotName?: string
  isBrowse?: boolean
}

interface SidebarContext {
  tab: 'general' | 'work'
  isLoading: boolean
  filterValue: string
  isFilterMode: boolean
  isSidebarOpen: boolean
  selectedChats: string[]
  activeChatbot: Chatbot | null
  activeCategory: number | null
  selectedChatbots: number[]
  filteredCategories: Category[]
  selectedCategories: number[]
  expandedCategories: number[]
  changeTab: (cate: 'general' | 'work') => void
  navigateTo: <T extends keyof typeof urlBuilders>(params: NavigateToParams<T>) => void
  toggleSidebar: (toggle?: boolean) => void
  setFilterValue: React.Dispatch<React.SetStateAction<string>>
  setIsFilterMode: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedChats: React.Dispatch<React.SetStateAction<string[]>>
  setActiveChatbot: React.Dispatch<React.SetStateAction<Chatbot | null>>
  setActiveCategory: React.Dispatch<React.SetStateAction<number | null>>
  setSelectedChatbots: React.Dispatch<React.SetStateAction<number[]>>
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>
  setExpandedCategories: React.Dispatch<React.SetStateAction<number[]>>
  toggleChatbotSelection: (chatbotId: number) => void
}

const SidebarContext = React.createContext<SidebarContext | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

type NavigateToParams<T extends keyof typeof urlBuilders = keyof typeof urlBuilders> = {
  urlType: T
  // Use Parameters to extract the parameter type of the selected URL builder.
  navigationParams: Parameters<(typeof urlBuilders)[T]>[0]
  shallow?: boolean
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>([])
  const [selectedChatbots, setSelectedChatbots] = React.useState<number[]>([])
  const { data: session } = useSession()
  const { slug } = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const prevPath = React.useRef<string | null>(null)

  const {
    value: categories,
    loading,
    error,
  } = useAsync(async () => {

    let userId = null
    if(slug){
      const { user, error } =  await getUserBySlug({
        slug: slug as string, 
        isSameUser: false
       });
        if(error) throw error
       userId = user ? user?.userId : null
    }
    
   const categories = await getCategories(userId)
    const categoriesObj = {
      categoriesChatbots: categories || [],
      categoriesId: categories.map((category) => category.categoryId),
      chatbotsId: categories?.flatMap((category) =>
        category.chatbots.map((chatbot) => chatbot.chatbotId),
      ),
    }
    const pathParts = pathname.split('/')
    const prevPathParts = (prevPath.current || '').split('/')

    if (
      (prevPath.current !== pathname && pathParts[1] !== prevPathParts[1] && pathParts[1] === 'c') ||
      (selectedCategories.length === 0 && selectedChatbots.length === 0)
    ) {
      setSelectedCategories(categoriesObj.categoriesId)
      setSelectedChatbots(categoriesObj.chatbotsId)
    }

    prevPath.current = pathname

    return categoriesObj
  }, [pathname])

  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const [activeChatbot, setActiveChatbot] = React.useState<Chatbot | null>(null)
  const [tab, setTab] = React.useState<'general' | 'work'>('general')
  const [activeCategory, setActiveCategory] = React.useState<number | null>(null)
  const [isFilterMode, setIsFilterMode] = React.useState(false)
  const [filterValue, setFilterValue] = React.useState('')
  const [selectedChats, setSelectedChats] = React.useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = React.useState<number[]>([])

  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value) {
      setSidebarOpen(JSON.parse(value))
    }
    setLoading(false)
  }, [])

  const toggleSidebar = (toggle = true) => {
    setSidebarOpen((value) => {
      const newState = toggle ? !value : false
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      return newState
    })
  }

  React.useEffect(() => {
    if (!pathname || !categories) return
    const pathParts = pathname.split('/')

    if (categories && pathParts[1] === 'c') {
      const categorySlug = pathParts[2]
      const chatbotName = pathParts[3]

      const category = categories?.categoriesChatbots.find(
        (cat) => toSlug(cat.name) === categorySlug,
      )

      if (category) {
        setActiveCategory(category.categoryId)
        setExpandedCategories([category.categoryId])

        if (chatbotName) {
          const chatbot = category.chatbots.find(
            (c) => c.chatbot.name.toLowerCase() === chatbotName,
          )
          if (chatbot) {
            setActiveChatbot(chatbot.chatbot)
          } else {
            setActiveChatbot(null)
          }
        } else {
          setActiveChatbot(null)
        }
      }
    }
  }, [pathname, categories])


  /**
   * Toggles the selection of a chatbot by its ID. If the chatbot is already selected, it will be removed from the selection.
   * Otherwise, it will be added to the selection. Additionally, updates the selected categories based on the chatbots
   * associated with each category.
   *
   * @param {number} chatbotId - The ID of the chatbot to toggle selection for.
   */
  const toggleChatbotSelection = React.useCallback((chatbotId: number) => {
    setSelectedChatbots((prev) =>
      prev.includes(chatbotId) ? prev.filter((id) => id !== chatbotId) : [...prev, chatbotId],
    )
    const categoriesChatbots = categories ? categories.categoriesChatbots : [];
    setSelectedCategories((prev) =>
      categoriesChatbots
        .filter((category) => category.chatbots.some((chatbot) => chatbot.chatbotId === chatbotId))
        .map((category) => category.categoryId)
        .filter((id) => !prev.includes(id)).length
        ? [
          ...prev,
          ...categoriesChatbots
            .filter((category) =>
              category.chatbots.some((chatbot) => chatbot.chatbotId === chatbotId),
            )
            .map((category) => category.categoryId),
        ]
        : prev.filter(
          (id) =>
            !categoriesChatbots
              .filter((category) =>
                category.chatbots.some((chatbot) => chatbot.chatbotId === chatbotId),
              )
              .map((category) => category.categoryId)
              .includes(id),
        ),
    )
  }, [categories])

  const changeTab = (cate: 'general' | 'work') => {
    setTab(cate)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const filteredCategories = React.useMemo(() => {
    const categoriesChatbots = categories?.categoriesChatbots || []

    return isFilterMode
      ? categoriesChatbots
      : categoriesChatbots
        .filter(
          (category) =>
            category.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            category.chatbots.some((chatbot) =>
              chatbot.chatbot.name.toLowerCase().includes(filterValue.toLowerCase()),
            ),
        )
        .filter((category) => selectedCategories.includes(category.categoryId))
        .filter((category) =>
          category.chatbots.some((chatbot) => selectedChatbots.includes(chatbot.chatbotId)),
        )
  }, [selectedChatbots.length, selectedCategories.length, filterValue, isFilterMode, categories])

  const navigateTo = <T extends keyof typeof urlBuilders>({
    urlType,
    navigationParams,
    shallow,
  }: NavigateToParams<T>) => {
    const url = (urlBuilders as Record<string, (params: typeof navigationParams) => string>)[urlType](navigationParams)

    if (shallow && window) {
      return window.history.replaceState(
        window.history.state,
        '',
        url
      )
    }

    alert('url --> ' + url)

    return router.push(url, { scroll: false })
  }

  if (isLoading) {
    return null
  }

  return (
    <SidebarContext.Provider
      value={{
        tab,
        isLoading,
        filterValue,
        isFilterMode,
        isSidebarOpen,
        selectedChats,
        activeChatbot,
        activeCategory,
        selectedChatbots,
        filteredCategories,
        selectedCategories,
        expandedCategories,
        changeTab,
        navigateTo,
        toggleSidebar,
        setFilterValue,
        setIsFilterMode,
        setActiveChatbot,
        setSelectedChats,
        setActiveCategory,
        setSelectedChatbots,
        setExpandedCategories,
        setSelectedCategories,
        toggleChatbotSelection,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
