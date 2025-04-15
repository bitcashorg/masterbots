import { updateMessage } from '@/services/hasura'
import type { ContinueAIGenerationOptions } from '@/types/types'
import type { ChatRequestOptions, CreateMessage, Message } from 'ai'
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
		systemPrompts = [],
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

		//? Last ~100 characters or 10% of the content, whichever is less
		const referenceLength = Math.min(
			100,
			Math.floor(continuedContent.length * 0.1),
		)
		const contextSnippet = continuedContent.slice(-referenceLength)

		//? Determine if we have thinking content
		const thinkingContent = hasReasoning(incompleteMessage)
			? incompleteMessage.parts?.find((msg) => msg.type === 'reasoning')
					?.reasoning || incompleteMessage.reasoning
			: undefined

		//? Call directly to the continuation endpoint
		const response = await fetch('/api/chat/continue', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: jwt ? `Bearer ${jwt}` : '',
			},
			body: JSON.stringify({
				messageId,
				previousContent: continuedContent,
				contextSnippet,
				systemPrompts, //? Send any system prompts needed for context
				chatConfig,
				thinking: thinkingContent,
			}),
		})

		if (!response.ok) {
			throw new Error(`Continuation API call failed: ${response.status}`)
		}

		const { continuationText, success } = await response.json()

		if (success && continuationText) {
			//? Combine original content with new content
			const updatedContent = `${continuedContent} ${continuationText}`

			//? Retry mechanism for database updates
			let retryCount = 0
			let updateSuccess = false

			while (retryCount < 3 && !updateSuccess) {
				try {
					//? Small delay before retrying (increases with each attempt)
					if (retryCount > 0) {
						await new Promise(resolve => setTimeout(resolve, 500 * retryCount))
					}

					const result = await updateMessage({
						messageId,
						content: updatedContent,
						thinking: thinkingContent,
						jwt,
					})

					updateSuccess = result.success
					if (updateSuccess) {
						continuedContent = updatedContent
						if (devMode) {
							customSonner({
								type: 'continue',
								text: `Successfully continued and updated message (attempt ${retryCount + 1})`,
							})
						}
						break
					}
				} catch (err) {
					console.error(`Update attempt ${retryCount + 1} failed:`, err)
				}
				retryCount++
			}

			//? If database update failed but we have the content, back it up locally
			if (!updateSuccess) {
				try {
					localStorage.setItem(`continued-${messageId}`, updatedContent)
					customSonner({
						type: 'info',
						text: 'Continuation successful but not saved to database. Content backed up locally.',
					})
				} catch (err) {
					console.error('Failed to back up continued content:', err)
				}
			}
		} else {
			customSonner({
				type: 'continue',
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
