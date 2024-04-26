'use server'

import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { AIModels } from './models'
import { nanoid } from '@/lib/utils'
import { AnthropicStream, OpenAIStream } from 'ai'

export function initializeOpenAI(apiKey: string): OpenAI {
  return new OpenAI({ apiKey })
}

export function initializeAnthropic(apiKey: string): Anthropic {
  return new Anthropic({ apiKey })
}

export function validateModel(model: AIModels) {
  if (!Object.values(AIModels).includes(model)) {
    throw new Error('Unsupported model specified')
  }
}

export function createResponseStream(
  clientType: string,
  response: any, // TODO specifying a more detailed type than `any`
  json: any, // TODO specifying a more detailed type than `any`
  messages: any[] // TODO specifying a more detailed type for messages
) {
  if (clientType === 'OpenAI') {
    return OpenAIStream(response, {
      async onCompletion(completion: any) {
        // TODO specifying a more detailed type for completion
        const payload = createPayload(json, messages, completion)
        //?  Implement what to do with the payload, e.g., logging or database storage
      }
    })
  } else if (clientType === 'Anthropic') {
    return AnthropicStream(response)
  } else {
    throw new Error('Unsupported client type')
  }
}

export function createPayload(
  json: { id: string },
  messages: { content: string }[],
  completion: any
) {
  const title = messages[0]?.content.substring(0, 100)
  const id = json.id ?? nanoid()
  const createdAt = Date.now()
  const path = `/chat/${id}`
  return {
    id,
    title,
    userId: 1,
    createdAt,
    path,
    messages: [
      ...messages,
      {
        content: completion,
        role: 'assistant'
      }
    ]
  }
}
