'use client'

import { Checkbox } from '@/components/ui/checkbox'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useImageToggle } from '@/lib/hooks/use-image-toggler'
import { cn } from '@/lib/utils'
import { Image } from 'lucide-react'
import React from 'react'

/**
 * Toggle button for switching between text and image generation modes
 */
export function ImageGenerationToggle() {
	const { isImageGeneration, toggleImageGeneration } = useImageToggle()
	const processingRef = React.useRef(false)

	const handleToggle = React.useCallback(() => {
		if (processingRef.current) return

		processingRef.current = true
		console.log('ImageGenerationToggle: toggling image generation mode')

		try {
			toggleImageGeneration()
		} finally {
			setTimeout(() => {
				processingRef.current = false
			}, 300)
		}
	}, [toggleImageGeneration])

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div>
					<Checkbox
						custom
						id="image-generation-toggle"
						checked={isImageGeneration}
						onClick={handleToggle}
						className={cn(
							'inline-flex items-center p-1 overflow-hidden transition-all delay-100 rounded-full size-auto',
							isImageGeneration && 'data-[state=checked]:border-purple-400',
							isImageGeneration && 'data-[state=checked]:bg-purple-400/50',
						)}
						checkboxconfig={{
							check: (
								<div className="rounded-full">
									<Image className="text-black size-6 dark:text-white" />
									<span className="sr-only">Image generation enabled</span>
								</div>
							),
							uncheck: (
								<>
									<Image className="text-black opacity-65 size-6 dark:text-white" />
									<span className="sr-only">Image generation disabled</span>
								</>
							),
						}}
					/>
				</div>
			</TooltipTrigger>
			<TooltipContent side="bottom">
				<p className="text-sm">
					{isImageGeneration
						? 'Currently in image generation mode'
						: 'Switch to image generation mode'}
				</p>
			</TooltipContent>
		</Tooltip>
	)
}
