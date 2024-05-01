import { StreamingTextResponse } from 'ai'
import { initializeAnthropic, validateModel, createResponseStream } from '@/app/api/chat/actions/actions'
import { AIModels } from './actions/models'

export const runtime = 'force-dynamic'
const anthropic = initializeAnthropic( process.env.ANTHROPIC_API_KEY as string)

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { messages, model = AIModels.Claude3, previewToken } = json
    if (previewToken) {
      anthropic.apiKey = previewToken
    }

    validateModel(model);
    const response = await anthropic.messages.create({
      messages, model, stream: true, max_tokens: 300
    });

    const stream = createResponseStream('Anthropic', response, json, messages)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Failed to process request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
