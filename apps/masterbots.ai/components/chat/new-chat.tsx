'use client'

import { ChatPanel } from './chat-panel'
import { useChat, type Message, CreateMessage } from 'ai/react'
import toast from 'react-hot-toast'
import { ChatRequestOptions } from 'ai'
import { Chatbot } from 'mb-genql'
import { useRouter } from 'next/navigation'
import { createThread, saveNewMessage } from '@/services/hasura'
import { useSession } from 'next-auth/react'
import { useModel } from '@/lib/hooks/use-model'

export default function NewChat({
  id,
  initialMessages,
  chatbot,
  scrollToBottom
}: NewChatProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { selectedModel, clientType } = useModel()
  const { messages, reload, stop, input, setInput, append } = useChat({
    initialMessages,
    id,
    body: {
      id,
      model: selectedModel,
      clientType
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
