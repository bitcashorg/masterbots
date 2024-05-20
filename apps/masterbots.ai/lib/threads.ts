import type * as AI from 'ai'
import { MB } from '@repo/supabase'
import { toSlug } from './url-params'

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

export function getThreadLink({
  chat = false,
  param = false,
  thread
}: {
  chat?: boolean
  param?: boolean
  thread: MB.ThreadFull
}) {
  console.log('getThreadLink', thread.chatbot?.categories)
  if (param)
    return `/${toSlug(thread.chatbot.categories[0].name)}?threadId=${thread.threadId.trim()}`
  return chat
    ? `/c/${toSlug(thread.chatbot.name)}/${thread.threadId.trim()}`
    : `/${toSlug(thread.chatbot.categories[0].name)}/${thread.threadId.trim()}`
}
