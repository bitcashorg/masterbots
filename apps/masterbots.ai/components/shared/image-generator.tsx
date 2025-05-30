'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { useImageGeneration } from '@/lib/hooks/use-image-generation'
import { useImageToggle } from '@/lib/hooks/use-image-toggler'
import { cn } from '@/lib/utils'
import type { OpenAIImageModel } from '@/types/types'
import { AlertCircle, ArrowUp, Camera } from 'lucide-react'
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

	//? Add to chat and return to text mode
	const handleAddToChat = () => {
		addImageToChat()
		disableImageGeneration()
	}

	//? Create a new image
	const handleCreateNew = () => {
		resetState()
		setPrompt('')
	}

	return (
		<div className="w-full max-w-4xl px-4 pt-4 pb-20 mx-auto">
			<div className="mb-8">
				<h2 className="mb-2 text-2xl font-semibold">Image Generation</h2>
				<p className="text-muted-foreground">
					Generate images from text prompts using OpenAI&apos;s image models.
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
				<div className="mb-8">
					<div className="max-w-md mx-auto">
						<ImageDisplay
							imageData={generatedImage.base64}
							modelId={generatedImage.modelId}
							timing={timing}
							alt={`Generated image for: ${generatedImage.prompt}`}
						/>
					</div>

					<div className="flex justify-center gap-4 mt-6">
						<Button variant="outline" onClick={handleCreateNew}>
							Create New
						</Button>
						<Button onClick={handleAddToChat}>Add to Chat</Button>
					</div>
				</div>
			)}

			{/* Input form */}
			{!generatedImage && (
				<>
					{/* Model selection */}
					<div className="flex flex-wrap gap-2 mb-4">
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
					<div className="p-4 mb-4 bg-zinc-50 rounded-xl">
						<div className="flex flex-col gap-3">
							<Textarea
								value={prompt}
								onChange={(e) => setPrompt(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Describe the image you want to generate..."
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
						<div className="my-8 text-center">
							<Progress className="w-8 h-8 mx-auto mb-4" />
							<p className="text-muted-foreground">
								Generating your image... This may take up to 30 seconds.
							</p>
						</div>
					)}
				</>
			)}
		</div>
	)
}
