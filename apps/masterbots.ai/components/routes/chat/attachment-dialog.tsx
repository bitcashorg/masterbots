import { Button, buttonVariants } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
	EditIcon,
	Maximize2Icon,
	Minimize2Icon,
	SaveIcon,
	XIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const motionAnimationProps = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.14 },
}

export function AttachmentDialog({
	attachment,
	dialogState,
	updateAttachment,
	absolutePosition = false,
	triggerComponent,
}: {
	attachment: FileAttachment | null
	/**
	 * Optional dialog state to control the open state of the dialog.
	 */
	dialogState?: {
		open: boolean
		onOpenChange: (open: boolean) => void
	}
	updateAttachment?: (id: string, attachment: Partial<FileAttachment>) => void
	absolutePosition?: boolean
	triggerComponent?: React.ReactNode
}) {
	const { open, onOpenChange } = dialogState || {}
	const [contentEditable, setContentEditable] = useState(true)
	const textContentRef = useRef<HTMLDivElement | null>(null)

	// ? This useLayoutEffect is for controlled dialogs only, if attempting to do this in a non-controlled dialog, it won't be able to interact.
	// biome-ignore lint/correctness/useExhaustiveDependencies: not required
	useLayoutEffect(() => {
		if (!open || !contentEditable || !attachment) return

		const timeout = setTimeout(() => {
			try {
				const textElement = textContentRef.current

				if (!textElement) throw new Error('Text content element not found')

				console.log('Setting focus and selection to text element', textElement)

				// Focus the element first
				textElement.focus()

				// Create and set the selection range
				const range = document.createRange()
				range.selectNodeContents(textElement)

				const selection = window.getSelection()
				if (selection) {
					selection.removeAllRanges()
					selection.addRange(range)
				}

				// Move cursor to end for better UX
				range.collapse(false) // false = collapse to end
				selection?.removeAllRanges()
				selection?.addRange(range)
			} catch (error) {
				console.warn('Failed to set text selection:', error)
			}

			clearTimeout(timeout)
		}, 120)

		return () => {
			clearTimeout(timeout)
		}
	}, [contentEditable, open, attachment?.id])

	const updateDialogState = () => {
		if (textContentRef.current) {
			textContentRef.current = null
		}
		setContentEditable(Boolean(open && attachment))
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		updateDialogState()

		return () => {
			updateDialogState()
		}
	}, [open, attachment?.id])

	if (!attachment) return null

	const { id, name, url, contentType, content } = attachment

	const toggleDialogOpen = (isOpen: boolean) => {
		if (contentEditable) {
			toggleContentEditable()
		}

		onOpenChange?.(isOpen)
	}

	const toggleContentEditable = () => {
		const newEditableState = !contentEditable
		const textElement = textContentRef.current

		if (!newEditableState && textElement) {
			const preContent = textElement.innerText
			// turn the content into a base64 string
			const base64Content = btoa(preContent)
			// set the contentType to text/plain
			const newContentType = 'text/plain'
			// set the name to the original name with .txt extension
			const newName = `${attachment.name.split('.')[0]}.txt`
			// update the state with the new values
			const newContent = `data:${newContentType};base64,${base64Content}`
			const byteSize = new Blob([newContent]).size

			updateAttachment?.(id, {
				content: newContent,
				contentType: newContentType,
				name: newName,
				size: byteSize,
			})
		}

		setContentEditable(newEditableState)
	}

	const shouldRenderTextEditButton = Boolean(updateAttachment)

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()

			const selection = window.getSelection()
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0)

				// Insert a line break
				const br = document.createElement('br')
				range.deleteContents()
				range.insertNode(br)

				// Move cursor after the line break
				range.setStartAfter(br)
				range.setEndAfter(br)
				selection.removeAllRanges()
				selection.addRange(range)
			}
		}
	}

	return (
		<Dialog key={`dialog-${id}`} open={open} onOpenChange={toggleDialogOpen}>
			<DialogTrigger className="w-12" id={id} asChild>
				{triggerComponent || (
					<Button
						variant="ghost"
						size="icon"
						radius="full"
						className={cn(
							'p-1.5 size-auto',
							absolutePosition ? 'absolute top-2 right-2 bg-background/50' : '',
						)}
					>
						<span className="sr-only">Open {name} attachment</span>
						<Maximize2Icon className="size-4" />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="min-w-[66vw] max-h-[90vh] -mt-5">
				<DialogTitle hidden>User attachment file {name}</DialogTitle>
				<DialogDescription
					asChild={!contentType?.includes('image')}
					className="size-full max-h-[calc(90vh-48px)]"
				>
					{contentType?.includes('image') ? (
						<>
							<DialogClose asChild>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									radius="full"
									className="z-10 absolute right-4 top-4 bg-background/50"
								>
									<Minimize2Icon className="size-4" />
								</Button>
							</DialogClose>
							<picture className="block size-full border rounded-sm border-foreground/20">
								<Image
									src={url}
									alt={name}
									loading="lazy"
									className="relative w-full max-h-full rounded-sm object-contain"
									width={1920}
									height={0}
								/>
							</picture>
						</>
					) : (
						// text render from base64 string
						<AnimatePresence>
							{content ? (
								<>
									{shouldRenderTextEditButton && (
										<motion.div
											className="flex w-full gap-1.5 items-center mb-2"
											key={`attachment-edit-buttons-${id}`}
											{...motionAnimationProps}
										>
											<Button
												type="button"
												variant="outline"
												size="icon"
												radius="full"
												className="z-10 bg-background/50"
												onClick={toggleContentEditable}
											>
												{contentEditable ? (
													<>
														<SaveIcon key="save-icon" className="size-4" />
													</>
												) : (
													<EditIcon key="edit-icon" className="size-4" />
												)}
											</Button>
											{contentEditable && (
												<motion.button
													key="cancel-edit-button"
													type="button"
													className={buttonVariants({
														variant: 'destructive',
														size: 'icon',
													})}
													onClick={() => {
														setContentEditable(false)
													}}
													{...motionAnimationProps}
												>
													<XIcon className="size-4" />
												</motion.button>
											)}
										</motion.div>
									)}

									<DialogClose asChild>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											radius="full"
											className="z-10 absolute right-4 top-4 bg-background/50"
										>
											<Minimize2Icon className="size-4" />
										</Button>
									</DialogClose>

									<div
										// biome-ignore lint/a11y/useSemanticElements: we need a div here for contentEditable
										role="textbox"
										ref={textContentRef}
										className="!font-mono w-full min-h-[80vh] max-h-full scrollbar p-2 border rounded-sm border-foreground/20 bg-muted text-sm whitespace-pre-wrap"
										title={`attachment-content-${id}`}
										key={`attachment-content-${id}`}
										contentEditable={contentEditable}
										tabIndex={0}
										onKeyDown={handleKeyDown}
										suppressContentEditableWarning
									>
										{typeof window !== 'undefined'
											? window.atob((content as string).split(',')[1] || '')
											: ''}
									</div>
								</>
							) : null}
						</AnimatePresence>
					)}
				</DialogDescription>
				<DialogFooter className="fixed -bottom-10 flex items-center !justify-center text-center w-full">
					{name} | {(attachment.size / 1024 / 1024).toFixed(2)}MB
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
