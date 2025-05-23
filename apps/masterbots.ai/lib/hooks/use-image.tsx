import { createContext, useContext, useState } from 'react'

interface ImageGenerationContextType {
	isImageGenerationEnabled: boolean
	toggleImageGeneration: () => void
}

const ImageGenerationContext = createContext<
	ImageGenerationContextType | undefined
>(undefined)

export function ImageGenerationProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [isImageGenerationEnabled, setIsImageGenerationEnabled] =
		useState(false)

	const toggleImageGeneration = () => {
		setIsImageGenerationEnabled(!isImageGenerationEnabled)
	}

	return (
		<ImageGenerationContext.Provider
			value={{
				isImageGenerationEnabled,
				toggleImageGeneration,
			}}
		>
			{children}
		</ImageGenerationContext.Provider>
	)
}

export function useImageGeneration() {
	const context = useContext(ImageGenerationContext)
	if (!context) {
		throw new Error(
			'useImageGeneration must be used within an ImageGenerationProvider',
		)
	}
	return context
}
