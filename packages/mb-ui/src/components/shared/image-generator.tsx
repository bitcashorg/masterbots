'use client'

import { useImageGeneration } from '@/lib/hooks/use-image-generation'
import { cn } from '@/lib/utils'
import type { OpenAIImageModel } from '@/types'
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Button,
	Progress,
} from '@masterbots/mb-ui'
import { Textarea } from '@masterbots/mb-ui'
import { AlertCircle, ArrowUp, Camera } from 'lucide-react'
import { useImageToggle } from 'mb-lib'
import { useState } from 'react'
import { ImageDisplay } from './image-display'

//* Available OpenAI image models for image generation
const IMAGE_MODELS: { id: OpenAIImageModel; name: string }[] = [
	{ id: 'dall-e-3', name: 'DALL-E 3' },
	{ id: 'dall-e-2', name: 'DALL-E 2' },
	{ id: 'gpt-image-1', name: 'GPT-Image-1' },
]

/**
 * Component for generating images from text prompts
 */
export function ImageGenerator() {
	//? Input state
	const [prompt, setPrompt] = useState('')

	//? Selected model
	const [selectedModel, setSelectedModel] =
		useState<OpenAIImageModel>('dall-e-3')

	//? Image generation hook
	const {
		generatedImage,
		error,
		timing,
		isLoading,
		isEditMode,
		generateImage,
		addImageToChat,
		resetState,
	} = useImageGeneration()

	//? Image toggle hook
	const { disableImageGeneration } = useImageToggle()

	//? Handle prompt submission
	const handleSubmit = async () => {
		if (!prompt.trim() || isLoading) return
		await generateImage(prompt, selectedModel)
	}

	//? Handle key press (Enter to submit)
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSubmit()
		}
	}

	//? Enter edit mode
	const handleEditImage = () => {
		if (generatedImage) {
			setPrompt(generatedImage.prompt)
			addImageToChat('edit')
		}
	}

	//? Create a new image
	const handleCreateNew = () => {
		resetState()
		setPrompt('')
	}

	return (
		<div className="w-full max-w-4xl px-4 pt-4 pb-20 mx-auto">
			<div className="mb-8">
				<h2 className="mb-2 text-2xl font-semibold">
					{isEditMode ? 'Edit Image' : 'Image Generation'}
				</h2>
				<p className="text-muted-foreground">
					{isEditMode
						? 'Modify your image by updating the prompt below.'
						: "Generate images from text prompts using OpenAI's image models."}
				</p>
			</div>

			{/* Error alert */}
			{error && (
				<Alert variant="destructive" className="mb-6">
					<AlertCircle className="w-4 h-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			)}

			{/* Image display */}
			{generatedImage && (
				<div className={cn('mb-8', isEditMode && 'max-w-sm mx-auto')}>
					<div
						className={cn('mx-auto', isEditMode ? 'max-w-[300px]' : 'max-w-md')}
					>
						<ImageDisplay
							imageData={generatedImage.base64}
							modelId={generatedImage.modelId}
							timing={timing}
							alt={`Generated image for: ${generatedImage.prompt}`}
						/>
					</div>

					<div className="flex justify-center gap-4 mt-4">
						<Button variant="outline" onClick={handleCreateNew}>
							Create New
						</Button>
						<Button onClick={handleEditImage}>
							{isEditMode ? 'Update Image' : 'Edit Image'}
						</Button>
					</div>
				</div>
			)}

			{/* Input form - Show when no image or in edit mode */}
			{(!generatedImage || isEditMode) && (
				<>
					{/* Model selection */}
					<div
						className={cn(
							'flex flex-wrap gap-2 mb-4',
							isEditMode && 'max-w-2xl mx-auto justify-center',
						)}
					>
						{IMAGE_MODELS.map((model) => (
							<Button
								key={model.id}
								variant={selectedModel === model.id ? 'default' : 'outline'}
								onClick={() => setSelectedModel(model.id)}
								className="flex items-center gap-2"
								size="sm"
							>
								<Camera className="w-4 h-4" />
								{model.name}
							</Button>
						))}
					</div>

					{/* Prompt input */}
					<div
						className={cn(
							'p-4 mb-4 bg-zinc-50 rounded-xl',
							isEditMode && 'max-w-2xl mx-auto',
						)}
					>
						<div className="flex flex-col gap-3">
							<Textarea
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder={
									isEditMode
										? 'Describe the changes you want to make to the image...'
										: 'Describe the image you want to generate...'
								}
								rows={3}
								className="text-base bg-transparent border-none p-0 resize-none placeholder:text-zinc-500 text-[#111111] focus-visible:ring-0 focus-visible:ring-offset-0"
								disabled={isLoading}
							/>
							<div className="flex items-center justify-end pt-1">
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									onClick={handleSubmit}
									disabled={isLoading || !prompt.trim()}
									className={cn(
										'size-8 rounded-full bg-black flex items-center justify-center',
										(isLoading || !prompt.trim()) && 'opacity-50',
									)}
								>
									{isLoading ? (
										<Progress className="w-3 h-3 text-white" />
									) : (
										<ArrowUp className="w-5 h-5 text-white" />
									)}
								</button>
							</div>
						</div>
					</div>

					{/* Loading state */}
					{isLoading && (
						<div className="my-8 text-center animate-fade-in">
							<div className="relative mx-auto mb-4 size-16">
								{/* Outer spinning ring */}
								<div className="absolute inset-0 border-4 rounded-full border-primary/20" />
								<div className="absolute inset-0 border-4 rounded-full border-t-primary animate-spin" />

								{/* Inner pulsing circle */}
								<div className="absolute rounded-full inset-2 bg-primary/10 animate-pulse" />
							</div>
							<p className="text-muted-foreground animate-fade-in">
								{isEditMode
									? 'Updating your image... This may take up to 60 seconds.'
									: 'Generating your image... This may take up to 60 seconds.'}
							</p>
						</div>
					)}
				</>
			)}
		</div>
	)
}
