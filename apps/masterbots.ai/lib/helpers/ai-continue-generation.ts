import { updateMessage } from '@/services/hasura'
import type { ContinueAIGenerationOptions } from '@/types/types'
import type { ChatRequestOptions, CreateMessage, Message } from 'ai'
import { nanoid } from 'nanoid'
import { hasReasoning } from './ai-helpers'

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
		jwt,
		startContinuation,
		endContinuation,
	} = options

	// Start continuation UI state
	startContinuation(incompleteMessage.id, incompleteMessage.content)
	
	let attempts = 0
	let continuedContent = incompleteMessage.content
	const messageId = incompleteMessage.id
	let isSuccessful = false

	try {
		while (attempts < maxAttempts && !isSuccessful) {
			attempts++

			if (devMode) {
				customSonner({
					type: 'continue',
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
					role: 'system',
					content:
						'Please continue your previous response without repeating any information.',
				}
			} else if (attempts === 2) {
				//? Second attempt: be more explicit about what we need
				continuationPrompt = {
					id: nanoid(),
					role: 'system',
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
					role: 'system',
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

			//* If we got new content, update the message in the database
			if (newContent) {
				//? Combine original content with the new content
				const updatedContent = `${continuedContent} ${newContent}`

				//? Determine if we have thinking content to update
				const thinkingContent = hasReasoning(incompleteMessage)
					? {
							thinking:
								incompleteMessage.parts?.find((msg) => msg.type === 'reasoning')
									?.reasoning || incompleteMessage.reasoning,
						}
					: undefined

				//? Update the message in the database
				const result = await updateMessage({
					messageId,
					content: updatedContent,
					thinking: thinkingContent?.thinking,
					jwt,
				})

				if (result.success) {
					//? Update content reference
					continuedContent = updatedContent

					if (devMode) {
						customSonner({
							type: 'continue',
							text: `Successfully continued and updated message on attempt ${attempts}`,
						})
					}

					//? If we got enough new content, consider it successful
					if (newContent.length > 20) {
						isSuccessful = true;
					}
				} else {
					if (devMode) {
						customSonner({
							type: 'error',
							text: `Failed to update message: ${result.error}`,
						})
					}
				}
			}
		}

		endContinuation()
		
		if (!isSuccessful) {
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
		endContinuation()
		return null
	}
}