export async function streamAndValidateResponse(
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
  const jsonRegex = /data:\s*\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}/g

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // console.log('Buffer: [Before Changes] => ', buffer)

      let match
      let lastIndex = 0
      while ((match = jsonRegex.exec(buffer)) !== null) {
        const jsonStr = match[0].replace(/^data:\s*/, '')
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

// TODO: Improve with processLogEntry helper lib function
export function validateAndSanitizeJson(jsonStr: string): string | null {
  try {
    // Remove the 'data:' prefix and join the lines
    const cleanedJsonStr = jsonStr
      .split('\n')
      .map(line => line.replace(/^data:\s*/, ''))
      .join('')

    const parsed = JSON.parse(cleanedJsonStr)

    //* Validate the structure of the parsed JSON
    if (typeof parsed === 'object' && parsed !== null) {
      if (parsed.type === 'chunk' && typeof parsed.content === 'string') {
        //* Sanitize the 'content' field if it's a string
        parsed.content = sanitizeString(parsed.content)
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

export function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: to prevent JavaScript injection
    .replace(/on\w+=/gi, '') // Remove event handlers
}
