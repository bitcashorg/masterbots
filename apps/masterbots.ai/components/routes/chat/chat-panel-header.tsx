//* ChatPanelHeader provides controls for managing chat actions like reloading, stopping generation, and sharing chat.
import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { ButtonScrollToBottom } from '@/components/shared/button-scroll-to-bottom'
import { FontSizeSelector } from '@/components/shared/font-size-selector'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useThread } from '@/lib/hooks/use-thread'
import { GlobeIcon } from 'lucide-react'
import * as React from 'react'

interface ChatPanelHeaderProps {
  id?: string // Chat ID, required for sharing functionality
  title?: string // Chat title, required for sharing
  isLoading: boolean // Indicates if a response is currently generating
  stop: () => void // Function to stop response generation
  reload: () => void // Function to regenerate a response
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  messages: any[] // Array of messages in the chat
  showReload: boolean // Shows reload option when true
  scrollToBottom: () => void // Scrolls chat to the bottom
  isAtBottom?: boolean // Indicates if chat is scrolled to the bottom
}

export function ChatPanelHeader({
  id,
  title,
  isLoading,
  stop,
  reload,
  messages,
  showReload,
  scrollToBottom,
  isAtBottom
}: ChatPanelHeaderProps) {
  // TODO: Attach Share func to user chats chat pop-up
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const webSearchRef = React.useRef(null)
  const { loadingState } = useThread()
  const [{ webSearch }, { toggleWebSearch }] = useMBChat()
  const { isPowerUp, togglePowerUp } = usePowerUp()

  return (
    <div className="flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0">
      <div className="flex items-center justify-between w-full gap-4 mx-2">
        <div className="flex items-center space-x-4">
          {/* Power-Up Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              id="power-up"
              checked={isPowerUp}
              onCheckedChange={togglePowerUp}
            />
            <Label htmlFor="power-up" className="text-sm font-normal">
              Power-Up
            </Label>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Web Search Checkbox */}
          <Checkbox
            custom
            name="webSearch"
            id="webSearch"
            value={webSearch ? 'checked' : 'unchecked'}
            ref={webSearchRef}
            onClick={toggleWebSearch}
            className="transition-all delay-100 h-auto w-auto inline-flex items-center gap-2 border-muted p-0.5 data-[state=checked]:border-accent/50 data-[state=checked]:bg-accent/25 rounded-full"
            customSettings={{
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
              )
            }}
          />

          <Separator orientation="vertical" className="h-6" />

          {/* Font Size Selector */}
          <div className="flex items-center">
            <FontSizeSelector />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {showReload &&
            (isLoading || loadingState ? (
              <>
                {loadingState && (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-1 drop-shadow-lg">
                      <div className="rounded-full size-2 bg-primary animate-pulse" />
                      <div className="rounded-full size-2 bg-primary animate-pulse" />
                      <div className="rounded-full size-2 bg-primary animate-pulse" />
                    </div>
                    <p className="text-sm font-bold text-primary drop-shadow-lg">
                      {loadingState}
                    </p>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={stop}
                  className="bg-background"
                >
                  <IconStop className="mr-2" />
                  Stop generating
                </Button>
              </>
            ) : (
              messages?.length >= 2 && (
                <>
                  <Button
                    variant="outline"
                    className="relative group"
                    onClick={reload}
                  >
                    <IconRefresh className="mr-2 transition-all" />
                    Regenerate response
                  </Button>
                  {id && title && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setShareDialogOpen(true)}
                      >
                        <IconShare className="mr-2" />
                        Share
                      </Button>
                      <ChatShareDialog
                        onCopy={() => setShareDialogOpen(false)}
                        chat={{
                          id,
                          title,
                          messages
                        }}
                      />
                    </>
                  )}
                </>
              )
            ))}
        </div>
      </div>
      <ButtonScrollToBottom
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
      />
    </div>
  )
}
