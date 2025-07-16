import { ShareButton } from '@/components/routes/chat/share-button'
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
import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconSpinner } from '@/components/ui/icons'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { useSonner } from '@/lib/hooks/useSonner'
import type { MessagePair } from '@/lib/threads'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import { deleteMessages, getThread } from '@/services/hasura'
import { Eye, EyeOff, MoreVertical, Trash } from 'lucide-react'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { useSession } from 'next-auth/react'
import type React from 'react'
import { useState } from 'react'

interface ChatOptionsProps {
	threadId: string
	thread: Thread
	isBrowse: boolean
	pair?: MessagePair
}

export function ChatOptions({ threadId, thread, pair }: ChatOptionsProps) {
	const { toggleVisibility, isSameUser, initiateDeleteThread } =
		useThreadVisibility()
	const isUser = isSameUser(thread)
	const canonicalDomain = getCanonicalDomain(thread?.chatbot?.name || '')
	const session = useSession()
	const jwt = session?.data?.user?.hasuraJwt
	const [isPublic, setIsPublic] = useState(thread.isPublic)

	const isSubThread = pair && pair !== undefined
	const url = urlBuilders.profilesThreadUrl({
		type: 'user',
		threadSlug: thread.slug,
		threadQuestionSlug: isSubThread ? pair.userMessage.slug : undefined,
		category: thread.chatbot.categories[0]?.category.name,
		chatbot: toSlug(thread.chatbot.name),
		usernameSlug: thread?.user?.slug,
		domain: canonicalDomain,
	})
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const { customSonner } = useSonner()
	const { activeThread, setActiveThread } = useThread()

	const handleDelete = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault()
		setIsDeleting(true)
		const result = await initiateDeleteThread(threadId)
		if (result?.success) {
			customSonner({ type: 'success', text: result.message })
			// Reload the page to reflect the changes
			window.location.reload()
		} else {
			customSonner({ type: 'error', text: result?.error })
		}
		setIsDeleting(false)
		setIsDeleteOpen(false)
	}

	const handleDeleteMessage = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault()
		setIsDeleting(true)

		const messageIds = pair
			? [pair.userMessage.id, ...pair.chatGptMessage.map((msg) => msg.id)]
			: []
		try {
			const result = await deleteMessages(messageIds, jwt)
			if (result?.success) {
				customSonner({ type: 'success', text: 'Messages deleted successfully' })
				// Reload the page to reflect the changes
				const threadId = activeThread?.threadId || ''
				const thread = await getThread({ threadId, jwt })
				if (thread) {
					if (activeThread) {
						setActiveThread({
							...activeThread,
							messages: thread.messages,
							chatbot: thread.chatbot,
						})
					} else {
						console.error('Chatbot is undefined, cannot update activeThread.')
					}
				}
			} else {
				customSonner({ type: 'error', text: result?.error })
			}
		} catch (error) {
			console.error('Error deleting messages:', error)
			customSonner({ type: 'error', text: 'Failed to delete messages' })
		}
		setIsDeleting(false)
		setIsDeleteOpen(false)
	}

	const AlertDialogue = ({
		deleteDialogOpen,
	}: {
		deleteDialogOpen: boolean
	}) => (
		<AlertDialog open={deleteDialogOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete your thread and remove your data from
						our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={(e) => {
							e.stopPropagation()
							setIsDeleteOpen(false)
						}}
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.stopPropagation()
							if (isSubThread && pair) {
								handleDeleteMessage(e)
							} else {
								handleDelete(e)
							}
						}}
						className={cn(buttonVariants({ variant: 'destructive' }))}
					>
						{isDeleting && <IconSpinner className="w-4 h-4 animate-spin" />}
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)

	return (
		<div className="flex items-center gap-4 sm:gap-3 pt-[3px]">
			<AlertDialogue deleteDialogOpen={isDeleteOpen} />

			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(
						buttonVariants({
							variant: 'ghost',
							size: 'icon',
							radius: 'full',
						}),
						'p-1',
					)}
				>
					<MoreVertical className="w-4 h-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					sideOffset={8}
					align="end"
					className="flex flex-col min-w-[160px] sm:w-[180px] px-0"
				>
					{/* Toggle thread visibility option (only for thread owner) */}
					{isUser && !isSubThread && (
						<>
							{!thread.isApproved && thread.isPublic && (
								<DropdownMenuItem
									className="flex-col items-center text-foreground/50 whitespace-nowrap px-1.5"
									onSelect={(event) => event.preventDefault()}
								>
									Pending public approval
								</DropdownMenuItem>
							)}
							<DropdownMenuItem
								className="flex justify-between w-full px-4 rounded-none hover:bg-accent"
								onSelect={async (event) => {
									event.preventDefault()
									try {
										await toggleVisibility(!thread?.isPublic, threadId)
										thread.isPublic = !thread?.isPublic
									} catch (error) {
										console.error('Failed to update thread visibility:', error)
									}
								}}
							>
								<Button
									type="button"
									variant="ghost"
									radius="none"
									size="lg"
									className="flex justify-between w-full px-4 rounded-none"
									onClick={async (event) => {
										event.stopPropagation()
										try {
											const toggleResults = await toggleVisibility(
												!isPublic,
												threadId,
											)
											if (toggleResults.error) return
											setIsPublic(toggleResults.isPublic)
										} catch (error) {
											console.error(
												'Failed to update thread visibility:',
												error,
											)
										}
									}}
								>
									{isPublic ? (
										<>
											<EyeOff className="w-4 h-4" />
											<span className="font-light">Make private</span>
										</>
									) : (
										<>
											<Eye className="w-4 h-4" />
											<span>Make public</span>
										</>
									)}
								</Button>
							</DropdownMenuItem>
						</>
					)}
					{thread?.isApproved && thread?.isPublic && (
						/* Share thread option: This always show in public and profiles due they are already approved and public but for personal chat isn't... */
						<DropdownMenuItem
							className="flex w-full p-0 rounded-none disabled:cursor-not-allowed"
							onClick={(event) => event.preventDefault()}
						>
							<ShareButton url={url} />
						</DropdownMenuItem>
					)}
					{/* Delete thread option (only for thread owner) */}
					{isUser && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="flex justify-between w-full px-4 rounded-none text-destructive hover:text-destructive hover:bg-destructive/10"
								onSelect={(event) => {
									event.preventDefault()
									setIsDeleteOpen(true)
								}}
							>
								<Trash className="w-4 h-4" />
								<span>Delete</span>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
