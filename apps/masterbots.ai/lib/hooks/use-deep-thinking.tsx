'use client'

import { AIModels } from '@/app/api/chat/models/models'
import { useModel } from '@/lib/hooks/use-model'
import * as React from 'react'

interface DeepThinkingContextType {
	isDeepThinking: boolean
	toggleDeepThinking: () => void
}
const DeepThinkingContext = React.createContext<
	DeepThinkingContextType | undefined
>(undefined)

export function DeepThinkingProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { changeModel, selectedModel } = useModel()

	const previousModelRef = React.useRef<string>(AIModels.Default)

	const isDeepThinking = selectedModel === AIModels.DeepSeekGroq

	React.useEffect(() => {
		if (selectedModel !== AIModels.DeepSeekGroq) {
			previousModelRef.current = selectedModel
			console.log(
				'DeepThinking: Updated previous model reference to:',
				selectedModel,
			)
		}
	}, [selectedModel])

	const toggleDeepThinking = React.useCallback(() => {
		console.log('DeepThinking Toggle: Current state is', isDeepThinking)

		if (!isDeepThinking) {
			previousModelRef.current = selectedModel
			console.log('DeepThinking Toggle: Saving previous model:', selectedModel)
			console.log('DeepThinking Toggle: Activating, switching to DeepSeek')
			changeModel(AIModels.DeepSeekGroq)
		} else {
			const modelToRestore = previousModelRef.current || AIModels.Default
			console.log(
				'DeepThinking Toggle: Deactivating, restoring model:',
				modelToRestore,
			)
			changeModel(modelToRestore as AIModels)
		}
	}, [selectedModel, isDeepThinking, changeModel])

	const value = React.useMemo(
		() => ({
			isDeepThinking,
			toggleDeepThinking,
		}),
		[isDeepThinking, toggleDeepThinking],
	)

	return (
		<DeepThinkingContext.Provider value={value}>
			{children}
		</DeepThinkingContext.Provider>
	)
}

export function useDeepThinking() {
	const context = React.useContext(DeepThinkingContext)
	if (context === undefined) {
		throw new Error(
			'useDeepThinking must be used within a DeepThinkingProvider',
		)
	}
	return context
}
