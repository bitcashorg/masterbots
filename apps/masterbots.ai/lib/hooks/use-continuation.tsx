import type React from 'react'
import { createContext, useContext, useState } from 'react'

type ContinuationState = {
	isContinuing: boolean
	continuingMessageId: string | null
	originalContent: string | null
}

type ContinuationContextType = {
	state: ContinuationState
	startContinuation: (messageId: string, originalContent: string) => void
	endContinuation: () => void
	isMessageBeingContinued: (messageId: string) => boolean
}

const ContinuationContext = createContext<ContinuationContextType | undefined>(
	undefined,
)

export function ContinuationProvider({
	children,
}: { children: React.ReactNode }) {
	const [state, setState] = useState<ContinuationState>({
		isContinuing: false,
		continuingMessageId: null,
		originalContent: null,
	})

	const startContinuation = (messageId: string, originalContent: string) => {
		setState({
			isContinuing: true,
			continuingMessageId: messageId,
			originalContent,
		})
	}

	const endContinuation = () => {
		setState({
			isContinuing: false,
			continuingMessageId: null,
			originalContent: null,
		})
	}

	const isMessageBeingContinued = (messageId: string) => {
		return state.isContinuing && state.continuingMessageId === messageId
	}

	return (
		<ContinuationContext.Provider
			value={{
				state,
				startContinuation,
				endContinuation,
				isMessageBeingContinued,
			}}
		>
			{children}
		</ContinuationContext.Provider>
	)
}

export function useContinuation() {
	const context = useContext(ContinuationContext)
	if (!context) {
		throw new Error(
			'useContinuation must be used within a ContinuationProvider',
		)
	}
	return context
}
