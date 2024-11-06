//* ChatPanel is the main chat UI component, managing user inputs and chat actions like reloading, stopping, and sending prompts.

import { ChatPanelHeader } from '@/components/routes/chat/chat-panel-header'
import { PromptForm } from '@/components/routes/chat/prompt-form'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import type { UseChatHelpers } from 'ai/react'
import type { Chatbot } from 'mb-genql'

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
  loadingState?: string // Loading status for displaying the current chat stage
  scrollToBottom: () => void // Function to scroll chat to the bottom
  id?: string // Chat ID, used in message operations
  title?: string // Chat title, displayed in the header
  chatbot?: Chatbot // Chatbot configuration for enabling/disabling prompt form
  showReload?: boolean // Displays reload button when true
  placeholder: string // Placeholder text for the input field
  isAtBottom?: boolean // Indicates if the chat is scrolled to the bottom
  className?: string // Optional custom class for styling the panel
}

export function ChatPanel({
  id,
  title,
  isLoading,
  loadingState,
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
}: ChatPanelProps) {
  const { isOpenPopup } = useThread() // State to control popup visibility

  return (
    <div
      className={cn(
        'z-[2] fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80 lg:pl-[250px] xl:pl-[300px]',
        className
      )}
    >
      <div className="mx-auto ">
        <ChatPanelHeader
          id={id}
          title={title}
          isLoading={isLoading}
          loadingState={loadingState}
          stop={stop}
          reload={reload}
          messages={messages}
          showReload={showReload}
          scrollToBottom={scrollToBottom}
          isAtBottom={isAtBottom}
        />
        <div
          className={`px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:border md:py-4 ${isOpenPopup ? 'dark:border-mirage border-iron' : ''}`}
        >
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            disabled={!Boolean(chatbot) || isLoading || Boolean(loadingState)} // Disables input if no chatbot is provided
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
