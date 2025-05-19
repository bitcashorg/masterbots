'use server'

import { AIModels } from '@/app/api/chat/models/models'
import { deepseek } from '@ai-sdk/deepseek'

import {
	createChatbotMetadataPrompt,
	createImprovementPrompt,
	setDefaultPrompt,
} from '@/lib/constants/prompts'
import {
	convertToCoreMessages,
	mbObjectSchema,
	setStreamerPayload,
} from '@/lib/helpers/ai-helpers'
import { aiTools } from '@/lib/helpers/ai-schemas'
import { fetchChatbotMetadata } from '@/services/hasura'
import type {
	AiClientType,
	ChatbotMetadata,
	ChatbotMetadataClassification,
	ChatbotMetadataHeaders,
	ClassifyQuestionParams,
	CleanPromptResult,
	JSONResponseStream,
} from '@/types/types'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import {
	type Message,
	extractReasoningMiddleware,
	smoothStream,
	streamObject,
	streamText,
	wrapLanguageModel,
} from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { appConfig } from 'mb-env'
import type OpenAI from 'openai'
import type { ZodType, z } from 'zod'

const OPEN_AI_ENV_CONFIG = {
	TOP_P: process.env.OPENAI_TOP_P
		? Number.parseFloat(process.env.OPENAI_TOP_P)
		: undefined,
	TEMPERATURE: process.env.OPENAI_TEMPERATURE
		? Number.parseFloat(process.env.OPENAI_TEMPERATURE)
		: undefined,
}

const initializeGroq = (apiKey: string) => {
	if (!apiKey) {
		throw new Error('GROQ_API_KEY is not defined in environment variables')
	}

	const groqProvider = createGroq({
		apiKey,
	})

	const enhancedModel = wrapLanguageModel({
		model: groqProvider('deepseek-r1-distill-llama-70b'),
		middleware: extractReasoningMiddleware({ tagName: 'think' }),
	})

	return enhancedModel
}

//* this function is used to create a client for the OpenAI API
const initializeOpenAi = createOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	compatibility: 'strict',
})

const initializeDeepSeek = (apiKey: string) => {
	if (!apiKey) {
		throw new Error('DEEPSEEK_API_KEY is not defined in environment variables')
	}
	return deepseek
}

const initializeAnthropic = createAnthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
})

//* Perplexity API uses openai-sdk with compatible mode and a different base URL
export async function initializePerplexity(apiKey: string) {
	if (!apiKey) {
		throw new Error(
			'PERPLEXITY_API_KEY is not defined in environment variables',
		)
	}
	return await createOpenAI({
		apiKey,
		baseURL: 'https://api.perplexity.ai',
		compatibility: 'compatible',
	})
}

const initializeGoogle = (apiKey: string) => {
	if (!apiKey) {
		throw new Error(
			'GOOGLE_GENERATIVE_AI_API_KEY is not defined in environment variables',
		)
	}
	return createGoogleGenerativeAI({
		apiKey,
	})
}

// * This function improves the message using the AI
export async function improveMessage(
	userPrompt: {
		content: string
		allUserMessages: Message[]
	},
	clientType: AiClientType,
	model: string,
	retryCount = 0,
): Promise<CleanPromptResult> {
	const messageImprovementPrompt = createImprovementPrompt(userPrompt)

	try {
		const result: z.infer<typeof mbObjectSchema.grammarLanguageImprover> =
			await processWithAiObject({
				prompt: messageImprovementPrompt,
				schema: mbObjectSchema.grammarLanguageImprover,
			})

		if (appConfig.features.devMode) {
			console.log('result::improveMessage --> ', result)
		}

		if (
			!result.improved &&
			(result.originalText === result.improvedText || !result.improvedText)
		) {
			if (retryCount >= 2) {
				console.warn(
					'AI did not modify the text or returned invalid result. Returning original text.',
				)
				return setDefaultPrompt(result.originalText)
			}

			console.warn(
				'AI did not modify the text or returned invalid result. Recursively executing improved prompt.',
			)
			return await improveMessage(userPrompt, clientType, model, retryCount + 1)
		}

		return result
	} catch (error) {
		const originalText = handleImprovementError(
			error,
			userPrompt.content,
			clientType,
			model,
		)
		return setDefaultPrompt(originalText)
	}
}

export async function getChatbotMetadata(
	metadataHeaders: ChatbotMetadataHeaders,
	userPrompt: string,
	clientType: AiClientType,
) {
	const chatbotMetadata = await fetchChatbotMetadata(metadataHeaders)

	if (!chatbotMetadata) {
		console.error(
			'Chatbot metadata not found. Generating response without them.',
		)
		return {
			domainName: '',
			categories: [],
			subcategories: [],
			tags: [],
		}
	}

	const prompt = createChatbotMetadataPrompt(chatbotMetadata, userPrompt)
	const response = await classifyQuestion({
		prompt,
		clientType,
		chatbotMetadata,
	})

	// console.log('prompt, response --> ', prompt)
	// console.log('classifyQuestion, response --> ', response)

	response.domainName = chatbotMetadata.domainName

	return response
}

// * This function process the AI response and return the cleaned result
export async function processWithAi(
	prompt: string,
	clientType: AiClientType,
	model: string,
): Promise<string> {
	try {
		const messages = [
			{ role: 'user', content: prompt },
		] as OpenAI.ChatCompletionMessageParam[]
		const processedMessages = setStreamerPayload(clientType, messages)

		const response = await createResponseStream(clientType, {
			model: AIModels.Default,
			messages: processedMessages,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any)

		if (!response.body) {
			throw new Error('Response body is null')
		}

		if (response.status !== 200) {
			const errorText = await response.text()
			throw new Error(
				`API responded with status ${response.status}: ${errorText} `,
			)
		}

		const result = await readStreamResponse(response.body)
		return result
	} catch (error) {
		console.error('Error in processWithAI:', error)
		throw error
	}
}

export type AiObjectSchema =
	| typeof mbObjectSchema.metadata
	| typeof mbObjectSchema.examples
	| typeof mbObjectSchema.tool
	| typeof mbObjectSchema.grammarLanguageImprover

export async function processWithAiObject({
	prompt,
	chatbotMetadata,
	schema,
}: {
	prompt: string
	schema: AiObjectSchema
	chatbotMetadata?: ChatbotMetadata
}) {
	try {
		const response = await createResponseStreamObject(schema, {
			model: AIModels.Default,
			prompt,
			chatbotMetadata,
		})

		// @ts-ignore
		const responseObject = response.curr

		// ! Experimental. Use when stable...
		// for await (const resObj of readStreamableValue(response)) {
		//   if (!resObj) {
		//     throw new Error('Failed to process the request, object stream is null')
		//   }

		//   responseObject = resObj
		// }

		if (!responseObject) {
			throw new Error('Failed to get response object')
		}

		// console.log('result::processWithAiObject -->', responseObject)
		return responseObject
	} catch (error) {
		console.error('Error in processWithAIObject: ', error)
		throw error
	}
}

// * This function reads the AI response and return the cleaned result
async function readStreamResponse(body: ReadableStream): Promise<string> {
	const reader = body.getReader()
	let accumulatedResult = ''
	while (true) {
		const { done, value } = await reader.read()
		if (done) break
		const chunk = new TextDecoder().decode(value)
		accumulatedResult += chunk
	}

	let result = ''
	const parts = accumulatedResult.split('\n')
	for (const part of parts) {
		const match = part.match(/^0:"(.*)"$/)
		if (match) {
			result += match[1]
		}
	}

	return result
}

function handleImprovementError(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error: any,
	originalContent: string,
	clientType?: AiClientType,
	model?: string,
): string {
	console.error('Error in improvement process:', error)
	return originalContent
}

//* Create a response stream based on the client model type
export async function createResponseStream(
	clientType: AiClientType,
	json: JSONResponseStream,
	req?: Request,
) {
	// TODO: Integrate powerUp mode into the response stream whenever required.
	const {
		model,
		messages: rawMessages,
		previewToken,
		webSearch,
		isPowerUp,
	} = json
	const messages = setStreamerPayload(clientType, rawMessages || [])

	const tools: Partial<typeof aiTools> = {
		// ? Temp disabling ICL as tool. Using direct ICL integration to main prompt instead. Might be enabled later.
		// chatbotMetadataExamples: aiTools.chatbotMetadataExamples
	}

	// console.log('[SERVER] webSearch', webSearch)

	if (webSearch) tools.webSearch = aiTools.webSearch

	try {
		let response: ReturnType<typeof streamText>

		const coreMessages = convertToCoreMessages(
			messages as OpenAI.ChatCompletionMessageParam[],
		)

		switch (clientType) {
			case 'OpenAI': {
				const openaiModel = initializeOpenAi(model)
				const isReasoningModel = model.startsWith('o4-mini')
				const modelToUse = openaiModel

				//* For OpenAI reasoning models, we don't need the middleware approach reasoning comes through the reasoningSummary option

				const openAiStreamConfig = isReasoningModel
					? {
							messages: coreMessages,
							model: modelToUse,
							maxRetries: 2,
							tools,
							temperature: 1,
							// providerOptions: {
							// 	openai: {
							// 		reasoningEffort: 'low',
							// 		reasoningSummary: 'auto',
							// 	},
							// },
						}
					: {
							temperature: OPEN_AI_ENV_CONFIG.TEMPERATURE,
							topP: OPEN_AI_ENV_CONFIG.TOP_P,
							messages: coreMessages,
							model: modelToUse,
							maxRetries: 2,
							tools,
						}

				if (appConfig.features.experimentalAiConfig) {
					// @ts-ignore: It does exist in the config
					openAiStreamConfig.experimental_transform = smoothStream({
						delayInMs: appConfig.features.experimentalStreamDelayMs,
						chunking: 'line',
					})
				}
				response = await streamText(openAiStreamConfig)
				break
			}
			case 'Anthropic': {
				const anthropicModel = initializeAnthropic(model, {
					cacheControl: true,
				})
				response = await streamText({
					model: anthropicModel,
					messages: coreMessages,
					temperature: 0.3,
					// maxTokens: 300,
					tools,
					maxRetries: 2,
				})
				break
			}
			case 'Perplexity': {
				const perplexity = await initializePerplexity(
					previewToken || (process.env.PERPLEXITY_API_KEY as string),
				)
				const perplexityModel = perplexity(model)
				response = await streamText({
					model: perplexityModel,
					messages: coreMessages,
					temperature: 0.3,
					// maxTokens: 1000,
					tools,
					maxRetries: 2,
				})
				break
			}
			case 'DeepSeek': {
				const deepseekModel = initializeDeepSeek(
					previewToken || (process.env.DEEPSEEK_API_KEY as string),
				)(model)

				response = await streamText({
					model: deepseekModel,
					messages: coreMessages,
					temperature: 0.3, // DeepSeek works well with lower temperature for reasoning
					// maxTokens: 2000, // DeepSeek can handle longer contexts
					tools,
					maxRetries: 2,
				})
				break
			}
			case 'GroqDeepSeek': {
				const groqModel = initializeGroq(
					previewToken || (process.env.GROQ_API_KEY as string),
				)

				response = await streamText({
					model: groqModel,
					messages: coreMessages,
					temperature: 0.2, //? Groq DeepSeek works well with lower temperature
					// maxTokens: 2000,
					tools,
					maxRetries: 2,
				})
				break
			}
			case 'Gemini': {
				const googleAI = initializeGoogle(
					previewToken || (process.env.GOOGLE_GENERATIVE_AI_API_KEY as string),
				)
				const googleModel = googleAI(model)

				//? Adjust configuration for Gemini 2.0 Flash Exp image generation
				const isGemini2FlashExp = model === 'gemini-2.0-flash-exp'
				console.log('isGemini2FlashExp -> 🤖 ', isGemini2FlashExp)

				//? If using Gemini 2.0 Flash Exp, only use user messages
				const adjustedMessages = isGemini2FlashExp
					? coreMessages.filter((msg) => msg.role === 'user')
					: coreMessages

				response = await streamText({
					model: googleModel,
					messages: adjustedMessages,
					temperature: 0.3,
					tools,
					maxRetries: 2,
					providerOptions: {
						google: {
							useSearchGrounding: webSearch || false,
							...(model.endsWith('flash-exp')
								? {
										responseModalities: ['TEXT', 'IMAGE'],
									}
								: {}),
						},
					},
				})
				break
			}
			default:
				throw new Error('Unsupported client type')
		}

		// @ts-ignore
		const dataStreamResponse = response.toDataStreamResponse({
			sendReasoning:
				clientType === 'DeepSeek' ||
				clientType === 'GroqDeepSeek' ||
				(clientType === 'OpenAI' && model.includes('o4-mini')),
			getErrorMessage(error) {
				if (error instanceof Error) return error.message
				return 'Failed to process the request'
			},
		})

		const responseStream = dataStreamResponse.body as ReadableStream

		return new Response(responseStream, {
			headers: { 'Content-Type': 'text/event-stream' },
		})
	} catch (error) {
		console.error('--- ERROR IN createResponseStream ---')
		throw error
	}
}

export async function createResponseStreamObject(
	schema: ZodType<
		| z.infer<typeof mbObjectSchema.examples>
		| z.infer<typeof mbObjectSchema.metadata>
		| z.infer<typeof mbObjectSchema.tool>
		| z.infer<typeof mbObjectSchema.grammarLanguageImprover>
	>,
	json: JSONResponseStream & {
		prompt: string
		chatbotMetadata?: ChatbotMetadata
	},
	req?: Request,
) {
	const { model, chatbotMetadata, prompt, webSearch } = json

	const tools: Partial<typeof aiTools> = {
		// webSearch: aiTools.webSearch,
		// ? Temp disabling ICL as tool. Using direct ICL integration to main prompt instead. Might be enabled later.
		// chatbotMetadataExamples: aiTools.chatbotMetadataExamples
	}

	// console.log('[SERVER] webSearch', webSearch)

	// if (webSearch) tools.webSearch = aiTools.webSearch

	try {
		const openaiModel = initializeOpenAi(model)
		const stream = createStreamableValue()
		const { partialObjectStream } = streamObject({
			model: openaiModel,
			schema,
			output: 'object',
			prompt,
		})

		// ? This validates the object stream before to return a object stream
		for await (const objectStream of partialObjectStream) {
			if (!objectStream) {
				throw new Error('Failed to process the request, object stream is null')
			}

			stream.update(objectStream)
		}

		stream.done()

		return stream.value
	} catch (error) {
		console.error('Error in createResponseStreamObject:', error)
		throw error
	}
}

export async function classifyQuestion({
	prompt,
	clientType,
	chatbotMetadata,
	maxRetries = 3,
	retryCount = 0,
}: ClassifyQuestionParams): Promise<ChatbotMetadataClassification> {
	try {
		const responseObj = await processWithAiObject({
			prompt,
			chatbotMetadata,
			schema: mbObjectSchema.metadata,
		})
		const errors = []

		for (const tag of responseObj.tags) {
			if (!chatbotMetadata.tags.includes(tag)) {
				responseObj.tags = responseObj.tags.filter((t: string) => t !== tag)

				errors.push(`Tag ${tag} not found in chatbot metadata`)
			}
		}

		for (const category of responseObj.categories) {
			const categoryKey = Object.keys(chatbotMetadata.categories).find((cat) =>
				cat.includes(category),
			) as keyof typeof chatbotMetadata.categories
			// console.log('categoryKey -> ', categoryKey)
			if (!chatbotMetadata.categories[categoryKey]) {
				responseObj.categories = responseObj.categories.filter(
					(c: string) => c !== category,
				)

				errors.push(`Category ${category} not found in chatbot metadata`)
			} else {
				for (const subCategory of responseObj.subCategories) {
					if (
						Array.isArray(chatbotMetadata.categories[categoryKey]) &&
						!chatbotMetadata.categories[categoryKey].includes(subCategory)
					) {
						responseObj.subCategories = responseObj.subCategories.filter(
							(sc: string) => sc !== subCategory,
						)

						errors.push(
							`SubCategory ${subCategory} not found in chatbot metadata for category ${category}`,
						)
					}
				}
			}
		}

		// console.log('class, subclass and tags are valid', responseObj)
		console.error('Errors: ', JSON.stringify(errors, null, 3))

		responseObj.errors = errors

		return responseObj
	} catch (error) {
		console.error('Error in classifyQuestion:', error)
		if (retryCount >= maxRetries) {
			console.error(
				`Max retries reached. Returning original content after ${maxRetries} attempts.`,
			)
			throw error
		}

		return classifyQuestion({
			prompt,
			clientType,
			chatbotMetadata,
			maxRetries,
			retryCount: retryCount + 1,
		})
	}
}
