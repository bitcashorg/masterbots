import type { WordWareDescribeDAtaResponse } from '@/types/wordware-flows.types'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const promptId = searchParams.get('promptId')
	const API_KEY = process.env.WORDWARE_API_KEY

	if (!API_KEY) {
		console.error('Wordware API key is not set')
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		)
	}

	if (!promptId) {
		return NextResponse.json(
			{ error: 'Invalid or missing promptId' },
			{ status: 400 },
		)
	}

	try {
		const response = await fetch(
			`https://api.wordware.ai/v1alpha/apps/masterbots/${promptId}`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					'Content-Type': 'application/json',
				},
			},
		)

		const contentType = response.headers.get('content-type')
		if (contentType && contentType.indexOf('application/json') !== -1) {
			const data: WordWareDescribeDAtaResponse = await response.json()
			return NextResponse.json(data, { status: response.status })
		} else {
			const text = await response.text()
			return NextResponse.json(
				{
					error: 'Unexpected response from Wordware API',
					details: text.substring(0, 200),
				},
				{ status: response.status },
			)
		}
	} catch (error) {
		console.error('Error fetching prompt details:', error)
		return NextResponse.json(
			{
				error: 'An error occurred while fetching prompt details',
				details: error,
			},
			{ status: 500 },
		)
	}
}
