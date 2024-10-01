import { AIModels } from '@/app/api/chat/models/models'
import { AiClientType } from '@/types/types'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import { generateId, CoreMessage } from 'ai'
import { ChatCompletionMessageParam } from 'openai/resources'

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
    default:
      throw new Error('Unsupported model specified')
  }
}

// * This function creates the payload for the AI response
export function createPayload(
  json: { id: string },
  messages: { content: string }[],
  completion: any
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
        role: 'assistant'
      }
    ]
  }
}

// * This function sets the streamer payload
export function setStreamerPayload(
  model: AiClientType,
  payload: ChatCompletionMessageParam[]
): ChatCompletionMessageParam[] | MessageParam[] {
  switch (model) {
    case 'WordWare':
      return payload
    case 'Anthropic':
      return payload.map(
        (message, index) =>
          ({
            role: !index
              ? message.role.replace('system', 'user')
              : message.role.replace('system', 'assistant'),
            content: message.content
          }) as MessageParam
      )
    case 'OpenAI':
    case 'Perplexity':
    default:
      return payload
  }
}

// * This function converts the messages to the core messages
export function convertToCoreMessages(
  messages: ChatCompletionMessageParam[]
): CoreMessage[] {
  return messages.map(msg =>
    msg.role.match(/(user|system|assistant)/)
      ? {
          role: msg.role as 'user' | 'system' | 'assistant',
          content: msg.content as string
        }
      : (() => {
          throw new Error(`Unsupported message role: ${msg.role}`)
        })()
  )
}

// * This function initializes the WordWare model with describe call
export async function fetchPromptDetails(promptId: string) {
  const API_KEY = process.env.NEXT_PUBLIC_WORDWARE_API_KEY;
  
  if (!API_KEY) {
    throw new Error('Wordware API key is not set');
  }

  const response = await fetch(`https://app.wordware.ai/api/prompt/${promptId}/describe`, {
    headers: { 'Authorization': `Bearer ${API_KEY}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch prompt details');
  }

  return response.json();
}
