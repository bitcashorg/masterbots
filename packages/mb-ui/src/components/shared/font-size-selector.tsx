'use client'

import { useAccessibility } from '@/lib/hooks/use-accessibility'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@masterbots/mb-ui'
import { LetterText } from 'lucide-react'

export function FontSizeSelector() {
	const { fontSize, setFontSize } = useAccessibility()

	return (
		<Select value={fontSize} onValueChange={setFontSize}>
			<SelectTrigger className="w-16 h-auto p-0 text-xs border-none shadow-none sm:w-28 sm:text-sm focus:ring-0 z-[2]">
				<LetterText className="size-3.5 sm:size-4" />
				<SelectValue placeholder="Font size" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="normal" className="text-xs sm:text-sm">
					Normal
				</SelectItem>
				<SelectItem value="large" className="text-xs sm:text-sm">
					Large
				</SelectItem>
				<SelectItem value="x-large" className="text-xs sm:text-sm">
					XL
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
