'use client'

import { Chatbot } from '@repo/mb-genql'
import { useSearchParams } from 'next/navigation'
import React, { ReactNode, createContext, useContext } from 'react'
import { useSetState } from 'react-use'

// Create the context
const GlobalStoreContext = createContext<GlobalStoreContextValue>({
  errorMessage: '',
  hasuraJwt: '',
  user: null,
  chatbots: [],
  query: '',
  setGlobalError: (errorMessage: string) => {},
  setGlobalQuery: (query: string) => {}
})

// Custom hook to consume the context
export const useGlobalStore = () => useContext(GlobalStoreContext)

// Provider component to wrap your application and provide the context
export function GlobalStoreProvider({
  children,
  hasuraJwt,
  user,
  chatbots = []
}: GlobalStoreProviderProps) {
  const searchParams = useSearchParams()
  const [state, setState] = useSetState({
    errorMessage: '',
    hasuraJwt,
    user,
    query: searchParams.get('query'),
    chatbots: chatbots
  })

  const setGlobalError = (errorMessage: string) => setState({ errorMessage })
  const setGlobalQuery = (query: string) => setState({ query })

  return (
    <GlobalStoreContext.Provider
      value={{ ...state, setGlobalError, setGlobalQuery }}
    >
      {children}
    </GlobalStoreContext.Provider>
  )
}

type GlobalStoreProviderProps = {
  children: ReactNode
  hasuraJwt: string
  user: UserProfile | null
  chatbots: Chatbot[]
}

// Define type for the context value
type GlobalStoreContextValue = {
  errorMessage: string
  hasuraJwt: string
  user: UserProfile | null
  setGlobalError: (errorMessage: string) => void
  setGlobalQuery: (query: string) => void
  chatbots: Chatbot[]
  query: string
}

export type UserProfile = {
  userId: string
  username: string
  name: string
  email: string
  image: string
}