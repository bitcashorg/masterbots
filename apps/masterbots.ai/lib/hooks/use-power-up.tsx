'use client'

import * as React from 'react'

interface PowerUpContextType {
	isPowerUp: boolean
	togglePowerUp: () => void
}

const PowerUpContext = React.createContext<PowerUpContextType | undefined>(
	undefined,
)

export function PowerUpProvider({ children }: { children: React.ReactNode }) {
	const [isPowerUp, setIsPowerUp] = React.useState(false)

	const togglePowerUp = React.useCallback(() => {
		setIsPowerUp((prev) => !prev)
	}, [])

	const value = React.useMemo(
		() => ({
			isPowerUp,
			togglePowerUp,
		}),
		[isPowerUp, togglePowerUp],
	)

	return (
		<PowerUpContext.Provider value={value}>{children}</PowerUpContext.Provider>
	)
}

export function usePowerUp() {
	const context = React.useContext(PowerUpContext)
	if (context === undefined) {
		throw new Error('usePowerUp must be used within a PowerUpProvider')
	}
	return context
}
