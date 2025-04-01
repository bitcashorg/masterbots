'use client'

import { AttachmentsDisplay } from '@/components/routes/chat/prompt-form/attachments-display'
import { UserAttachments } from '@/components/routes/chat/prompt-form/user-attachments'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Command, CommandGroup, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useFileAttachments } from '@/lib/hooks/use-chat-attachments'
import { nanoid } from '@/lib/utils'
import { PopoverContent } from '@radix-ui/react-popover'
import {
	ClipboardList,
	Download,
	FileText,
	GraduationCap,
	LaptopIcon,
	Presentation,
	Upload,
} from 'lucide-react'
import * as React from 'react'

export default function ContextAttach() {
	const [openSections, setOpenSections] = React.useState({
		context: true,
		instructions: true,
		expertise: true,
		examples: true,
	})
	const formRef = React.useRef<HTMLFormElement>(null)
	const [{ isDragging, userData, attachments }, fileAttachmentActions] =
		useFileAttachments(formRef)
	const formId = React.useMemo(() => nanoid(16), [])

	const uploadFromComputer = (event: React.MouseEvent) => {
		event.stopPropagation()
	}

	const uploadFromGoogleDrive = (event: React.MouseEvent) => {
		event.stopPropagation()
	}

	const uploadFromSavedFiles = (event: React.MouseEvent) => {
		event.stopPropagation()
	}

	return (
		<Card className="w-full p-4 relative">
			<form ref={formRef} id={`file-workspace-attachments-form--${formId}`}>
				{isDragging && (
					<div className="absolute inset-0 flex items-center justify-center bg-muted/50">
						<div className="flex flex-col items-center justify-center">
							<Upload className="size-4" />
							<span className="text-sm">Drop your files here</span>
						</div>
					</div>
				)}
				{/* Context & Attach Section */}
				<Accordion
					defaultChecked={openSections.context}
					className="w-full border-b"
					type="single"
					collapsible
				>
					<AccordionItem value="context">
						<AccordionTrigger
							onClick={() =>
								setOpenSections((prev) => ({
									...prev,
									context: !prev.context,
								}))
							}
							className="hover:bg-muted hover:no-underline transition-colors duration-200 mr-auto w-full justify-between items-center p-4"
						>
							<Popover>
								<div className="flex w-full items-center space-x-4">
									<PopoverTrigger
										className={buttonVariants({
											variant: 'outline',
											size: 'icon',
											radius: 'full',
										})}
										onClick={uploadFromSavedFiles}
									>
										<FileText className="size-4" />
									</PopoverTrigger>
									<h3 className="font-semibold">Context</h3>
								</div>
								<PopoverContent className="w-80" align="start">
									<Command>
										<CommandGroup>
											<CommandList>
												{userData.userAttachments &&
												userData.userAttachments.length > 0 ? (
													<UserAttachments
														attachments={userData.userAttachments
															.map((attachment) => ({
																...attachment,
																isSelected: attachments.some(
																	(a) => a.id === attachment.id,
																),
															}))
															.filter(Boolean)}
														onChange={
															fileAttachmentActions.toggleAttachmentSelection
														}
													/>
												) : (
													<div className="p-4">
														<span className="text-sm text-muted-foreground">
															No saved files available.
														</span>
													</div>
												)}
											</CommandList>
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>

							<div className="flex items-center gap-2 mx-4">
								<Button
									variant="outline"
									className="cursor-pointer relative flex items-center gap-2 bg-background"
									onClick={uploadFromComputer}
								>
									<Upload className="size-4 cursor-pointer" />
									<span className="flex gap-2 items-center text-sm whitespace-nowrap cursor-pointer">
										from
									</span>
									<LaptopIcon className="size-4 cursor-pointer" />
									<Input
										onChange={fileAttachmentActions.handleFileSelect}
										tabIndex={-1}
										id={`file-attachments-${formId}`}
										className="absolute opacity-0 size-full !cursor-pointer p-0 disabled:opacity-0"
										accept="image/*,text/*"
										type="file"
										disabled={Boolean(userData.userAttachments?.length)}
										multiple
									/>
								</Button>
								<Button
									variant="outline"
									className="flex items-center gap-2 bg-background"
									onClick={uploadFromGoogleDrive}
								>
									<Download className="size-4" />
									<span>from</span>
									<svg
										role="img"
										viewBox="0 0 24 24"
										className="size-4 fill-foreground"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Google Drive</title>
										<path d="M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z" />
									</svg>
								</Button>
							</div>
						</AccordionTrigger>

						<AccordionContent className="p-4">
							<div className="bg-muted p-4 rounded-lg">
								<div className="mb-2">
									<span className="font-medium">Background Information</span>
								</div>

								<div className="space-y-4">
									<div>
										{attachments.length > 0 && (
											<div className="mt-4">
												<span className="font-medium">
													Selected Attachments
												</span>
												<AttachmentsDisplay
													isDragging={isDragging}
													attachments={attachments}
													onRemove={fileAttachmentActions.removeAttachment}
												/>
											</div>
										)}
										<Label htmlFor="context-input">
											Add context information
										</Label>
										<Textarea
											id="context-input"
											placeholder="Enter background information and additional details here..."
											className="mt-2 min-h-[120px] outline-muted-foreground/50 hover:outline-muted-foreground/50"
										/>
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* Instructions Section */}
				<Accordion
					defaultChecked={openSections.instructions}
					className="w-full border-b"
					type="single"
					collapsible
				>
					<AccordionItem value="instructions">
						<AccordionTrigger
							onClick={() =>
								setOpenSections((prev) => ({
									...prev,
									instructions: !prev.instructions,
								}))
							}
							className="p-4 hover:bg-muted hover:no-underline transition-colors duration-200"
						>
							<div className="flex w-full items-center space-x-4">
								<Button variant="outline" size="icon" className="rounded-full">
									<Presentation className="size-4" />
								</Button>
								<h3 className="font-semibold">Instructions</h3>
							</div>
						</AccordionTrigger>
						<AccordionContent className="p-4">
							<div className="bg-muted p-4 rounded-lg">
								<div className="space-y-4">
									<div>
										<Label htmlFor="instructions-input">Add instructions</Label>
										<Textarea
											id="instructions-input"
											placeholder="Enter steps, guidelines, or specifiments here..."
											className="mt-2 min-h-[120px] outline-muted-foreground/50 hover:outline-muted-foreground/50"
										/>
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* Expertise Section */}
				<Accordion
					defaultChecked={openSections.expertise}
					className="w-full border-b"
					type="single"
					collapsible
				>
					<AccordionItem value="expertise">
						<AccordionTrigger
							onClick={() =>
								setOpenSections((prev) => ({
									...prev,
									expertise: !prev.expertise,
								}))
							}
							className="p-4 hover:bg-muted hover:no-underline transition-colors duration-200"
						>
							<div className="flex w-full items-center space-x-4">
								<Button variant="outline" size="icon" className="rounded-full">
									<GraduationCap className="size-4" />
								</Button>
								<h3 className="font-semibold">Expertise</h3>
							</div>
						</AccordionTrigger>
						<AccordionContent className="p-4">
							<div className="bg-muted p-4 rounded-lg">
								<div className="space-y-4">
									<div>
										<Label htmlFor="expertise-input">
											Expert Qualifications
										</Label>
										<Textarea
											id="expertise-input"
											placeholder="Enter expert knowledge, qualifications, and credentials here..."
											className="mt-2 min-h-[120px] outline-muted-foreground/50 hover:outline-muted-foreground/50"
										/>
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* Examples Section */}
				<Accordion
					defaultChecked={openSections.examples}
					className="w-full"
					type="single"
					collapsible
				>
					<AccordionItem value="examples">
						<AccordionTrigger
							onClick={() =>
								setOpenSections((prev) => ({
									...prev,
									examples: !prev.examples,
								}))
							}
							className="p-4 hover:bg-muted hover:no-underline transition-colors duration-200"
						>
							<div className="flex w-full items-center space-x-4">
								<Button variant="outline" size="icon" className="rounded-full">
									<ClipboardList className="size-4" />
								</Button>
								<h3 className="font-semibold">Examples</h3>
							</div>
						</AccordionTrigger>
						<AccordionContent className="p-4">
							<div className="bg-muted p-4 rounded-lg mt-4">
								<div className="space-y-4">
									<div>
										<Label htmlFor="examples-input">Add Examples</Label>
										<Textarea
											id="examples-input"
											placeholder="Enter relevant examples and use cases here..."
											className="mt-2 min-h-[120px] outline-muted-foreground/50 hover:outline-muted-foreground/50"
										/>
									</div>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</form>
		</Card>
	)
}
