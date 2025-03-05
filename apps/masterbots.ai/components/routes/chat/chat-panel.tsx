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

  const isPreProcessing = Boolean(loadingState?.match(/processing|digesting|polishing/))
  const hiddenAnimationClassNames = 'p-2 gap-0 w-auto relative overflow-hidden [&:hover_span]:opacity-100 [&:hover_span]:w-auto [&:hover_span]:duration-300 [&:hover_svg]:mr-2 [&:hover_span]:transition-all'
  const hiddenAnimationItemClassNames = 'transition-all w-[0px] opacity-0 whitespace-nowrap duration-300'

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
              <div className="flex md:flex-row flex-col items-center space-x-2 gap-y-2 cursor-pointer">
                <Switch id="power-up" checked={isPowerUp} onCheckedChange={togglePowerUp} className="h-4 w-9 [&>span]:size-3.5"/>
                <Label htmlFor="power-up" className="text-xs md:text-sm font-normal cursor-pointer">
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
            <div className="flex items-center gap-3.5">
              <ButtonScrollToBottom
                scrollToBottom={scrollToBottom}
                isAtBottom={isAtBottom}
                className={hiddenAnimationClassNames}
                textClassName={hiddenAnimationItemClassNames}
              />
              {showReload && (isLoading || isPreProcessing) ? (
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
                  {isLoading && (
                    <Button variant="outline" onClick={stop} className="bg-background">
                      <IconStop className="mr-2" />
                      Stop generating
                    </Button>
                  )}
                </>
              ) : (
                messages?.length >= 2 && (
                  <>
                      <Button variant="outline" size="icon" className={hiddenAnimationClassNames} onClick={() => reload()}>
                        <IconRefresh className="transition-all" />
                        <span className={hiddenAnimationItemClassNames}>
                          Regenerate response
                        </span>
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
            onSubmit={async (value, chatOptions) => {
              await append({
                id,
                content: value,
                role: 'user',
              }, chatOptions)
            }}
            // biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
            disabled={isLoading || !Boolean(chatbot) || isPreProcessing}
            input={input}
            setInput={setInput}
            isLoading={isLoading || isPreProcessing}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  )
}
