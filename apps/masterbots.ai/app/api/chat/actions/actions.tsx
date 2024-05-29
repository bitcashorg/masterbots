'use server'

import {
  createWordWareResponseStream,
  initializeWordWare,
  stringToStream
} from '@/app/api/chat/actions/wordwareActions'
import { createPayload } from '@/lib/ai'
import Anthropic from '@anthropic-ai/sdk'
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

/**
 * DEV notes for actions.tsx:
 * This module initializes clients for various AI services (OpenAI, Anthropic, Perplexity, WordWare)
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
 * createPayload - Utility function that creates a structured payload from the JSON input, chat messages, and AI completion.
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

export async function createResponseStream(
  clientType: 'OpenAI' | 'Anthropic' | 'Perplexity' | 'WordWare',
  json: any, //! Improve type after testing with our models
  req?: Request
) {
  const { model, messages, previewToken } = json
  let responseStream: ReadableStream

  // ? OpenAI, Anthropic, and Perplexity use the same response format
  // ? WordWare uses a different response format
  // TODO: Implement the response stream for WordWare (streamText) if applicable
  switch (clientType) {
    case 'OpenAI':
      const openai = initializeOpenAI(process.env.OPENAI_API_KEY as string)

      if (previewToken) openai.apiKey = previewToken

      const openAiRes = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        stream: true
      })
      responseStream = OpenAIStream(openAiRes, {
        async onCompletion(completion: any) {
          const payload = createPayload(json, messages, completion)
          // Implement what to do with the payload, e.g., logging or database storage
        }
      })
      break
    case 'Anthropic':
      const anthropic = initializeAnthropic(
        process.env.ANTHROPIC_API_KEY as string
      )

      if (previewToken) anthropic.apiKey = previewToken

      const anthropicRes = await anthropic.messages.create({
        model,
        messages,
        max_tokens: 300,
        stream: true
      })
      responseStream = AnthropicStream(anthropicRes)
      break
    case 'Perplexity':
      const perplexity = initializePerplexity(
        process.env.PERPLEXITY_API_KEY as string
      )

      if (previewToken) perplexity.apiKey = previewToken

      const perplexityRes = await perplexity.chat.completions.create({
        model,
        messages,
        stream: true,
        max_tokens: 1000,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 1
      })
      responseStream = OpenAIStream(perplexityRes) // Perplexity uses the same response format as OpenAI
      break
    case 'WordWare':
      // Implement WordWare response stream
      // return handleWordWareRequest(req as Request)

      const wordware = initializeWordWare(
        process.env.WORDWARE_API_KEY as string
      )
      // ? Optionally override the API key with a preview token if provided
      if (previewToken) wordware.apiKey = previewToken

      // * YOUR_PROMPT_ID is the ID of the prompt you want to run
      const reader = await wordware.runPrompt(
        '8ed63d1d-5ccb-4059-897d-d63d3c54cd85',
        { messages }
      )

      if (!reader) {
        throw new Error('Failed to obtain reader from response.')
      }

      const output = await createWordWareResponseStream(reader)
      responseStream = stringToStream(output)
      break
    default:
      throw new Error('Unsupported client model type')
  }

  return new StreamingTextResponse(responseStream)
}
