import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { ButtonScrollToBottom } from '@/components/shared/button-scroll-to-bottom'
import { Button } from '@/components/ui/button'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
// ChatPanelHeader.tsx
import * as React from 'react'

interface ChatPanelHeaderProps {
  id?: string
  title?: string
  isLoading: boolean
  stop: () => void
  reload: () => void
  messages: any[]
  showReload: boolean
  scrollToBottom: () => void
  loadingState?: string
  isAtBottom?: boolean
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

  return (
    <div className="flex flex-col items-center justify-between w-full p-2 space-y-2 bg-background md:flex-row md:space-y-0">
      {showReload && (
        <div className="flex items-center px-2 space-x-2">
          {isLoading ? (
            <>
              {/* // * Testing loadingState for chat stages */}
              {loadingState && (
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex items-center space-x-1 drop-shadow-lg">
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                    <div className="size-2 bg-primary rounded-full animate-pulse" />
                  </div>
                  <p className="text-sm text-primary font-bold drop-shadow-lg">{loadingState}</p>
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
      <ButtonScrollToBottom
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
      />
    </div>
  )
}
