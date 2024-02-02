import * as React from 'react'
import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { Chatbot } from 'mb-genql'

export interface ChatPanelProps
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
  chatbot: Chatbot
  showReload?: boolean
  placeholder: string
  isAtBottom?: boolean
  scrollToBottom: () => void
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
  scrollToBottom
}: ChatPanelProps) {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 lg:pl-[250px] xl:pl-[300px]">
      <ButtonScrollToBottom
        scrollToBottom={scrollToBottom}
        isAtBottom={isAtBottom}
      />
      <div className="mx-auto ">
        {showReload ? (
          <div className="flex items-center justify-center h-12">
            {isLoading ? (
              <Button
                variant="outline"
                onClick={() => stop()}
                className="bg-background"
              >
                <IconStop className="mr-2" />
                Stop generating
              </Button>
            ) : (
              messages?.length >= 2 && (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => reload()}>
                    <IconRefresh className="mr-2" />
                    Regenerate response
                  </Button>
                  {id && title ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setShareDialogOpen(true)}
                      >
                        <IconShare className="mr-2" />
                        Share
                      </Button>
                      <ChatShareDialog
                        open={shareDialogOpen}
                        onOpenChange={setShareDialogOpen}
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
        <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            placeholder={placeholder}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
