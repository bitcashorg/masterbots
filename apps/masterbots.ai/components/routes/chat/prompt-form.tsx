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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import type { UseChatHelpers } from 'ai/react'
import { useParams } from 'next/navigation'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
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
  disabled
}: PromptProps) {
  const { activeThread } = useThread()
  const { activeChatbot, setActiveChatbot } = useSidebar()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = React.useState(false)
  const params = useParams<{ chatbot: string; category: string; threadId: string }>()

  const handleBotSelection = () => {
    if (activeThread?.chatbot) {
      setActiveChatbot(activeThread.chatbot)
      // Focus textarea after bot selection
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

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

  return (
    <form
      className="relative"
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim() || disabled) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
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
          tabIndex={0}
          onKeyDown={onKeyDown}
          minRows={2}
          rows={1}
          maxRows={6}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
          value={input}
          onChange={e => setInput(e.target.value)}
          onClick={handleBotSelection}
          placeholder={placeholder}
          spellCheck={false}
          disabled={disabled}
          className={cn('w-full resize-none bg-transparent px-12 md:px-14 py-[14px] focus-within:outline-none sm:text-sm scrollbar',
            'min-h-20 md:min-h-16', //? Smaller height on mobile
            // 'py-[1.3rem]', //? Adjusted padding for mobile
            'disabled:cursor-not-allowed',
          )}
        />
        <div className="absolute right-[8px] top-[14px] sm:right-[14px]">
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
            'hover:border-[#82e46a] hover:text-[#82e46a]'
          )}
        >
          Select{' '}
          <span className="mx-2 text-[#82e46a]">
            {params.chatbot || 'a Masterbot'}
          </span>{' '}
          to continue
        </div>
      ) : null}
    </form>
  )
}
