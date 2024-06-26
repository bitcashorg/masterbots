'use server'

import { setStreamerPayload } from '@/lib/ai-helpers'
import { AiClientType, JSONResponseStream } from '@/lib/types'
import Anthropic from '@anthropic-ai/sdk'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'

/**
 * DEV notes for actions.tsx:
 * This module initializes clients for various AI services (OpenAI, Anthropic, Perplexity)
 * and handles creating response streams for AI interactions based on the client type.
 *
 * Functions:
 * - initializeOpenAI(apiKey): Initializes an OpenAI client with a given API key.
 * - initializeAnthropic(apiKey): Initializes an Anthropic client with a given API key.
 * - initializePerplexity(apiKey): Initializes a Perplexity client with a given API key.
 * - createResponseStream(clientType, json, req): Creates a response stream based on the AI client type.
 *   Each AI service might use a different approach to streaming responses based on their API and capabilities.
 *   This function abstracts those differences providing a uniform API for the server.
 *
 * @param {string} apiKey - The API key for accessing AI services.
 * @returns {OpenAI | Anthropic | OpenAI} An instance of the model client.
 * @throws {Error} If the model or API client type is not supported.
 * @param {string} clientType - The type of AI client to create a response stream for.
 * @param {any} json - The JSON object from the request, expected to contain model, messages, and optionally a previewToken.
 * @param {Request} [req] - The request object, used optionally for some AI clients like WordWare.
 *
 * setStreamerPayload - Designed to modify the structure of the messages payload based on the type of AI client being used and the requirements of the API.
 */

// ? OpenAI, Anthropic, and Perplexity use the same response format
// TODO: Analyze improvements to the response stream, to update MB DB at onCompletion

export async function initializeOpenAI(apiKey: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables')
  }
  return new OpenAI({ apiKey })
}

export async function initializeAnthropic(apiKey: string) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not defined in environment variables')
  }
  return new Anthropic({ apiKey })
}

export async function initializePerplexity(apiKey: string) {
  if (!process.env.PERPLEXITY_API_KEY) {
    throw new Error(
      'PERPLEXITY_API_KEY is not defined in environment variables'
    )
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.perplexity.ai'
  })
}

export async function createResponseStream(
  clientType: AiClientType,
  json: JSONResponseStream,
  req?: Request
) {
  const { model, messages: rawMessages, previewToken } = json
  const messages = setStreamerPayload(clientType, rawMessages)
  let responseStream: ReadableStream

  switch (clientType) {
    case 'OpenAI': {
      const openai = await initializeOpenAI(
        process.env.OPENAI_API_KEY as string
      )

      if (previewToken) openai.apiKey = previewToken

      const openAiRes = await openai.chat.completions.create({
        model,
        messages: messages as ChatCompletionMessageParam[],
        temperature: 0.7,
        stream: true
      })
      responseStream = OpenAIStream(openAiRes)
      break
    }
    case 'Anthropic': {
      const anthropic = await initializeAnthropic(
        process.env.ANTHROPIC_API_KEY as string
      )

      if (previewToken) anthropic.apiKey = previewToken

      const anthropicRes = await anthropic.messages.create({
        model,
        messages: messages as MessageParam[],
        stream: true,
        max_tokens: 300
      })
      responseStream = AnthropicStream(anthropicRes)
      break
    }
    case 'Perplexity': {
      const perplexity = await initializePerplexity(
        process.env.PERPLEXITY_API_KEY as string
      )

      if (previewToken) perplexity.apiKey = previewToken

      const perplexityRes = await perplexity.chat.completions.create({
        model,
        messages: messages as ChatCompletionMessageParam[],
        stream: true,
        max_tokens: 1000,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 1
      })
      responseStream = OpenAIStream(perplexityRes)
      break
    }
    default: {
      throw new Error('Unsupported client model type')
    }
  }

  return new StreamingTextResponse(responseStream)
}
