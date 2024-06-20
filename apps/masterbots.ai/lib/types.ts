import { type Message } from 'ai'
import { ChatCompletionMessageParam } from 'openai/resources'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>

export type JSONResponseStream = {
  id: string
  model: string
  messages: ChatCompletionMessageParam[]
  previewToken: string
}

export type AiClientType = 'OpenAI' | 'Anthropic' | 'Perplexity' | 'WordWare'

