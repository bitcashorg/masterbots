'use client'

import { AIModels } from '@/app/api/chat/actions/models'
import * as React from 'react'
import { getModelClientType } from '@/lib/ai'

interface ModelContextProps {
  selectedModel: AIModels
  clientType: string
  changeModel: (model: AIModels) => void
}

const ModelContext = React.createContext<ModelContextProps | undefined>(
  undefined
)

export function useModel() {
  const context = React.useContext(ModelContext)
  if (!context) {
    throw new Error('useModelContext must be used within a ModelProvider')
  }
  return context
}

interface ModelProviderProps {
  children: React.ReactNode
}

export function ModelProvider({ children }: ModelProviderProps) {
  const [selectedModel, setSelectedModel] = React.useState(AIModels.Default) // OpenIA as default model
  const [clientType, setClientType] = React.useState('')
  
  React.useEffect(() => {
    setClientType(getModelClientType(selectedModel))
  }, [selectedModel])

  const changeModel = (model: AIModels) => {
    setSelectedModel(model)
  }

  return (
    <ModelContext.Provider value={{ selectedModel, changeModel, clientType }}>
      {children}
    </ModelContext.Provider>
  )
}
