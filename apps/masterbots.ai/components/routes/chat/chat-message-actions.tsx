'use client'

//* ChatMessageActions component provides actions for chat messages, including copy-to-clipboard and creating documents.

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { cn } from '@/lib/utils'
import type { Message } from 'ai'
import { FileEditIcon } from 'lucide-react'
import { useCallback } from 'react'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
	message: Message
	onCreateDocument?: (message: Message) => void
	showCreateDocument?: boolean
}

export function ChatMessageActions({
	message,
	className,
	onCreateDocument,
	showCreateDocument = false,
	...props
}: ChatMessageActionsProps) {
	const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
	const { toggleWorkspace, setIsWorkspaceActive } = useWorkspace()

	const onCopy = () => {
		if (isCopied) return
		copyToClipboard(message.content)
	}

	const handleCreateDocument = useCallback(() => {
		// Activate workspace mode
		setIsWorkspaceActive(true)

		// Call the provided handler if available
		if (onCreateDocument) {
			onCreateDocument(message)
		}
	}, [setIsWorkspaceActive, onCreateDocument, message])

	return (
		<div
			className={cn(
				'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
				className,
			)}
			{...props}
		>
			{/* Only show the Create Document button when explicitly requested or if handler is provided */}
			{(showCreateDocument || onCreateDocument) && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleCreateDocument}
							className="mr-1"
						>
							<FileEditIcon className="h-4 w-4" />
							<span className="sr-only">Create document</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Create document from this message</TooltipContent>
				</Tooltip>
			)}

			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="ghost" size="icon" onClick={onCopy}>
						{isCopied ? <IconCheck /> : <IconCopy />}
						<span className="sr-only">Copy message</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>Copy to clipboard</TooltipContent>
			</Tooltip>
		</div>
	)
}
