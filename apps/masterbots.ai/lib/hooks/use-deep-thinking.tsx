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

const REASONING_MODELS = [AIModels.GroqDeepSeek, AIModels.OpenAI_o4_mini]

export function DeepThinkingProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { changeModel, selectedModel } = useModel()

	const [enabled, setEnabled] = React.useState(false)

	//? Track the model selected when deep thinking was enabled
	const [reasoningModel, setReasoningModel] = React.useState<string | null>(
		null,
	)

	//? Store the previous model to restore when disabling deep thinking
	const previousModelRef = React.useRef<string>(AIModels.Default)

	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => {
		setMounted(true)
	}, [])

	// Check if the current model is a reasoning model
	const isDeepThinking = mounted && enabled

	React.useEffect(() => {
		// If deep thinking is disabled, update the previous model reference
		if (!enabled) {
			previousModelRef.current = selectedModel
		}
	}, [selectedModel, enabled])

	const toggleDeepThinking = React.useCallback(() => {
		if (!enabled) {
			previousModelRef.current = selectedModel

			if (REASONING_MODELS.includes(selectedModel as AIModels)) {
				setEnabled(true)
				setReasoningModel(selectedModel)
				return
			}
			let targetModel: string
			if (selectedModel.startsWith('o4-mini')) {
				targetModel = AIModels.OpenAI_o4_mini
			} else {
				targetModel = AIModels.GroqDeepSeek
			}

			setReasoningModel(targetModel)
			changeModel(targetModel)
			setEnabled(true)
		} else {
			//? Disable deep thinking - restore previous model
			const modelToRestore = previousModelRef.current || AIModels.Default
			changeModel(modelToRestore as AIModels)
			setEnabled(false)
			setReasoningModel(null)
		}
	}, [enabled, changeModel, selectedModel])

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
