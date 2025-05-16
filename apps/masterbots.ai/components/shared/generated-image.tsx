import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader2, Download } from 'lucide-react'

interface GeneratedImageProps {
	base64: string
	mimeType: string
	alt?: string
}

export function GeneratedImage({
	base64,
	mimeType = 'image/png',
	alt = 'AI Generated Image',
}: GeneratedImageProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// If base64 is undefined or empty, don't render the component
	if (!base64) {
		console.warn('Image base64 data is undefined or empty')
		return null
	}

	// Make sure we have a proper data URL for the image source
	const imgSrc = base64.startsWith('data:')
		? base64
		: `data:${mimeType};base64,${base64}`

	// For download, ensure we have a proper data URL
	const downloadUrl = imgSrc

	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = downloadUrl
		link.download = `masterbots-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}`
		link.click()
	}

	// Handle image loading error
	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		console.error('Image loading error:', e)
		setError('Failed to load image')
		setIsLoading(false)
	}

	return (
		<div className="relative my-4 overflow-hidden border border-gray-200 rounded-md dark:border-gray-700">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
					<Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
				</div>
			)}

			{error ? (
				<div className="p-4 text-center text-red-500">{error}</div>
			) : (
				<div className="relative w-full max-w-3xl mx-auto aspect-video">
					<Image
						src={imgSrc}
						alt={alt}
						fill
						className="object-contain"
						onLoad={() => setIsLoading(false)}
						onError={handleError}
						unoptimized
						priority
					/>
				</div>
			)}

			{!error && (
				<div className="absolute top-2 right-2">
					<Button
						size="sm"
						variant="outline"
						className="bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black"
						onClick={handleDownload}
						disabled={isLoading}
					>
						<Download className="w-4 h-4 mr-2" />
						Download
					</Button>
				</div>
			)}
		</div>
	)
}
