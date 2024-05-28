'use client'

import { createThread, saveNewMessage } from '@/services/hasura'
import { ChatRequestOptions } from 'ai'
import { CreateMessage, useChat, type Message } from 'ai/react'
import { Chatbot } from 'mb-genql'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ChatPanel } from './chat-panel'

export default function NewChat({
  id,
  initialMessages,
  chatbot,
  scrollToBottom
}: NewChatProps) {
  const router = useRouter()
  const { data: session } = useSession()
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
      jwt: session!.user?.hasuraJwt,
      userId: session!.user.id,
      isPublic: chatbot?.name !== 'BlankBot'
    })

    // we do not await to make transition to chat url faster
    append(userMessage)
    saveNewMessage({
      role: 'user',
      threadId,
      content: userMessage.content,
      jwt: session!.user?.hasuraJwt
    })

    router.push(`/${chatbot.name.trim().toLowerCase()}/${threadId}`, {
      // shallow: true,
      scroll: false
    })
    router.refresh()
    return null
  }

  return (
    <ChatPanel
      scrollToBottom={scrollToBottom}
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
      placeholder={`Start New Chat with ${chatbot.name}`}
    />
  )
}

export interface NewChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id: string
  chatbot: Chatbot
  scrollToBottom: () => void
}
