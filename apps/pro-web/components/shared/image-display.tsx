'use client'

import { Button } from '@/components/ui/button'
import { imageHelpers } from '@/lib/helpers/ai-image'
import { cn } from '@/lib/utils'
import type { ImageDisplayProps } from '@/types/types'
import { Label } from '@masterbots/mb-ui'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@masterbots/mb-ui'
import { AlertCircle, Download, Share } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Displays a generated image with controls for zoom, download, etc.
 */
export function ImageDisplay({
	imageData,
	modelId,
	timing,
	failed = false,
	fallbackIcon,
	alt = 'AI generated image',
	className,
}: ImageDisplayProps) {
	//?  State for zoomed image modal
	const [isZoomed, setIsZoomed] = useState(false)

	//? Handle escape key and browser history for zoomed image
	useEffect(() => {
		if (isZoomed) {
			//? Add to history stack so back button closes modal
			window.history.pushState({ zoomed: true }, '')
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isZoomed) {
				setIsZoomed(false)
			}
		}

		const handlePopState = () => {
			if (isZoomed) {
				setIsZoomed(false)
			}
		}

		if (isZoomed) {
			document.addEventListener('keydown', handleEscape)
			window.addEventListener('popstate', handlePopState)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			window.removeEventListener('popstate', handlePopState)
		}
	}, [isZoomed])

	//? Open zoomed image modal
	const handleImageClick = (e: React.MouseEvent) => {
		if (imageData && !failed) {
			e.stopPropagation()
			setIsZoomed(true)
		}
	}

	//? Handle download/share button click
	const handleActionClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		imageHelpers.shareOrDownload(imageData, modelId).catch((error) => {
			console.error('Failed to share/download image:', error)
		})
	}

	//? Format the image data with proper prefix if needed
	const formattedImageData = imageData.startsWith('data:')
		? imageData
		: `data:image/png;base64,${imageData}`

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className={cn(
					'relative w-full aspect-square group bg-zinc-50 rounded-lg overflow-hidden',
					imageData && !failed && 'cursor-pointer',
					(!imageData || failed) && 'border border-zinc-100',
					className,
				)}
				onClick={handleImageClick}
			>
				{/* Model info label */}
				{(imageData || failed) && (
					<div className="absolute top-2 left-2 max-w-[75%] bg-white/95 px-2 py-1 flex items-center gap-2 rounded-lg z-10">
						<TooltipProvider>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Label className="min-w-0 text-xs text-gray-900 truncate grow">
										{imageHelpers.formatModelId(modelId)}
									</Label>
								</TooltipTrigger>
								<TooltipContent>
									<p>{modelId}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				)}

				{/* Image or fallback */}
				{imageData && !failed ? (
					<>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={formattedImageData}
							alt={alt}
							className="object-cover w-full h-full rounded-lg"
						/>

						{/* Download/Share button */}
						<Button
							size="icon"
							variant="secondary"
							className="absolute transition-opacity bottom-2 left-2 sm:opacity-0 sm:group-hover:opacity-100"
							onClick={handleActionClick}
						>
							<span className="sm:hidden">
								<Share className="w-4 h-4" />
							</span>
							<span className="hidden sm:block">
								<Download className="w-4 h-4" />
							</span>
						</Button>

						{/* Generation time */}
						{timing?.elapsed && (
							<div className="absolute px-2 py-1 rounded-md shadow bottom-2 right-2 bg-black/70 backdrop-blur-sm">
								<span className="text-xs font-medium text-white/90">
									{(timing.elapsed / 1000).toFixed(1)}s
								</span>
							</div>
						)}
					</>
				) : (
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						{failed ? (
							fallbackIcon || <AlertCircle className="w-8 h-8 text-red-500" />
						) : (
							<div className="flex flex-col items-center text-zinc-400">
								<span className="text-sm">Failed to load image</span>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Zoomed image modal */}
			{isZoomed &&
				imageData &&
				createPortal(
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-pointer min-h-[100dvh] w-screen"
						onClick={() => setIsZoomed(false)}
					>
						<button
							type="button"
							className="max-h-[90dvh] max-w-[90vw] bg-transparent border-none p-0"
							onClick={(e) => e.stopPropagation()}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={formattedImageData}
								alt={alt}
								className="max-h-[90dvh] max-w-[90vw] object-contain"
							/>
						</button>
					</div>,
					document.body,
				)}
		</>
	)
}
