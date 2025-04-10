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
		jwt,
		startContinuation,
		endContinuation,
	} = options

	//? Start continuation UI state
	startContinuation(incompleteMessage.id, incompleteMessage.content)

	let continuedContent = incompleteMessage.content
	const messageId = incompleteMessage.id

	try {
		if (devMode) {
			customSonner({
				type: 'continue',
				text: 'Continuing AI generation',
			})
		}

		setLoadingState('continuing')

		const continuationPrompt: CreateMessage = {
			id: nanoid(),
			role: 'system',
			content:
				'Response was cut off. Please continue from where you left off.',
		}

		const continuationOptions: ChatRequestOptions = {
			body: {
				...chatConfig,
				isContinuation: true,
				continuationAttempt: 1,
				previousResponse: continuedContent,
			},
		}

		//? Small delay to avoid rate limits
		await new Promise((resolve) => setTimeout(resolve, 1000))

		//? Append the continuation prompt to get new content
		const newContent = await append(continuationPrompt, continuationOptions)

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

			const result = await updateMessage({
				messageId,
				content: updatedContent,
				thinking: thinkingContent?.thinking,
				jwt,
			})

			if (result.success) {
				continuedContent = updatedContent

				if (devMode) {
					customSonner({
						type: 'continue',
						text: 'Successfully continued and updated message',
					})
				}
			} else {
				if (devMode) {
					customSonner({
						type: 'error',
						text: `Failed to update message: ${result.error}`,
					})
				}

				customSonner({
					type: 'info',
					text: 'Could not complete the full response.',
				})
			}
		} else {
			customSonner({
				type: 'info',
				text: 'Could not generate additional content to complete the response.',
			})
		}

		endContinuation()

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
