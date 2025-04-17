'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type ContinueState = {
	isContinuing: boolean
	continuationMessageId: string | null
	originalMessageId: string | null
}

type ContinueActions = {
	setContinuing: (isContinuing: boolean) => void
	setContinuationMessageId: (messageId: string | null) => void
	setOriginalMessageId: (messageId: string | null) => void
	startContinuation: (originalMessageId: string) => void
	endContinuation: (continuationMessageId: string) => void
	resetContinuation: () => void
}

type ContinueContextType = [ContinueState, ContinueActions]

const ContinueContext = createContext<ContinueContextType | undefined>(
	undefined,
)

export function ContinueProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<ContinueState>({
		isContinuing: false,
		continuationMessageId: null,
		originalMessageId: null,
	})

	const setContinuing = (isContinuing: boolean) => {
		setState((prev) => ({ ...prev, isContinuing }))
	}

	const setContinuationMessageId = (continuationMessageId: string | null) => {
		setState((prev) => ({ ...prev, continuationMessageId }))
	}

	const setOriginalMessageId = (originalMessageId: string | null) => {
		setState((prev) => ({ ...prev, originalMessageId }))
	}

	const startContinuation = (originalMessageId: string) => {
		setState({
			isContinuing: true,
			originalMessageId,
			continuationMessageId: null,
		})
	}

	const endContinuation = (continuationMessageId: string) => {
		setState((prev) => ({
			...prev,
			isContinuing: false,
			continuationMessageId,
		}))
	}

	const resetContinuation = () => {
		setState({
			isContinuing: false,
			continuationMessageId: null,
			originalMessageId: null,
		})
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Reset continuation state when component unmounts
		return () => resetContinuation()
	}, [])

	return (
		<ContinueContext.Provider
			value={[
				state,
				{
					setContinuing,
					setContinuationMessageId,
					setOriginalMessageId,
					startContinuation,
					endContinuation,
					resetContinuation,
				},
			]}
		>
			{children}
		</ContinueContext.Provider>
	)
}

export function useContinue(): ContinueContextType {
	const context = useContext(ContinueContext)
	if (!context) {
		throw new Error('useContinue must be used within a ContinueProvider')
	}
	return context
}
