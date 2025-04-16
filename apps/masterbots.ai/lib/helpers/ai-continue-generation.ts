import type { ContinueAIGenerationOptions } from '@/types/types'
import type { ChatRequestOptions, CreateMessage, Message } from 'ai'
import { nanoid } from 'nanoid'

export function shouldContinueGeneration(finishReason: string): boolean {
	//? Reasons that might indicate incomplete generations
	const incompleteReasons = ['length', 'content-filter', 'error', 'unknown']
	return incompleteReasons.includes(finishReason)
}

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
	let continuedContent: string | null = null

	try {
		while (attempts < maxAttempts && !continuedContent) {
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
					Math.floor(incompleteMessage.content.length * 0.1),
				)
				continuationPrompt = {
					id: nanoid(),
					role: 'user',
					content: `I need the rest of your explanation. Your last message ended with: "${incompleteMessage.content.slice(-referenceLength)}". Please continue from there.`,
				}
			}

			const continuationOptions: ChatRequestOptions = {
				body: {
					...chatConfig,
					isContinuation: true,
					continuationAttempt: attempts,
					previousResponse: incompleteMessage.content,
				},
			}

			//* small delay between attempts to avoid rate limits
			await new Promise((resolve) => setTimeout(resolve, 1000))

			//* Try to continue the generation
			const newContent = await append(continuationPrompt, continuationOptions)

			//* If we got new content with sufficient length, consider it successful
			if (newContent && newContent.length > 20) {
				continuedContent = newContent

				if (devMode) {
					customSonner({
						type: 'success',
						text: `Successfully continued on attempt ${attempts}`,
					})
				}

				break
			}
		}

		if (!continuedContent) {
			//* feedback to user if we couldn't get enough content
			customSonner({
				type: 'info',
				text: 'Could not complete the full response after multiple attempts.',
			})
		}

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
