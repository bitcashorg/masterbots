import { AIModels } from '@/app/api/chat/models/models'
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

export function setStreamerPayload(
  model: AiClientType,
  payload: ChatCompletionMessageParam[] | MessageParam[]
) {
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

export async function fetchPromptDescription(promptId: string): Promise<any> {
  if (!promptId) {
    throw new Error('Prompt ID is required')
  }

  const response = await fetch(`/api/wordware/describe?promptId=${promptId}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch prompt description')
  }

  return data
}

export async function runWordwarePrompt(
  promptId: string,
  inputs: any,
  p0: (chunk: any) => void
): Promise<string> {
  const response = await fetch(`/api/wordware/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ promptId, inputs })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to run prompt')
  }

  const reader = response.body?.getReader()
  const decoder = new TextDecoder('utf-8')
  let result = ''
  let readerDone = false

  try {
    while (!readerDone) {
      const { done, value } = await (reader?.read() as Promise<
        ReadableStreamReadResult<Uint8Array>
      >)
      readerDone = done
      if (value) {
        result += decoder.decode(value, { stream: true })
      }
    }
    result += decoder.decode()
  } finally {
    reader?.releaseLock()
  }

  console.log('Final Result:', result)
  return result
}
