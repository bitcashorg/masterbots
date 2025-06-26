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
import { useEffect, useRef, useState } from 'react'

const motionAnimationProps = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.14 },
}

export function AttachmentDialog({
	attachment,
	updateAttachment,
	absolutePosition = false,
	triggerComponent,
}: {
	attachment: FileAttachment | null
	updateAttachment?: (id: string, attachment: Partial<FileAttachment>) => void
	absolutePosition?: boolean
	triggerComponent?: React.ReactNode
}) {
	const [contentEditable, setContentEditable] = useState(true)
	const textContentRef = useRef<HTMLDivElement | null>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!contentEditable || !attachment) return

		if (textContentRef.current) {
			console.log('Setting focus to pre element', textContentRef.current)
			// Set focus to the pre element to allow editing
			const range = document.createRange()
			range.selectNodeContents(textContentRef.current)
			window.getSelection()?.removeAllRanges() // Clear any existing selection
			window.getSelection()?.addRange(range) // Select the content of the pre div element
		}
	}, [contentEditable, textContentRef.current, attachment])

	if (!attachment) return null

	const { id, name, url, contentType, content } = attachment

	const toggleContentEditable = () => {
		const newOpenState = !contentEditable
		const textElement = textContentRef.current

		setContentEditable(newOpenState)

		if (newOpenState || !textElement) return

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

	const shouldRenderTextEditButton = Boolean(updateAttachment)

	return (
		<Dialog key={`dialog-${id}`}>
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
