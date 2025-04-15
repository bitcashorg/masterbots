import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
	try {
		const {
			messageId,
			previousContent,
			contextSnippet,
			systemPrompts,
			chatConfig,
			thinking,
		} = await req.json()

		//? Use streamText to generate only the continuation
		const result = await streamText({
			model: openai('gpt-4o'), //TODO: make this work with the rest of the LLMs we are using 
			system: `Continue your previous response which was cut off. Here is the last part: "${contextSnippet}". Continue exactly from where you left off without repeating information.`,
			prompt: '',
			temperature: chatConfig?.temperature || 0.7,
			maxTokens: chatConfig?.maxTokens || 500,
		})

		//? Collect the streamed text
		let continuationText = ''
		for await (const chunk of result.textStream) {
			continuationText += chunk
		}

		return Response.json({
			success: true,
			messageId,
			continuationText,
			thinking,
		})
	} catch (error) {
		console.error('Error in chat API route:', error)
		return NextResponse.json(
			{ error: 'An error occurred while processing your request' },
			{ status: 500 },
		)
	}
}
