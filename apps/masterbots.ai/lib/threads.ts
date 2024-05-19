import type * as AI from 'ai'
import { objectToCamel } from 'ts-case-convert'
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
  thread
}: {
  chat?: boolean
  thread: MB.ThreadFull
}) {
  return chat
    ? `/c/${toSlug(thread.chatbot.name)}/${thread.threadId}`
    : `/${toSlug(thread.chatbot.categories[0].name)}/${thread.threadId}}`
}

export function getFirstMessages(messages: MessageData[]) {
  // console.log('getFirstMessages', messages.length)
  // get question and answer
  const firstAssistantMessage = objectToCamel(
    messages.find(msg => msg.role === 'assistant')
  ) as unknown as AI.Message
  const firstUserMessage = objectToCamel(
    messages.find(msg => msg.role === 'user')
  ) as unknown as AI.Message

  return {
    firstUserMessage,
    firstAssistantMessage
  }
}

// TODO: move to mb.types
// this is the only message data we want to query from the server
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
