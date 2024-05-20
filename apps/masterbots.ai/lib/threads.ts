import type * as AI from 'ai'
import { Message, Thread } from 'mb-genql'
import { extractBetweenMarkers } from './utils'
import { toSlug } from './url'




// From chat-message.tsx
export function cleanPrompt(str: string) {
  const marker = '].  Then answer this question:'
  const index = str.indexOf(marker)
  let extracted = ''

  if (index !== -1) {
    extracted = str.substring(index + marker.length)
  }
  // console.log('cleanPrompt', str, extracted, index)
  return extracted || str
}

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
    : `/${toSlug(thread.chatbot.categories[0]?.category.name)}/${thread.threadId}}`
}