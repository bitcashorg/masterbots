import { AIModels } from "@/app/api/chat/actions/models"
import { nanoid } from "nanoid"

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