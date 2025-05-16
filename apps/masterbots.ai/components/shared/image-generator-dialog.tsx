import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { createImageGenerationPrompt } from '@/lib/constants/prompts'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { ImageIcon } from 'lucide-react'
import { useState } from 'react'

// TODO:  Use this image generation dialog base for the pro version.

export function ImageGeneratorDialog() {
	const [{ input }, { appendWithMbContextPrompts, setInput }] = useMBChat()
	const [isOpen, setIsOpen] = useState(false)
	const [description, setDescription] = useState('')
	const [style, setStyle] = useState('photorealistic')
	const [details, setDetails] = useState('high detail')

	const handleGenerate = () => {
		if (!description.trim()) return

		const prompt = createImageGenerationPrompt(description, style, details)
		setInput(prompt)
		appendWithMbContextPrompts({
			role: 'user',
			content: prompt,
		})

		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<ImageIcon className="w-4 h-4 mr-2" />
					Generate Image
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate an Image</DialogTitle>
				</DialogHeader>
				<div className="py-4 space-y-4">
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Input
							id="description"
							placeholder="A cat wearing a space suit on the moon"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="style">Style</Label>
						<Select value={style} onValueChange={setStyle}>
							<SelectTrigger>
								<SelectValue placeholder="Style" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="photorealistic">Photorealistic</SelectItem>
								<SelectItem value="cartoon">Cartoon</SelectItem>
								<SelectItem value="anime">Anime</SelectItem>
								<SelectItem value="oil painting">Oil Painting</SelectItem>
								<SelectItem value="watercolor">Watercolor</SelectItem>
								<SelectItem value="sketch">Sketch</SelectItem>
								<SelectItem value="3D render">3D Render</SelectItem>
								<SelectItem value="pixel art">Pixel Art</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="details">Details</Label>
						<Select value={details} onValueChange={setDetails}>
							<SelectTrigger>
								<SelectValue placeholder="Details" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="high detail">High Detail</SelectItem>
								<SelectItem value="low detail">Low Detail</SelectItem>
								<SelectItem value="cinematic lighting">
									Cinematic Lighting
								</SelectItem>
								<SelectItem value="dramatic lighting">
									Dramatic Lighting
								</SelectItem>
								<SelectItem value="soft lighting">Soft Lighting</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<Button onClick={handleGenerate}>Generate</Button>
			</DialogContent>
		</Dialog>
	)
}
