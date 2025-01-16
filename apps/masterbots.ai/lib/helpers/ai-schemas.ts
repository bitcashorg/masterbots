import { getChatbotMetadataTool, getWebSearchTool } from '@/app/actions'
import { z } from 'zod'

// ? schema output for webSearch (Non-WordWare)
export const webSearch = z.object({
	searchResults: z
		.string()
		.describe('The search results after calling the webSearch tool.'),
	sources: z
		.array(z.string())
		.describe('The sources where the search was taken.'),
})

export const aiTools = {
	webSearch: {
		description:
			'Use to conduct a web search to gather relevant information based on the user query. ' +
			'Ensure the search results and sources are returned in the specified format and links. ' +
			'**Adhere strictly to any provided output examples.**',
		parameters: z.object({
			query: z
				.string()
				.describe(
					`The search query to use for retrieving results as of ${new Date()}.`,
				),
		}),
		execute: getWebSearchTool,
	},
	chatbotMetadataExamples: {
		description:
			'Fetch metadata for a specified chatbot and user content to support Retrieval-Augmented Generation and In-Context Learning.',
		parameters: z.object({
			chatbot: z.object({
				chatbotId: z
					.number()
					.describe('The ID of the chatbot, ranging from 1 to 42.'),
				categoryId: z
					.number()
					.describe(
						'The domain category ID of the chatbot, ranging from 1 to 13.',
					),
			}),
			userContent: z
				.string()
				.describe(
					'The user content to be used for generating chatbot metadata.',
				),
		}),
		execute: getChatbotMetadataTool,
	},
}
