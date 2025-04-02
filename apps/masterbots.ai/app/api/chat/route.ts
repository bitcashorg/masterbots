import { createResponseStream } from '@/app/actions'
import { getModelClientType } from '@/lib/helpers/ai-helpers'
import { NextResponse } from 'next/server'

// export const runtime = 'edge'

export async function POST(req: Request) {
	try {
		const json = await req.json()
		const { model, isContinuation } = json

		if (!model) {
			return NextResponse.json({ error: 'Model is required' }, { status: 400 })
		}

		const clientModel = getModelClientType(model)

		if (isContinuation) {
			//? Reduce temperature by 0.3 (but never below 0.1) to make the output more deterministic
			//? Reduce top_p by 0.2 (but never below 0.1) to narrow the sampling distribution
			json.temperature = Math.max(0.1, (json.temperature || 0.7) - 0.3) // Lower temperature
			json.top_p = Math.max(0.1, (json.top_p || 1.0) - 0.2) // Lower top_p
		}

		const stream = await createResponseStream(clientModel, json, req)

		return stream
	} catch (error) {
		console.error('Error in chat API route:', error)
		return NextResponse.json(
			{ error: 'An error occurred while processing your request' },
			{ status: 500 },
		)
	}
}
