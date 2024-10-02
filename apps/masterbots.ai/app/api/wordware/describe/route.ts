import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const promptId = searchParams.get('promptId')
  const apiKey = process.env.WORDWARE_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Wordware API key is not set' },
      { status: 500 }
    )
  }

  if (!promptId) {
    return NextResponse.json(
      { error: 'Invalid or missing promptId' },
      { status: 400 }
    )
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

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json()
      return NextResponse.json(data)
    } else {
      const text = await response.text()
      return NextResponse.json(
        {
          error: 'Unexpected response from Wordware API',
          details: text.substring(0, 200)
        },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('Error fetching prompt details:', error)
    return NextResponse.json(
      {
        error: 'An error occurred while fetching prompt details',
        details: error
      },
      { status: 500 }
    )
  }
}
