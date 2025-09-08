import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

	//? Reset loading state when base64 changes
	useEffect(() => {
		if (base64) {
			setIsLoading(true)
			setError(null)
		}
	}, [base64])

	if (!base64) {
		return (
			<div className="relative w-full aspect-[4/3] bg-muted/30 animate-pulse rounded-xl" />
		)
	}

	const imgSrc = base64.startsWith('data:')
		? base64
		: `data:${mimeType};base64,${base64}`

	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = imgSrc
		link.download = `generated-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}`
		link.click()
	}

	const handleError = () => {
		setError('Failed to load image')
		setIsLoading(false)
	}

	return (
		<div className="relative overflow-hidden transition border shadow-sm group rounded-xl bg-muted/30 border-border backdrop-blur-sm hover:shadow-md">
			<div className="relative w-full aspect-[4/3]">
				{error ? (
					<div className="flex items-center justify-center w-full h-full text-sm text-red-500">
						{error}
					</div>
				) : (
					<Image
						src={imgSrc}
						alt={alt}
						fill
						unoptimized
						priority
						onLoad={() => setIsLoading(false)}
						onError={handleError}
						className={`object-contain transition-opacity duration-300 ${
							isLoading ? 'opacity-0' : 'opacity-100'
						}`}
					/>
				)}

				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center bg-muted/40">
						<div className="w-12 h-12 bg-muted/50 animate-pulse rounded-full" />
					</div>
				)}

				{/* Download Button */}
				{!error && !isLoading && (
					<div className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100">
						<Button
							size="sm"
							variant="outline"
							className="backdrop-blur bg-white/70 dark:bg-black/70"
							onClick={handleDownload}
						>
							<Download className="w-4 h-4 mr-1" />
							Download
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
