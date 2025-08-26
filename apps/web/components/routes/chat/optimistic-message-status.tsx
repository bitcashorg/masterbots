'use client'

import { Button } from '@/components/ui/button'
import {
	IconCheck,
	IconClose,
	IconRefresh,
	IconSpinner,
} from '@/components/ui/icons'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import type { PendingMessage } from '@/lib/hooks/use-optimistic-chat'
import { cn } from '@/lib/utils'

interface OptimisticMessageStatusProps {
	messageId: string
	className?: string
}

export function OptimisticMessageStatus({
	messageId,
	className,
}: OptimisticMessageStatusProps) {
	const [{ optimisticState }, { optimisticActions }] = useMBChat()

	const pendingMessage = optimisticState.pendingMessages.find(
		(msg) => msg.id === messageId || msg.id.endsWith(messageId),
	)

	if (!pendingMessage) return null

	const handleRetry = async () => {
		await optimisticActions.retryMessage(pendingMessage.id)
	}

	const getStatusIcon = () => {
		switch (pendingMessage.status) {
			case 'optimistic':
				return <IconSpinner className="size-3 animate-spin text-blue-500" />
			case 'sending':
				return <IconSpinner className="size-3 animate-spin text-blue-500" />
			case 'sent':
				return <IconCheck className="size-3 text-green-500" />
			case 'failed':
				return <IconClose className="size-3 text-red-500" />
			default:
				return null
		}
	}

	const getStatusText = () => {
		switch (pendingMessage.status) {
			case 'optimistic':
				return 'Preparing...'
			case 'sending':
				return 'Sending...'
			case 'sent':
				return 'Sent'
			case 'failed':
				return `Failed${pendingMessage.retryCount > 0 ? ` (attempt ${pendingMessage.retryCount})` : ''}`
			default:
				return ''
		}
	}

	return (
		<div
			className={cn(
				'flex items-center gap-1.5 text-xs text-muted-foreground',
				className,
			)}
		>
			{getStatusIcon()}
			<span>{getStatusText()}</span>
			{pendingMessage.status === 'failed' && (
				<Button
					variant="ghost"
					size="sm"
					className="h-auto p-0.5 text-xs"
					onClick={handleRetry}
					disabled={pendingMessage.retryCount >= 3}
				>
					<IconRefresh className="size-3" />
					<span className="sr-only">Retry message</span>
				</Button>
			)}
		</div>
	)
}
