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
): Promise<string | null | undefined> {
	const { setLoadingState, customSonner, devMode, chatConfig = {} } = options

	try {
		if (devMode) {
			customSonner({
				type: 'info',
				text: 'Continuing AI generation...',
			})
		}

		setLoadingState('continuing')

		//? Simple continuation prompt
		const continuationPrompt: CreateMessage = {
			id: nanoid(),
			role: 'user',
			content:
				'Please continue your previous response without repeating any information.',
		}

		const continuationOptions: ChatRequestOptions = {
			body: {
				...chatConfig,
				isContinuation: true,
				previousResponse: incompleteMessage.content,
			},
		}

		//? Try to continue the generation
		const newContent = await append(continuationPrompt, continuationOptions)

		if (newContent && newContent.length > 0) {
			if (devMode) {
				customSonner({
					type: 'success',
					text: 'Successfully continued the response',
				})
			}
			setLoadingState('finished')
			return newContent
		}
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
