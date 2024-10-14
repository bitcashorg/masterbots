import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const API_KEY = process.env.WORDWARE_API_KEY

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Wordware API key is not set' },
      { status: 500 }
    )
  }

  try {
    const { promptId, inputs } = await req.json()

    const response = await fetch(
      `https://app.wordware.ai/api/prompt/${promptId}/run`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs })
      }
    )

    if (!response.ok) {
      throw new Error(`Wordware API error: ${response.statusText}`)
    }

    const { readable, writable } = new TransformStream()

    // * Stream and validate the response
    streamAndValidateResponse(response.body, writable)

    return new NextResponse(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      }
    })
  } catch (error) {
    console.error('Error running Wordware prompt:', error)
    return NextResponse.json(
      { error: 'An error occurred while running the prompt' },
      { status: 500 }
    )
  }
}

async function streamAndValidateResponse(
  readableStream: ReadableStream<Uint8Array> | null,
  writableStream: WritableStream<Uint8Array>
) {
  if (!readableStream) {
    throw new Error('No readable stream available')
  }

  const reader = readableStream.getReader()
  const writer = writableStream.getWriter()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const decodedChunk = decoder.decode(value)
      const validatedChunk = validateAndSanitizeChunk(decodedChunk)

      await writer.write(encoder.encode(validatedChunk))
      await new Promise(resolve => setTimeout(resolve, 10))
    }
  } finally {
    reader.releaseLock()
    writer.close()
  }
}

function validateAndSanitizeChunk(chunk: string): string {
  //* Splits the chunk into lines
  const lines = chunk.split('\n')
  const validatedLines = lines.map(line => {
    try {
      const parsed = JSON.parse(line)

      //* Validates the structure of the parsed JSON
      if (typeof parsed === 'object' && parsed !== null) {
        if (
          parsed.type === 'chunk' &&
          typeof parsed.value === 'object' &&
          parsed.value !== null
        ) {
          //* Sanitize the 'value' field if it's a string
          if (typeof parsed.value.value === 'string') {
            parsed.value.value = sanitizeString(parsed.value.value)
          }
        } else if (parsed.type === 'generation' || parsed.type === 'prompt') {
          //* These types are allowed, but we don't modify their content
        } else {
          //* Unknown type, remove it
          return ''
        }
        return JSON.stringify(parsed)
      }
    } catch (e) {
      //* If parsing fails, it's not a valid JSON line, so we remove it
      return ''
    }
    //* If it's not an object or parsing failed, remove the line
    return ''
  })

  //* Join the validated lines back together
  return validatedLines.filter(Boolean).join('\n') + '\n'
}

function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: to prevent JavaScript injection
    .replace(/on\w+=/gi, '') // Remove event handlers
}
