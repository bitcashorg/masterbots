'use client'

import { ChatPanel } from './chat-panel'
import { useChat, type Message, CreateMessage } from 'ai/react'
import toast from 'react-hot-toast'
import { ChatRequestOptions } from 'ai'
import { Chatbot } from 'mb-genql'
import { useRouter } from 'next/navigation'
import { createThread, saveNewMessage } from '@/services/db'

export default function NewChat({
  id,
  initialMessages,
  chatbot
}: NewChatProps) {
  const router = useRouter()
  const { messages, reload, stop, input, setInput, append } = useChat({
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
      console.log('NEW CHAT FINISHED FIRST, NOT GOOD')
    }
  })

  const appendToNewChat = async (
    userMessage: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    const threadId = await createThread({
      threadId: id,
      chatbotId: chatbot.chatbotId
    })

    // we do not await to make transition to chat url faster
    append(userMessage)
    saveNewMessage({
      role: 'user',
      threadId,
      content: userMessage.content
    })

    router.push(`/${chatbot.name.trim().toLowerCase()}/${threadId}`, {
      shallow: true,
      scroll: false
    })
    router.refresh()
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
      chatbot={chatbot}
      showReload={false}
      placeholder={`Start a new chat with ${chatbot.name}`}
    />
  )
}

export interface NewChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id: string
  chatbot: Chatbot
}
