'use client'

import { Chatbot } from 'mb-genql'
import * as React from 'react'

const LOCAL_STORAGE_KEY = 'sidebar'

interface SidebarContext {
  isSidebarOpen: boolean
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
  toggleChatbotSelection: (chatbotId: number) => void
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined
)

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
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)
  const [activeChatbot, setActiveChatbot] = React.useState<Chatbot | null>(null)
  const [tab, setTab] = React.useState<'general' | 'work'>('general')
  const [activeCategory, setActiveCategory] = React.useState<number | null>(
    null
  )
  const [isFilterMode, setIsFilterMode] = React.useState(false)
  const [filterValue, setFilterValue] = React.useState('')
  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  )
  const [selectedChatbots, setSelectedChatbots] = React.useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42
  ])
  const [selectedChats, setSelectedChats] = React.useState<string[]>([])

  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value) {
      setSidebarOpen(JSON.parse(value))
    }
    setLoading(false)
  }, [])

  const toggleSidebar = (toggle = true) => {
    setSidebarOpen(value => {
      const newState = toggle ? !value : false
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      return newState
    })
  }

  const toggleChatbotSelection = React.useCallback((chatbotId: number) => {
    setSelectedChatbots(prev =>
      prev.includes(chatbotId)
        ? prev.filter(id => id !== chatbotId)
        : [...prev, chatbotId]
    )
  }, [])

  const changeTab = (cate: 'general' | 'work') => {
    setTab(cate)
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
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
