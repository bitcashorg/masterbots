'use client'

import * as React from 'react'

interface BrowseContextProps {
	keyword: string
	tab: null | number
	changeKeyword: (keyword: string) => void
	changeTab: (tab: null | number) => void
}

const BrowseContext = React.createContext<BrowseContextProps | undefined>(
	undefined,
)

export function useBrowse() {
	const context = React.useContext(BrowseContext)
	if (!context) {
		throw new Error('useBrowseContext must be used within a BrowseProvider')
	}
	return context
}

interface BrowseProviderProps {
	children: React.ReactNode
}

export function BrowseProvider({ children }: BrowseProviderProps) {
	const [keyword, setKeyword] = React.useState('')
	const [tab, setTab] = React.useState<null | number>(null)

	const changeTab = (tab: null | number) => {
		setTab(tab)
	}

	const changeKeyword = (keyword: string) => {
		setKeyword(keyword)
	}

	return (
		<BrowseContext.Provider value={{ changeKeyword, keyword, tab, changeTab }}>
			{children}
		</BrowseContext.Provider>
	)
}
