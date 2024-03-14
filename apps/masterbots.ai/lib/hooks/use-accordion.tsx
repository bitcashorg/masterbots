'use accordion'

import * as React from 'react'

interface AccordionContextProps {
  openedAccordionId: string | null
  openAccordion: (threadId: string) => void
  closeAccordion: () => void
  toggleAccordion: (threadId: string) => void
}

const AccordionContext = React.createContext<AccordionContextProps | undefined>(
  undefined
)

export const useAccordion = () => {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider')
  }
  return context
}

interface AccordionProviderProps {
  children: React.ReactNode
}

export const AccordionProvider = ({ children }: AccordionProviderProps) => {
  const [openedAccordionId, setOpenedAccordionId] = React.useState<
    string | null
  >(null)

  const openAccordion = React.useCallback((threadId: string) => {
    setOpenedAccordionId(threadId)
  }, [])

  const closeAccordion = React.useCallback(() => {
    setOpenedAccordionId(null)
  }, [])

  const toggleAccordion = React.useCallback((threadId: string) => {
    setOpenedAccordionId(prevOpenedId =>
      prevOpenedId === threadId ? null : threadId
    )
  }, [])

  return (
    <AccordionContext.Provider
      value={{
        openedAccordionId,
        openAccordion,
        closeAccordion,
        toggleAccordion
      }}
    >
      {children}
    </AccordionContext.Provider>
  )
}
