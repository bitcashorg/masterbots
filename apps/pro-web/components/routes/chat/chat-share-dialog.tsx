'use client'

//* ChatShareDialog provides a dialog to share a chat link, allowing users to copy the link to the clipboard.

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { IconSpinner } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { useSonner } from '@/lib/hooks/useSonner'
import type { Chat } from '@/types'
import type { DialogProps } from '@radix-ui/react-dialog'
import * as React from 'react'

interface ChatShareDialogProps extends DialogProps {
	chat: Pick<Chat, 'id' | 'title' | 'messages'> // Chat details including ID, title, and messages for sharing
	// shareChat: (id: string) => ServerActionResult<Chat>
	onCopy: () => void // Callback for after the link is copied
}

export function ChatShareDialog({
	chat,
	onCopy,
	...props
}: ChatShareDialogProps) {
	const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
	const [isSharePending, startShareTransition] = React.useTransition()
	const { customSonner } = useSonner()

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const copyShareLink = React.useCallback(
		async (chat: Chat) => {
			if (!chat.sharePath) {
				return customSonner({
					type: 'error',
					text: 'Could not copy share link to clipboard',
				})
			}

			const url = new URL(window.location.href)
			url.pathname = chat.sharePath
			copyToClipboard(url.toString())
			onCopy()
			customSonner({ type: 'success', text: 'Share link copied to clipboard' })
		},
		[copyToClipboard, onCopy],
	)

	return (
		<Dialog {...props}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Share link to chat</DialogTitle>
					<DialogDescription>
						Anyone with the URL will be able to view the shared chat.
					</DialogDescription>
				</DialogHeader>
				<div className="p-4 space-y-1 text-sm border rounded-md">
					<div className="font-medium">{chat.title}</div>
					<div className="text-muted-foreground">{chat.messages.length}</div>
				</div>
				<DialogFooter className="items-center">
					<Button
						disabled={isSharePending}
						onClick={() => {
							// @ts-ignore
							startShareTransition(async () => {})
						}}
					>
						{isSharePending ? (
							<>
								<IconSpinner className="mr-2 animate-spin" />
								Copying...
							</>
						) : (
							<>Copy link</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
