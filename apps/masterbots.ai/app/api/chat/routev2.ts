import { AnthropicStream, OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const SupportedModels = {
  OPENAI_DEFAULT: 'gpt-3.5-turbo',
  CLAUDE3_DEFAULT: 'claude-3-haiku-20240307'
}

function createAiClient() {
  const isProduction = process.env.SET_AI_MODEL === 'openai'
  if (isProduction) {
    return {
      client: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
      type: 'openai'
    }
  } else {
    return {
      client: new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
      type: 'anthropic'
    }
  }
}

function getDefaultModel(aiType: string) {
  return aiType === 'openai'
    ? SupportedModels.OPENAI_DEFAULT
    : SupportedModels.CLAUDE3_DEFAULT
}

async function handleOpenAIResponse(
  response: any,
  json: { messages: { content: string }[]; id: string }
) {
  return new StreamingTextResponse(
    OpenAIStream(response, {
      async onCompletion(completion) {
        const title = json.messages[0].content.substring(0, 100)
        const id = json.id ?? nanoid()
        const createdAt = Date.now()
        const payload = {
          id,
          title,
          userId: 1, // This might need to be dynamically set or removed based on our auth system
          createdAt,
          path: `/chat/${id}`,
          messages: [
            ...json.messages,
            {
              content: completion,
              role: 'assistant'
            }
          ]
        }
      }
    })
  )
}

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken, model } = json
  const { client: aiClient, type: aiType } = createAiClient()
  const selectedModel = model || getDefaultModel(aiType)

  if (aiType === 'openai' && previewToken) {
    // Dynamically setting API key if needed
    aiClient.apiKey = previewToken
  }

  if (aiType === 'openai') {
    const response = await (aiClient as OpenAI).chat.completions.create({
      model: selectedModel,
      messages,
      temperature: 0.7,
      stream: true
    })
    return handleOpenAIResponse(response, json)
  } else {
    // Anthropic handling
    const response = await (aiClient as Anthropic).messages.create({
      model: selectedModel,
      messages: messages.map((msg: { role: any; content: any }) => ({
        role: msg.role,
        content: msg.content
      })),
      stream: true,
      max_tokens: 1024
    })
    // For direct handling without streaming
    // return new Response(JSON.stringify(response), {headers: {'Content-Type': 'application/json'}});
    return new StreamingTextResponse(AnthropicStream(response))
  }
}
