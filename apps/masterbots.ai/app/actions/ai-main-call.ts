'use server'

import { AIModels } from '@/app/api/chat/models/models'
import { deepseek } from '@ai-sdk/deepseek'

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
  ChatbotMetadata,
  ChatbotMetadataClassification,
  ChatbotMetadataHeaders,
  ClassifyQuestionParams,
  CleanPromptResult,
  JSONResponseStream,
} from '@/types/types'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createOpenAI } from '@ai-sdk/openai'
import { streamObject, streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import type OpenAI from 'openai'

//* this function is used to create a client for the OpenAI API
const initializeOpenAi = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
})

const initializeDeepSeek = (apiKey: string) => {
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY is not defined in environment variables')
  }
  return deepseek
}

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

export async function getChatbotMetadata(
  metadataHeaders: ChatbotMetadataHeaders,
  userPrompt: string,
  clientType: AiClientType,
) {
  console.log('getting chatbot metadata, headers --> ', metadataHeaders)
  const chatbotMetadata = await fetchChatbotMetadata(metadataHeaders)
  console.log('got chatbot metadata', chatbotMetadata)

  if (!chatbotMetadata) {
    console.error('Chatbot metadata not found. Generating response without them.')
    return {
      domainName: '',
      categories: [],
      subcategories: [],
      tags: [],
    }
  }

  const prompt = createChatbotMetadataPrompt(chatbotMetadata, userPrompt)
  const response = await classifyQuestion({ prompt, clientType, chatbotMetadata })

  console.log('prompt, response --> ', prompt)
  console.log('classifyQuestion, response --> ', response)

  response.domainName = chatbotMetadata.domainName

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
  chatbotMetadata: ChatbotMetadata,
  schema = mbObjectSchema.metadata,
) {
  try {
    const response = await createResponseStreamObject(schema, {
      model: AIModels.Default,
      prompt,
      chatbotMetadata,
    } as any)

    // @ts-ignore
    const responseObject = response.curr

    // ! Experimental. Use when stable...
    // for await (const resObj of readStreamableValue(response)) {
    //   if (!resObj) {
    //     throw new Error('Failed to process the request, object stream is null')
    //   }

    //   responseObject = resObj
    // }

    if (!responseObject) {
      throw new Error('Failed to get response object')
    }

    console.log('result::processwithAiObject -->', responseObject)
    return responseObject
  } catch (error) {
    console.error('Error in processWithAIObject: ', error)
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
      case 'DeepSeek': {
        const deepseekModel = initializeDeepSeek(
          previewToken || (process.env.DEEPSEEK_API_KEY as string),
        )(model)

        const coreMessages = convertToCoreMessages(messages as OpenAI.ChatCompletionMessageParam[])
        response = await streamText({
          model: deepseekModel,
          messages: coreMessages,
          temperature: 0.3, // DeepSeek works well with lower temperature for reasoning
          maxTokens: 2000, // DeepSeek can handle longer contexts
          tools,
          maxRetries: 2,
        })
        break
      }
      default:
        throw new Error('Unsupported client type')
    }

    // @ts-ignore
    const dataStreamResponse = response.toDataStreamResponse({
      sendReasoning: clientType === 'DeepSeek', // Enable reasoning output for DeepSeek
      getErrorMessage(error) {
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
  json: JSONResponseStream & {
    chatbotMetadata: ChatbotMetadata
    prompt: string
  },
  req?: Request,
) {
  const { model, chatbotMetadata, prompt, webSearch } = json

  const tools: Partial<typeof aiTools> = {
    webSearch: aiTools.webSearch,
    // ? Temp disabling ICL as tool. Using direct ICL integration to main prompt instead. Might be enabled later.
    // chatbotMetadataExamples: aiTools.chatbotMetadataExamples
  }

  console.log('[SERVER] webSearch', webSearch)

  // if (webSearch) tools.webSearch = aiTools.webSearch

  try {
    const openaiModel = initializeOpenAi(model)
    const stream = createStreamableValue()
    const { partialObjectStream } = streamObject({
      model: openaiModel,
      // TODO: Fix different schemas for different tools
      schema: schema as typeof mbObjectSchema.metadata,
      output: 'object',
      prompt,
    })

    // ? This validates the object stream before to return a object stream
    for await (const objectStream of partialObjectStream) {
      if (!objectStream) {
        throw new Error('Failed to process the request, object stream is null')
      }

      stream.update(objectStream)
    }

    stream.done()

    return stream.value
  } catch (error) {
    console.error('Error in createResponseStreamObject:', error)
    throw error
  }
}

export async function classifyQuestion({
  prompt,
  clientType,
  chatbotMetadata,
  maxRetries = 3,
  retryCount = 0,
}: ClassifyQuestionParams): Promise<ChatbotMetadataClassification> {
  try {
    const responseObj = await processWithAiObject(prompt, chatbotMetadata)
    const errors = []

    for (const tag of responseObj.tags) {
      if (!chatbotMetadata.tags.includes(tag)) {
        responseObj.tags = responseObj.tags.filter((t: string) => t !== tag)

        errors.push(`Tag ${tag} not found in chatbot metadata`)
      }
    }

    for (const category of responseObj.categories) {
      const categoryKey = Object.keys(chatbotMetadata.categories).find((cat) =>
        cat.includes(category),
      ) as keyof typeof chatbotMetadata.categories
      console.log('categoryKey -> ', categoryKey)
      if (!chatbotMetadata.categories[categoryKey]) {
        responseObj.categories = responseObj.categories.filter((c: string) => c !== category)

        errors.push(`Category ${category} not found in chatbot metadata`)
      } else {
        for (const subCategory of responseObj.subCategories) {
          if (
            Array.isArray(chatbotMetadata.categories[categoryKey]) &&
            !chatbotMetadata.categories[categoryKey].includes(subCategory)
          ) {
            responseObj.subCategories = responseObj.subCategories.filter(
              (sc: string) => sc !== subCategory,
            )

            errors.push(
              `SubCategory ${subCategory} not found in chatbot metadata for category ${category}`,
            )
          }
        }
      }
    }

    console.log('class, subclass and tags are valid', responseObj)
    console.error('Errors: ', JSON.stringify(errors, null, 3))

    responseObj.errors = errors

    return responseObj
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
