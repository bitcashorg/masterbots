import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { promptId, inputs } = await req.json()
  const apiKey = process.env.WORDWARE_API_KEY

  if (!promptId) {
    return NextResponse.json(
      { error: 'Prompt ID is required' },
      { status: 400 }
    )
  }

  if (!inputs) {
    return NextResponse.json({ error: 'Inputs are required' }, { status: 400 })
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 })
  }

  try {
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

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to run prompt' }, { status: 500 })
  }
}
