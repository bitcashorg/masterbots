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
  const { isOpenPopup, activeThread } = useThread()
  const { activeChatbot } = useSidebar()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = React.useState(false)

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
          "relative flex flex-col w-full px-8 overflow-hidden grow bg-background sm:rounded-md sm:border sm:px-12",
          "max-h-32 md:max-h-60", 
          isOpenPopup && isFocused ? 'dark:border-mirage border-iron' : ''
        )}
      >
        <ChatCombobox />
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          onFocus={handleTextareaFocus}
          onBlur={handleTextareaBlur}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          disabled={disabled}
          className={cn(
            "w-full resize-none bg-transparent px-4 py-1 my-1 focus-within:outline-none sm:text-sm",
            "min-h-[80px] md:min-h-[60px]", //? Smaller height on mobile
            "md:py-[1.3rem]" //? Adjusted padding for mobile
          )}
        />
        <div className="absolute right-0 top-4 sm:right-4">
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
      {!activeChatbot || (isOpenPopup && !activeThread?.chatbot) ? (
        <div className="backdrop-blur-[1px] font-semibold border border-[#27272A] rounded-[6px] absolute size-full top-0 left-0 flex justify-center items-center dark:bg-[#27272A80] text-2xl">
          Select {activeThread?.chatbot?.name} to continue
        </div>
      ) : null}
    </form>
  )
}
