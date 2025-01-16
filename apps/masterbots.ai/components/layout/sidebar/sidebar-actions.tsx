'use client'

import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	IconCheck,
	IconShare,
	IconSpinner,
	IconTrash,
} from '@/components/ui/icons'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import type { Chat, ServerActionResult } from '@/types/types'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'react-hot-toast'

interface SidebarActionsProps {
	chat: Chat
	removeChat: (args: { id: string; path: string }) => ServerActionResult<void>
	shareChat: (id: string) => ServerActionResult<Chat>
}

export function SidebarActions({
	chat,
	removeChat,
	shareChat,
}: SidebarActionsProps) {
	const router = useRouter()
	const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
	const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
	const [isRemovePending, startRemoveTransition] = React.useTransition()
	const { isFilterMode, selectedChats, setSelectedChats, filterValue } =
		useSidebar()

	const isSelected = selectedChats.includes(chat.id)
	const isVisible =
		!filterValue || chat.title.toLowerCase().includes(filterValue.toLowerCase())

	const handleSelect = React.useCallback(() => {
		setSelectedChats((prev) =>
			isSelected ? prev.filter((id) => id !== chat.id) : [...prev, chat.id],
		)
	}, [chat.id, isSelected, setSelectedChats])

	const handleDelete = React.useCallback(async () => {
		const removeChatAsync = async () => {
			const result = await removeChat({
				id: chat.id,
				path: chat.path,
			})

			if (result && 'error' in result) {
				toast.error(result.error)
				return
			}

			setDeleteDialogOpen(false)
			router.refresh()
			router.push('/')
			toast.success('Chat deleted')

			// Remove the chat from selected chats if it was selected
			if (isSelected) {
				setSelectedChats((prev) => prev.filter((id) => id !== chat.id))
			}
		}

		startRemoveTransition(() => {
			removeChatAsync()
		})
	}, [chat.id, chat.path, removeChat, router, isSelected, setSelectedChats])

	if (!isVisible) return null

	return (
		<>
			<div className="space-x-1">
				{isFilterMode ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className="p-0 size-6 hover:bg-background"
								onClick={handleSelect}
							>
								{isSelected ? <IconCheck /> : <IconShare />}
								<span className="sr-only">
									{isSelected ? 'Deselect' : 'Select'}
								</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							{isSelected ? 'Deselect chat' : 'Select chat'}
						</TooltipContent>
					</Tooltip>
				) : (
					<>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									className="p-0 size-6 hover:bg-background"
									onClick={() => setShareDialogOpen(true)}
								>
									<IconShare />
									<span className="sr-only">Share</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Share chat</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									className="p-0 size-6 hover:bg-background"
									disabled={isRemovePending}
									onClick={() => setDeleteDialogOpen(true)}
								>
									<IconTrash />
									<span className="sr-only">Delete</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Delete chat</TooltipContent>
						</Tooltip>
					</>
				)}
			</div>
			<ChatShareDialog
				chat={chat}
				open={shareDialogOpen}
				onOpenChange={setShareDialogOpen}
				onCopy={() => setShareDialogOpen(false)}
			/>
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete your chat message and remove your
							data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isRemovePending}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							disabled={isRemovePending}
							onClick={handleDelete}
						>
							{isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
