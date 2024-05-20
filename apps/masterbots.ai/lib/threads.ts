import type * as AI from 'ai'
import { MB } from '@repo/supabase'
import { toSlug } from './url-params'
import { extractBetweenMarkers } from '@/lib/utils'

export function createMessagePairs(messages: AI.Message[]): MB.MessagePair[] {
  const messagePairs: MB.MessagePair[] = []

  for (let i = 0; i < messages.length; i++) {
    const userMessage = messages[i]

    if (userMessage.role === 'user') {
      let assistantMessage: AI.Message | null = null

      for (let j = i + 1; j < messages.length; j++) {
        if (messages[j].role === 'assistant') {
          assistantMessage = messages[j]
          i = j // Move the outer loop index to the position after the assistant message
          break // Break the inner loop to continue with the next user message
        }
      }

      messagePairs.push({
        question: userMessage as AI.Message & { role: 'user' },
        answer: assistantMessage as (AI.Message & { role: 'assistant' }) | null
      })
    }
  }

  return messagePairs
}

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
  userMessage: MB.Message | AI.Message
  chatGptMessage: MB.Message[]
}

export function convertMessage(message: MB.Message) {
  return {
    id: message.messageId,
    content: message.content,
    createAt: message.createdAt,
    role: message.role
  } as AI.Message
}

export function getAllUserMessagesAsStringArray(
  allMessages: MB.Message[] | AI.Message[]
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
  thread: MB.Thread
}) {
  return chat
    ? `/c/${toSlug(thread.chatbot.name)}/${thread.threadId}`
    : `/${toSlug(thread.chatbot.categories[0]?.category.name)}/${thread.threadId}}`
}
