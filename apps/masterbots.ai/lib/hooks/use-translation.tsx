'use client'

import * as React from 'react'

interface TranslationContextProps {
  translateToSpanish: boolean
  setTranslateToSpanish: (value: boolean) => void
}

const TranslationContext = React.createContext<TranslationContextProps | undefined>(
  undefined
)

export function useTranslation() {
  const context = React.useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

interface TranslationProviderProps {
  children: React.ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [translateToSpanish, setTranslateToSpanish] = React.useState(false)

  return (
    <TranslationContext.Provider value={{ translateToSpanish, setTranslateToSpanish }}>
      {children}
    </TranslationContext.Provider>
  )
}