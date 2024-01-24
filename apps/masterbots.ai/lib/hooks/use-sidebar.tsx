'use client'

import * as React from 'react'

const LOCAL_STORAGE_KEY = 'sidebar'

interface SidebarContext {
  isSidebarOpen: boolean
  toggleSidebar: (toggle?: boolean) => void
  isLoading: boolean
  tab: 'general' | 'work'
  changeTab: (cate: 'general' | 'work') => void
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
  const [tab, setTab] = React.useState<'general' | 'work'>('general')

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

  const changeTab = (cate: 'general' | 'work') => {
    setTab(cate)
  }

  if (isLoading) {
    return null
  }

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, isLoading, tab, changeTab }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
