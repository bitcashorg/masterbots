import { useChat } from 'ai/react'
import type { CreateMessage, Message } from 'ai/react'
import toast from 'react-hot-toast'
import type { ChatRequestOptions } from 'ai'
import type { Chatbot } from '@repo/mb-genql'
import { useRouter } from 'next/navigation'
import { createThread, saveNewMessage } from '@/services/hasura'
import { useGlobalStore } from '@/hooks/use-global-store'

export function useNewThread({
  id,
  initialMessages,
  isPublic = true,
  chatbot
}: UseNewThreadParams) {
  const router = useRouter()
  const { hasuraJwt, user } = useGlobalStore()

  // use this hooks to start a chat on the ai/react context
  const chat = useChat({
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

  const startNewThread = async (
    userMessage: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    if (!user?.userId) {
      alert('You must login to use chat!')
      return null
    }
    const threadId = await createThread({
      threadId: id,
      chatbotId: chatbot.chatbotId,
      jwt: hasuraJwt,
      userId: user.userId,
      isPublic: isPublic
    })

    // we do not await to make transition to chat url faster
    const response = chat.append(userMessage)
    saveNewMessage({
      role: 'user',
      threadId,
      content: userMessage.content,
      jwt: hasuraJwt
    })

    router.push(`/c/${chatbot.name.trim().toLowerCase()}/${threadId}`, {
      scroll: false
    })
    router.refresh()
    return response
  }

  return { ...chat, startNewThread }
}

export interface UseNewThreadParams {
  initialMessages?: Message[]
  id: string
  chatbot: Chatbot
  isPublic?: boolean
}
