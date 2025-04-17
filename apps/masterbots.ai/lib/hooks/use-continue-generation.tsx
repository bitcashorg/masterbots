'use client'

import { createContext, useContext, useState } from 'react'
interface ContinueGenerationContextType {
	isCutOff: boolean
	setIsCutOff: (value: boolean) => void
	continueGeneration: () => Promise<void>
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
		//? Reset the cut-off state
		setIsCutOff(false)
	}

	return (
		<ContinueGenerationContext.Provider
			value={{
				isCutOff,
				setIsCutOff,
				continueGeneration,
				lastFinishReason,
				setLastFinishReason,
			}}
		>
			{children}
		</ContinueGenerationContext.Provider>
	)
}
