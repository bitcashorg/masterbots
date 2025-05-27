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
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { ImageIcon } from 'lucide-react'
import { useState } from 'react'

export function ImageGeneratorDialog({ onClose }: { onClose?: () => void }) {
	const [{ input }, { appendWithMbContextPrompts, setInput }] = useMBChat()
	const [isOpen, setIsOpen] = useState(false)
	const [description, setDescription] = useState('')
	const [quality, setQuality] = useState<'standard' | 'hd'>('standard')
	const [size, setSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024')

	const handleGenerate = () => {
		if (!description.trim()) return

		const prompt = description
		setInput(prompt)

		appendWithMbContextPrompts(
			{
				role: 'user',
				content: prompt,
			},
			{
				data: {
					imageGeneration: true,
					quality,
					size,
				},
			},
		)

		setIsOpen(false)
		onClose?.()
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
					<DialogTitle>Generate an Image (gpt-image-1)</DialogTitle>
				</DialogHeader>
				<div className="py-4 space-y-4">
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Input
							id="description"
							placeholder="A highly detailed image of a futuristic city at sunset"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="quality">Quality</Label>
						<Select value={quality} onValueChange={(v) => setQuality(v as 'standard' | 'hd')}>
							<SelectTrigger>
								<SelectValue placeholder="Quality" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="standard">Standard</SelectItem>
								<SelectItem value="hd">HD</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="size">Size</Label>
						<Select value={size} onValueChange={(v) => setSize(v as '1024x1024' | '1792x1024' | '1024x1792')}>
							<SelectTrigger>
								<SelectValue placeholder="Size" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
								<SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
								<SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<Button onClick={handleGenerate}>Generate</Button>
			</DialogContent>
		</Dialog>
	)
}
