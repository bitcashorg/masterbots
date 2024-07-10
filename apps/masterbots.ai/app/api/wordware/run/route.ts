import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { promptId, inputs } = await req.json()
    const apiKey = process.env.WORDWARE_API_KEY

    if (!promptId) {
      return NextResponse.json(
        { error: 'Prompt ID is required' },
        { status: 400 }
      )
    }

    if (!inputs) {
      return NextResponse.json(
        { error: 'Inputs are required' },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is missing' }, { status: 500 })
    }

    const response = await fetch(
      `https://app.wordware.ai/api/prompt/${promptId}/run`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.message },
        { status: response.status }
      )
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let buffer: string[] = []
    const chunks: string[] = []

    try {
      while (true) {
        const { done, value } = reader
          ? await reader.read()
          : { done: true, value: undefined }
        if (done) break

        const chunk = decoder.decode(value)
        chunks.push(chunk)

        for (let i = 0, len = chunk.length; i < len; ++i) {
          const isChunkSeparator = chunk[i] === '\n'

          if (!isChunkSeparator) {
            buffer.push(chunk[i])
            continue
          }

          const line = buffer.join('').trimEnd()
          const content = JSON.parse(line)
          const value = content.value

          if (value.type === 'chunk') {
            process.stdout.write(value.value ?? '')
          }
          buffer = []
        }
      }
    } finally {
      if (reader) {
        reader.releaseLock()
      }
    }

    return NextResponse.json({ result: chunks.join('') })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to run prompt' }, { status: 500 })
  }
}
