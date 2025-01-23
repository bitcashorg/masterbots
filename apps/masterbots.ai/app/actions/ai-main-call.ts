'use server'

import { AIModels } from '@/app/api/chat/models/models'
import {
  createChatbotMetadataPrompt,
  createImprovementPrompt,
  setDefaultPrompt,
} from '@/lib/constants/prompts'
import {
  cleanResult,
  convertToCoreMessages,
  mbObjectSchema,
  setStreamerPayload,
} from '@/lib/helpers/ai-helpers'
import { aiTools } from '@/lib/helpers/ai-schemas'
import { fetchChatbotMetadata } from '@/services/hasura'
import type {
  AiClientType,
  ChatbotMetadataHeaders,
  ClassifyQuestionParams,
  CleanPromptResult,
  JSONResponseStream,
} from '@/types/types'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import { streamObject, streamText } from 'ai'
import type OpenAI from 'openai'

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

export async function getChatbotMetadataLabels(
  metadataHeaders: ChatbotMetadataHeaders,
  userPrompt: string,
  clientType: AiClientType,
) {
  console.log('getting chatbot metadata')
  const chatbotMetadata = await fetchChatbotMetadata(metadataHeaders)
  console.log('got chatbot metadata')

  if (!chatbotMetadata) {
    console.error('Chatbot metadata not found. Generating response without them.')
    //todo: this will return something completely different than the main output
    return setDefaultPrompt(userPrompt)
  }

  const prompt = createChatbotMetadataPrompt(metadataHeaders, chatbotMetadata, userPrompt)
  //todo: add structured output
  //todo: verify the cats, subcats, and tags are valid ones
  // console.log('class sublcass etc prompt', prompt)

  const response = await classifyQuestion({ prompt, clientType, chatbotMetadata })

  response.domain = chatbotMetadata.domainName

  return response
}

// * This function process the AI response and return the cleaned result
export async function processWithAi(
  prompt: string,
  clientType: AiClientType,
  model: string,
): Promise<string> {
  try {
    const messages = [{ role: 'user', content: prompt }] as OpenAI.ChatCompletionMessageParam[]
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

export async function processWithAiObject(
  prompt: string,
  clientType: AiClientType,
  model: string,
): Promise<JSONResponseStream> {
  try {
    const messages = [{ role: 'user', content: prompt }] as OpenAI.ChatCompletionMessageParam[]

    const response = await createResponseStreamObject(mbObjectSchema.metadata, {
      model: AIModels.Default,
      messages,
    } as any)

    if (!response.body) {
      throw new Error('Response body is null')
    }

    if (response.status !== 200) {
      const errorText = await response.text()
      throw new Error(`API responded with status ${response.status}: ${errorText} `)
    }

    const result = await readStreamResponse(response.body)
    return JSON.parse(result)
  } catch (error) {
    console.error('Error in processWithAIObject:', error)
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

function isInvalidResult(result: string, originalContent: string): boolean {
  return !result || result.includes('Original message:') || result === originalContent
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
  json: JSONResponseStream,
  req?: Request,
) {
  const { model, messages: rawMessages, previewToken, webSearch } = json
  const messages = setStreamerPayload(clientType, rawMessages)

  const tools: Partial<typeof aiTools> = {
    // ? Temp disabling ICL as tool. Using direct ICL integration to main prompt instead. Might be enabled later.
    // chatbotMetadataExamples: aiTools.chatbotMetadataExamples
  }

  console.log('[SERVER] webSearch', webSearch)

  if (webSearch) tools.webSearch = aiTools.webSearch

  try {
    let response: ReturnType<typeof streamText>

    switch (clientType) {
      case 'OpenAI': {
        const openaiModel = initializeOpenAi(model)
        const coreMessages = convertToCoreMessages(messages as OpenAI.ChatCompletionMessageParam[])
        response = await streamText({
          model: openaiModel,
          messages: coreMessages,
          temperature: 0.4,
          tools,
          maxRetries: 2,
        })
        break
      }
      case 'Anthropic': {
        const anthropicModel = initializeAnthropic(model, {
          cacheControl: true,
        })
        const coreMessages = convertToCoreMessages(messages as OpenAI.ChatCompletionMessageParam[])
        response = await streamText({
          model: anthropicModel,
          messages: coreMessages,
          temperature: 0.3,
          maxTokens: 300,
          tools,
          maxRetries: 2,
        })
        break
      }
      case 'Perplexity': {
        const perplexity = await initializePerplexity(
          previewToken || (process.env.PERPLEXITY_API_KEY as string),
        )
        const perplexityModel = perplexity(model)
        const coreMessages = convertToCoreMessages(messages as OpenAI.ChatCompletionMessageParam[])
        response = await streamText({
          model: perplexityModel,
          messages: coreMessages,
          temperature: 0.3,
          maxTokens: 1000,
          tools,
          maxRetries: 2,
        })
        break
      }
      default:
        throw new Error('Unsupported client type')
    }

    const dataStreamResponse = response.toDataStreamResponse({
      getErrorMessage(error) {
        // * Here we can customize the error message and/or grab any special error to either retry, stop or activate another AI flow
        if (error instanceof Error) return error.message
        return 'Failed to process the request'
      },
    })
    const responseStream = dataStreamResponse.body as ReadableStream

    return new Response(responseStream, {
      headers: { 'Content-Type': 'text/event-stream' },
    })
  } catch (error) {
    console.error('Error in createResponseStream:', error)
    throw error
  }
}

export async function createResponseStreamObject(
  schema:
    | typeof mbObjectSchema.metadata
    | typeof mbObjectSchema.examples
    | typeof mbObjectSchema.tool,
  json: JSONResponseStream,
  req?: Request,
) {
  const { model, messages, previewToken, webSearch } = json

  const tools: Partial<typeof aiTools> = {
    // ? Temp disabling ICL as tool. Using direct ICL integration to main prompt instead. Might be enabled later.
    // chatbotMetadataExamples: aiTools.chatbotMetadataExamples
  }

  console.log('[SERVER] webSearch', webSearch)

  if (webSearch) tools.webSearch = aiTools.webSearch

  try {
    const openaiModel = initializeOpenAi(model)
    const { partialObjectStream } = await streamObject({
      model: openaiModel,
      // TODO: Fix different schemas for different tools
      schema: schema as typeof mbObjectSchema.metadata,
      output: 'object',
      prompt: `
      You are a top software development expert with extensive knowledge in the field of ${chatbotMetadata.domainName}.
      Your purpose is to analyze and understand questions to prepare them for classification.`,
    })

    // ? This validates the object stream before to return a object stream
    for await (const objectStream of partialObjectStream) {
      if (!objectStream) {
        throw new Error('Failed to process the request, object stream is null')
      }

      console.log('objectStream --> ', objectStream)
    }

    return new Response(partialObjectStream, {
      headers: { 'Content-Type': 'text/event-stream' },
    })
  } catch (error) {
    console.error('Error in createResponseStream:', error)
    throw error
  }
}

export async function classifyQuestion({
  prompt,
  clientType,
  chatbotMetadata,
  maxRetries = 3,
  retryCount = 0,
}: ClassifyQuestionParams): Promise<CleanPromptResult> {
  try {
    // TODO: remove cleanResponse and replace processWithAi with processWithAiObject, reason: streamObject returns the desired object...
    // const responseObj = await processWithAiObject(prompt, clientType, AIModels.Default)
    const response = await processWithAi(prompt, clientType, AIModels.Default)
    // TODO: remove cleanResponse, reason: streamObject returns the desired object...
    const cleanResponse = cleanResult(response)

    for (const tag of cleanResponse.tags) {
      if (!chatbotMetadata.tags.includes(tag)) {
        throw new Error(`Tag ${tag} not found in chatbot metadata`)
      }
    }

    if (!(cleanResponse.category in chatbotMetadata.categories)) {
      throw new Error(`Category ${cleanResponse.category} not found in chatbot metadata`)
    }
    if (!chatbotMetadata.categories[cleanResponse.category].includes(cleanResponse.subCategory)) {
      throw new Error(
        `Subcategory ${cleanResponse.subCategory} not found in chatbot metadata for category ${cleanResponse.category}`,
      )
    }

    console.log('class, subclass and tags are valid')

    return cleanResponse
  } catch (error) {
    console.error('Error in classifyQuestion:', error)
    if (retryCount >= maxRetries) {
      console.error(`Max retries reached. Returning original content after ${maxRetries} attempts.`)
      throw error
    }

    return classifyQuestion({
      prompt,
      clientType,
      chatbotMetadata,
      maxRetries,
      retryCount: retryCount + 1,
    })
  }
}
