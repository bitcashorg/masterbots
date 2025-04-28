'use client'

import { AIModels } from '@/app/api/chat/models/models'
import { getModelClientType } from '@/lib/helpers/ai-helpers'
import { type ModelData, findDefaultModel } from '@/lib/models'
import { getModels } from '@/services/hasura'
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

interface ModelContextProps {
	selectedModel: string
	clientType: string
	changeModel: (model: string) => void
	models: ModelData[]
	isLoading: boolean
	error: Error | null
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
	const [error, setError] = useState<Error | null>(null)

	//* Fetch models from Hasura
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchModels = async () => {
			try {
				setIsLoading(true)
				setError(null)
				const fetchedModels = await getModels()

				if (
					fetchedModels &&
					Array.isArray(fetchedModels) &&
					fetchedModels.length > 0
				) {
					setModels(fetchedModels as ModelData[])

					//? Set default model if needed
					const defaultModelValue = findDefaultModel(
						fetchedModels as ModelData[],
						selectedModel,
					)
					if (defaultModelValue && defaultModelValue !== selectedModel) {
						setSelectedModel(defaultModelValue)
					}
				} else {
					console.warn('No models returned from API call')
					setError(new Error('No models available'))
				}
			} catch (error) {
				console.error('Error fetching models:', error)
				setError(
					error instanceof Error ? error : new Error('Failed to fetch models'),
				)
			} finally {
				setIsLoading(false)
			}
		}

		fetchModels()
	}, [])

	//? Update client type when selected model changes
	useEffect(() => {
		const newClientType = getModelClientType(selectedModel)
		setClientType(newClientType)
		console.log('Model updated:', selectedModel, 'ClientType:', newClientType)
	}, [selectedModel])

	const changeModel = useCallback(
		(model: string) => {
			//? Verify the model exists in our database and is enabled
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
				error,
			}}
		>
			{children}
		</ModelContext.Provider>
	)
}
