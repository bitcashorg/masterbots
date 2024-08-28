// ChatPanelHeader.tsx
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  IconRefresh,
  IconShare,
  IconStop,
  IconTranslate
} from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/chat/chat-share-dialog'
import { useTranslation } from '@/lib/hooks/use-translation'

interface ChatPanelHeaderProps {
  id?: string
  title?: string
  isLoading: boolean
  stop: () => void
  reload: () => void
  messages: any[]
  showReload: boolean
  translateToSpanish: boolean
  setTranslateToSpanish: (value: boolean) => void
}

export function ChatPanelHeader({
  id,
  title,
  isLoading,
  stop,
  reload,
  messages,
  showReload,
}: ChatPanelHeaderProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const { translateToSpanish, setTranslateToSpanish } = useTranslation()


  return (
    <div className="flex flex-col items-center justify-between w-full p-4 space-y-4 bg-background md:flex-row md:space-y-0">
      <div className="flex items-center space-x-2">
        <IconTranslate className="size-5" />
        <Switch
          checked={translateToSpanish}
          onCheckedChange={setTranslateToSpanish}
          aria-label="Toggle Spanish translation"
        />
      </div>
      {showReload && (
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <Button variant="outline" onClick={stop} className="bg-background">
              <IconStop className="mr-2" />
              Stop generating
            </Button>
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
  )
}