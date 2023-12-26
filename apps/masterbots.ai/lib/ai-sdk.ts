import { Message as AiSdkMessage } from 'ai/react'

import { Message } from 'mb-genql'

export function mbMessageToAiSdkMessage(m: Message) {
  return {
    id: m.messageId.toString(),
    createdAt: m.createdAt,
    content: m.content,
    role: m.type
  } as AiSdkMessage
}
