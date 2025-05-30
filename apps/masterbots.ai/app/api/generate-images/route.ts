import type { GenerateImageRequest } from '@/types/types'
import { openai } from '@ai-sdk/openai'
import { experimental_generateImage as generateImage } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Maximum execution time (55 seconds, slightly less than the Edge runtime limit)
 */
const TIMEOUT_MILLIS = 55 * 1000

/**
 * Default image size for OpenAI models
 */
const DEFAULT_IMAGE_SIZE = '1024x1024'

/**
 * Wrap a promise with a timeout
 */
const withTimeout = <T>(
	promise: Promise<T>,
	timeoutMillis: number,
): Promise<T> => {
	return Promise.race([
		promise,
		new Promise<T>((_, reject) =>
			setTimeout(() => reject(new Error('Request timed out')), timeoutMillis),
		),
	])
}

/**
 * Image generation endpoint
 */
export async function POST(req: NextRequest) {
	const requestId = Math.random().toString(36).substring(7)
	let prompt: string
	let modelId: string

	try {
		// * Parse request body
		const body = (await req.json()) as GenerateImageRequest
		prompt = body.prompt
		modelId = body.modelId

		// * Validate request parameters
		if (!prompt || !modelId) {
			const error = 'Missing required parameters: prompt and modelId'
			console.error(`${error} [requestId=${requestId}]`)
			return NextResponse.json({ error }, { status: 400 })
		}

		// * Start timing
		const startstamp = performance.now()

		// * Generate image
		const generatePromise = generateImage({
			model: openai.image(modelId),
			prompt,
			size: DEFAULT_IMAGE_SIZE,
			seed: Math.floor(Math.random() * 1000000),
		}).then(({ image, warnings }) => {
			// * Log warnings if any
			if (warnings?.length > 0) {
				console.warn(
					`Warnings [requestId=${requestId}, model=${modelId}]: `,
					warnings,
				)
			}

			// * Log completion
			console.log(
				`Completed image request [requestId=${requestId}, model=${modelId}, elapsed=${(
					(performance.now() - startstamp) / 1000
				).toFixed(1)}s].`,
			)

			//* Return image data
			return {
				image: image.base64,
			}
		})

		// * Execute with timeout
		const result = await withTimeout(generatePromise, TIMEOUT_MILLIS)

		// * Return response
		return NextResponse.json(result, {
			status: 'image' in result ? 200 : 500,
		})
	} catch (error) {
		// Log error details but return a generic message
		console.error(`Error generating image [requestId=${requestId}]: `, error)

		return NextResponse.json(
			{
				error: 'Failed to generate image. Please try again later.',
			},
			{ status: 500 },
		)
	}
}
