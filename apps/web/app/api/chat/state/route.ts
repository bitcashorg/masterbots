import type { NextRequest } from 'next/server'

type ChatStatePayload = {
	updatedAt: number
	isOpenPopup: boolean
	activeThreadId: string | null
}

let cachedChatState: ChatStatePayload | null = null

export async function GET() {
	return new Response(
		JSON.stringify({
			data: cachedChatState,
			error: null,
		}),
		{ headers: { 'Content-Type': 'application/json' } },
	)
}

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as ChatStatePayload
		if (!body || typeof body !== 'object') {
			return new Response(
				JSON.stringify({ data: null, error: 'Invalid payload' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } },
			)
		}
		if (cachedChatState && body.updatedAt < cachedChatState.updatedAt) {
			return new Response(
				JSON.stringify({
					data: cachedChatState,
					error: 'Outdated state; newer version exists',
				}),
				{ status: 409, headers: { 'Content-Type': 'application/json' } },
			)
		}
		cachedChatState = body
		return new Response(
			JSON.stringify({
				data: cachedChatState,
				error: null,
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		)
	} catch {
		return new Response(
			JSON.stringify({ data: null, error: 'Internal Server Error' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		)
	}
}
