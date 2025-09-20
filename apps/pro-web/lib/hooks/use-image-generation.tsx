import { imageHelpers } from '@/lib/helpers/ai-image'
import type {
	GenerateImageRequest,
	GeneratedImage,
	ImageError,
	ImageTiming,
	OpenAIImageModel,
	UseImageGenerationReturn,
} from '@/types'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import { useMBChat } from './use-mb-chat'

/**
 * Hook for managing image generation
 */
export function useImageGeneration(): UseImageGenerationReturn {
	const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(
		null,
	)
	const [error, setError] = useState<ImageError | null>(null)
	const [timing, setTiming] = useState<ImageTiming>({})
	const [isLoading, setIsLoading] = useState(false)
	const [activePrompt, setActivePrompt] = useState('')
	const [isEditMode, setIsEditMode] = useState(false)
	const [previousImage, setPreviousImage] = useState<GeneratedImage | null>(
		null,
	)

	//* Get chat functions
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
		setIsEditMode(false)
		setPreviousImage(null)
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

				//* Initialize timing with start time
				const startTime = Date.now()
				setTiming({ startTime })

				//*  API call to generate images
				const request: GenerateImageRequest = {
					prompt,
					modelId,
					...(isEditMode &&
						previousImage && {
							previousImage: previousImage.base64,
							editMode: true,
						}),
				}

				console.log(
					`Generate image request [modelId=${modelId}, editMode=${isEditMode}]`,
				)

				const response = await fetch('/api/generate-images', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(request),
				})

				const data = await response.json()

				if (!response.ok) {
					throw new Error(data.error || `Server error: ${response.status}`)
				}

				//* Timing update
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

				//* Create generated image object
				const imageObject: GeneratedImage = {
					id: nanoid(),
					prompt,
					base64: data.image,
					modelId,
					timestamp: Date.now(),
					provider: 'openai',
				}

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
		[isEditMode, previousImage],
	)

	/**
	 * Add the generated image to the chat or enter edit mode
	 */
	const addImageToChat = useCallback(
		(mode: 'chat' | 'edit' = 'chat') => {
			if (!generatedImage) return

			if (mode === 'pro') {
				//* Create image message and append to chat
				const imageMessage = imageHelpers.createImageMessage(generatedImage)
				append(imageMessage)
				resetState()
			} else {
				//* Enter edit mode with current image as reference
				setPreviousImage(generatedImage)
				setIsEditMode(true)
				setActivePrompt(generatedImage.prompt)
			}
		},
		[generatedImage, append, resetState],
	)

	return {
		generatedImage,
		error,
		timing,
		isLoading,
		activePrompt,
		isEditMode,
		generateImage,
		resetState,
		addImageToChat,
	}
}
