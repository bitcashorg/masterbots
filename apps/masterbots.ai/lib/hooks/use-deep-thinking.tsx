// use-deep-thinking.tsx
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

	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => {
		setMounted(true)
	}, [])

	const isDeepThinking = mounted && selectedModel === AIModels.GroqDeepSeek

	const previousModelRef = React.useRef<string>(AIModels.Default)

	React.useEffect(() => {
		if (selectedModel !== AIModels.GroqDeepSeek) {
			previousModelRef.current = selectedModel
			console.log(
				'DeepThinking: Updated previous model reference to:',
				selectedModel,
			)
		}
	}, [selectedModel])

	const toggleDeepThinking = React.useCallback(() => {
		console.log('DeepThinking Toggle: Current is', isDeepThinking)
		if (!isDeepThinking) {
			previousModelRef.current = selectedModel
			changeModel(AIModels.GroqDeepSeek)
		} else {
			const modelToRestore = previousModelRef.current || AIModels.Default
			changeModel(modelToRestore as AIModels)
		}
	}, [isDeepThinking, changeModel, selectedModel])

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
