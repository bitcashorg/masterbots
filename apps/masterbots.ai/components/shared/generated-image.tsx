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
	mimeType,
	alt = 'AI Generated Image',
}: GeneratedImageProps) {
	const [isLoading, setIsLoading] = useState(true)

	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = base64
		link.download = `masterbots-image-${Date.now()}.${mimeType.split('/')[1] || 'png'}`
		link.click()
	}

	return (
		<div className="relative my-4 overflow-hidden border border-gray-200 rounded-md dark:border-gray-700">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
					<Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
				</div>
			)}
			<div className="relative w-full max-w-3xl mx-auto aspect-video">
				<Image
					src={`data:${mimeType};base64,${base64}`}
					alt={alt}
					fill
					className="object-contain"
					onLoadingComplete={() => setIsLoading(false)}
				/>
			</div>
			<div className="absolute top-2 right-2">
				<Button
					size="sm"
					variant="outline"
					className="bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black"
					onClick={handleDownload}
				>
					<Download className="w-4 h-4 mr-2" />
					Download
				</Button>
			</div>
		</div>
	)
}
