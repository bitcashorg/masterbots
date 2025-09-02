'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'

const ImageToggleContext = createContext<ImageToggleContextType | undefined>(
	undefined,
)

interface ImageToggleProviderProps {
	children: ReactNode
}

export function ImageToggleProvider({ children }: ImageToggleProviderProps) {
	const [isImageGeneration, setIsImageGeneration] = useState(false)

	const toggleImageGeneration = () => setIsImageGeneration((prev) => !prev)
	const enableImageGeneration = () => setIsImageGeneration(true)
	const disableImageGeneration = () => setIsImageGeneration(false)

	return (
		<ImageToggleContext.Provider
			value={{
				isImageGeneration,
				toggleImageGeneration,
				enableImageGeneration,
				disableImageGeneration,
			}}
		>
			{children}
		</ImageToggleContext.Provider>
	)
}

export function useImageToggle() {
	const context = useContext(ImageToggleContext)
	if (context === undefined) {
		throw new Error('useImageToggle must be used within an ImageToggleProvider')
	}
	return context
}

export interface ImageToggleContextType {
	/**
	 * Whether image generation mode is enabled
	 */
	isImageGeneration: boolean

	/**
	 * Toggle image generation mode
	 */
	toggleImageGeneration: () => void

	/**
	 * Enable image generation mode
	 */
	enableImageGeneration: () => void

	/**
	 * Disable image generation mode
	 */
	disableImageGeneration: () => void
}
