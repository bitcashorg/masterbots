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

	const previousModelRef = React.useRef<string>(AIModels.Default)
	const updatingRef = React.useRef(false)

	React.useEffect(() => {
		if (updatingRef.current) return

		if (isDeepThinking && selectedModel !== AIModels.DeepSeekGroq) {
			console.log('DeepThinking Effect 1: Activated, switching to DeepSeek')
			updatingRef.current = true
			changeModel(AIModels.DeepSeekGroq)
			setTimeout(() => {
				updatingRef.current = false
			}, 100)
		}
	}, [isDeepThinking, selectedModel, changeModel])

	React.useEffect(() => {
		if (updatingRef.current) return

		if (!isDeepThinking && selectedModel === AIModels.DeepSeekGroq) {
			const modelToRestore = previousModelRef.current || AIModels.Default
			console.log(
				'DeepThinking Effect 2: Deactivated, restoring model:',
				modelToRestore,
			)
			updatingRef.current = true
			changeModel(modelToRestore as AIModels)
			setTimeout(() => {
				updatingRef.current = false
			}, 100)
		}
	}, [isDeepThinking, selectedModel, changeModel])

	React.useEffect(() => {
		if (updatingRef.current) return

		if (selectedModel === AIModels.DeepSeekGroq && !isDeepThinking) {
			console.log(
				'DeepThinking Effect 3: DeepSeek model detected, activating Deep Thinking UI',
			)
			updatingRef.current = true
			setIsDeepThinking(true)
			setTimeout(() => {
				updatingRef.current = false
			}, 100)
		} else if (selectedModel !== AIModels.DeepSeekGroq && isDeepThinking) {
			console.log(
				'DeepThinking Effect 4: Model is not DeepSeek, deactivating Deep Thinking UI',
			)
			updatingRef.current = true
			setIsDeepThinking(false)
			setTimeout(() => {
				updatingRef.current = false
			}, 100)
		}
	}, [selectedModel, isDeepThinking])

	const toggleDeepThinking = React.useCallback(() => {
		if (!isDeepThinking && selectedModel !== AIModels.DeepSeekGroq) {
			previousModelRef.current = selectedModel
			console.log('DeepThinking Toggle: Saving previous model:', selectedModel)
		}

		console.log('DeepThinking Toggle: Changing state to', !isDeepThinking)
		setIsDeepThinking((prevState) => !prevState)
	}, [selectedModel, isDeepThinking])

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
