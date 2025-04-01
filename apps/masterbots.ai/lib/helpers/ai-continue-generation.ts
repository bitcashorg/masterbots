import type { ChatRequestOptions, CreateMessage, Message } from 'ai'
import { nanoid } from 'nanoid'

/**
 * Determines if AI generation should be continued based on the finish reason
 * @param finishReason - The reason why the AI generation stopped
 * @returns boolean indicating whether generation should be continued
 */
export function shouldContinueGeneration(finishReason: string): boolean {
	// Reasons that might indicate incomplete generations
	const incompleteReasons = ['length', 'content-filter', 'error', 'unknown']
	return incompleteReasons.includes(finishReason)
}

//? Define the types to match your application's types
export type CustomSonnerParams = {
	type: 'success' | 'error' | 'info'
	text: string
}

//? Define the type for your ChatLoadingState
export type ChatLoadingState =
	| 'processing'
	| 'digesting'
	| 'polishing'
	| 'generating'
	| 'continuing'
	| 'finished'
	| undefined

/**
 * Configuration options for AI continuation
 */
export interface ContinueAIGenerationOptions {
	setLoadingState: (state: any) => void
	// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
	customSonner: (params: CustomSonnerParams) => string | number | void
	devMode: boolean
	chatConfig?: Record<string, any>
	maxAttempts?: number
}

/**
 * Attempts to continue an incomplete AI generation
 * @param incompleteMessage - The message that was cut off
 * @param continuationFn - Function to get continuation text
 * @param options - Configuration options
 * @returns A promise resolving to the continued message content or null if failed
 */
export async function continueAIGeneration(
	incompleteMessage: Message,
	continuationFn: (
		message: Message | CreateMessage,
		options?: ChatRequestOptions,
	) => Promise<string | null | undefined>,
	options: ContinueAIGenerationOptions,
): Promise<string | null> {
	const {
		setLoadingState,
		customSonner,
		devMode,
		chatConfig = {},
		maxAttempts = 3,
	} = options

	let attempts = 0
	let continuedContent = incompleteMessage.content

	try {
		while (attempts < maxAttempts) {
			attempts++

			if (devMode) {
				customSonner({
					type: 'info',
					text: `Continuing AI generation (attempt ${attempts}/${maxAttempts})`,
				})
			}

			setLoadingState('continuing')

			//? Continuation prompt flow - using different strategies based on the attempt number
			let continuationPrompt: CreateMessage

			if (attempts === 1) {
				//? First attempt: simple continuation request
				continuationPrompt = {
					id: nanoid(),
					role: 'user',
					content:
						'Please continue your previous response without repeating any information.',
				}
			} else if (attempts === 2) {
				//? Second attempt: be more explicit about what we need
				continuationPrompt = {
					id: nanoid(),
					role: 'user',
					content:
						'Your previous response was cut off. Please continue exactly where you left off without summarizing or repeating what you already said.',
				}
			} else {
				//? Final attempt: provides a specific reference point with dynamic length
				const referenceLength = Math.min(
					100,
					Math.floor(continuedContent.length * 0.1),
				)
				continuationPrompt = {
					id: nanoid(),
					role: 'user',
					content: `I need the rest of your explanation. Your last message ended with: "${continuedContent.slice(-referenceLength)}". Please continue from there.`,
				}
			}

			const continuationOptions: ChatRequestOptions = {
				body: {
					...chatConfig,
					isContinuation: true,
					continuationAttempt: attempts,
					previousResponse: continuedContent,
				},
			}

			//? Small delay between attempts to avoid rate limits
			await new Promise((resolve) => setTimeout(resolve, 1000))

			//? Try to continue the generation using the provided continuation function
			const newContent = await continuationFn(
				continuationPrompt,
				continuationOptions,
			)

			//? If we got new content, combine it with the previous content
			if (newContent) {
				continuedContent = `${continuedContent.trim()} ${newContent.trim()}`
				// Check if we have enough content to consider this a successful continuation
				if (newContent.length > 20) {
					if (devMode) {
						customSonner({
							type: 'success',
							text: `Successfully continued AI generation on attempt ${attempts}`,
						})
					}
					return continuedContent
				}
			}
		}

		//? If we couldn't get enough content after all attempts
		customSonner({
			type: 'info',
			text: 'Could not complete the full response after multiple attempts.',
		})

		return continuedContent
	} catch (error) {
		console.error('Failed to continue AI generation:', error)
		customSonner({
			type: 'error',
			text: 'Failed to continue the Masterbot response. Please try again.',
		})
		setLoadingState('finished')
		return null
	}
}
