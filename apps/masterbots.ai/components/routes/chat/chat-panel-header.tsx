//* ChatPanelHeader provides controls for managing chat actions like reloading, stopping generation, and sharing chat.
import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { ButtonScrollToBottom } from '@/components/shared/button-scroll-to-bottom'
import { Button } from '@/components/ui/button'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { usePowerUp } from '@/lib/hooks/use-power-up'
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
  loadingState?: string // Current loading status or message stage
  isAtBottom?: boolean // Indicates if chat is scrolled to the bottom
}

export function ChatPanelHeader({
  id,
  title,
  isLoading,
  loadingState,
  stop,
  reload,
  messages,
  showReload,
  scrollToBottom,
  isAtBottom
}: ChatPanelHeaderProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const { isPowerUp, togglePowerUp } = usePowerUp()

  return (
    <div className="flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0">
      <div className="flex items-center gap-4 mx-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="power-up"
            checked={isPowerUp}
            onCheckedChange={togglePowerUp}
          />
          <Label htmlFor="power-up-mode" className="text-sm font-normal">
            Power-Up
          </Label>
        </div>
        
        {showReload && (
          <div className="flex items-center px-2 space-x-2">
            {isLoading || loadingState ? (
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
                  <Button variant="outline" onClick={reload}>
                    <IconRefresh className="mr-2" />
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
            )}
          </div>
        )}
      </div>
      <ButtonScrollToBottom
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
      />
    </div>
  )
}