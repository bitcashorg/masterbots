import { StreamingTextResponse } from 'ai'
import { initializeOpenAI, validateModel, createResponseStream } from '@/app/api/chat/actions/actions'
import { AIModels } from './actions/models'

export const runtime = 'edge'
const openai = initializeOpenAI(process.env.OPENAI_API_KEY as string)

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { messages, model = AIModels.Default, previewToken } = json
    if (previewToken) {
      openai.apiKey = previewToken
    }

    validateModel(model)
    const res = await openai.chat.completions.create({
      model, messages, temperature: 0.7, stream: true
    })

    const stream = createResponseStream('OpenAI', res, json, messages)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Failed to process request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
