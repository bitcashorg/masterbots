'use client'

import { useChat } from 'ai/react'
import type { CreateMessage, Message } from 'ai/react'
import toast from 'react-hot-toast'
import type { ChatRequestOptions } from 'ai'
import type { Chatbot } from '@repo/mb-genql'
import { useRouter } from 'next/navigation'
import { createThread, saveNewMessage } from '@/services/hasura'
import { useGlobalStore } from '@/hooks/use-global-store'
import { ChatPanel } from './chat-panel'

export default function NewChat({
  id,
  initialMessages,
  chatbot,
  scrollToBottom
}: NewChatProps) {
  const router = useRouter()
  const { hasuraJwt, user } = useGlobalStore()
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
      chatbotId: chatbot.chatbotId,
      jwt: hasuraJwt,
      userId: user.userId,
      isPublic: chatbot.name !== 'BlankBot'
    })

    // we do not await to make transition to chat url faster
    append(userMessage)
    saveNewMessage({
      role: 'user',
      threadId,
      content: userMessage.content,
      jwt: hasuraJwt
    })

    router.push(`/${chatbot.name.trim().toLowerCase()}/${threadId}`, {
      scroll: false
    })
    router.refresh()
    return null
  }

  return (
    <ChatPanel
      append={appendToNewChat}
      chatbot={chatbot}
      id={id}
      input={input}
      isLoading={false}
      messages={messages}
      placeholder={`Start New Chat with ${chatbot.name}`}
      reload={reload}
      scrollToBottom={scrollToBottom}
      setInput={setInput}
      showReload={false}
      stop={stop}
    />
  )
}

export interface NewChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id: string
  chatbot: Chatbot
  scrollToBottom: () => void
}
