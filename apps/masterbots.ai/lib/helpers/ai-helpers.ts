import {
	CONTINUE_GENERATION_PROMPT,
	CONTINUE_GENERATION_PROMPT_2,
} from '@/lib/constants/prompts'
import {
	examplesSchema,
	languageGammarSchema,
	metadataSchema,
	toolSchema,
} from '@/lib/helpers/ai-schemas'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { AiClientType, CleanPromptResult } from '@/types/types'
import type { MessageWithExamples, StoredImagePart } from '@/types/types'
import type { StreamEntry } from '@/types/wordware-flows.types'
import type Anthropic from '@anthropic-ai/sdk'
import {
	type Attachment,
	type CoreMessage,
	type FilePart,
	type ImagePart,
	type Message,
	type TextPart,
	generateId,
} from 'ai'
import type { Message as MBMessage } from 'mb-genql'
import type OpenAI from 'openai'

// TODO: this funtion will need to be refactor to use the model_enum coming from hasure isntead of AiClientType
// * This function gets the model client type
export function getModelClientType(model: string): AiClientType {
	const modelLower = model.toLowerCase()
	if (modelLower.includes('gpt') || modelLower.includes('o4-mini')) {
		return 'OpenAI'
	}
	if (modelLower.includes('claude')) {
		return 'Anthropic'
	}
	// if (modelLower.includes('llama') || modelLower.includes('sonar')) {
	// 	return 'Perplexity'
	// }
	if (modelLower.startsWith('deepseek')) {
		return 'GroqDeepSeek'
	}
	if (modelLower.startsWith('gemini')) {
		return 'Gemini'
	}
	console.error(`Unsupported model specified: ${model}`)
	throw new Error('Unsupported model specified')
}
// * This function creates the payload for the AI response
export function createPayload(
	json: { id: string },
	messages: { content: string }[],
	completion: string,
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
	payload: OpenAI.ChatCompletionMessageParam[],
): OpenAI.ChatCompletionMessageParam[] | Anthropic.MessageParam[] {
	switch (model) {
		case 'Anthropic':
			return payload.map(
				(message, index) =>
					({
						role: index
							? message.role.replace('system', 'assistant')
							: message.role.replace('system', 'user'),
						content: message.content,
					}) as Anthropic.MessageParam,
			)
		// case 'DeepSeek':
		case 'GroqDeepSeek':
			return payload.map((message) => {
				if (message.role === 'assistant') {
					const content = message.content as string
					const reasoningMatch = content.match(/<think>(.*?)<\/think>/s)
					const answerMatch = content.match(/<answer>(.*?)<\/answer>/s)

					return {
						...message,
						content: answerMatch ? content : `<answer>${content}</answer>`,
						reasoning: reasoningMatch
							? reasoningMatch[1]
							: '<think>Analyzing the context and formulating a response...</think>',
					}
				}
				return message
			})
		default:
			return payload
	}
}

// * This function converts the messages to the core messages
export function convertToCoreMessages(
	messages: (OpenAI.ChatCompletionMessageParam & {
		experimental_attachments?: FileAttachment[]
	})[],
): CoreMessage[] {
	const coreMessages: CoreMessage[] = []

	for (const msg of messages) {
		if (!msg.role.match(/(user|system|assistant)/))
			throw new Error(`Unsupported message role: ${msg.role}`)

		const { experimental_attachments, ...rest } = msg

		if (rest.content) {
			coreMessages.push({
				role: msg.role as 'user' | 'system' | 'assistant',
				content: rest.content as string,
			})
		}

		if (experimental_attachments?.length) {
			coreMessages.push({
				role: msg.role as 'user' | 'system' | 'assistant',
				content: experimental_attachments.map((attachment) => {
					const { contentType, content, url } = attachment
					const isImageType = contentType?.includes('image')
					const attachmentType = isImageType ? 'image' : 'text'
					const isFromBucket = (content as string).includes('attachments/')
					let attachmentContent = content

					if (isFromBucket) {
						// Handle attachment content to download the content image/text file
						const fetchUrl = async (contentUrl: string) => {
							await fetch(contentUrl).then((res) => {
								if (!res.ok) {
									throw new Error(
										`Failed to fetch attachment from ${contentUrl}: ${res.statusText}`,
									)
								}

								res.arrayBuffer().then((buffer) => {
									const bufferString = Buffer.from(buffer).toString('base64')
									console.log('Attachment fetched successfully:', {
										contentType,
										content,
										url,
										attachmentType,
										bufferString,
									})
									attachmentContent = `data:${contentType};base64,${bufferString}`
								})
							})
						}
						try {
							fetchUrl(url)
						} catch (error) {
							console.error('Failed to fetch attachment:', error)
							attachmentContent = content
						}
					}

					if (attachmentType === 'image') {
						return {
							type: attachmentType,
							image: attachmentContent,
						} as ImagePart
					}

					// * File type does not work for text file type should be of type file... anyway.
					// ? data content should be processed as below or as ArrayBuffer
					// return {
					//   type: 'file',
					//   data: content,
					// } as FilePart
					const base64Hash =
						typeof attachmentContent === 'string'
							? attachmentContent.split(',')[1]
							: Buffer.from(attachmentContent).toString('base64')
					const textContent = atob(base64Hash)
					return {
						type: attachmentType,
						text: textContent,
					} as TextPart
				}),
			} as CoreMessage)
		}

		// * Here we can add the condition to load the user attachments by reading the user session from cookies
		// * and then adding the attachments to the coreMessages array if there is a message related to the attachments/thread
		// * This is for the LLM context... can be used to vectorize the user attachments and pass them to the
		// * AI model for better context understanding
		// ? base64 encode works for the AttachmentsDisplay
		// TODO: Add condition to handle remote attachments (vectorized bucket)
	}

	return coreMessages
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
	const markers = [
		`

Now please answer the following question: `,
		'Now please answer the following question: ',
	]
	let extracted = str

	const runExtraction = () => {
		let markerFound = false
		for (const marker of markers) {
			const index = extracted.indexOf(marker)
			if (index !== -1) {
				extracted = extracted.substring(index + marker.length)
				markerFound = true
			}
		}
		return markerFound
	}

	while (runExtraction()) {}

	return extracted
}

/**
 * @deprecated
 * This function cleans the text result from the AI to have a final object.
 *
 * If you want to clean up a response string and have an object, use instead `processWithAiObject`
 */
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

export const mbObjectSchema = {
	metadata: metadataSchema,
	examples: examplesSchema,
	tool: toolSchema,
	grammarLanguageImprover: languageGammarSchema,
}

// ? allMessages.uniqBy callback for the use-mb-chat.ts hook
export function verifyDuplicateMessage(message: Partial<MBMessage>) {
	const whitelistContent = [
		CONTINUE_GENERATION_PROMPT,
		CONTINUE_GENERATION_PROMPT_2,
	]

	// Mutate and show the message if it is a continue generation prompt
	if (message.content && whitelistContent.includes(message.content)) {
		return message
	}

	// Filter out system prompts and messages with empty content
	if (!message.content || message.role === 'system') {
		return null
	}

	// For deduplication, normalize the content by:
	// 1. Trimming whitespace
	// 2. Converting to lowercase for case-insensitive comparison
	// 3. Removing extra punctuation and spaces for grammar-corrected versions
	const normalizedContent = message.content
		.trim()
		.toLowerCase()
		.replace(/[^\w\s]/g, '') // Remove punctuation
		.replace(/\s+/g, ' ') // Normalize whitespace

	// Use messageId as primary key, fallback to normalized content for matching
	// This helps identify both exact duplicates and grammar-corrected versions
	return `${message.messageId || 'no-id'}_${normalizedContent}`
}

//? Check if the message has reasoning content
export function hasReasoning(message: Message & Partial<MBMessage>): boolean {
	return Boolean(
		message.parts?.some((part) => part.type === 'reasoning') ||
			message?.thinking,
	)
}

//? Extract reasoning content from any format
export function extractReasoningContent(
	message: Message & Partial<MBMessage>,
): string | null | undefined {
	console.log(
		'message.parts',
		message.parts?.map((msg) => ({ type: msg.type })),
	)
	if (message.parts?.length) {
		const reasoningPart = message.parts.find(
			(part) => part.type === 'reasoning',
		)

		console.log('reasoningPart', reasoningPart)

		if (reasoningPart) return reasoningPart?.reasoning
	}
	return message.thinking
}

// ? Extract image files from the message
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function extractImageFiles(files: any[] | undefined) {
	if (!files || !Array.isArray(files)) return []

	return files
		.filter((file) => file.mimeType?.startsWith('image/'))
		.map((file) => ({
			base64: file.base64,
			uint8Array: file.uint8Array,
			mimeType: file.mimeType,
		}))
}

export function hasImageGeneration(message: MessageWithExamples): boolean {
	if (!message.examples || !Array.isArray(message.examples)) {
		return false
	}

	return message.examples.some(
		(part: StoredImagePart) => part.type === 'file' || part.type === 'image',
	)
}

export function extractImageContent(
	message: MessageWithExamples,
): { base64: string; mimeType: string }[] {
	if (!message.examples || !Array.isArray(message.examples)) {
		console.log('No examples found in message:', message)
		return []
	}

	const imageParts = message.examples.filter(
		(part: StoredImagePart) => part.type === 'file' || part.type === 'image',
	)

	if (imageParts.length === 0) {
		console.log('No image parts found in message examples:', message.examples)
		return []
	}

	console.log('Found image parts:', imageParts)

	return imageParts.map((part: StoredImagePart) => {
		if (!part.data) {
			console.warn('Image part has no data:', part)
			return { base64: '', mimeType: part.mimeType || 'image/png' }
		}

		return {
			base64: part.data,
			mimeType: part.mimeType || 'image/png',
		}
	})
}
