'use client'

import { createContext, useContext, useState } from 'react'
interface ContinueGenerationContextType {
	isCutOff: boolean
	setIsCutOff: (value: boolean) => void
	continueGeneration: () => Promise<void>
	manualContinueGeneration: () => Promise<void>
	lastFinishReason: string | null
	setLastFinishReason: (reason: string | null) => void
}

const ContinueGenerationContext = createContext<
	ContinueGenerationContextType | undefined
>(undefined)

export function useContinueGeneration() {
	const context = useContext(ContinueGenerationContext)
	if (!context) {
		throw new Error(
			'useContinueGeneration must be used within a ContinueGenerationProvider',
		)
	}
	return context
}

export function ContinueGenerationProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [isCutOff, setIsCutOff] = useState(false)
	const [lastFinishReason, setLastFinishReason] = useState<string | null>(null)

	//? Function to handle continuing generation
	const continueGeneration = async () => {
		console.log('Continue generation function called')
		setIsCutOff(false)
	}

	//? Function for manual continuation (user-initiated)
	const manualContinueGeneration = async () => {
		console.log('Manual continue generation function called')
	}

	return (
		<ContinueGenerationContext.Provider
			value={{
				isCutOff,
				setIsCutOff,
				continueGeneration,
				manualContinueGeneration,
				lastFinishReason,
				setLastFinishReason,
			}}
		>
			{children}
		</ContinueGenerationContext.Provider>
	)
}
