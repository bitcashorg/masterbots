import { AIModels } from '@/app/api/chat/actions/models'
import { AiClientType } from '@/lib/types'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import { nanoid } from 'nanoid'
import { ChatCompletionMessageParam } from 'openai/resources'

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

/** Create a payload to create a new data row on DB */
export function createPayload(
  json: { id: string },
  messages: { content: string }[],
  completion: any
) {
  // TODO: Update this function to use the new payload structure
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

export function setStreamerPayload(model: AiClientType, payload: ChatCompletionMessageParam[]) {
  switch (model) {
    case 'WordWare':
      // TODO: create WordWare payload
      return payload
    case 'Anthropic':
      return payload.map((message, index) => ({
        role: !index
          ? message.role.replace('system', 'user')
          : message.role.replace('system', 'assistant'),
        content: message.content
      } as MessageParam))
    case 'OpenAI':
    case 'Perplexity':
    default:
      return payload
  }
}
