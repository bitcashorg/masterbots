import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const API_KEY = process.env.WORDWARE_API_KEY

  if (!API_KEY) {
    console.error('Wordware API key is not set')
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }

  try {
    const { promptId, inputs, appVersion } = await req.json()

    const response = await fetch(
      `https://api.wordware.ai/v1alpha/apps/masterbots/${promptId}/${appVersion}/runs/stream`,
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

  let buffer = ''
  const jsonRegex = /\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}/g

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      let match
      let lastIndex = 0
      while ((match = jsonRegex.exec(buffer)) !== null) {
        const jsonStr = match[0]
        const validatedJson = validateAndSanitizeJson(jsonStr)
        if (validatedJson) {
          await writer.write(encoder.encode(validatedJson + '\n'))
        }
        lastIndex = jsonRegex.lastIndex
      }

      //* Keeping the unmatched part in the buffer
      buffer = buffer.slice(lastIndex)

      //? Buffer is getting too large warning
      if (buffer.length > 10000) {
        console.warn('Buffer overflow, clearing unmatched data')
        buffer = ''
      }

      await new Promise(resolve => setTimeout(resolve, 10))
    }

    //* Process any remaining data in the buffer
    if (buffer.length > 0) {
      const validatedJson = validateAndSanitizeJson(buffer)
      if (validatedJson) {
        await writer.write(encoder.encode(validatedJson + '\n'))
      }
    }
  } finally {
    reader.releaseLock()
    writer.close()
  }
}

function validateAndSanitizeJson(jsonStr: string): string | null {
  try {
    const parsed = JSON.parse(jsonStr)

    //* Validate the structure of the parsed JSON
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
        return null
      }
      return JSON.stringify(parsed)
    }
  } catch (e) {
    console.error('Invalid JSON:', e)
    return null
  }
  return null
}

function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: to prevent JavaScript injection
    .replace(/on\w+=/gi, '') // Remove event handlers
}
