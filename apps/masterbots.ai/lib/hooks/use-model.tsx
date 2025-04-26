'use client'

import { AIModels } from '@/app/api/chat/models/models'
import { getModelClientType } from '@/lib/helpers/ai-helpers'
import { getModels } from '@/services/hasura'
import {
	useEffect,
	useState,
	createContext,
	useContext,
	useCallback,
	type ReactNode,
} from 'react'

// Define the Model interface based on your schema
interface ModelData {
	model: string
	enabled: boolean
	type: string
	model_data: {
		name: string
		value: string
	}
}

interface ModelContextProps {
	selectedModel: string
	clientType: string
	changeModel: (model: string) => void
	models: ModelData[]
	isLoading: boolean
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined)

export function useModel() {
	const context = useContext(ModelContext)
	if (!context) {
		throw new Error('useModel must be used within a ModelProvider')
	}
	return context
}

interface ModelProviderProps {
	children: ReactNode
}

export function ModelProvider({ children }: ModelProviderProps) {
	const [selectedModel, setSelectedModel] = useState<string>(AIModels.Default)
	const [clientType, setClientType] = useState<string>(
		getModelClientType(AIModels.Default),
	)
	const [models, setModels] = useState<ModelData[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	//? Fetch models from Hasura
	useEffect(() => {
		const fetchModels = async () => {
			try {
				setIsLoading(true)
				const fetchedModels = await getModels()
				console.log('Raw models from API:', fetchedModels)

				if (fetchedModels && fetchedModels.length > 0) {
					setModels(fetchedModels as ModelData[])
					console.log('Models set in state:', fetchedModels)

					//? If selected model isn't in the list or is disabled, reset to first available model
					const currentModelExists = fetchedModels.some(
						(m: ModelData) => m.model === selectedModel && m.enabled,
					)

					if (!currentModelExists) {
						//? Find first enabled model
						const defaultModel = fetchedModels.find((m: ModelData) => m.enabled)
						if (defaultModel) {
							setSelectedModel(defaultModel.model)
						}
					} else {
						console.warn('No models returned from API call')
					}
				}
			} catch (error) {
				console.error('Error fetching models:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchModels()
	}, [selectedModel])

	//? Update client type when selected model changes
	useEffect(() => {
		setClientType(getModelClientType(selectedModel))
		console.log(
			'Model updated to:',
			selectedModel,
			'ClientType:',
			getModelClientType(selectedModel),
		)
	}, [selectedModel])

	const changeModel = useCallback(
		(model: string) => {
			// Verify the model exists in our database and is enabled
			const modelData = models.find((m) => m.model === model)

			if (modelData?.enabled) {
				console.log('Changing model to:', model)
				setSelectedModel(model)
			} else if (!modelData) {
				console.warn(
					`Model not found: ${model}, using default: ${AIModels.Default}`,
				)
				setSelectedModel(AIModels.Default)
			} else {
				console.warn(
					`Model is disabled: ${model}, using default: ${AIModels.Default}`,
				)
				setSelectedModel(AIModels.Default)
			}
		},
		[models],
	)

	return (
		<ModelContext.Provider
			value={{
				selectedModel,
				changeModel,
				clientType,
				models,
				isLoading,
			}}
		>
			{children}
		</ModelContext.Provider>
	)
}
