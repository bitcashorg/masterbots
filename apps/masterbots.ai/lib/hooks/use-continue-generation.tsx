'use client'

import {
	CONTINUE_GENERATION_PROMPT,
	CONTINUE_GENERATION_PROMPT_2,
} from '@/lib/constants/prompts'
import { createContext, useContext, useRef, useState } from 'react'
interface ContinueGenerationContextType {
	isCutOff: boolean
	setIsCutOff: (value: boolean) => void
	continueGeneration: () => Promise<void>
	isContinuing: boolean
	continuationCount: number
	getContinuationPrompt: () => string
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
	const [isContinuing, setIsContinuing] = useState(false)
	const continuationCountRef = useRef(0)

	//? Function for continuing generation
	const continueGeneration = async () => {
		console.log('Continue generation function called')
		setIsContinuing(true)
		continuationCountRef.current += 1
	}

	//? Get appropriate continuation prompt based on continuation count
	const getContinuationPrompt = () => {
		return continuationCountRef.current <= 1
			? CONTINUE_GENERATION_PROMPT
			: CONTINUE_GENERATION_PROMPT_2
	}

	return (
		<ContinueGenerationContext.Provider
			value={{
				isCutOff,
				setIsCutOff,
				continueGeneration,
				isContinuing,
				continuationCount: continuationCountRef.current,
				getContinuationPrompt,
			}}
		>
			{children}
		</ContinueGenerationContext.Provider>
	)
}
