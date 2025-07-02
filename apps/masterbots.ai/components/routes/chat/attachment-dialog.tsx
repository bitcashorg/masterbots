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
import { Skeleton } from '@/components/ui/skeleton'
import { useAttachmentDialog } from '@/lib/hooks/use-attachment-dialog'
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
}: AttachmentDialogProps) {
	const {
		open,
		contentEditable,
		fetchedContent,
		isLoadingContent,
		fetchError,
		textContentRef,
		shouldRenderContent,
		attachmentLabel,
		shouldRenderTextEditButton,
		toggleDialogOpen,
		toggleContentEditable,
		getDisplayContent,
		setContentEditable,
		contentEditablePasteControl,
		handleKeyDown,
	} = useAttachmentDialog({
		attachment,
		dialogState,
		updateAttachment,
		absolutePosition,
		triggerComponent,
	})
	const { id, name, url, contentType, content } = attachment

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
						// text render from base64 string or fetched content
						<AnimatePresence mode="wait">
							{!isLoadingContent &&
							(shouldRenderContent || fetchedContent || fetchError) ? (
								<>
									{shouldRenderTextEditButton && (
										<motion.div
											className="flex w-full gap-1.5 items-center mb-2 z-10 absolute left-8 top-8"
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
													className={cn(
														buttonVariants({
															variant: 'destructive',
															size: 'icon',
														}),
														'z-10 bg-destructive/50',
													)}
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
											className="z-10 absolute right-8 top-8 bg-background/50"
										>
											<Minimize2Icon className="size-4" />
										</Button>
									</DialogClose>

									<motion.div
										// biome-ignore lint/a11y/useSemanticElements: we need a div here for contentEditable
										role="textbox"
										ref={textContentRef}
										className="!font-mono w-full min-h-[80vh] max-h-[calc(90vh-48px)] scrollbar px-2 py-10 border rounded-sm border-foreground/20 bg-muted text-sm whitespace-pre-wrap"
										title={`attachment-content-${id}`}
										key={`attachment-content-${id}`}
										contentEditable={
											contentEditable && !isLoadingContent && !fetchError
										}
										tabIndex={0}
										onKeyDown={handleKeyDown}
										onPaste={contentEditablePasteControl}
										suppressContentEditableWarning
										{...motionAnimationProps}
									>
										{getDisplayContent()}
									</motion.div>
								</>
							) : (
								<SkeletonFallback key={`attachment-skeleton-${id}`} />
							)}
						</AnimatePresence>
					)}
				</DialogDescription>
				<DialogFooter className="fixed -bottom-10 flex items-center !justify-center text-center w-full">
					{attachmentLabel}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

function SkeletonFallback() {
	return (
		<motion.div
			className="flex items-center justify-center size-full text-muted-foreground bg-background"
			{...motionAnimationProps}
		>
			<Skeleton className="w-full min-h-[80vh]" />
		</motion.div>
	)
}

export interface AttachmentDialogProps {
	attachment: FileAttachment
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
}
