import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { AiClientType, JSONResponseStream } from '@/types/types'
import { ChatCompletionMessageParam } from 'openai/resources'
import {
  convertToCoreMessages,
  setStreamerPayload
} from '@/lib/helpers/ai-helpers'
import { createAnthropic } from '@ai-sdk/anthropic'

//* this function is used to create a client for the OpenAI API
const initializeOpenAI = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict'
})

const initializeAnthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

//* Perplexity API uses openai-sdk with compatible mode and a different base URL
export async function initializePerplexity(apiKey: string) {
  if (!apiKey) {
    throw new Error(
      'PERPLEXITY_API_KEY is not defined in environment variables'
    )
  }
  return createOpenAI({
    apiKey,
    baseURL: 'https://api.perplexity.ai',
    compatibility: 'compatible'
  })
}

//* Create a response stream based on the client model type

export async function createResponseStream(
  clientType: AiClientType,
  json: JSONResponseStream,
  req?: Request
) {
  const { model, messages: rawMessages, previewToken } = json
  const messages = setStreamerPayload(clientType, rawMessages)

  try {
    let responseStream: ReadableStream

    switch (clientType) {
      case 'OpenAI': {
        const openaiModel = initializeOpenAI(model)
        const coreMessages = convertToCoreMessages(
          messages as ChatCompletionMessageParam[]
        )
        const response = await streamText({
          model: openaiModel,
          messages: coreMessages,
          temperature: 0.3
        })
        responseStream = response.toDataStreamResponse().body as ReadableStream
        break
      }
      case 'Anthropic': {
        const anthropicModel = initializeAnthropic(model, {
          cacheControl: true
        })
        const coreMessages = convertToCoreMessages(
          messages as ChatCompletionMessageParam[]
        )
        const response = await streamText({
          model: anthropicModel,
          messages: coreMessages,
          temperature: 0.3,
          maxTokens: 300
        })
        responseStream = response.toDataStreamResponse().body as ReadableStream
        break
      }
      case 'Perplexity': {
        const perplexity = await initializePerplexity(
          previewToken || (process.env.PERPLEXITY_API_KEY as string)
        )
        const perplexityModel = perplexity(model)
        const coreMessages = convertToCoreMessages(
          messages as ChatCompletionMessageParam[]
        )
        const response = await streamText({
          model: perplexityModel,
          messages: coreMessages,
          temperature: 0.3,
          maxTokens: 1000
        })
        responseStream = response.toDataStreamResponse().body as ReadableStream
        break
      }
      default:
        throw new Error('Unsupported client type')
    }

    return new Response(responseStream, {
      headers: { 'Content-Type': 'text/event-stream' }
    })
  } catch (error) {
    console.error('Error in createResponseStream:', error)
    throw error
  }
}
