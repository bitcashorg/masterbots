'use client'

import type React from 'react'
import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from './use-local-storage'

type FontSize = 'normal' | 'large' | 'x-large' | 'small' | 'medium'

interface AccessibilityState {
	fontSize: FontSize
	setFontSize: (size: FontSize) => void
}

const AccessibilityContext = createContext<AccessibilityState | undefined>(
	undefined,
)

export function AccessibilityProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [fontSize, setFontSize] = useLocalStorage<FontSize>(
		'mb-font-size',
		'large',
	)

	useEffect(() => {
		document.documentElement.setAttribute('data-font-size', fontSize)
	}, [fontSize])

	return (
		<AccessibilityContext.Provider value={{ fontSize, setFontSize }}>
			{children}
		</AccessibilityContext.Provider>
	)
}

export function useAccessibility() {
	const context = useContext(AccessibilityContext)
	if (context === undefined) {
		throw new Error(
			'useAccessibility must be used within an AccessibilityProvider',
		)
	}
	return context
}
