'use client'

import type { Message } from 'ai/react'
import type { Chatbot } from '@repo/mb-genql'
import { ChatInputNew } from './chat-input-new'
import { useNewThread } from '@/hooks/use-new-thread'

export function NewChatInput({
  id,
  initialMessages,
  chatbot,
  dialog = false
}: NewChatInputProps) {
  const { messages, reload, stop, input, setInput, startNewThread } =
    useNewThread({ id, initialMessages, chatbot })

  return (
    <ChatInputNew
      append={startNewThread}
      chatbot={chatbot}
      id={id}
      input={input}
      isLoading={false}
      messages={messages}
      placeholder={`Start New Chat with ${chatbot.name}`}
      reload={reload}
      setInput={setInput}
      showReload={false}
      stop={stop}
      dialog={dialog}
    />
  )
}

export interface NewChatInputProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id: string
  chatbot: Chatbot
  scrollToBottom?: () => void
  dialog?: boolean
}
