import { imageHelpers } from '@/lib/helpers/ai-image'
import type {
	GenerateImageRequest,
	GeneratedImage,
	ImageError,
	ImageTiming,
	OpenAIImageModel,
	UseImageGenerationReturn,
} from '@/types/types'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import { useMBChat } from './use-mb-chat'

/**
 * Hook for managing image generation
 */
export function useImageGeneration(): UseImageGenerationReturn {
	// State management
	const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(
		null,
	)
	const [error, setError] = useState<ImageError | null>(null)
	const [timing, setTiming] = useState<ImageTiming>({})
	const [isLoading, setIsLoading] = useState(false)
	const [activePrompt, setActivePrompt] = useState('')

	// Get chat functions
	const [, { append }] = useMBChat()

	/**
	 * Reset the generation state
	 */
	const resetState = useCallback(() => {
		setGeneratedImage(null)
		setError(null)
		setTiming({})
		setIsLoading(false)
		setActivePrompt('')
	}, [])

	/**
	 * Generate an image with the given prompt and model
	 */
	const generateImage = useCallback(
		async (prompt: string, modelId: OpenAIImageModel) => {
			setActivePrompt(prompt)

			try {
				setIsLoading(true)
				setError(null)

				// Initialize timing with start time
				const startTime = Date.now()
				setTiming({ startTime })

				// Call the API to generate the image
				const request: GenerateImageRequest = {
					prompt,
					modelId,
				}

				console.log(`Generate image request [modelId=${modelId}]`)

				const response = await fetch('/api/generate-images', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(request),
				})

				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.error || `Server error: ${response.status}`)
				}

				// Update timing
				const completionTime = Date.now()
				const elapsed = completionTime - startTime
				setTiming({
					startTime,
					completionTime,
					elapsed,
				})

				console.log(
					`Successful image response [modelId=${modelId}, elapsed=${elapsed}ms]`,
				)

				// Create generated image object
				const imageObject: GeneratedImage = {
					id: nanoid(),
					prompt,
					base64: data.image,
					modelId,
					timestamp: Date.now(),
					provider: 'openai',
				}

				// Update state
				setGeneratedImage(imageObject)
			} catch (err) {
				console.error(`Error [modelId=${modelId}]:`, err)

				setError({
					message:
						err instanceof Error ? err.message : 'An unexpected error occurred',
					modelId,
				})
			} finally {
				setIsLoading(false)
			}
		},
		[],
	)

	/**
	 * Add the generated image to the chat
	 */
	const addImageToChat = useCallback(() => {
		if (!generatedImage) return

		// Create image message and append to chat
		const imageMessage = imageHelpers.createImageMessage(generatedImage)
		append(imageMessage)

		// Reset state after adding to chat
		resetState()
	}, [generatedImage, append, resetState])

	return {
		generatedImage,
		error,
		timing,
		isLoading,
		activePrompt,
		generateImage,
		resetState,
		addImageToChat,
	}
}
