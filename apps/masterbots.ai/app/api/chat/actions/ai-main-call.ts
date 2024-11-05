'use server'

import { AIModels } from '@/app/api/chat/models/models'
import {
  createChatbotMetadataPrompt,
  createImprovementPrompt,
  setDefaultPrompt,
} from '@/lib/constants/prompts'
import { convertToCoreMessages, setStreamerPayload } from '@/lib/helpers/ai-helpers'
import { aiTools } from '@/lib/helpers/ai-schemas'
import { fetchChatbotMetadata } from '@/services/hasura'
import type {
  AiClientType,
  ChatbotMetadataHeaders,
  CleanPromptResult,
  JSONResponseStream,
} from '@/types/types'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'
import type { Chatbot } from 'mb-genql'
import type { ChatCompletionMessageParam } from 'openai/resources'

//* this function is used to create a client for the OpenAI API
const initializeOpenAi = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
})

const initializeAnthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

//* Perplexity API uses openai-sdk with compatible mode and a different base URL
export async function initializePerplexity(apiKey: string) {
  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY is not defined in environment variables')
  }
  return await createOpenAI({
    apiKey,
    baseURL: 'https://api.perplexity.ai',
    compatibility: 'compatible',
  })
}

// * This function improves the message using the AI
export async function improveMessage(
  content: string,
  clientType: AiClientType,
  model: string,
): Promise<CleanPromptResult> {
  const messageImprovementPrompt = createImprovementPrompt(content)

  try {
    const result = await processWithAi(messageImprovementPrompt, clientType, model)
    const cleanedResult = cleanResult(result)

    if (
      isInvalidResult(cleanedResult.translatedText || cleanedResult.improvedText, content) &&
      cleanedResult.improved
    ) {
      console.warn(
        'AI did not modify the text or returned invalid result. Recursively executing improved prompt.',
      )
      return await improveMessage(content, clientType, model)
    }

    return cleanedResult
  } catch (error) {
    const originalText = handleImprovementError(error, content, clientType, model)
    return setDefaultPrompt(originalText)
  }
}

export async function subtractChatbotMetadataLabels(
  metadataHeaders: ChatbotMetadataHeaders,
  userPrompt: string,
  clientType: AiClientType,
) {
  const chatbotMetadata = await fetchChatbotMetadata(metadataHeaders)

  if (!chatbotMetadata) {
    console.error('Chatbot metadata not found. Generating response without them.')
    return setDefaultPrompt(userPrompt)
  }

  const prompt = createChatbotMetadataPrompt(metadataHeaders, chatbotMetadata, userPrompt)
  const response = await processWithAi(prompt, clientType, AIModels.Default)

  return cleanResult(response)
}

// * This function process the AI response and return the cleaned result
async function processWithAi(
  prompt: string,
  clientType: AiClientType,
  model: string,
): Promise<string> {
  try {
    const messages = [{ role: 'user', content: prompt }] as ChatCompletionMessageParam[]
    const processedMessages = setStreamerPayload(clientType, messages)

    const response = await createResponseStream(clientType, {
      model: AIModels.Default,
      messages: processedMessages,
    } as any)

    if (!response.body) {
      throw new Error('Response body is null')
    }

    if (response.status !== 200) {
      const errorText = await response.text()
      throw new Error(`API responded with status ${response.status}: ${errorText} `)
    }

    const result = await readStreamResponse(response.body)
    return result
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

function cleanResult(result: string): CleanPromptResult {
  const cleanedResult = result
    .trim()
    .replace(/\{\n/g, '{')
    .replace(/\n\}/g, '}')
    .replace(/\\"/g, '"')
  // * Using template string to avoid parsing errors with ' and " special characters...
  return JSON.parse(`${cleanedResult} `)
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
  model?: string,
): string {
  console.error('Error in improvement process:', error)
  return originalContent
}

//* Create a response stream based on the client model type
export async function createResponseStream(
  clientType: AiClientType,
  json: JSONResponseStream & { chatbot: Pick<Chatbot, 'categories' | 'chatbotId'> },
  req?: Request,
) {
  const { model, messages: rawMessages, previewToken, chatbot } = json
  const messages = setStreamerPayload(clientType, rawMessages)

  const tools: Partial<typeof aiTools> = {
    chatbotMetadataExamples: aiTools.chatbotMetadataExamples,
  }

  tools.webSearch = aiTools.webSearch
  // if (chatbot.categories.some((cat) => cat.categoryId === 1)) {
  // }

  try {
    let responseStream: ReadableStream

    switch (clientType) {
      case 'OpenAI': {
        const openaiModel = initializeOpenAi(model)
        const coreMessages = convertToCoreMessages(messages as ChatCompletionMessageParam[])
        const response = await streamText({
          model: openaiModel,
          messages: coreMessages,
          temperature: 0.4,
          tools,
          maxRetries: 2,
          maxToolRoundtrips: 4,
        })
        responseStream = response.toDataStreamResponse().body as ReadableStream
        break
      }
      case 'Anthropic': {
        const anthropicModel = initializeAnthropic(model, {
          cacheControl: true,
        })
        const coreMessages = convertToCoreMessages(messages as ChatCompletionMessageParam[])
        const response = await streamText({
          model: anthropicModel,
          messages: coreMessages,
          temperature: 0.3,
          maxTokens: 300,
          tools,
          maxRetries: 2,
          maxToolRoundtrips: 4,
        })
        responseStream = response.toDataStreamResponse().body as ReadableStream
        break
      }
      case 'Perplexity': {
        const perplexity = await initializePerplexity(
          previewToken || (process.env.PERPLEXITY_API_KEY as string),
        )
        const perplexityModel = perplexity(model)
        const coreMessages = convertToCoreMessages(messages as ChatCompletionMessageParam[])
        const response = await streamText({
          model: perplexityModel,
          messages: coreMessages,
          temperature: 0.3,
          maxTokens: 1000,
          tools,
          maxRetries: 2,
          maxToolRoundtrips: 4,
        })
        responseStream = response.toDataStreamResponse().body as ReadableStream
        break
      }
      default:
        throw new Error('Unsupported client type')
    }

    return new Response(responseStream, {
      headers: { 'Content-Type': 'text/event-stream' },
    })
  } catch (error) {
    console.error('Error in createResponseStream:', error)
    throw error
  }
}

// * This function retries the AI improvement process if the first attempt fails
// Keeping prompt for reference
// async function retryImprovement(
//   content: string,
//   clientType: AiClientType,
//   model: string,
// ): Promise<string> {
//   const retryPrompt = `
//     You are a highly skilled AI assistant specializing in grammar and spelling corrections. Your task is to thoroughly enhance the following text by:
//     1. Correcting all spelling errors with precision
//     2. Fixing any grammatical issues to ensure clarity and correctness
//     3. Improving punctuation for better readability and flow
//     4. Inferring the intended words in case of obvious typos

//     It is crucial to maintain the original meaning and intent of the message.
//     Please return only the improved text without any explanations, additional content, or alterations to the original message structure.

//     Original text: "${content}"
//   `;

//   try {
//     const result = await processWithAI(retryPrompt, clientType, model);
//     const cleanedResult = cleanResult(result);

//     if (isInvalidResult(cleanedResult, content)) {
//       console.warn(
//         "Retry failed to improve the text. Returning original content.",
//       );
//       return content;
//     }

//     return cleanedResult;
//   } catch (error) {
//     return handleImprovementError(error, content);
//   }
// }
