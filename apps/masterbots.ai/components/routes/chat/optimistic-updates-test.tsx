'use client'

import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import {
	type PendingMessage,
	useOptimisticChat,
} from '@/lib/hooks/use-optimistic-chat'
import { cn } from '@/lib/utils'

interface OptimisticUpdatesTestProps {
	className?: string
}

export function OptimisticUpdatesTest({
	className,
}: OptimisticUpdatesTestProps) {
	const [optimisticState, optimisticActions] = useOptimisticChat()

	const testOptimisticMessage = async () => {
		const messageId = optimisticActions.addOptimisticMessage(
			'Test optimistic message',
			'test-thread',
		)

		// Register a retry callback that simulates the actual retry logic
		optimisticActions.registerRetryCallback(messageId, async () => {
			// Simulate retry delay
			await new Promise((resolve) => setTimeout(resolve, 1000))

			// Randomly succeed or fail on retry
			if (Math.random() > 0.3) {
				optimisticActions.markMessageAsSent(messageId)
			} else {
				throw new Error('Retry failed - network still unavailable')
			}
		})

		// Simulate sending state
		setTimeout(() => {
			optimisticActions.markMessageAsSending(messageId)
		}, 1000)

		// Simulate success or failure randomly
		setTimeout(() => {
			if (Math.random() > 0.5) {
				optimisticActions.markMessageAsSent(messageId)
			} else {
				optimisticActions.markMessageAsFailed(
					messageId,
					'Simulated network error',
				)
			}
		}, 3000)
	}

	const testFailedMessage = async () => {
		const messageId = optimisticActions.addOptimisticMessage(
			'Test failed message',
			'test-thread',
		)

		// Register a retry callback for this message
		optimisticActions.registerRetryCallback(messageId, async () => {
			// Simulate retry process
			await new Promise((resolve) => setTimeout(resolve, 1500))

			// Always succeed on retry for this test
			optimisticActions.markMessageAsSent(messageId)
		})

		setTimeout(() => {
			optimisticActions.markMessageAsSending(messageId)
		}, 500)

		setTimeout(() => {
			optimisticActions.markMessageAsFailed(messageId, 'Connection timeout')
		}, 2000)
	}

	const testFailedWithRetry = async () => {
		const messageId = optimisticActions.addOptimisticMessage(
			'Test retry functionality',
			'test-thread',
		)

		// Register a retry callback that will succeed after retry
		optimisticActions.registerRetryCallback(messageId, async () => {
			console.log('Retrying message:', messageId)

			// Simulate network delay for retry
			await new Promise((resolve) => setTimeout(resolve, 2000))

			// Succeed on retry
			optimisticActions.markMessageAsSent(messageId)
		})

		// Immediately fail this message to test retry
		setTimeout(() => {
			optimisticActions.markMessageAsSending(messageId)
		}, 100)

		setTimeout(() => {
			optimisticActions.markMessageAsFailed(
				messageId,
				'Network error - retry available',
			)
		}, 800)
	}

	return (
		<div className={cn('p-4 border rounded-lg bg-muted/50', className)}>
			<h3 className="text-lg font-semibold mb-4">Optimistic Updates Test</h3>

			<div className="space-y-3">
				<div className="flex gap-2">
					<Button onClick={testOptimisticMessage} size="sm">
						Test Random Outcome
					</Button>
					<Button onClick={testFailedMessage} variant="secondary" size="sm">
						Test Failed Message
					</Button>
					<Button onClick={testFailedWithRetry} variant="destructive" size="sm">
						Test Retry Flow
					</Button>
					<Button
						onClick={() => optimisticActions.clearPendingMessages()}
						variant="outline"
						size="sm"
					>
						Clear All
					</Button>
				</div>

				<div className="space-y-2">
					<h4 className="text-sm font-medium">
						Pending Messages ({optimisticState.pendingMessages.length})
					</h4>
					{optimisticState.pendingMessages.map((msg: PendingMessage) => (
						<div key={msg.id} className="flex items-center gap-2 text-sm">
							{msg.status === 'sending' && (
								<IconSpinner className="size-3 animate-spin" />
							)}
							<span
								className={cn('w-2 h-2 rounded-full', {
									'bg-blue-500': msg.status === 'optimistic',
									'bg-yellow-500': msg.status === 'sending',
									'bg-green-500': msg.status === 'sent',
									'bg-red-500': msg.status === 'failed',
								})}
							/>
							<span className="flex-1 truncate">{msg.content}</span>
							<span className="text-xs text-muted-foreground">
								{msg.status}
							</span>
							{msg.error && (
								<span className="text-xs text-red-500" title={msg.error}>
									⚠️
								</span>
							)}
							{msg.status === 'failed' && (
								<Button
									size="sm"
									variant="ghost"
									className="h-auto p-1 text-xs"
									onClick={() => {
										console.log('Retrying message:', msg.id)
										optimisticActions.retryMessage(msg.id)
									}}
								>
									Retry
								</Button>
							)}
						</div>
					))}
					{optimisticState.pendingMessages.length === 0 && (
						<p className="text-sm text-muted-foreground">No pending messages</p>
					)}
				</div>

				<div className="text-xs text-muted-foreground">
					<p>
						Optimistic Update Active:{' '}
						{optimisticState.isOptimisticUpdate ? 'Yes' : 'No'}
					</p>
				</div>
			</div>
		</div>
	)
}
