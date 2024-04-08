import * as React from 'react'
import { type UseChatHelpers } from 'ai/react'
import { Chatbot } from '@repo/mb-genql'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/routes/c/prompt-form'
import { ButtonScrollToBottom } from '@/components/routes/c/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/layout/footer'
import { ChatShareDialog } from '@/components/routes/c/chat-share-dialog'
import { cn } from '@/lib/utils'
import { useThread } from '@/hooks/use-thread'

export interface ChatInputProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  title?: string
  chatbot?: Chatbot
  showReload?: boolean
  placeholder: string
  isAtBottom?: boolean
  scrollToBottom: () => void
  className?: string
}

export function ChatInput({
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
  className
}: ChatInputProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const { isOpenPopup } = useThread()
  return (
    <div
      className={cn(
        'z-[2] fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 lg:pl-[250px] xl:pl-[300px]',
        className
      )}
    >
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <div className="mx-auto ">
        {chatbot && showReload ? (
          <div className="flex items-center justify-center h-12">
            {isLoading ? (
              <Button
                className="bg-background"
                onClick={() => {
                  stop()
                }}
                variant="outline"
              >
                <IconStop className="mr-2" />
                Stop generating
              </Button>
            ) : (
              messages.length >= 2 && (
                <div className="flex space-x-2">
                  <Button onClick={() => reload()} variant="outline">
                    <IconRefresh className="mr-2" />
                    Regenerate response
                  </Button>
                  {id && title ? (
                    <>
                      <Button
                        onClick={() => {
                          setShareDialogOpen(true)
                        }}
                        variant="outline"
                      >
                        <IconShare className="mr-2" />
                        Share
                      </Button>
                      <ChatShareDialog
                        // open={shareDialogOpen}
                        // onOpenChange={setShareDialogOpen}
                        onCopy={() => setShareDialogOpen(false)}
                        // shareChat={(id:string)=>{}}
                        chat={{
                          id,
                          title,
                          messages
                        }}
                      />
                    </>
                  ) : null}
                </div>
              )
            )}
          </div>
        ) : null}
        <div
          className={`px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:border md:py-4 ${isOpenPopup ? 'dark:border-mirage border-iron' : ''}`}
        >
          <PromptForm
            disabled={!chatbot}
            input={input}
            isLoading={isLoading}
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            placeholder={placeholder}
            setInput={setInput}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
