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
import { Button } from '@/components/ui/button'
import { IconArrowElbow } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useFileAttachments } from '@/lib/hooks/use-chat-attachments'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn, nanoid } from '@/lib/utils'
import type { Attachment, ChatRequestOptions } from 'ai'
import type { UseChatHelpers } from 'ai/react'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [{ attachments, isDragging }, fileAttachmentActions] = useFileAttachments(formRef)

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
            const attachmentUrl = typeof attachment.content === 'string'
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
            <div className="text-sm dark:text-zinc-400 text-zinc-500">
              {"(images and text)"}
            </div>
          </motion.div>
        )}

        {attachments.length > 0 && (
          <ul className="flex flex-nowrap gap-2 p-2 scrollbar w-full">
            {attachments.map((attachment) => (
              <motion.li
                className="flex flex-wrap gap-2 p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={attachment.id}
              >
                <Popover>
                  <PopoverTrigger
                    className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-md"
                  >
                    <span className="truncate">{attachment.name}</span>
                    <Button
                      type="reset"
                      variant="outline"
                      size="icon"
                      onClick={() => fileAttachmentActions.removeAttachment(attachment.id)}
                    >
                      <IconArrowElbow className="transform rotate-45" />
                      <span className="sr-only">Remove attachment</span>
                    </Button>
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

        <Input
          onChange={fileAttachmentActions.handleFileSelect}
          id={`file-attachments-${formId}`}
          accept="image/*,text/*"
          type="file"
          multiple
        />

        <div className="absolute right-[8px] top-[14px] sm:right-[14px]">
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
