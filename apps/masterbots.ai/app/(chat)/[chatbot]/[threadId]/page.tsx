import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Chat } from '@/components/chat'
import { getThread } from '@/services/db'
import { nanoid } from '@/lib/utils'
import { Message } from 'ai/react'

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()
  const thread = await getThread({ threadId: params.threadId })

  //TODO: handle threadId not found

  if (!session) redirect(`/sign-in?next=/${params.threadId}/${params.threadId}`)

  // format all chatbot prompts as chatgpt 'system' messages
  const chatbotSystemPrompts: Message[] = thread.chatbot.prompts.map(
    ({ prompt }) => ({
      id: prompt.promptId.toString(),
      role: 'system',
      content: prompt.content,
      createdAt: new Date()
    })
  )

  // format all user prompts and chatgpt 'assistant' messages
  const userAndAssistantMessages: Message[] = thread.messages.map(m => ({
    id: m.messageId,
    role: m.role as Message['role'],
    content: m.content,
    createdAt: m.createdAt
  }))

  // concatenate all message to pass it to chat component
  const initialMessages: Message[] = chatbotSystemPrompts.concat(
    userAndAssistantMessages
  )

  // we always start a new openai chat that why id=nanoid()
  // and we pass our system prompts along with assistant and user messages from our db.
  return (
    <Chat
      id={nanoid()}
      initialMessages={initialMessages}
      chatbot={thread.chatbot}
    />
  )
}

export interface ChatPageProps {
  params: {
    threadId: number
    chatbot: string
  }
}
