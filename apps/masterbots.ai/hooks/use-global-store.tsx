'use client'

import React, { ReactNode, createContext, useContext } from 'react'
import { useSetState } from 'react-use'
import { User } from '@supabase/auth-js'

// Create the context
const GlobalStoreContext = createContext<GlobalStoreContextValue>({
  errorMessage: '',
  hasuraJwt: '',
  user: {
    userId: '',
    username: '',
    name: ''
  },
  setGlobalError: (errorMessage: string) => {}
})

// Custom hook to consume the context
export const useGlobalStore = () => useContext(GlobalStoreContext)

// Provider component to wrap your application and provide the context
export function GlobalStoreProvider({
  children,
  hasuraJwt,
  user
}: GlobalStoreProviderProps) {
  const [state, setState] = useSetState({
    errorMessage: '',
    hasuraJwt,
    user
  })

  const setGlobalError = (errorMessage: string) => setState({ errorMessage })

  return (
    <GlobalStoreContext.Provider value={{ ...state, setGlobalError }}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

type GlobalStoreProviderProps = {
  children: ReactNode
  hasuraJwt: string
  user: User | null
}

// Define type for the context value
type GlobalStoreContextValue = {
  errorMessage: string
  hasuraJwt: string
  user: {
    userId: string
    username: string
    name: string
  } | null
  setGlobalError: (errorMessage: string) => void
}
