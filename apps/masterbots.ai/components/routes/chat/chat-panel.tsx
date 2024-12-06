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
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
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
  className,
}: ChatPanelProps) {
  const { isOpenPopup, loadingState } = useThread() // State to control popup visibility

  return (
    <div
      className={cn(
        'z-[2] fixed inset-x-0 bottom-0 w-full',
        'animate-in duration-300 ease-in-out',
        'bg-gradient-to-b from-background/50 to-background',
        'dark:from-background/0 dark:to-background/80',
        'lg:pl-[250px] xl:pl-[300px]',
        className
      )}
    >
      <div className="relative w-full mx-auto">
        <ChatPanelHeader
          id={id}
          title={title}
          isLoading={isLoading}
          stop={stop}
          reload={reload}
          messages={messages}
          showReload={showReload}
          scrollToBottom={scrollToBottom}
          isAtBottom={isAtBottom}
        />
        <div
          className={cn(
            'relative flex flex-col w-full',
            'p-2 sm:px-4 space-y-2 sm:space-y-4',
            'border-t shadow-lg bg-background',
            'dark:border-zinc-800 border-zinc-200',
            isOpenPopup ? 'dark:border-mirage border-iron' : '',
            'min-h-[64px] sm:min-h-[80px]'
          )}
        >
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
              });
            }}
            // biome-ignore lint/complexity/noExtraBooleanCast: <explanation>
            disabled={!Boolean(chatbot) || isLoading || Boolean(loadingState)}
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
