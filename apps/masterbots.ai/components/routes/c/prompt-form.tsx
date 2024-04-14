import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import type { UseChatHelpers } from 'ai/react'
import { useRouter } from 'next/navigation'
import { useEnterSubmit } from '@/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import { useToggle } from 'react-use'
import { useEffect, useRef } from 'react'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  isLoading: boolean
  placeholder: string
  disabled?: boolean
  showSubmitButton?: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
  placeholder,
  disabled,
  showSubmitButton = true
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, toggleFocused] = useToggle(false)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      className="relative w-full"
      onSubmit={async e => {
        e.preventDefault()
        if (!input.trim() || disabled) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div
        className={`relative flex flex-col w-full overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border 
      ${isFocused ? ' dark:border-mirage border-iron' : ''}`}
      >
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'absolute left-0 top-4 size-8 rounded-full bg-background p-0 sm:left-4'
              )}
              onClick={e => {
                e.preventDefault()
                router.refresh()
                router.push('/')
              }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip> */}
        <Textarea
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          disabled={disabled}
          onBlur={toggleFocused}
          onChange={e => setInput(e.target.value)}
          onFocus={toggleFocused}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          ref={inputRef}
          rows={1}
          spellCheck={false}
          tabIndex={0}
          value={input}
        />
        {showSubmitButton ? (
          <div className="absolute right-0 top-4 sm:right-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isLoading || input === ''}
                  size="icon"
                  type="submit"
                >
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        ) : null}
      </div>
      {disabled ? (
        <div className="backdrop-blur-[1px] font-semibold border border-[#27272A] rounded-[6px] absolute size-full top-0 left-0 flex justify-center items-center dark:bg-[#27272A80] text-2xl">
          Select a bot to start a thread.
        </div>
      ) : null}
    </form>
  )
}
