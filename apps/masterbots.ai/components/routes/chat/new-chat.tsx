'use client'

/**
 * NewChat Component
 *
 * A streamlined component for initiating new chat conversations that:
 * - Creates new chat threads in the database
 * - Handles initial message submission
 * - Manages routing to the full chat interface
 *
 * Key Features:
 * - Creates thread record in database before transitioning
 * - Handles initial message persistence
 * - Provides immediate UI feedback with fast navigation
 * - Integrates with selected AI model configuration
 *
 * Flow:
 * 1. User submits first message
 * 2. Creates thread in database
 * 3. Saves initial message
 * 4. Redirects to full chat interface
 *
 * Note: This component is specifically for the new chat initialization flow,
 * with minimal features compared to the full Chat component
 */

import { ChatPanel } from '@/components/routes/chat/chat-panel'
import { useChat, type Message, type CreateMessage } from 'ai/react'
import type { ChatRequestOptions } from 'ai'
import type { Chatbot } from 'mb-genql'
import { useRouter } from 'next/navigation'
import { createThread, saveNewMessage } from '@/services/hasura'
import { useSession } from 'next-auth/react'
import { useModel } from '@/lib/hooks/use-model'
import { useSonner } from '@/lib/hooks/useSonner'

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
        customSonner({ type: 'error', text: response.statusText })
      }
    },
    onFinish() {
      console.log('NEW CHAT FINISHED FIRST, NOT GOOD')
    }
  })
  const { customSonner } = useSonner()

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
