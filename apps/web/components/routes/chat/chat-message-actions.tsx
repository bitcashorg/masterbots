'use client'

//* ChatMessageActions component provides a copy-to-clipboard action for chat messages, with feedback on successful copy.

import { cn } from '@/lib/utils'
import { Button } from '@masterbots/mb-ui'
import { IconCheck, IconCopy } from '@masterbots/mb-ui/icons'
import type { Message } from 'ai'
import { useCopyToClipboard } from 'mb-lib'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
	message: Message
}

export function ChatMessageActions({
	message,
	className,
	...props
}: ChatMessageActionsProps) {
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
			<Button variant="ghost" size="icon" onClick={onCopy}>
				{isCopied ? <IconCheck /> : <IconCopy />}
				<span className="sr-only">Copy message</span>
			</Button>
		</div>
	)
}
