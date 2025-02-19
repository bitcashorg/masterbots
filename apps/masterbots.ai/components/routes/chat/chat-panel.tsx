import type { UseChatHelpers } from 'ai/react'
import { GlobeIcon } from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot } from 'mb-genql'
import * as React from 'react'

import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { PromptForm } from '@/components/routes/chat/prompt-form'
import { ButtonScrollToBottom } from '@/components/shared/button-scroll-to-bottom'
import { FontSizeSelector } from '@/components/shared/font-size-selector'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    'append' | 'isLoading' | 'reload' | 'messages' | 'stop' | 'input' | 'setInput'
  > {
  scrollToBottom: () => void
  id?: string
  title?: string
  chatbot?: Chatbot
  showReload?: boolean
  placeholder: string
  isAtBottom?: boolean
  className?: string
}

export function ChatPanel({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  chatbot,
  placeholder,
  showReload = true,
  isAtBottom,
  scrollToBottom,
  className,
}: ChatPanelProps) {
  const { isOpenPopup, loadingState, webSearch, setWebSearch } = useThread()
  const { isPowerUp, togglePowerUp } = usePowerUp()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const webSearchRef = React.useRef(null)

  return (
    <div
      className={cn(
        'z-[2] fixed inset-x-0 bottom-0 w-full',
        'animate-in duration-300 ease-in-out',
        'bg-gradient-to-b from-background/50 to-background',
        'dark:from-background/0 dark:to-background/80',
        'lg:pl-[250px] xl:pl-[300px]',
        className,
      )}
    >
      <div className="relative w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0">
          <div className="flex items-center justify-between w-full gap-4 mx-2">
            <div className="flex items-center space-x-4">
              {/* Power-Up Switch */}
              <div className="flex items-center space-x-2">
                <Switch id="power-up" checked={isPowerUp} onCheckedChange={togglePowerUp} />
                <Label htmlFor="power-up" className="text-sm font-normal">
                  Power-Up
                </Label>
              </div>

              {appConfig.features.webSearch && (
                <>
                  <Separator orientation="vertical" className="h-6" />
                  {/* Web Search Checkbox */}
                  <Checkbox
                    custom
                    name="webSearch"
                    id="webSearch"
                    value={webSearch ? 'checked' : 'unchecked'}
                    ref={webSearchRef}
                    onClick={(value) => setWebSearch(!value)}
                    className="transition-all delay-100 h-auto w-auto inline-flex items-center gap-2 border-muted p-0.5 data-[state=checked]:border-accent/50 data-[state=checked]:bg-accent/25 rounded-full"
                    checkboxconfig={{
                      check: (
                        <>
                          <div className="bg-accent rounded-full -m-[2px] mr-1 p-0.5">
                            <GlobeIcon className="size-7 text-accent-foreground" />
                          </div>
                          <Label
                            htmlFor="webSearch"
                            className="mr-2 text-xs leading-none text-nowrap"
                          >
                            Web search enabled
                          </Label>
                        </>
                      ),
                      uncheck: (
                        <>
                          <GlobeIcon className="opacity-75 size-7" />
                          <span className="sr-only">Web search disabled</span>
                        </>
                      ),
                    }}
                  />
                </>
              )}

              <Separator orientation="vertical" className="h-6" />

              {/* Font Size Selector */}
              <div className="flex items-center">
                <FontSizeSelector />
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-5">
              {showReload && isLoading ? (
                <>
                  {loadingState !== 'finished' && (
                    <div className="flex items-center justify-between gap-4">
                      <b className="text-xs drop-shadow-lg">
                        {loadingState}
                      </b>
                      <div className="flex items-center justify-center w-full size-4">
                        <div className="size-3 border-2 border-gray-200 rounded-full animate-ping" />
                      </div>
                    </div>
                  )}
                  <Button variant="outline" onClick={stop} className="bg-background">
                    <IconStop className="mr-2" />
                    Stop generating
                  </Button>
                </>
              ) : (
                messages?.length >= 2 && (
                  <>
                    <Button variant="outline" className="relative group" onClick={() => reload()}>
                      <IconRefresh className="mr-2 transition-all" />
                      Regenerate response
                    </Button>
                    {id && title && (
                      <>
                        <Button variant="outline" onClick={() => setShareDialogOpen(true)}>
                          <IconShare className="mr-2" />
                          Share
                        </Button>
                        <ChatShareDialog
                          onCopy={() => setShareDialogOpen(false)}
                          chat={{
                            id,
                            title,
                            messages,
                          }}
                        />
                      </>
                    )}
                  </>
                )
              )}
            </div>
          </div>
          <ButtonScrollToBottom scrollToBottom={scrollToBottom} isAtBottom={isAtBottom} />
        </div>

        {/* Prompt Form Section */}
        <div
          className={cn(
            'relative flex flex-col w-full',
            'p-2 sm:px-4 space-y-2 sm:space-y-4',
            'border-t shadow-lg bg-background',
            'dark:border-zinc-800 border-zinc-200',
            isOpenPopup ? 'dark:border-mirage border-iron' : '',
            'min-h-[64px] sm:min-h-[80px]',
          )}
        >
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: 'user',
              })
            }}
            // biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
            disabled={isLoading || !Boolean(chatbot)}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  )
}
