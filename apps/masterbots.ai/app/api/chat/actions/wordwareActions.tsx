import { WordWareClient } from '../providers/wordwareProvider';

//TODO: Test ifStreamingTextResponse (https://sdk.vercel.ai/docs/reference/stream-helpers/streaming-text-response) works for wordware

export function initializeWordWare(apiKey: string): WordWareClient {
  return new WordWareClient(apiKey)
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
