'use client'

import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import { IconCheck, IconCopy } from '@masterbots/mb-ui/icons'
import type { Message } from 'ai'
import { FileTextIcon } from 'lucide-react'
import { useCopyToClipboard } from 'mb-lib'

interface ChatMessageActionsProProps extends React.ComponentProps<'div'> {
	message: Message
	onConvertToDocument?: (messageId: string) => void
}

export function ChatMessageActionsPro({
	message,
	className,
	onConvertToDocument,
	...props
}: ChatMessageActionsProProps) {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

	const onCopy = () => {
		if (isCopied) return
		copyToClipboard(message.content)
	}

	return (
		<div
			className={cn(
				'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
				className,
			)}
			{...props}
		>
			{/* Convert to document button only for AI messages */}
			{message.role === 'assistant' && onConvertToDocument && (
				<Button
					variant="ghost"
					size="icon"
					onClick={() => onConvertToDocument(message.id || '')}
					className="text-muted-foreground hover:text-primary"
					title="Convert to document"
				>
					<FileTextIcon className="h-4 w-4" />
					<span className="sr-only">Convert to document</span>
				</Button>
			)}

			{/* Copy button */}
			<Button variant="ghost" size="icon" onClick={onCopy}>
				{isCopied ? <IconCheck /> : <IconCopy />}
				<span className="sr-only">Copy message</span>
			</Button>
		</div>
	)
}
