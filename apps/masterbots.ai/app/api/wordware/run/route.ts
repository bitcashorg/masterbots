import { streamAndValidateResponse } from '@/lib/helpers/ai-streams'
import { NextResponse } from 'next/server'

// export const runtime = 'edge'

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

