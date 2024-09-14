import { AIModels } from '@/app/api/chat/models/models'
import { AiClientType } from '@/types/types'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import { generateId, CoreMessage } from 'ai'
import { ChatCompletionMessageParam } from 'openai/resources'
import { createResponseStream } from '@/app/api/chat/actions/actions'

// * This function gets the model client type
export function getModelClientType(model: AIModels) {
  switch (model) {
    case AIModels.GPT4:
    case AIModels.Default:
      return 'OpenAI'
    case AIModels.Claude3:
      return 'Anthropic'
    case AIModels.llama3_7b:
    case AIModels.llama3_8b:
      return 'Perplexity'
    case AIModels.WordWare:
      return 'WordWare'
    default:
      throw new Error('Unsupported model specified')
  }
}

// * This function creates the payload for the AI response
export function createPayload(
  json: { id: string },
  messages: { content: string }[],
  completion: any
) {
  const title = messages[0]?.content.substring(0, 100)
  const id = json.id ?? generateId()
  const createdAt = Date.now()
  const path = `/c/${id}`
  return {
    id,
    title,
    userId: 1,
    createdAt,
    path,
    messages: [
      ...messages,
      {
        content: completion,
        role: 'assistant'
      }
    ]
  }
}

// * This function sets the streamer payload
export function setStreamerPayload(
  model: AiClientType,
  payload: ChatCompletionMessageParam[]
): ChatCompletionMessageParam[] | MessageParam[] {
  switch (model) {
    case 'WordWare':
      return payload
    case 'Anthropic':
      return payload.map(
        (message, index) =>
          ({
            role: !index
              ? message.role.replace('system', 'user')
              : message.role.replace('system', 'assistant'),
            content: message.content
          }) as MessageParam
      )
    case 'OpenAI':
    case 'Perplexity':
    default:
      return payload
  }
}

// * This function converts the messages to the core messages
export function convertToCoreMessages(
  messages: ChatCompletionMessageParam[]
): CoreMessage[] {
  return messages.map(msg =>
    msg.role.match(/(user|system|assistant)/)
      ? {
          role: msg.role as 'user' | 'system' | 'assistant',
          content: msg.content as string
        }
      : (() => {
          throw new Error(`Unsupported message role: ${msg.role}`)
        })()
  )
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
  return `
    You are an expert grammar and spelling AI assistant skilled in understanding and correcting human typing errors. Your task is to improve the following text by:
      1. Correcting all spelling errors
      2. Fixing any grammar issues
      3. Improving and correcting punctuation where necessary
      4. Guessing the intended words if there are obvious typos

      Please maintain the original meaning and intent of the message. 
      Return only the improved text without any explanations or additional content.

      Original text: "${content}"

      Improved text:
    `
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
      result += match[1] + ' '
    }
  }

  return result
}

function cleanResult(result: string): string {
  return result
    .replace(/[\\\"\/]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
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
