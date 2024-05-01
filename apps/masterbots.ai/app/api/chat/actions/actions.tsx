'use server'

import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { OpenAIStream, AnthropicStream } from 'ai'
import { AIModels } from './models'
import { nanoid } from '@/lib/utils'

/** DEV notes for actions.tsx:
 * Initializes an OpenAI | Anthropic | Perplexity client with a given API key.
 * @param {string} apiKey - The API key for accessing IA services.
 * @returns {OpenAI or Anthropic } An instance of the model client.
 * validateModel - Validates the model specified.
 * @throws {Error} If the model is not supported.
 * createResponseStream - Creates a response stream based on the client type.
 * @param {string} clientType - The type of client to create a response stream for.
 * @param {any} response - The response object from the client.
 * @param {any} json - The JSON object from the request.
 * @param {any[]} messages - The messages from the request.
 * createPayload - Creates a payload object from the JSON, messages, and completion.
 */

export function initializeOpenAI(apiKey: string): OpenAI {
  return new OpenAI({ apiKey })
}

export function initializeAnthropic(apiKey: string): Anthropic {
  return new Anthropic({ apiKey })
}

export function initializePerplexity(apiKey: string): OpenAI {
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.perplexity.ai'
  })
}

export function validateModel(model: AIModels) {
  if (!Object.values(AIModels).includes(model)) {
    throw new Error('Unsupported model specified')
  }
}

export function createResponseStream(
  clientType: 'OpenAI' | 'Anthropic' | 'Perplexity' | 'WordWare',
  response: any, //! Improve type after testing with our models
  json: any, //! Improve type after testing with our models
  messages: any[] //! Improve type after testing with our models
) {
  switch (clientType) {
    case 'OpenAI':
      return OpenAIStream(response, {
        async onCompletion(completion: any) {
          const payload = createPayload(json, messages, completion)
          // Implement what to do with the payload, e.g., logging or database storage
        }
      })
    case 'Anthropic':
      return AnthropicStream(response)
    case 'Perplexity':
      return OpenAIStream(response) // Perplexity uses the same response format as OpenAI
    default:
      throw new Error('Unsupported client model type')
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
