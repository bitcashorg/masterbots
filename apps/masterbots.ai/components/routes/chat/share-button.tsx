/**
 * ShareButton Component
 *
 * A button component that handles chat/thread sharing functionality:
 * - Generates and copies shortened share links
 * - Provides visual feedback for different states
 * - Falls back to full URL if shortening fails
 *
 * Key Features:
 * - URL shortening integration
 * - Clipboard copy functionality
 * - Status indicators (loading, copied, error)
 * - Animated state transitions
 *
 * States:
 * - default: Initial share icon
 * - loading: Animated spinner
 * - copied: Success checkmark
 * - error: Error X icon
 *
 * Note: Uses environment variable NEXT_PUBLIC_BASE_URL as fallback
 * when URL shortening fails
 */

import { generateShortLink } from '@/app/actions'
import { Button, type ButtonProps } from '@/components/ui/button'
import { AnimatePresence } from 'framer-motion'
import { LucideCheck, LucideLoader2, LucideX, Share2 } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonProps extends ButtonProps {
	url: string
}

export function ShareButton({ url, ...props }: ShareButtonProps) {
	const [status, setStatus] = useState<
		'default' | 'loading' | 'copied' | 'error'
	>('default')

	const copyToClipboard = async () => {
		setStatus('loading')
		try {
			// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
			let content
			const { data, error } = await generateShortLink(url)
			if (data?.shortLink) {
				content = data.shortLink
			} else {
				content = process.env.NEXT_PUBLIC_BASE_URL + url
			}
			await navigator.clipboard.writeText(content)

			setStatus('copied')
			const timer = setTimeout(() => setStatus('default'), 5000)
			return () => clearTimeout(timer)
		} catch (error) {
			console.error('Failed to copy share link:', error)
			setStatus('error')
			const timer = setTimeout(() => setStatus('default'), 5000)
			return () => clearTimeout(timer)
		}
	}

	const iconsMap = {
		loading: (
			<LucideLoader2 className="w-4 h-4 animate-spin stroke-muted-secondary" />
		),
		copied: <LucideCheck className="w-4 h-4 stroke-success" />,
		error: <LucideX className="w-4 h-4 stroke-destructive" />,
		default: <Share2 className="w-4 h-4" />,
	}

	return (
		<Button
			type="button"
			variant="ghost"
			size="lg"
			className="flex justify-between w-full px-4 rounded-none"
			onClick={(e) => {
				e.stopPropagation()
				copyToClipboard()
			}}
			{...props}
		>
			<AnimatePresence>{iconsMap[status]}</AnimatePresence>
			<span>Share</span>
		</Button>
	)
}
