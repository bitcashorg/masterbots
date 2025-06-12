'use server'

import type { aiTools } from '@/lib/helpers/ai-schemas'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { AiClientType } from '@/types/types'
import { anthropic } from '@ai-sdk/anthropic'
import { deepseek } from '@ai-sdk/deepseek'
import { google } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { perplexity } from '@ai-sdk/perplexity'
import { generateObject, generateText, tool } from 'ai'
import { appConfig } from 'mb-env'
import type OpenAI from 'openai'
import { z } from 'zod'
import { getChatbotMetadata } from '.'

const { WORDWARE_API_KEY } = process.env

// TODO: Finish ICL implementation. ICL should be called as a tool that Ai will use to generate content.
/**
 * @deprecated
 * ICL is not implemented as a tool, but part of the appendMBContext function in the use-mb-chat context hook.
 *
 * 💡 Use `getChatbotMetadata` function instead.
 */
export async function ChatbotMetadataTool({
	chatbot,
	userContent,
}: z.infer<typeof aiTools.chatbotMetadataExamples.parameters>) {
	console.info('Executing Chatbot Metadata Tool... Chatbot: ', {
		chatbot,
		userContent,
	})

	try {
		const chatbotMetadata = await getChatbotMetadata(
			{
				chatbot: chatbot.chatbotId,
				isPowerUp: false,
			},
			userContent,
			// ? We will be using OpenAi for a while, at least for these tools
			'OpenAI',
		)

		if (!appConfig.features.devMode) {
			console.log('chatbotMetadata ==> ', chatbotMetadata)
		}
		return JSON.stringify({
			chatbotMetadata,
		})
	} catch (error) {
		console.error('Error fetching chatbot metadata: ', error)
		return JSON.stringify({
			error: 'Internal Server Error while fetching chatbot metadata',
		})
	}
}

// Web search tool definition
const webSearchTool = tool({
	description: 'Search the web for current information on a given topic',
	parameters: z.object({
		query: z.string().describe('The search query to execute'),
	}),
	execute: async ({ query }) => {
		try {
			// Use a web search API (you can replace this with your preferred search service)
			const response = await fetch('https://api.tavily.com/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
				},
				body: JSON.stringify({
					query,
					max_results: 5,
					include_answer: true,
				}),
			})

			if (!response.ok) {
				throw new Error(`Search API error: ${response.statusText}`)
			}

			const data = await response.json()

			return {
				results: data.results || [],
				answer: data.answer || '',
			}
		} catch (error) {
			console.error('Web search error:', error)
			return {
				results: [],
				answer: 'Unable to perform web search at this time.',
				error: error instanceof Error ? error.message : 'Unknown error',
			}
		}
	},
})

// Enhanced AI executor with web search support
export async function executeAIWithWebSearch({
	model,
	clientType,
	messages,
	webSearch = false,
	systemPrompt,
	userPrompt,
	temperature = 0.7,
	maxTokens = 4000,
}: {
	model: string
	clientType: AiClientType
	messages: (OpenAI.ChatCompletionMessageParam & {
		experimental_attachments?: FileAttachment[]
	})[]
	webSearch?: boolean
	systemPrompt?: string
	userPrompt?: string
	temperature?: number
	maxTokens?: number
}) {
	// Get the appropriate model instance
	const modelInstance = getModelInstance(clientType, model)

	// Prepare tools array
	const tools = webSearch ? { webSearch: webSearchTool } : undefined

	// Format messages for the AI SDK
	const formattedMessages = formatMessagesForAI(
		messages,
		systemPrompt,
		userPrompt,
	)

	try {
		if (webSearch) {
			// Use generateText with tools for web search capability
			const result = await generateText({
				model: modelInstance,
				messages: formattedMessages,
				tools,
				maxSteps: 3, // Allow multiple tool calls
				temperature,
				maxTokens,
				onStepFinish: (step) => {
					console.log('Step finished:', step.stepType)
					if (step.toolCalls?.length) {
						console.log('Tool calls:', step.toolCalls)
					}
				},
			})

			return {
				text: result.text,
				usage: result.usage,
				steps: result.steps,
				toolCalls: result.steps?.flatMap((step) => step.toolCalls || []),
			}
		}

		// Regular generateText without tools
		const result = await generateText({
			model: modelInstance,
			messages: formattedMessages,
			temperature,
			maxTokens,
		})

		return {
			text: result.text,
			usage: result.usage,
		}
	} catch (error) {
		console.error('AI execution error:', error)
		throw error
	}
}

// Helper function to get model instance based on client type
function getModelInstance(clientType: AiClientType, model: string) {
	switch (clientType) {
		case 'OpenAI':
			return openai(model)
		case 'Anthropic':
			return anthropic(model)
		case 'Gemini':
			return google(model)
		case 'DeepSeek':
		case 'GroqDeepSeek':
			return deepseek(model)
		case 'Perplexity':
			return perplexity(model)
		default:
			throw new Error(`Unsupported client type: ${clientType}`)
	}
}

// Helper function to format messages for AI SDK
function formatMessagesForAI(
	messages: (OpenAI.ChatCompletionMessageParam & {
		experimental_attachments?: FileAttachment[]
	})[],
	systemPrompt?: string,
	userPrompt?: string,
) {
	const formattedMessages = []

	// Add system prompt if provided
	if (systemPrompt) {
		formattedMessages.push({
			role: 'system' as const,
			content: systemPrompt,
		})
	}

	// Add existing messages
	formattedMessages.push(
		...messages.map((msg) => ({
			role: msg.role as 'user' | 'assistant' | 'system',
			content: msg.content,
		})),
	)

	// Add user prompt if provided
	if (userPrompt) {
		formattedMessages.push({
			role: 'user' as const,
			content: userPrompt,
		})
	}

	return formattedMessages
}

// ! TODO: Remove this function when the new web search tool is fully implemented.
// export async function getWebSearchTool({
// 	query,
// }: z.infer<typeof aiTools.webSearch.parameters>) {
// 	console.info('Executing Web Search Tool... Query: ', query)
// 	const webSearchFlow = wordwareFlows.find((flow) => flow.path === 'webSearch')

// 	if (!webSearchFlow) {
// 		throw new Error('Web Search tool is not available')
// 	}

// 	try {
// 		const appDataResponse = await axios.get(
// 			`https://api.wordware.ai/v1alpha/apps/masterbots/${webSearchFlow.id}`,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${WORDWARE_API_KEY}`,
// 					'Content-Type': 'application/json',
// 				},
// 			},
// 		)

// 		if (appDataResponse.status >= 400) {
// 			console.error('Error fetching app data: ', appDataResponse)
// 			if (appDataResponse.status >= 500) {
// 				throw new Error(
// 					'Internal Server Error while fetching app data. Please try again later.',
// 				)
// 			}
// 			throw new Error('Failed to authenticate for the app. Please try again.')
// 		}

// 		const appData: WordWareDescribeDAtaResponse = await appDataResponse.data

// 		console.log('appData ==> ', appData)

// 		const runAppResponse = await fetch(
// 			`https://api.wordware.ai/v1alpha/apps/masterbots/${webSearchFlow.id}/${appData.version}/runs/wait`,
// 			{
// 				method: 'POST',
// 				headers: {
// 					Authorization: `Bearer ${WORDWARE_API_KEY}`,
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					inputs: {
// 						query,
// 					},
// 				}),
// 			},
// 		)

// 		if (
// 			runAppResponse.status >= 400 ||
// 			!runAppResponse.ok ||
// 			!runAppResponse.body
// 		) {
// 			console.error('Error running app: ', runAppResponse)
// 			if (runAppResponse.status >= 500) {
// 				throw new Error(
// 					'Internal Server Error while fetching app data. Please try again later.',
// 				)
// 			}
// 			throw new Error('Failed to authenticate for the app. Please try again.')
// 		}

// 		const response = await runAppResponse.json()
// 		// ! error TS1501: This regular expression flag is only available when targeting 'es2018' or later.
// 		// const jsonRegex = /data:\s*({.*?})(?=\s*data:|\s*event:|$)/gs
// 		// ? Changing target not working.
// 		// TODO: Check typescript config...
// 		const jsonRegex = /data:\s*({.*?})(?=\s*data:|\s*event:|$)/g

// 		console.log(
// 			'[SERVER] Web Search Response web search status --> ',
// 			response.status,
// 		)
// 		console.log(
// 			'[SERVER] Web Search Response web search outputs --> ',
// 			response.outputs['web search'],
// 		)

// 		if (response.status !== 'COMPLETE') {
// 			throw new Error('Web Search could not be completed.')
// 		}

// 		if (
// 			!response.outputs['web search']?.output &&
// 			!response.outputs['web search']?.logs
// 		) {
// 			throw new Error('No output given. Web search could not be completed')
// 		}

// 		return `## INPUT:

//     ${response.outputs['web search']?.output ?? response.outputs['web search']?.logs}`
// 	} catch (error) {
// 		return `Something went wrong with web search that failed to provide results. Please try again later.

//     [ERROR LOG]: ${JSON.stringify(error, null, 2)}`
// 	}
// }
