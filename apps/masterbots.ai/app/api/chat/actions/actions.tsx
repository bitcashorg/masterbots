'use server'

import { setStreamerPayload } from '@/lib/ai-helpers'
import { AiClientType, JSONResponseStream } from '@/lib/types'
import Anthropic from '@anthropic-ai/sdk'
import {
  ImageBlockParam,
  MessageParam,
  TextBlockParam
} from '@anthropic-ai/sdk/resources'
import { AnthropicStream, OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import {
  ChatCompletionContentPart,
  ChatCompletionMessageParam
} from 'openai/resources'

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

//* Extract string content from various response types
function extractStringContent(
  content:
    | string
    | null
    | ChatCompletionContentPart[]
    | (TextBlockParam | ImageBlockParam)[]
): string {
  if (content === null) {
    return ''
  }
  if (typeof content === 'string') {
    return content
  } else if (Array.isArray(content)) {
    return content
      .map(item => {
        if (typeof item === 'string') {
          return item
        } else if ('text' in item) {
          return item.text
        } else if ('content' in item && typeof item.content === 'string') {
          return item.content
        }
        return ''
      })
      .join(' ')
      .trim()
  }
  return ''
}

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
  let messages = setStreamerPayload(clientType, rawMessages)

  //* Checks if this is a new thread (first message)
  if (messages.length === 1 && messages[0].role === 'user') {
    const initialMessage = messages[0].content

    const titleImprovementPrompt = `
      Improve the following text by fixing any spelling errors and improving punctuation.
      Keep the essence and length of the text intact, making it more readable and professional.
      Return only the improved text without any additional explanation.

      Original text: "${initialMessage}"

      Improved text:
    `

    let improvedTitle: string = ''

    //* Improves the first message to serve as a title
    try {
      switch (clientType) {
        case 'OpenAI': {
          const openai = await initializeOpenAI(
            process.env.OPENAI_API_KEY as string
          )
          if (previewToken) openai.apiKey = previewToken

          const titleResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: titleImprovementPrompt }],
            temperature: 0.3,
            max_tokens: 60,
            stream: false
          })
          improvedTitle = extractStringContent(
            titleResponse.choices[0]?.message?.content ?? null
          )
          break
        }
        case 'Anthropic': {
          const anthropic = await initializeAnthropic(
            process.env.ANTHROPIC_API_KEY as string
          )
          if (previewToken) anthropic.apiKey = previewToken

          const titleResponse = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            messages: [{ role: 'user', content: titleImprovementPrompt }],
            max_tokens: 60,
            temperature: 0.3
          })
          improvedTitle = extractStringContent(titleResponse.content[0].text)
          break
        }
        case 'Perplexity': {
          const perplexity = await initializePerplexity(
            process.env.PERPLEXITY_API_KEY as string
          )
          if (previewToken) perplexity.apiKey = previewToken

          const titleResponse = await perplexity.chat.completions.create({
            model: 'sonar-small-chat',
            messages: [{ role: 'user', content: titleImprovementPrompt }],
            max_tokens: 60,
            temperature: 0.3
          })
          improvedTitle = extractStringContent(
            titleResponse.choices[0]?.message?.content ?? null
          )
          break
        }
        default: {
          throw new Error('Unsupported client model type')
        }
      }
    } catch (error) {
      console.error('Error improving title:', error)
      improvedTitle = extractStringContent(initialMessage)
    }

    //* Updates the first message with the improved title
    messages[0].content = improvedTitle || extractStringContent(initialMessage)
  }

  let responseStream: ReadableStream

  //* Process the main chat request
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
