import { ChatbotMetadataTool, getWebSearchTool } from '@/app/actions'
import { z } from 'zod'

// ? schema output for webSearch (Non-WordWare)
export const webSearch = z.object({
  searchResults: z.string().describe('The search results after calling the webSearch tool.'),
  sources: z.array(z.string()).describe('The sources where the search was taken.'),
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
        .describe(`The search query to use for retrieving results as of ${new Date()}.`),
    }),
    execute: getWebSearchTool,
  },
  chatbotMetadataExamples: {
    description:
      'Fetch metadata for a specified chatbot and user content to support Retrieval-Augmented Generation and In-Context Learning.',
    parameters: z.object({
      chatbot: z.object({
        chatbotId: z.number().describe('The ID of the chatbot, ranging from 1 to 42.'),
        categoryId: z
          .number()
          .describe('The domain category ID of the chatbot, ranging from 1 to 13.'),
        domainId: z.number().describe('The domain ID of the chatbot, ranging from 1 to 3.'),
      }),
      userContent: z
        .string()
        .describe('The user content to be used for generating chatbot metadata.'),
    }),
    execute: ChatbotMetadataTool,
  },
}

// ? useObject schemas for the AI tools
export const metadataSchema = z.object({
  categories: z.array(z.string()).describe('Exact category name from provided options.'),
  subCategories: z.array(z.string()).describe('Exact subcategory name from chosen category.'),
  tags: z.array(z.string()).describe('Array of exact tag names from provided options.'),
})

// TODO: Define a tool schema for tool returning objects
export const toolSchema = z.object({
  toolName: z.string(),
  chatbot: z.string(),
  threadId: z.string().optional(),
})

export const examplesSchema = z.array(
  z.object({
    threadId: z.string(),
    question: z.string(),
    answer: z.string(),
  }),
)

// '{ "language": "es", "originalText": "Q restaurant puede recomendar en zona de San Francisco, CA?", "improvedText": "¿Qué restaurante puedes recomendar en la zona de San Francisco, CA?", "translatedText": "What restaurant can you recommend in the area of San Francisco, CA?", "improved": true }'
export const languageGammarSchema = z.object({
  language: z.string().describe('The language of the original text.'), // spanish
  originalText: z.string().describe('The original text provided by the user.'), // I like beer
  improvedText: z.string().describe('The grammatically improved text.'), // 'I like beer'
  improved: z.boolean().describe('Indicates if the text was improved or viewed.'), // false
})