'use client'

import React, { ReactNode, createContext, useContext } from 'react'
import { useSetState } from 'react-use'
import type { MB } from '@repo/supabase'

// Create the context
const GlobalStoreContext = createContext<GlobalStoreContextValue>({
  user: null,
  chatbots: [],
  categories: []
})

// Custom hook to consume the context
export const useGlobalStore = () => useContext(GlobalStoreContext)

// Provider component to wrap your application and provide the context
export function GlobalStoreProvider({
  children,
  user,
  chatbots = [],
  categories = []
}: GlobalStoreProviderProps) {
  const [state, setState] = useSetState({
    user,
    chatbots,
    categories
  })

  return (
    <GlobalStoreContext.Provider value={{ ...state }}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

type GlobalStoreProviderProps = {
  user: UserProfile | null
  children: ReactNode
  chatbots: MB.ChatbotWithPrompts[]
  categories: MB.Category[]
}

// Define type for the context value
type GlobalStoreContextValue = {
  user: UserProfile | null
  chatbots: MB.ChatbotWithPrompts[]
  categories: MB.Category[]
}

export type UserProfile = {
  userId: string
  username: string
  name: string
  email: string
  image: string
}
