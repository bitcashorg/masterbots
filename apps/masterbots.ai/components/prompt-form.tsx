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
import { IconArrowElbow, IconTranslate } from '@/components/ui/icons'
import { useThread } from '@/lib/hooks/use-thread'
import { ChatCombobox } from '@/components/chat/chat-combobox'
import { translate } from '@/app/api/chat/actions/actions'
import { AiClientType } from '@/lib/types'
import {useModel} from '@/lib/hooks/use-model';

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => void
  isLoading: boolean
  placeholder: string
  disabled?: boolean
  translateToSpanish: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
  placeholder,
  disabled,
  translateToSpanish
}: PromptProps) {
  const { isOpenPopup } = useThread()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = React.useState(false)
  const { selectedModel, clientType } = useModel()


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
        let processedInput = input
        if (translateToSpanish) {
          processedInput = await translate(
            input,
            'Spanish',
            clientType as AiClientType,
            selectedModel
          )
        }
        await onSubmit(processedInput)
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
        <div className="absolute right-0 flex items-center space-x-2 top-4 sm:right-4">
          {translateToSpanish && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                  <IconTranslate className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Spanish translation active</TooltipContent>
            </Tooltip>
          )}
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
