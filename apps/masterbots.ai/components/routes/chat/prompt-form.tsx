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

import { ChatCombobox } from '@/components/routes/chat/chat-combobox'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { IconArrowElbow } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { type FileAttachment, useFileAttachments } from '@/lib/hooks/use-chat-attachments'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, nanoid } from '@/lib/utils'
import type { Attachment, ChatRequestOptions } from 'ai'
import type { UseChatHelpers } from 'ai/react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileIcon, FilePlusIcon, PaperclipIcon, SaveIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

export interface PromptProps extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string, options?: ChatRequestOptions) => void
  isLoading: boolean
  placeholder: string
  disabled?: boolean
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
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = React.useState(false)
  const params = useParams<{ chatbot: string; category: string; threadId: string }>()
  const [{ attachments, isDragging, userData }, fileAttachmentActions] = useFileAttachments(formRef)

  const handleBotSelection = () => {
    if (activeThread?.chatbot) {
      setActiveChatbot(activeThread.chatbot)
      // Focus textarea after bot selection
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: not required
  React.useEffect(() => {
    handleBotSelection()
  }, [activeThread])

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleTextareaFocus = () => {
    setIsFocused(true)
  }

  const handleTextareaBlur = () => {
    setIsFocused(false)
  }

  // * Creating unique instances for each form (popup and main).
  // ? This is required to prevent the form from submitting when the user presses Enter in the popup.
  // ? Must be rendered once per form instance. Else it will not work as expected if leave without memoizing (onChange would update this component).
  const formId = React.useMemo(() => nanoid(16), [])
  const userAttachments =
    (userData.userAttachments as FileAttachment[]) && activeThread?.messages.length
      ? (userData.userAttachments as FileAttachment[]).filter((attachment) =>
          activeThread?.messages?.some(
            (a) => !attachment.messageIds?.some((id) => id === a.messageId),
          ),
        )
      : []
  const triggerNativeFileInput = (e: React.MouseEvent) => {
    const $document = e.currentTarget.ownerDocument
    if (!$document) return

    const $input = $document.getElementById(`file-attachments-${formId}`)
    if (!$input) return

    $input.removeAttribute('disabled')
    $input.click()
    $input.setAttribute('disabled', '')
  }

  return (
    <motion.form
      id={`prompt-form-${formId}`}
      className="relative"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!input?.trim() || disabled) {
          return
        }
        setInput('')

        const chatOptions: ChatRequestOptions = {}

        if (attachments.length) {
          // ? I might not need to destructure it here... maybe it is capable to read the FileList directly
          const fileAttachments: Attachment[] = []
          for (const attachment of attachments) {
            if (!attachment.content) return

            // Turn the ArrayBuffer into a base64 string for the Ai to read.
            const attachmentUrl =
              typeof attachment.content === 'string'
                ? attachment.content
                : Buffer.from(attachment.content).toString('base64')

            fileAttachments.push({
              name: attachment.name,
              contentType: attachment.type,
              // url: attachment.url,
              url: attachmentUrl,
            })
          }

          chatOptions.experimental_attachments = fileAttachments
        }

        await onSubmit(input, chatOptions)
      }}
      ref={formRef}
      onDrop={fileAttachmentActions.onDrop}
      onDragOver={fileAttachmentActions.onDragOver}
      onDragLeave={fileAttachmentActions.onDragLeave}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="absolute left-0 top-0 pointer-events-none dark:bg-zinc-900/90 size-full rounded-md z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>Drag and drop files here</div>
            <div className="text-sm dark:text-zinc-400 text-zinc-500">{'(images and text)'}</div>
          </motion.div>
        )}

        {attachments.length > 0 && (
          <ul className="flex flex-nowrap gap-2 px-2 py-1 mb-2 scrollbar w-full">
            {attachments.map((attachment) => (
              <motion.li
                className="flex flex-wrap gap-2 p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={attachment.id}
              >
                <Popover>
                  <PopoverTrigger className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-full h-10">
                    <div className="relative rounded-full size-10 bg-zinc-200 dark:bg-zinc-800">
                      {attachment.type.includes('image') ? (
                        <Image
                          src={attachment.url as string}
                          width={40}
                          height={40}
                          alt={attachment.name}
                          className="size-10 rounded-full object-cover"
                        />
                      ) : (
                        <FileIcon />
                      )}
                    </div>
                    <div className="p-2 flex items-center gap-2">
                      <span className="truncate">{attachment.name}</span>
                      <Button
                        type="reset"
                        variant="ghost"
                        size="icon"
                        radius="full"
                        onClick={() => fileAttachmentActions.removeAttachment(attachment.id)}
                      >
                        <XIcon className="transform" />
                        <span className="sr-only">Remove attachment</span>
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-2 rounded-lg">
                      <img src={attachment.url} alt={attachment.name} className="w-full h-auto" />
                    </div>
                  </PopoverContent>
                </Popover>
              </motion.li>
            ))}
          </ul>
        )}
      </AnimatePresence>
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
            'w-full resize-none bg-transparent px-12 md:px-14 py-[14px] focus-within:outline-none sm:text-sm scrollbar',
            'min-h-20 md:min-h-16', //? Smaller height on mobile
            // 'py-[1.3rem]', //? Adjusted padding for mobile
            'disabled:cursor-not-allowed',
          )}
        />

        <div className="absolute flex gap-3 right-[8px] top-[14px] sm:right-[14px]">
          <Popover>
            <PopoverTrigger asChild>
              <div
                // biome-ignore lint/a11y/useSemanticElements: We need to use a div with role button due we have an input inside. An input inside of a button element is not allowed and accessible.
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.currentTarget.querySelector('input')?.click()
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.currentTarget.querySelector('input')?.click()
                  }
                }}
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
                  accept="image/*,text/*"
                  type="file"
                  disabled={Boolean(!userAttachments.length)}
                  multiple
                />
                <PaperclipIcon className="p-0.5 z-0 cursor-pointer" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="max-w-[360px]">
              <Command>
                <CommandGroup>
                  <CommandList className="overflow-hidden w-full">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`user-attachments-${formId}`}>
                        <AccordionTrigger className="sticky top-0 p-2">
                          <SaveIcon className="size-4" /> Saved Attachments ({userData.userAttachments?.length || 0})
                        </AccordionTrigger>
                        <AccordionContent className="scrollbar h-full max-h-[200px] md:max-h-[300px] w-max">
                          {userData.userAttachments?.map((attach) => {
                            const attachment = attach as FileAttachment
                            return (
                              <CommandItem
                                key={attachment.id}
                                value={attachment.id}
                                onSelect={() => {
                                  fileAttachmentActions.toggleAttachmentSelection(attachment.id)
                                }}
                                className="w-full"
                              >
                                <Tooltip>
                                  <TooltipTrigger className="flex items-center gap-2 w-full">
                                    <label
                                      className="flex items-center gap-2 w-full"
                                      htmlFor={`attachment-${attachment.id}`}
                                    >
                                      <div className="size-10 flex-shrink-0">
                                        {attachment.type.includes('image') ? (
                                          <Image
                                            src={attachment.url as string}
                                            width={40}
                                            height={40}
                                            alt={attachment.name}
                                            className="size-10 object-cover rounded"
                                          />
                                        ) : (
                                          <FileIcon className="size-6" />
                                        )}
                                      </div>
                                      <input
                                        type="checkbox"
                                        id={`attachment-${attachment.id}`}
                                        name={`attachment-${attachment.id}`}
                                        checked={attachment.isSelected}
                                        onChange={() =>
                                          fileAttachmentActions.toggleAttachmentSelection(
                                            attachment.id,
                                          )
                                        }
                                      />
                                      <span className="truncate">{attachment.name}</span>
                                    </label>
                                  </TooltipTrigger>
                                  <TooltipContent>{attachment.name}</TooltipContent>
                                </Tooltip>
                              </CommandItem>
                            )
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <CommandItem asChild>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full my-2"
                        onClick={triggerNativeFileInput}
                      >
                        <FilePlusIcon className="size-4" />
                        Add Attachments
                      </Button>
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
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={isLoading || input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
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
          Select <span className="mx-2 text-[#82e46a]">{params.chatbot || 'a Masterbot'}</span> to
          continue
        </div>
      ) : null}
    </motion.form>
  )
}
