import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import { extractBetweenMarkers } from '@/lib/utils'
import type * as AI from 'ai'
import type { Message, Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'

export interface MessagePair {
  userMessage: AI.Message
  chatGptMessage: AI.Message[]
}

export function convertMessage(message: Message) {
  return {
    id: message.messageId,
    content: message.content,
    createAt: message.createdAt,
    role: message.role,
  } as AI.Message
}

export function getAllUserMessagesAsStringArray(allMessages: Message[] | AI.Message[]) {
  const userMessages = allMessages.filter((m) => m.role === 'user')
  const cleanMessages = userMessages.map((m) =>
    extractBetweenMarkers(
      cleanPrompt(m.content),
      // 'OK, so following the same pattern, how would you answer the question:',
      // 'First, think about the following questions and requests: [',
      'Here are a list of questions that may be relevant for you to understand my chain of thoughts: [',
    ),
  )
  // Making sure each array item is a string and it is unique
  const uniqueCleanMessages = Array.from(new Set(cleanMessages.map(String)))

  return uniqueCleanMessages.map((msg) => `"${msg}"`).join(', ')
}

export function getThreadLink({
  chat = false,
  thread,
}: {
  chat?: boolean
  thread: Thread
}) {
  return chat
    ? `/c/${toSlug(thread.chatbot.name)}/${thread.threadId}`
    : `/${toSlug(thread.chatbot.categories[0]?.category.name)}/${thread.threadId}`
}
