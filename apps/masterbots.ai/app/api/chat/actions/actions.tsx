'use server'

import { createWordWareResponseStream, initializeWordWare, stringToStream } from '@/app/api/chat/actions/wordwareActions'
import { createPayload } from '@/lib/ai'
import Anthropic from '@anthropic-ai/sdk'
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

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

export async function createResponseStream(
  clientType: 'OpenAI' | 'Anthropic' | 'Perplexity' | 'WordWare',
  // response: any, //! Improve type after testing with our models
  json: any, //! Improve type after testing with our models
  // messages: any[] //! Improve type after testing with our models
  req?: Request
) {
  const { model, messages, previewToken } = json
  switch (clientType) {
    case 'OpenAI':
      const openai = initializeOpenAI(process.env.OPENAI_API_KEY as string)

      if (previewToken) openai.apiKey = previewToken

      const openAiRes = await openai.chat.completions.create({
        model, messages, temperature: 0.7, stream: true
      })
      return OpenAIStream(openAiRes, {
        async onCompletion(completion: any) {
          const payload = createPayload(json, messages, completion)
          // Implement what to do with the payload, e.g., logging or database storage
        }
      })
    case 'Anthropic':
      const anthropic = initializeAnthropic(process.env.ANTHROPIC_API_KEY as string)

      if (previewToken) anthropic.apiKey = previewToken

      const anthropicRes = await anthropic.messages.create({
        model, messages, max_tokens: 300, stream: true
      })
      return AnthropicStream(anthropicRes)
    case 'Perplexity':
      const perplexity = initializePerplexity(process.env.PERPLEXITY_API_KEY as string)

      if (previewToken) perplexity.apiKey = previewToken

      const perplexityRes = await perplexity.chat.completions.create({
        model, messages, temperature: 0.7, stream: true
      })
      return OpenAIStream(perplexityRes) // Perplexity uses the same response format as OpenAI
    case 'WordWare':
      // Implement WordWare response stream
      // return handleWordWareRequest(req as Request)

      const wordware = initializeWordWare(process.env.WORDWARE_API_KEY as string)
      // ? Optionally override the API key with a preview token if provided
      if (previewToken) wordware.apiKey = previewToken

      // * YOUR_PROMPT_ID is the ID of the prompt you want to run
      const reader = await wordware.runPrompt('8ed63d1d-5ccb-4059-897d-d63d3c54cd85', { messages })

      if (!reader) {
        throw new Error('Failed to obtain reader from response.')
      }

      const output = await createWordWareResponseStream(reader)
      const responseStream = stringToStream(output)
      return new StreamingTextResponse(responseStream)
    default:
      throw new Error('Unsupported client model type')
  }
}
