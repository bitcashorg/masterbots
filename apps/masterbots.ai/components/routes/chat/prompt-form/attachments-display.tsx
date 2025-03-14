import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { cn } from '@/lib/utils'
import { AnimatePresence, type MotionProps, motion } from 'framer-motion'
import { FileIcon, Maximize2Icon, Minimize2Icon, XIcon } from 'lucide-react'
import Image from 'next/image'
import type React from 'react'

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
	const toggleFullScreen = (e: React.MouseEvent) => {
		e.stopPropagation()

		const $tooltipParent =
			e.currentTarget.closest('figure')?.parentElement?.parentElement
		const $figureParent = e.currentTarget.closest('figure')?.parentElement
		const $maximizeIcon = e.currentTarget.querySelector('#maximize-icon')
		const $minimizeIcon = e.currentTarget.querySelector('#minimize-icon')

		if ($figureParent && $tooltipParent) {
			$tooltipParent.classList.toggle('flex')
			$tooltipParent.classList.toggle('fixed')
			$tooltipParent.classList.toggle('inset-0')
			$tooltipParent.classList.toggle('top-[66px]')
			$tooltipParent.classList.toggle('z-50')
			$tooltipParent.classList.toggle('p-4')
			$tooltipParent.classList.toggle('bg-black/10')
			$tooltipParent.classList.toggle('items-center')
			$tooltipParent.classList.toggle('justify-center')
			$figureParent.classList.toggle('size-[720px]')
			$maximizeIcon?.classList.toggle('hidden')
			$minimizeIcon?.classList.toggle('hidden')
		}
	}

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
						const readableTextContent = atob(base64Hash)

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
										className={cn('size-[320px]')}
									>
										<figure className="relative flex items-center rounded-lg size-full">
											<Button
												variant="ghost"
												size="icon"
												className="absolute top-2 right-2 z-20"
												onClick={toggleFullScreen}
											>
												<span className="sr-only">Toggle Fullscreen</span>
												<Maximize2Icon className="size-5" id="maximize-icon" />
												<Minimize2Icon
													className="size-5 hidden"
													id="minimize-icon"
												/>
											</Button>
											{contentType.includes('image') ? (
												<Image
													src={url}
													alt={name}
													width={224}
													height={224}
													className="w-full h-auto rounded-lg"
												/>
											) : (
												<pre className="text-xs whitespace-pre-wrap scrollbar size-full bg-muted p-2">
													{readableTextContent}
												</pre>
											)}
										</figure>
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
