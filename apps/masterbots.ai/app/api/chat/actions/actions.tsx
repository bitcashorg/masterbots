'use server'

import { AIModels } from '@/app/api/chat/models/models'
import {
  convertToCoreMessages,
  setStreamerPayload
} from '@/lib/helpers/ai-helpers'
import { AiClientType, JSONResponseStream } from '@/types/types'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { ChatCompletionMessageParam } from 'openai/resources'

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

// * This function improves the message using the AI
export async function improveMessage(
  content: string,
  clientType: AiClientType,
  model: string
): Promise<string> {
  const messageImprovementPrompt = createImprovementPrompt(content)

  try {
    const result = await processWithAI(
      messageImprovementPrompt,
      clientType,
      model
    )
    const cleanedResult = cleanResult(result)

    if (isInvalidResult(cleanedResult, content)) {
      console.warn(
        'AI did not modify the text or returned invalid result. Attempting with a more explicit prompt.'
      )
      return await retryImprovement(content, clientType, model)
    }

    return cleanedResult
  } catch (error) {
    return handleImprovementError(error, content, clientType, model)
  }
}

// * This function creates the prompt for the AI improvement process
function createImprovementPrompt(content: string): string {
  return `You are an expert polyglot, grammar, and spelling AI assistant skilled in understanding and correcting spelling and typing errors across multiple languages. Your task is to improve the following original text: ${content}

  Follow these steps:

  1. Identify the original language of the provided text.
  2. Correct clear typos in common words based on the intended meaning. If the input is ambiguous or appears to be intentionally unconventional, preserve it as is.
  3. Correct spelling errors and fix obvious grammar issues while keeping the original tone and meaning.
  4. Adjust punctuation where needed, but only when it's clearly incorrect or missing.
  5. Provide the final corrected text in the original language, ensuring it retains the intended meaning and structure.

  **Important Guidelines:**
  - For very short inputs or single words, avoid making changes unless the correction is absolutely certain.
  - Maintain the original structure and formatting of the input as much as possible.
  - Output only the corrected and improved text, without any additional explanations.
  - Provide both the original and translated question (if applicable).

  ## Example: ##

  {
    "language": "es",
    "originalText": "Q restaurant puede recomendar en zona de San Francisco, CA?",
    "improvedText": "¿Qué restaurante puedes recomendar en la zona de San Francisco, CA?",
    "translatedText": "What restaurant can you recommend in the area of San Francisco, CA?"
  }`
}

// * This function retries the AI improvement process if the first attempt fails
async function retryImprovement(
  content: string,
  clientType: AiClientType,
  model: string
): Promise<string> {
  const retryPrompt = `
    You are a highly skilled AI assistant specializing in grammar and spelling corrections. Your task is to thoroughly enhance the following text by:
    1. Correcting all spelling errors with precision
    2. Fixing any grammatical issues to ensure clarity and correctness
    3. Improving punctuation for better readability and flow
    4. Inferring the intended words in case of obvious typos

    It is crucial to maintain the original meaning and intent of the message. 
    Please return only the improved text without any explanations, additional content, or alterations to the original message structure.

    Original text: "${content}"
  `

  try {
    const result = await processWithAI(retryPrompt, clientType, model)
    const cleanedResult = cleanResult(result)

    if (isInvalidResult(cleanedResult, content)) {
      console.warn(
        'Retry failed to improve the text. Returning original content.'
      )
      return content
    }

    return cleanedResult
  } catch (error) {
    return handleImprovementError(error, content)
  }
}

// * This function process the AI response and return the cleaned result
async function processWithAI(
  prompt: string,
  clientType: AiClientType,
  model: string
): Promise<string> {
  try {
    const messages = [
      { role: 'user', content: prompt }
    ] as ChatCompletionMessageParam[]
    const processedMessages = setStreamerPayload(clientType, messages)

    const response = await createResponseStream(clientType, {
      model: AIModels.Default,
      messages: processedMessages
    } as any)

    if (!response.body) {
      throw new Error('Response body is null')
    }

    if (response.status !== 200) {
      const errorText = await response.text()
      throw new Error(
        `API responded with status ${response.status}: ${errorText}`
      )
    }

    const result = await readStreamResponse(response.body)
    return cleanResult(result)
  } catch (error) {
    console.error('Error in processWithAI:', error)
    throw error
  }
}

// * This function reads the AI response and return the cleaned result
async function readStreamResponse(body: ReadableStream): Promise<string> {
  const reader = body.getReader()
  let accumulatedResult = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = new TextDecoder().decode(value)
    accumulatedResult += chunk
  }

  let result = ''
  const parts = accumulatedResult.split('\n')
  for (const part of parts) {
    const match = part.match(/^0:"(.*)"$/)
    if (match) {
      result += match[1]
    }
  }

  return result
}

function cleanResult(result: string): string {
  console.log('Raw result:', result)

  try {
    return JSON.parse(result.trim())
  } catch (error) {
    console.error(error)
  }

  return result
    .trim() // First, trim leading and trailing whitespace
    .replace(/[\\\"\/]/g, '') // Remove backslashes and quotes
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .replace(/\s+([.,!?;:])(?!\.\.\.)/g, '$1') // Remove spaces before punctuation, except for ellipsis
    .replace(/\s*\.\s*\.\s*\./g, '...') // Clean up ellipsis
}

function isInvalidResult(result: string, originalContent: string): boolean {
  return (
    !result ||
    result.includes('Original message:') ||
    result.toLowerCase() === originalContent.toLowerCase()
  )
}

function handleImprovementError(
  error: any,
  originalContent: string,
  clientType?: AiClientType,
  model?: string
): string {
  console.error('Error in improvement process:', error)
  return originalContent
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
          temperature: 0.4
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
