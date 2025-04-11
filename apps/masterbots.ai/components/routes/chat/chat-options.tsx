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
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { useSonner } from '@/lib/hooks/useSonner'
import { urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, MoreVertical, Trash } from 'lucide-react'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import type React from 'react'
import { useState } from 'react'
import { ShareButton } from './share-button'

interface ChatOptionsProps {
	threadId: string
	thread: Thread
	isBrowse: boolean
}

export function ChatOptions({ threadId, thread }: ChatOptionsProps) {
	const { toggleVisibility, isSameUser, initiateDeleteThread } =
		useThreadVisibility()
	const isUser = isSameUser(thread)
	const title = thread?.messages[0]?.content ?? 'Untitled'
	const text =
		thread?.messages[1]?.content.substring(0, 100) ?? 'No description found...'
	const url = urlBuilders.profilesThreadUrl({
		type: 'chatbot',
		chatbot: toSlug(thread.chatbot.name),
		threadSlug: thread.slug,
	})
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const { customSonner } = useSonner()

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
							handleDelete(e)
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
					{isUser && (
						<>
							{!thread.isApproved && (
								<DropdownMenuItem
									className="flex-col items-center text-foreground/50 whitespace-nowrap px-1.5"
									onSelect={(event) => event.preventDefault()}
								>
									Pending public approval
								</DropdownMenuItem>
							)}
							<DropdownMenuItem
								className="flex w-full p-0 rounded-none"
								onClick={(event) => event.preventDefault()}
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
											await toggleVisibility(!thread?.isPublic, threadId)
											thread.isPublic = !thread?.isPublic
										} catch (error) {
											console.error(
												'Failed to update thread visibility:',
												error,
											)
										}
									}}
								>
									{thread?.isPublic ? (
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
					{/* Share thread option: This always show in public and profiles due they are already approved and public but for personal chat isn't... */}
					<DropdownMenuItem
						className="flex w-full p-0 rounded-none disabled:cursor-not-allowed"
						onClick={(event) => event.preventDefault()}
						disabled={!thread?.isApproved || !thread?.isPublic}
					>
						<ShareButton
							url={url}
							disabled={!thread?.isApproved || !thread?.isPublic}
						/>
					</DropdownMenuItem>
					{/* Delete thread option (only for thread owner) */}
					{isUser && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="flex w-full p-0 rounded-none"
								onSelect={(event) => {
									event.preventDefault()
									event.stopPropagation()
									setIsDeleteOpen(true)
								}}
							>
								<Button
									type="button"
									variant="destructive"
									radius="none"
									size="lg"
									className="flex justify-between w-full px-4 rounded-none"
									onClick={async (event) => {
										event.stopPropagation()
										try {
											await toggleVisibility(!thread?.isPublic, threadId)
											thread.isPublic = !thread?.isPublic
										} catch (error) {
											console.error(
												'Failed to update thread visibility:',
												error,
											)
										}
									}}
								>
									<Trash className="w-4 h-4" />
									<span>Delete</span>
								</Button>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
