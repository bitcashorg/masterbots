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
	const [isDeepThinking, setIsDeepThinking] = React.useState(false)
	const { changeModel, selectedModel } = useModel()

	const previousModelRef = React.useRef<string>(selectedModel)

	const toggleDeepThinking = React.useCallback(() => {
		setIsDeepThinking((prev) => {
			const newState = !prev

			if (newState) {
				previousModelRef.current = selectedModel
				changeModel(AIModels.DeepSeekGroq)
			} else {
				changeModel(previousModelRef.current as AIModels)
			}

			return newState
		})
	}, [selectedModel, changeModel])

	return (
		<DeepThinkingContext.Provider
			value={{
				isDeepThinking,
				toggleDeepThinking,
			}}
		>
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
