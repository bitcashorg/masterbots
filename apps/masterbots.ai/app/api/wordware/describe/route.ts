import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const promptId = searchParams.get('promptId')
  const apiKey = process.env.WORDWARE_API_KEY

  if (!promptId) {
    return NextResponse.json(
      { error: 'Prompt ID is required' },
      { status: 400 }
    )
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://app.wordware.ai/api/prompt/${promptId}/describe`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
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
    return NextResponse.json(
      { error: 'Failed to fetch prompt description' },
      { status: 500 }
    )
  }
}
