import type { ChatRequestOptions, CreateMessage, Message } from 'ai'
/* eslint-disable no-unused-vars */
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

// Define the types to match your application's types
export type CustomSonnerParams = {
	type: 'success' | 'error' | 'info'
	text: string
}

//* Define the type for your ChatLoadingState
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
	// biome-ignore lint/suspicious/noExplicitAny: <we are using any in the meantime>
	setLoadingState: (state: any) => void
	// biome-ignore lint/suspicious/noConfusingVoidType: <void is being included in the return type>
	customSonner: (params: CustomSonnerParams) => string | number | void
	devMode: boolean
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	chatConfig?: Record<string, any>
	maxAttempts?: number
}

/**
 * Attempts to continue an incomplete AI generation
 * @param incompleteMessage - The message that was cut off
 * @param append - The function to append a new message
 * @param options - Configuration options
 * @returns A promise resolving to the continued message content or null if failed
 */
export async function continueAIGeneration(
	incompleteMessage: Message,
	append: (
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

			//* continuation prompt flow - using different strategies based on the attempt number
			let continuationPrompt: CreateMessage

			if (attempts === 1) {
				//? First attempt: simple continuation request
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
				) //? Use the last 10% of the message, with a max of 100 characters
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

			//* small delay between attempts to avoid rate limits
			await new Promise((resolve) => setTimeout(resolve, 1000))

			//* Try to continue the generation
			const newContent = await append(continuationPrompt, continuationOptions)

			//* combines it with the previous content
			if (newContent) {
				//? Update the continued content
				continuedContent = `${continuedContent} ${newContent}`

				//* Checks if we have enough content
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

		//* feedback to user if we couldn't get enough content
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
