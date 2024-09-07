import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { IconArrowElbow } from '@/components/ui/icons'
import { useThread } from '@/lib/hooks/use-thread'
import { ChatCombobox } from '@/components/routes/chat/chat-combobox'

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
  const { isOpenPopup } = useThread()
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
        className={`relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border sm:px-12
      ${isOpenPopup && isFocused ? ' dark:border-mirage border-iron' : ''}`}
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
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
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
      {disabled && (
        <div className="backdrop-blur-[1px] font-semibold border border-[#27272A] rounded-[6px] absolute size-full top-0 left-0 flex justify-center items-center dark:bg-[#27272A80] text-2xl">
          Select a bot to start a thread.
        </div>
      )}
    </form>
  )
}
