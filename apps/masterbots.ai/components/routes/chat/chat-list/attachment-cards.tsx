import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { cn } from '@/lib/utils'
import { AnimatePresence, type MotionProps, motion } from 'framer-motion'
import { FileIcon, Maximize2Icon, Minimize2Icon } from 'lucide-react'
import Image from 'next/image'

export const cardSlideUpShowAnimationProps: MotionProps = {
	initial: { opacity: 0, y: 5 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 5 },
}

export function AttachmentCards({
	userAttachments,
	isAccordionFocused,
}: {
	userAttachments: FileAttachment[]
	isAccordionFocused: boolean
}) {
	const attachmentsLength = userAttachments?.length || 0
	return (
		<div className={cn('flex flex-col items-start gap-2')}>
			{userAttachments && attachmentsLength > 0 && (
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-1">
						<span className="text-xs font-medium">Base Knowledge:</span>
						<span className="text-xs font-medium text-accent">
							{attachmentsLength} File{attachmentsLength > 1 ? 's' : ''}
						</span>
					</div>
					<div className="flex flex-wrap gap-1">
						<AnimatePresence>
							{userAttachments.map((attachment) => {
								const { id, name, url, contentType } =
									attachment as FileAttachment
								return (
									<motion.div key={id} {...cardSlideUpShowAnimationProps}>
										<Card
											className={cn(
												'transition duration-300 relative flex flex-col items-center gap-1 text-xs font-medium',
												isAccordionFocused ? 'size-[240px]' : 'size-[80px]',
											)}
										>
											<CardTitle className="size-full">
												{contentType?.includes('image') ? (
													<Image
														src={url}
														alt={name}
														loading="lazy"
														width={240}
														height={240}
														className="size-full object-cover rounded-lg"
													/>
												) : (
													<div className="size-full flex items-center justify-center bg-muted rounded-lg">
														<FileIcon className="size-5" />
													</div>
												)}
											</CardTitle>
											<CardDescription
												className={cn(
													'transition duration-300 absolute bottom-0 w-full text-center bg-accent text-accent-foreground rounded-b-lg flex px-2 gap-1 items-center justify-between',
													isAccordionFocused ? 'text-sm' : 'text-xs',
												)}
											>
												<Tooltip>
													<TooltipTrigger className="w-full py-1.5">
														<span className="inline-block items-center align-middle truncate max-w-[62%]">
															{name}
														</span>{' '}
														| {(attachment.size / 1024 / 1024).toFixed(2)}MB
													</TooltipTrigger>
													<TooltipContent
														sideOffset={5}
														side="top"
														align="center"
														className="px-2 py-1"
													>
														{name}
													</TooltipContent>
												</Tooltip>
												<Dialog>
													<DialogTrigger className="w-12" asChild>
														<Button
															variant="ghost"
															size="icon"
															radius="full"
															className="py-1.5 h-auto"
														>
															<Maximize2Icon className="size-4" />
														</Button>
													</DialogTrigger>
													<DialogContent className="min-w-[66vw] max-h-[90vh]">
														<DialogTitle hidden>
															User attachment file {name}
														</DialogTitle>
														<DialogDescription className="relative size-full max-h-[calc(90vh-48px)]">
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
															{contentType?.includes('image') ? (
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
															) : (
																// text render from base64 string
																<>
																	{attachment.content ? (
																		<pre className="size-full scrollbar p-4 border rounded-sm border-foreground/20 bg-muted">
																			{typeof window !== 'undefined'
																				? window.atob(
																						(
																							attachment.content as string
																						).split(',')[1] || '',
																					)
																				: ''}
																		</pre>
																	) : null}
																</>
															)}
														</DialogDescription>
														<DialogFooter className="fixed -bottom-10 flex items-center !justify-center text-center w-full">
															{name} |{' '}
															{(attachment.size / 1024 / 1024).toFixed(2)}MB
														</DialogFooter>
													</DialogContent>
												</Dialog>
											</CardDescription>
										</Card>
									</motion.div>
								)
							})}
						</AnimatePresence>
					</div>
				</div>
			)}
		</div>
	)
}
