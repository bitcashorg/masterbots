import { createResponseStream } from '@/app/actions'
import { getModelClientType } from '@/lib/helpers/ai-helpers'
import { NextResponse } from 'next/server'

// export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { model } = json

    console.log('[SERVER] req.body', req.body)
    console.log('[SERVER] json', json)

    if (!model) {
      return NextResponse.json({ error: 'Model is required' }, { status: 400 })
    }

    const clientModel = getModelClientType(model)

    const stream = await createResponseStream(clientModel, json, req)

    return stream
  } catch (error) {
    console.error('Error in chat API route:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}
