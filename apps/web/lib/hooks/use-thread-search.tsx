import * as React from 'react'

interface ThreadSearchContextProps {
	searchTerm: string
	setSearchTerm: (term: string) => void
}

const ThreadSearchContext = React.createContext<
	ThreadSearchContextProps | undefined
>(undefined)

export function useThreadSearch() {
	const context = React.useContext(ThreadSearchContext)
	if (!context) {
		throw new Error(
			'useThreadSearch must be used within a ThreadSearchProvider',
		)
	}
	return context
}

interface ThreadSearchProviderProps {
	children: React.ReactNode
}

export function ThreadSearchProvider({ children }: ThreadSearchProviderProps) {
	const [searchTerm, setSearchTerm] = React.useState('')

	return (
		<ThreadSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
			{children}
		</ThreadSearchContext.Provider>
	)
}
