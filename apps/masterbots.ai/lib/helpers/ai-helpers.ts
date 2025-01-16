import { AIModels } from '@/app/api/chat/models/models'
import type { AiClientType, CleanPromptResult } from '@/types/types'
import type { StreamEntry } from '@/types/wordware-flows.types'
import type { MessageParam } from '@anthropic-ai/sdk/resources'
import { type CoreMessage, generateId } from 'ai'
import type { ChatCompletionMessageParam } from 'openai/resources'

// * This function gets the model client type
export function getModelClientType(model: AIModels) {
	switch (model) {
		case AIModels.GPT4:
		case AIModels.Default:
			return 'OpenAI'
		case AIModels.Claude3:
			return 'Anthropic'
		case AIModels.llama3_7b:
		case AIModels.llama3_8b:
			return 'Perplexity'
		case AIModels.WordWare:
			return 'WordWare'
		default:
			throw new Error('Unsupported model specified')
	}
}

// * This function creates the payload for the AI response
export function createPayload(
	json: { id: string },
	messages: { content: string }[],
	completion: any,
) {
	const title = messages[0]?.content.substring(0, 100)
	const id = json.id ?? generateId()
	const createdAt = Date.now()
	const path = `/c/${id}`
	return {
		id,
		title,
		userId: 1,
		createdAt,
		path,
		messages: [
			...messages,
			{
				content: completion,
				role: 'assistant',
			},
		],
	}
}

// * This function sets the streamer payload
export function setStreamerPayload(
	model: AiClientType,
	payload: ChatCompletionMessageParam[],
): ChatCompletionMessageParam[] | MessageParam[] {
	switch (model) {
		case 'WordWare':
			return payload
		case 'Anthropic':
			return payload.map(
				(message, index) =>
					({
						role: index
							? message.role.replace('system', 'assistant')
							: message.role.replace('system', 'user'),
						content: message.content,
					}) as MessageParam,
			)
		case 'OpenAI':
		case 'Perplexity':
		default:
			return payload
	}
}

// * This function converts the messages to the core messages
export function convertToCoreMessages(
	messages: ChatCompletionMessageParam[],
): CoreMessage[] {
	return messages.map((msg) =>
		msg.role.match(/(user|system|assistant)/)
			? {
					role: msg.role as 'user' | 'system' | 'assistant',
					content: msg.content as string,
				}
			: (() => {
					throw new Error(`Unsupported message role: ${msg.role}`)
				})(),
	)
}

// * This function initializes the WordWare model with describe call
export async function fetchPromptDetails(promptId: string) {
	if (!promptId) {
		throw new Error('Prompt ID is required')
	}

	const response = await fetch(`/api/wordware/describe?promptId=${promptId}`)

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Failed to fetch prompt details')
	}

	return response.json()
}

export function cleanPrompt(str: string) {
	const marker = '].  Then answer this question:'
	const index = str.indexOf(marker)
	let extracted = ''

	if (index !== -1) {
		extracted = str.substring(index + marker.length)
	}
	// console.log('cleanPrompt', str, extracted, index)
	return extracted || str
}

export function cleanResult(result: string): CleanPromptResult {
	const cleanedResult = result
		.trim()
		.replace(/\{\n/g, '{')
		.replace(/\n\}/g, '}')
		.replace(/\\"/g, '"')
	// * Using template string to avoid parsing errors with ' and " special characters...
	return JSON.parse(`${cleanedResult} `)
}

export const processLogEntry = (logEntry: StreamEntry) => {
	const { type, value } = logEntry
	if (type === 'chunk' && value.label) {
		switch (value.label) {
			case 'blogPostSection':
				// Handle blogPostSection specific logic
				break
			case 'generatedImages':
				// Handle generatedImages specific logic
				break
			case 'Image generation':
				// Handle Image generation specific logic
				break
			case 'imageDescription':
				// Handle imageDescription specific logic
				break
			default:
				// Handle default case
				break
		}
	}
}
