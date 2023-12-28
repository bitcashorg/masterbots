'use client'

import { useNewMessage } from '@/lib/hooks/use-new-message'
import { ChatPanel } from './chat-panel'
import { useChat, type Message, CreateMessage } from 'ai/react'
import toast from 'react-hot-toast'
import { ChatRequestOptions } from 'ai'

export default function MbChat({
  id,
  initialMessages,
  className,
  bot
}: MBChatProps) {
  const { setNewMessage } = useNewMessage()
  const { messages, reload, stop, input, setInput } = useChat({
    initialMessages,
    id,
    body: {
      id
    },
    onResponse(response) {
      if (response.status === 401) {
        toast.error(response.statusText)
      }
    },
    onFinish() {
      console.log(messages)
      // router.push(`/chat/${id}`, { shallow: true, scroll: false })
      // router.refresh()
    }
  })

  const appendToNewChat = async (
    userMessage: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    await setNewMessage({ message: userMessage.content, bot })

    return null
  }
  return (
    <ChatPanel
      id={id}
      isLoading={false}
      stop={stop}
      append={appendToNewChat}
      reload={reload}
      messages={messages}
      input={input}
      setInput={setInput}
    />
  )
}

export interface MBChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  bot: string
}
