'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'
import { useModel } from './use-model'

interface ImageGenerationContextProps {
	isImageGeneration: boolean
	toggleImageGeneration: () => void
	setImageGeneration: (value: boolean) => void
}

const ImageGenerationContext = createContext<
	ImageGenerationContextProps | undefined
>(undefined)

export function useImageGeneration() {
	const context = useContext(ImageGenerationContext)
	if (!context) {
		throw new Error(
			'useImageGeneration must be used within an ImageGenerationProvider',
		)
	}
	return context
}

interface ImageGenerationProviderProps {
	children: ReactNode
}

export function ImageGenerationProvider({
	children,
}: ImageGenerationProviderProps) {
	const [isImageGeneration, setIsImageGeneration] = useState<boolean>(false)
	const { changeModel } = useModel()

	const toggleImageGeneration = () => {
		setIsImageGeneration((prev) => {
			const newValue = !prev
			if (newValue) {
				changeModel('gpt-image-1')
			}
			return newValue
		})
	}

	const setImageGeneration = (value: boolean) => {
		setIsImageGeneration(value)
		if (value) {
			changeModel('gpt-image-1')
		}
	}

	return (
		<ImageGenerationContext.Provider
			value={{
				isImageGeneration,
				toggleImageGeneration,
				setImageGeneration,
			}}
		>
			{children}
		</ImageGenerationContext.Provider>
	)
}
