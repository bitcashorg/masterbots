import { StreamingTextResponse } from 'ai'; // from 'ai' package
import { WordWareClient } from '../providers/wordwareProvider';
import { AIModels } from './models';

//TODO: Test ifStreamingTextResponse (https://sdk.vercel.ai/docs/reference/stream-helpers/streaming-text-response) works for wordware

export function initializeWordWare(apiKey: string): WordWareClient {
  return new WordWareClient(apiKey)
}

export function validateModel(model: AIModels) {
  if (model !== AIModels.WordWare) {
    throw new Error('Unsupported model specified for WordWare')
  }
}

export function stringToStream(text: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text))
      controller.close()
    }
  })
}

export async function createWordWareResponseStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
) {
  const decoder = new TextDecoder()
  let buffer: string[] = []
  let output = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value, { stream: true })
      buffer.push(chunk)
      if (chunk.includes('\n')) {
        const data = buffer.join('')
        output += data
        buffer = [] // Clear buffer after processing
      }
    }
  } finally {
    reader.releaseLock()
  }
  return output
}

export async function handleWordWareRequest(req: Request): Promise<Response> {
  try {
    const json = await req.json() // Parse the incoming request body
    const { messages, model = AIModels.WordWare, previewToken } = json

    const wordware = initializeWordWare(process.env.WORDWARE_API_KEY as string)
    if (previewToken) {
      // Optionally override the API key with a preview token if provided
      wordware.apiKey = previewToken
    }

    validateModel(model)
    const reader = await wordware.runPrompt('YOUR_PROMPT_ID', { messages })
    if (!reader) {
      throw new Error('Failed to obtain reader from response.')
    }

    const output = await createWordWareResponseStream(
      reader,
    )
    const responseStream = stringToStream(output)
    return new StreamingTextResponse(responseStream)
  } catch (error) {
    console.error('Failed to process request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
