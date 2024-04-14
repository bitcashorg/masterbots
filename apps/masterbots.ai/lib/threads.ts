import type * as AI from 'ai'
import { Message, Thread } from '@repo/mb-genql'
import { type Message as AIMessage } from 'ai/react'
import { extractBetweenMarkers } from './utils'
import { toSlug } from './url'

export function createMessagePairs(messages: Message[] | AIMessage[]) {
  const messagePairs: MessagePair[] = []

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i]

    if (message.role === 'user') {
      const userMessage = message
      const chatGptMessages = []
      for (let j = i + 1; j < messages.length; j++) {
        const chatGptMessage = findNextAssistantMessage(messages, j)
        if (!chatGptMessage) {
          break
        } else {
          chatGptMessages.push(chatGptMessage)
          continue
        }
      }
      messagePairs.push({
        userMessage,
        chatGptMessage: chatGptMessages
      })
    }
  }

  return messagePairs
}

const findNextAssistantMessage = (
  messages: Message[] | AIMessage[],
  startIndex: number
) => {
  if (messages[startIndex].role === 'assistant') {
    return {
      ...messages[startIndex],
      content: cleanPrompt(messages[startIndex].content)
    }
  }
  return null
}

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

export function getThreadLink({chat=false, thread}:{chat?:boolean, thread: Thread}){
 return chat ? `/c/${toSlug(thread.chatbot.name)}/${thread.threadId}` : `/${toSlug(thread.chatbot.categories[0]?.category.name)}/${thread.threadId}`
}