import { AIModels } from '@/app/api/chat/models/models'
import { examplesSchema, languageGammarSchema, metadataSchema, toolSchema } from '@/lib/helpers/ai-schemas'
import type { AiClientType, CleanPromptResult } from '@/types/types'
import type { StreamEntry } from '@/types/wordware-flows.types'
import type Anthropic from '@anthropic-ai/sdk'
import { type CoreMessage, generateId } from 'ai'
import type OpenAI from 'openai'

// * This function gets the model client type
export function getModelClientType(model: AIModels) {
  switch (model) {
    case AIModels.GPT4:
    case AIModels.Default:
      return 'OpenAI'
    case AIModels.Claude3:
      return 'Anthropic'
    case AIModels.llama3_7b:
    case AIModels.llama3_8b:
      return 'Perplexity'
    case AIModels.WordWare:
      return 'WordWare'
    case AIModels.DeepSeekR1:
      return 'DeepSeek' // Add this case
    default:
      throw new Error('Unsupported model specified')
  }
}

// * This function creates the payload for the AI response
export function createPayload(
  json: { id: string },
  messages: { content: string }[],
  completion: any,
) {
  const title = messages[0]?.content.substring(0, 100)
  const id = json.id ?? generateId()
  const createdAt = Date.now()
  const path = `/c/${id}`
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
        role: 'assistant',
      },
    ],
  }
}

// * This function sets the streamer payload
export function setStreamerPayload(
  model: AiClientType,
  payload: OpenAI.ChatCompletionMessageParam[],
): OpenAI.ChatCompletionMessageParam[] | Anthropic.MessageParam[] {
  switch (model) {
    case 'WordWare':
      return payload
    case 'Anthropic':
      return payload.map(
        (message, index) =>
          ({
            role: index
              ? message.role.replace('system', 'assistant')
              : message.role.replace('system', 'user'),
            content: message.content,
          }) as Anthropic.MessageParam,
      )
    case 'DeepSeek':
      return payload.map((message) => {
        if (message.role === 'assistant') {
          const content = message.content as string
          // Extract any existing reasoning if present
          const reasoningMatch = content.match(/<think>(.*?)<\/think>/s)
          const answerMatch = content.match(/<answer>(.*?)<\/answer>/s)

          return {
            ...message,
            // If content already has think/answer tags, use those, otherwise add reasoning field
            content: answerMatch ? content : `<answer>${content}</answer>`,
            reasoning: reasoningMatch
              ? reasoningMatch[1]
              : '<think>Analyzing the context and formulating a response...</think>',
          }
        }
        return message
      })
    default:
      return payload
  }
}

// * This function converts the messages to the core messages
export function convertToCoreMessages(
  messages: OpenAI.ChatCompletionMessageParam[],
): CoreMessage[] {
  return messages.map((msg) =>
    msg.role.match(/(user|system|assistant)/)
      ? {
          role: msg.role as 'user' | 'system' | 'assistant',
          content: msg.content as string,
        }
      : (() => {
          throw new Error(`Unsupported message role: ${msg.role}`)
        })(),
  )
}

// * This function initializes the WordWare model with describe call
export async function fetchPromptDetails(promptId: string) {
  if (!promptId) {
    throw new Error('Prompt ID is required')
  }

  const response = await fetch(`/api/wordware/describe?promptId=${promptId}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch prompt details')
  }

  return response.json()
}
export function cleanPrompt(str: string) {
  const markers = [
    '].  Now please answer the following question: ',
    ']. Now please answer the following question: ',
  ]
  let extracted = str

  const runExtraction = () => {
    let markerFound = false
    for (const marker of markers) {
      const index = extracted.indexOf(marker)
      if (index !== -1) {
        extracted = extracted.substring(index + marker.length)
        markerFound = true
      }
    }
    return markerFound
  }

  while (runExtraction()) {}

  return extracted
}

/**
 * @deprecated
 * This function cleans the text result from the AI to have a final object.
 * 
 * If you want to clean up a response string and have an object, use instead `processWithAiObject`
 */
export function cleanResult(result: string): CleanPromptResult {
  const cleanedResult = result
    .trim()
    .replace(/\{\n/g, '{')
    .replace(/\n\}/g, '}')
    .replace(/\\"/g, '"')
  // * Using template string to avoid parsing errors with ' and " special characters...
  return JSON.parse(`${cleanedResult} `)
}

export const processLogEntry = (logEntry: StreamEntry) => {
  const { type, value } = logEntry
  if (type === 'chunk' && value.label) {
    switch (value.label) {
      case 'blogPostSection':
        // Handle blogPostSection specific logic
        break
      case 'generatedImages':
        // Handle generatedImages specific logic
        break
      case 'Image generation':
        // Handle Image generation specific logic
        break
      case 'imageDescription':
        // Handle imageDescription specific logic
        break
      default:
        // Handle default case
        break
    }
  }
}

export const mbObjectSchema = {
  metadata: metadataSchema,
  examples: examplesSchema,
  tool: toolSchema,
  grammarLanguageImprover: languageGammarSchema,
}
