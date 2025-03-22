'use client'

import { AIModels } from '@/app/api/chat/models/models'
import { getModelClientType } from '@/lib/helpers/ai-helpers'
import * as React from 'react'

interface ModelContextProps {
	selectedModel: AIModels
	clientType: string
	changeModel: (model: AIModels) => void
}

const ModelContext = React.createContext<ModelContextProps | undefined>(
	undefined,
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
	const [selectedModel, setSelectedModel] = React.useState(AIModels.Default)
	const [clientType, setClientType] = React.useState(
		getModelClientType(AIModels.Default),
	)

	React.useEffect(() => {
		setClientType(getModelClientType(selectedModel))
		console.log(
			'Model updated to:',
			selectedModel,
			'ClientType:',
			getModelClientType(selectedModel),
		)
	}, [selectedModel])

	const changeModel = React.useCallback((model: AIModels) => {
		if (model && Object.values(AIModels).includes(model)) {
			console.log('Changing model to:', model)
			setSelectedModel(model)
		} else {
			console.warn(
				`Invalid model: ${model}, using default: ${AIModels.Default}`,
			)
			setSelectedModel(AIModels.Default)
		}
	}, [])

	return (
		<ModelContext.Provider value={{ selectedModel, changeModel, clientType }}>
			{children}
		</ModelContext.Provider>
	)
}
