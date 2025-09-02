import type { GenerateImageRequest } from '@/types'
import { openai } from '@ai-sdk/openai'
import { experimental_generateImage as generateImage } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

/**
 * Maximum execution time (2 minutes)
 */
const TIMEOUT_MILLIS = 2 * 60 * 1000

/**
 * Export maxDuration for Vercel serverless function timeout
 */
export const maxDuration = 120 // seconds

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
	let previousImage: string | undefined
	let editMode: boolean | undefined

	try {
		// * Parse request body
		const body = (await req.json()) as GenerateImageRequest
		prompt = body.prompt
		modelId = body.modelId
		previousImage = body.previousImage
		editMode = body.editMode

		// * Validate request parameters
		if (!prompt || !modelId) {
			const error = 'Missing required parameters: prompt and modelId'
			console.error(`${error} [requestId=${requestId}]`)
			return NextResponse.json({ error }, { status: 400 })
		}

		// * Start timing
		const startstamp = performance.now()

		// * Generate image
		const generatePromise = (async () => {
			if (modelId === 'gpt-image-1') {
				//? OpenAI API directly until the AI SDK supports it stablely
				const openaiClient = new OpenAI()
				const response = await openaiClient.images.generate({
					model: modelId,
					prompt,
					size: DEFAULT_IMAGE_SIZE,
				})

				// console.log('OpenAI response:', JSON.stringify(response, null, 2)) //? Uncomment to debug response

				//* Get the image data from response
				const imageData = response.data[0]
				if (!imageData) {
					console.error('OpenAI response data:', response.data)
					throw new Error('No image data returned from OpenAI')
				}

				return {
					image: imageData.b64_json || imageData.url,
					warnings: [],
				}
			}

			//? AI SDK for DALL-E models
			const result = await generateImage({
				model: openai.image(modelId),
				prompt,
				size: DEFAULT_IMAGE_SIZE,
				seed: Math.floor(Math.random() * 1000000),
				...(editMode &&
					previousImage && {
						image: previousImage,
						mask: previousImage,
					}),
				providerOptions: {
					openai: {
						response_format: 'b64_json',
					},
				},
			})
			return {
				image: result.image.base64,
				warnings: result.warnings,
			}
		})().then(({ image, warnings }) => {
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
				image,
			}
		})

		// * Execute with timeout
		const result = await withTimeout(generatePromise, TIMEOUT_MILLIS)

		// * Return response
		return NextResponse.json(result, {
			status: 'image' in result ? 200 : 500,
		})
	} catch (error) {
		console.error(`Error generating image [requestId=${requestId}]: `, error)

		return NextResponse.json(
			{
				error: 'Failed to generate image. Please try again later.',
			},
			{ status: 500 },
		)
	}
}
