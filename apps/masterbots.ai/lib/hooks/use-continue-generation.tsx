'use client'

import { createContext, useContext, useState } from 'react'
import type { Message } from 'ai'
import { CONTINUE_GENERATION_PROMPT } from '@/lib/constants/prompts'

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
	append,
}: {
	children: React.ReactNode
	append: (
		message: Message,
		options?: any,
	) => Promise<string | null | undefined>
}) {
	const [isCutOff, setIsCutOff] = useState(false)
	const [lastFinishReason, setLastFinishReason] = useState<string | null>(null)

	//? Function to handle continuing generation
	const continueGeneration = async () => {
		if (!isCutOff) return

		//? Send a message to continue the generation
		await append({
			id: crypto.randomUUID(),
			role: 'user',
			content: CONTINUE_GENERATION_PROMPT,
		})

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
