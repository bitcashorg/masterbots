import { extractBetweenMarkers } from '@/lib/utils'
import type * as AI from 'ai'
import type { Message, Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'

export interface MessagePair {
  userMessage: Message | AI.Message
  chatGptMessage: Message[]
}

export function convertMessage(message: Message) {
  return {
    id: message.messageId,
    content: message.content,
    createAt: message.createdAt,
    role: message.role
  } as AI.Message
}

export function getAllUserMessagesAsStringArray(
  allMessages: Message[] | AI.Message[]
) {
  const userMessages = allMessages.filter(m => m.role === 'user')
  const cleanMessages = userMessages.map(m =>
    extractBetweenMarkers(m.content, 'Then answer this question:')
  )
  return cleanMessages.join(', ')
}

export function getThreadLink({
  chat = false,
  thread
}: {
  chat?: boolean
  thread: Thread
}) {
  return chat
    ? `/c/${toSlug(thread.chatbot.name)}/${thread.threadId}`
    : `/${toSlug(thread.chatbot.categories[0]?.category.name)}/${thread.threadId}`
}
