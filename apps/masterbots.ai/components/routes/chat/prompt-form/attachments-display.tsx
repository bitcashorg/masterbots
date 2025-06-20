import { AttachmentDialog } from '@/components/routes/chat/attachment-dialog'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { cn } from '@/lib/utils'
import { AnimatePresence, type MotionProps, motion } from 'framer-motion'
import { FileIcon, XIcon } from 'lucide-react'
import Image from 'next/image'

export const cardSlideDownShowAnimationProps: MotionProps = {
	initial: { opacity: 0, y: -5 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -5 },
}

export function AttachmentsDisplay({
	isDragging,
	attachments,
	onRemove,
}: {
	isDragging: boolean
	attachments: FileAttachment[]
	onRemove: (id: string) => void
}) {
	return (
		<AnimatePresence>
			{isDragging && (
				<motion.div
					className="absolute left-0 top-0 pointer-events-none dark:bg-zinc-900/90 size-full rounded-md z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div>Drag and drop files here</div>
					<div className="text-sm dark:text-zinc-400 text-zinc-500">
						{'(images and text)'}
					</div>
				</motion.div>
			)}

			{attachments.length > 0 && (
				<ul className="flex flex-nowrap gap-2 px-2 py-1 mb-2 scrollbar w-full">
					{attachments.map((attachment) => {
						const { id, url, name, contentType } = attachment as FileAttachment
						const base64Hash = url.split(',')[1]
						const readableTextContent = contentType.includes('image')
							? ''
							: atob(base64Hash)

						return (
							<motion.li
								key={attachment.id}
								className="flex flex-wrap gap-2 p-2"
								{...cardSlideDownShowAnimationProps}
							>
								<Popover>
									<PopoverTrigger className="flex items-center gap-2 bg-muted rounded-full h-10">
										<div className="flex items-center justify-center relative rounded-full size-10 bg-zinc-200 dark:bg-zinc-800">
											{attachment.contentType.includes('image') ? (
												<Image
													src={url}
													width={40}
													height={40}
													alt={name}
													className="size-10 rounded-full object-cover"
												/>
											) : (
												<FileIcon className="size-5" />
											)}
										</div>
										<div className="p-2 flex items-center gap-2">
											<span className="truncate text-sm">{name}</span>
											<Button
												type="reset"
												variant="ghost"
												size="icon"
												radius="full"
												onClick={() => onRemove(id)}
											>
												<XIcon className="transition size-4 hover:text-destructive focus-within:text-destructive" />
												<span className="sr-only">Remove attachment</span>
											</Button>
										</div>
									</PopoverTrigger>
									<PopoverContent
										sideOffset={5}
										side="top"
										align="center"
										className={cn('relative size-[320px]')}
									>
										<figure className="flex items-center rounded-lg size-full">
											{contentType.includes('image') ? (
												<Image
													src={url}
													alt={name}
													width={224}
													height={224}
													className="w-full h-auto max-h-full rounded-lg"
												/>
											) : (
												<pre className="text-xs whitespace-pre-wrap scrollbar size-full bg-muted p-2">
													{readableTextContent}
												</pre>
											)}
										</figure>
										<AttachmentDialog
											attachment={attachment}
											absolutePosition
										/>
									</PopoverContent>
								</Popover>
							</motion.li>
						)
					})}
				</ul>
			)}
		</AnimatePresence>
	)
}
