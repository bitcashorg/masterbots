/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/**
 * PromptForm Component
 *
 * A reusable chat input form component that provides:
 * - Auto-expanding textarea for message input
 * - Submit button with loading state
 * - Keyboard shortcuts (Enter to submit)
 * - Focus management
 * - Combobox integration for enhanced input options
 *
 * Key Features:
 * - Auto-resizing textarea with react-textarea-autosize
 * - Visual feedback for focus states
 * - Disabled state handling with overlay message
 * - Enter key submission handling
 * - Input validation and trimming
 * - Tooltip-enhanced submit button
 *
 * UX Considerations:
 * - Maintains focus on input for immediate typing
 * - Provides visual feedback for input states
 * - Handles both click and keyboard submissions
 * - Shows clear placeholder text for user guidance
 */

import { AttachmentDialog } from '@/components/routes/chat/attachment-dialog'
import { ChatCombobox } from '@/components/routes/chat/chat-combobox'
import { AttachmentsDisplay } from '@/components/routes/chat/prompt-form/attachments-display'
import { UserAttachments } from '@/components/routes/chat/prompt-form/user-attachments'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { IconArrowElbow } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import {
	type FileAttachment,
	useFileAttachments,
} from '@/lib/hooks/use-chat-attachments'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { useModel } from '@/lib/hooks/use-model'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, nanoid } from '@/lib/utils'
import type { Attachment, ChatRequestOptions } from 'ai'
import type { UseChatHelpers } from 'ai/react'
import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
	BookPlusIcon,
	FilePlusIcon,
	PaperclipIcon,
	PlusIcon,
	SaveIcon,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import { useParams } from 'next/navigation'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

export interface PromptProps
	extends Pick<UseChatHelpers, 'input' | 'setInput'> {
	onSubmit: (value: string, options?: ChatRequestOptions) => void
	isLoading: boolean
	placeholder: string
	disabled?: boolean
}

const DEFAULT_TEXT_FILE_CONTENT = `# Context for the conversation
This file can contain any relevant information that will help the chatbot understand the context of the conversation. You can add links, notes, or any other text-based content that you think is important.

`
const DEFAULT_TEXT_FILE_BASE64_CONTENT = `data:text/plain;base64,${btoa(DEFAULT_TEXT_FILE_CONTENT)}`
const DEFAULT_FILE_ATTACHMENT: FileAttachment = {
	id: nanoid(16),
	name: 'Thread Context.txt',
	url: DEFAULT_TEXT_FILE_BASE64_CONTENT,
	contentType: 'text/plain',
	content: DEFAULT_TEXT_FILE_BASE64_CONTENT,
	messageIds: [],
	expires: new Date().toISOString(),
	size: DEFAULT_TEXT_FILE_CONTENT.length,
}

export function PromptForm({
	onSubmit,
	input,
	setInput,
	isLoading,
	placeholder,
	disabled,
}: PromptProps) {
	const { activeThread } = useThread()
	const { activeChatbot, setActiveChatbot } = useSidebar()
	const [{ allMessages }] = useMBChat()
	const { formRef, onKeyDown } = useEnterSubmit()
	const inputRef = React.useRef<HTMLTextAreaElement>(null)
	const [isFocused, setIsFocused] = React.useState(false)
	const params = useParams<{
		chatbot: string
		category: string
		threadId: string
	}>()
	const [{ attachments, isDragging, userData }, fileAttachmentActions] =
		useFileAttachments(formRef)
	const { selectedModel } = useModel()
	const threadContextFileRef = React.useRef<FileAttachment>(
		DEFAULT_FILE_ATTACHMENT,
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: not required
	React.useEffect(() => {
		handleBotSelection()
	}, [activeThread])

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	const handleBotSelection = () => {
		if (activeThread?.chatbot) {
			setActiveChatbot(activeThread.chatbot)
			// Focus textarea after bot selection
			if (inputRef.current) {
				inputRef.current.focus()
			}
		}
	}

	const handleTextareaFocus = () => {
		setIsFocused(true)
	}

	const handleTextareaBlur = () => {
		setIsFocused(false)
	}

	const triggerNativeFileInput = (e: React.MouseEvent) => {
		const $document = e.currentTarget.ownerDocument
		if (!$document) return

		const $input = $document.getElementById(`file-attachments-${formId}`)
		if (!$input) return

		$input.removeAttribute('disabled')
		$input.click()
		$input.setAttribute('disabled', '')
	}

	const triggerNewTextFileDialog = (e: React.MouseEvent) => {
		// Create a proper File object from the text content
		const attachmentContextFileName = attachments.some(
			(attch) => attch.name === 'Thread Context.txt',
		)
			? `Thread Context (${attachments.filter((attch) => attch.name.includes('Thread Context')).length + 1}).txt`
			: 'Thread Context.txt'
		// Use the existing file handler to process the file
		const newAttachmentObject = {
			...DEFAULT_FILE_ATTACHMENT,
			id:
				attachmentContextFileName !== DEFAULT_FILE_ATTACHMENT.name
					? nanoid(16)
					: DEFAULT_FILE_ATTACHMENT.id,
			name: attachmentContextFileName,
			expires: new Date().toISOString(),
			size: new Blob([DEFAULT_TEXT_FILE_CONTENT]).size,
		}
		fileAttachmentActions.addAttachmentObject(newAttachmentObject)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: not required
	React.useEffect(() => {
		if (attachments.length > 0) {
			const threadContextFiles = attachments
				.filter((attch) => attch.name.includes('Thread Context'))
				.sort((a, b) => {
					// Sort by the latest thread context file first
					const aCount = Number(a.name.match(/\((\d+)\)/)?.[1] || '0')
					const bCount = Number(b.name.match(/\((\d+)\)/)?.[1] || '0')
					return bCount - aCount
				})
			threadContextFileRef.current = threadContextFiles[0] || null
		}
	}, [triggerNewTextFileDialog])

	const submitPrompt = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input?.trim() || disabled) {
			return
		}
		setInput('')

		const chatOptions: ChatRequestOptions = {}
		if (attachments.length) {
			// ? I might not need to destructure it here... maybe it is capable to read the FileList directly
			const fileAttachments: (Attachment & { id: string })[] = []
			for (const attachment of attachments) {
				if (!attachment.content) return

				fileAttachments.push(attachment)
			}

			chatOptions.experimental_attachments = fileAttachments
		}

		await onSubmit(input, chatOptions)
		fileAttachmentActions.clearAttachments()
	}

	// * Creating unique instances for each form (popup and main).
	// ? This is required to prevent the form from submitting when the user presses Enter in the popup.
	// ? Must be rendered once per form instance. Else it will not work as expected if leave without memoizing (onChange would update this component).
	const formId = React.useMemo(() => nanoid(16), [])
	const userAttachments =
		(userData.userAttachments as FileAttachment[]) && allMessages.length
			? (userData.userAttachments as FileAttachment[]).filter((attachment) =>
					allMessages.some((a) =>
						attachment.messageIds?.some((id) => id === a.id),
					),
				)
			: []
	const selectedUserAttachments = userAttachments.map((attachment) => ({
		...attachment,
		isSelected: attachments.some((a) => a.id === attachment.id),
	}))
	// Returns true if the user has selected any attachment that is related to the selected thread
	const userHasRelatedAttachment = Boolean(userAttachments.length)
	// console.log(
	// 	`User has related attachment: ${userHasRelatedAttachment}`,
	// 	threadContextFileRef.current,
	// 	attachments.length,
	// )
	return (
		<motion.form
			id={`prompt-form-${formId}`}
			className="relative"
			onSubmit={submitPrompt}
			ref={formRef}
			onDrop={fileAttachmentActions.onDrop}
			onDragOver={fileAttachmentActions.onDragOver}
			onDragExit={fileAttachmentActions.onDragLeave}
			onDragLeave={fileAttachmentActions.onDragLeave}
		>
			<AttachmentsDisplay
				isDragging={isDragging}
				attachments={attachments}
				onRemove={fileAttachmentActions.removeAttachment}
				onUpdate={fileAttachmentActions.updateAttachment}
			/>
			<div
				className={cn(
					'transition-all relative flex flex-col w-full overflow-hidden grow bg-background border-4 border-[#be16e8] rounded-md',
					'max-h-32 md:max-h-60',
					isFocused ? 'dark:border-mirage' : '',
					disabled && 'bg-muted text-muted-foreground opacity-50',
				)}
			>
				<ChatCombobox />
				<Textarea
					ref={inputRef}
					id={`prompt-textarea-${formId}`}
					tabIndex={0}
					onKeyDown={onKeyDown}
					minRows={2}
					rows={1}
					maxRows={6}
					onFocus={handleTextareaFocus}
					onBlur={handleTextareaBlur}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onClick={handleBotSelection}
					placeholder={placeholder}
					spellCheck={false}
					disabled={disabled}
					className={cn(
						'w-full resize-none bg-transparent px-12 md:px-14 py-[8px] focus-within:outline-none sm:text-sm scrollbar',
						'min-h-20 md:min-h-16', //? Smaller height on mobile
						// 'py-[1.3rem]', //? Adjusted padding for mobile
						'disabled:cursor-not-allowed',
					)}
				/>

				<div className="absolute flex flex-col-reverse gap-1.5 sm:flex-row sm:gap-3 right-[8px] top-[8px] sm:right-[14px]">
					<Popover>
						<PopoverTrigger
							className={cn(
								buttonVariants({ variant: 'ghost', size: 'icon' }),
								'relative cursor-pointer',
							)}
						>
							<Input
								onChange={fileAttachmentActions.handleFileSelect}
								tabIndex={-1}
								id={`file-attachments-${formId}`}
								className={cn(
									'absolute opacity-0 size-full !cursor-pointer p-0 disabled:opacity-0',
								)}
								accept={
									selectedModel.match(/(DeepSeekR1|GroqDeepSeek)/)
										? 'text/*'
										: 'image/*,text/*'
								}
								type="file"
								disabled
								multiple
							/>
							<PaperclipIcon className="p-0.5 z-0 cursor-pointer" />
						</PopoverTrigger>
						<PopoverContent className="w-[320px]">
							<Command>
								<CommandGroup>
									<CommandList className="w-full p-0 overflow-hidden">
										{userHasRelatedAttachment && (
											<Accordion type="single" className="mb-4" collapsible>
												<AccordionItem value={`user-attachments-${formId}`}>
													<AccordionTrigger className="sticky top-0 p-2">
														<SaveIcon className="size-4" /> Saved Attachments (
														{userAttachments?.length || 0})
													</AccordionTrigger>
													<AccordionContent className="scrollbar h-full max-h-[200px] md:max-h-[300px] w-full">
														<UserAttachments
															attachments={selectedUserAttachments}
															onChange={
																fileAttachmentActions.toggleAttachmentSelection
															}
														/>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										)}

										<CommandGroup
											className="[&>div]:flex [&>div]:w-full [&>div]:gap-1 mb-1"
											heading="Add Thread Attachments"
										>
											<CommandItem
												asChild
												className="flex w-full bg-transparent"
											>
												<Button
													variant="outline"
													size="lg"
													className="w-full cursor-pointer px-2"
													onClick={triggerNativeFileInput}
													title={
														selectedModel.match(/(DeepSeekR1|GroqDeepSeek)/)
															? 'Add text files only'
															: 'Add image or text files'
													}
												>
													<FilePlusIcon className="size-4" />
													New File(s)
												</Button>
											</CommandItem>
											<CommandItem
												asChild
												className="flex w-full bg-transparent"
											>
												<AttachmentDialog
													attachment={threadContextFileRef.current}
													updateAttachment={
														fileAttachmentActions.updateAttachment
													}
													triggerComponent={
														<Button
															variant="outline"
															size="lg"
															className="w-full cursor-pointer px-2"
															onClick={triggerNewTextFileDialog}
														>
															<BookPlusIcon className="size-4" />
															New Context
														</Button>
													}
												/>
											</CommandItem>
											{/* <CommandItem>
												<Button
													variant="ghost"
													size="sm"
													onClick={fileAttachmentActions.clearAttachments}
													disabled={!attachments.length}
												>
													Clear Attachments
												</Button>
											</CommandItem> */}
										</CommandGroup>
									</CommandList>
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								type="submit"
								size="icon"
								disabled={isLoading || input === ''}
							>
								<IconArrowElbow />
								<span className="sr-only">Send message</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent
							sideOffset={5}
							side="top"
							align="center"
							className="px-2 py-1"
						>
							Send message
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
			{!activeChatbot ? (
				<div
					className={cn(
						'backdrop-blur-[1px] font-semibold border border-[#27272A] rounded-[6px] absolute size-full top-0 left-0',
						'flex justify-center items-center dark:bg-[#27272A80] text-xl',
						'cursor-pointer transition-all',
						'hover:border-[#82e46a] hover:text-[#82e46a]',
					)}
				>
					Select{' '}
					<span className="mx-2 text-[#82e46a]">
						{params.chatbot || 'a Masterbot'}
					</span>{' '}
					to continue
				</div>
			) : null}
		</motion.form>
	)
}
