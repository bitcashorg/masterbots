'use client'

import { getCategories, getUserBySlug } from '@/services/hasura'
import type { Category, Chatbot } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { useAsync } from 'react-use'

const LOCAL_STORAGE_KEY = 'sidebar'

interface NavigationParams {
  page: string | undefined
  slug: string | undefined
  categoryName?: string
  chatbotName?: string
  isBrowse?: boolean
}

interface SidebarContext {
  isSidebarOpen: boolean
  filteredCategories: Category[]
  toggleSidebar: (toggle?: boolean) => void
  isLoading: boolean
  tab: 'general' | 'work'
  changeTab: (cate: 'general' | 'work') => void
  activeCategory: number | null
  activeChatbot: Chatbot | null
  setActiveCategory: React.Dispatch<React.SetStateAction<number | null>>
  setActiveChatbot: React.Dispatch<React.SetStateAction<Chatbot | null>>
  isFilterMode: boolean
  setIsFilterMode: React.Dispatch<React.SetStateAction<boolean>>
  filterValue: string
  setFilterValue: React.Dispatch<React.SetStateAction<string>>
  selectedCategories: number[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>
  selectedChatbots: number[]
  setSelectedChatbots: React.Dispatch<React.SetStateAction<number[]>>
  selectedChats: string[]
  setSelectedChats: React.Dispatch<React.SetStateAction<string[]>>
  expandedCategories: number[]
  setExpandedCategories: React.Dispatch<React.SetStateAction<number[]>>
  toggleChatbotSelection: (chatbotId: number) => void
  navigateTo: (params: NavigationParams) => void
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
    let categories = []
    let userId = null
    if (slug) {
      const { user, error } = await getUserBySlug({
        slug: slug as string,
        isSameUser: false,
      })

      if (error) {
        throw new Error(error)
      }

      userId = user?.userId
    }

    categories = await getCategories()

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
    setSelectedCategories((prev) =>
      categories?.categoriesChatbots
        .filter((category) => category.chatbots.some((chatbot) => chatbot.chatbotId === chatbotId))
        .map((category) => category.categoryId)
        .filter((id) => !prev.includes(id)).length
        ? [
          ...prev,
          ...categories?.categoriesChatbots
            .filter((category) =>
              category.chatbots.some((chatbot) => chatbot.chatbotId === chatbotId),
            )
            .map((category) => category.categoryId),
        ]
        : prev.filter(
          (id) =>
            !categories?.categoriesChatbots
              .filter((category) =>
                category.chatbots.some((chatbot) => chatbot.chatbotId === chatbotId),
              )
              .map((category) => category.categoryId)
              .includes(id),
        ),
    )
  }, [])

  const changeTab = (cate: 'general' | 'work') => {
    setTab(cate)
  }

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

  const getBasePath = ({ page, slug, isBrowse }: NavigationParams) => {
    // Handle browse page first
    if (isBrowse) {
      return ''
    }

    // Handle profile page
    if (page === 'profile') {
      return `/u/${slug}/t`
    }

    // Default to community path
    const base = '/c'

    return base
  }
  const buildNavigationUrl = ({
    page,
    slug,
    categoryName,
    chatbotName,
    isBrowse,
  }: NavigationParams): string => {
    const base = getBasePath({ page, slug, isBrowse, categoryName, chatbotName })
    if (!categoryName && !chatbotName) {
      return base
    }

    const categoryPath = categoryName ? `/${toSlug(categoryName.toLowerCase())}` : ''
    const chatbotPath = chatbotName ? `/${chatbotName.toLowerCase()}` : ''
    return `${base}${categoryPath}${chatbotPath}`
  }

  const navigateTo = ({
    page,
    slug,
    categoryName,
    chatbotName,
    isBrowse,
  }: NavigationParams): void => {
    const url = buildNavigationUrl({ page, slug, categoryName, chatbotName, isBrowse })

    if (url.startsWith('/c')) {
      router.push(url, { scroll: false })
    } else {
      window.history.pushState({
        category: categoryName,
        chatbot: chatbotName,
      }, '', url)
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isLoading,
        tab,
        changeTab,
        filteredCategories,
        activeCategory,
        setActiveCategory,
        activeChatbot,
        setActiveChatbot,
        isFilterMode,
        setIsFilterMode,
        filterValue,
        setFilterValue,
        selectedCategories,
        setSelectedCategories,
        selectedChatbots,
        setSelectedChatbots,
        selectedChats,
        setSelectedChats,
        toggleChatbotSelection,
        expandedCategories,
        setExpandedCategories,
        navigateTo,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
