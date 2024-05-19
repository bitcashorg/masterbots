import type * as AI from 'ai'
import { MB } from '@repo/supabase'
import { toSlug } from './url-params'

export function createMessagePairs(messages: AI.Message[]) {
  const messagePairs: MessagePair[] = []

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i]

    if (message.role === 'user') {
      const userMessage = message
      const chatGptMessages: AI.Message[] = []
      for (let j = i + 1; j < messages.length; j++) {
        const chatGptMessage = findNextAssistantMessage(messages, j)
        if (!chatGptMessage) {
          break
        } else {
          chatGptMessages.push(chatGptMessage)
          continue
        }
      }
      // messagePairs.push({
      //   userMessage,
      //   chatGptMessage: []  //chatGptMessages
      // })
    }
  }

  return messagePairs
}

const findNextAssistantMessage = (
  messages: AI.Message[],
  startIndex: number
) => {
  if (messages[startIndex].role === 'assistant') {
    return {
      ...messages[startIndex],
      content: cleanPrompt(messages[startIndex].content)
    } as AI.Message
  }
  return null
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
  if (param)
    return `/${toSlug(thread.chatbot.categories[0].name)}?threadId=${thread.threadId}}`
  return chat
    ? `/c/${toSlug(thread.chatbot.name)}/${thread.threadId}`
    : `/${toSlug(thread.chatbot.categories[0].name)}/${thread.threadId}}`
}

// TODO: move to mb.types
interface MessageData {
  id: string
  content: string
  role: string
  createdAt: string
}

export interface MessagePair {
  userMessage: AI.Message
  chatGptMessage: AI.Message
}
