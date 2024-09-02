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

export async function improveTitle(
  content: string,
  clientType: AiClientType,
  model: string
) {
  const titleImprovementPrompt = `
    Improve the following text by fixing any spelling errors and improving punctuation.
    Keep the essence and length of the text intact, making it more readable and professional.
    Return only the improved text without any additional explanation.

    Original text: ${content}

    Improved text:
  `

  return await processWithAI(titleImprovementPrompt, clientType, model)
}

export async function translate(
  content: string,
  targetLanguage: string,
  clientType: AiClientType,
  model: string
) {
  const translationAndImprovementPrompt = `From now on, please strictly follow the instructions step-by-step:
1. Only provide the output in step 6.
2. Correct the spelling, grammar and format of the following question in the original language: ${content}.
3. Translate the question to English, but do not output anything.
4. Answer the question in English, but do not output anything.
5. Translate the answer in the original language.
6. Provide the correct question and answer in the original language following format below: 

Question: {question}

Answer: {answer}
  `
  return await processWithAI(translationAndImprovementPrompt, clientType, model)
}

async function processWithAI(
  prompt: string,
  clientType: AiClientType,
  model: string
): Promise<string> {
  let result: string = ''

  try {
    switch (clientType) {
      case 'OpenAI': {
        const openai = await initializeOpenAI(
          process.env.OPENAI_API_KEY as string
        )
        const response = await openai.chat.completions.create({
          model,
          messages: [{ role: 'system', content: prompt }],
          temperature: 0.3,
          max_tokens: 1000
        })
        console.log('OPENAI REFACTORED RESPONSE Before:', response.choices[0]?.message?.content ?? null)
        result = extractStringContent(
          response.choices[0]?.message?.content ?? null
        )
        console.log('OPENAI REFACTORED RESPONSE After:', result)

        break
      }
      case 'Anthropic': {
        const anthropic = await initializeAnthropic(
          process.env.ANTHROPIC_API_KEY as string
        )
        const response = await anthropic.messages.create({
          model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.3
        })
        result = extractStringContent(response.content[0].text)
        break
      }
      case 'Perplexity': {
        const perplexity = await initializePerplexity(
          process.env.PERPLEXITY_API_KEY as string
        )
        const response = await perplexity.chat.completions.create({
          model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.3
        })
        result = extractStringContent(
          response.choices[0]?.message?.content ?? null
        )
        break
      }
      default: {
        throw new Error('Unsupported client model type')
      }
    }
  } catch (error) {
    console.error('Error processing text:', error)
  }

  return result || prompt.split('Original text: ')[1].split('"')[1] // fallback to original text if processing fails
}

export async function createResponseStream(
  clientType: AiClientType,
  json: JSONResponseStream,
  req?: Request
) {
  const { model, messages: rawMessages, previewToken } = json
  let messages = setStreamerPayload(clientType, rawMessages)

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
