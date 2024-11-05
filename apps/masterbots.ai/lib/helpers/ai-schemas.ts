import {
  getChatbotMetadataTool,
  getWebSearchTool
} from '@/app/api/chat/actions'
import { z } from 'zod'

// ? schema output for webSearch (Non-WordWare)
export const webSearch = z.object({
  searchResults: z
    .string()
    .describe('The search results after calling the webSearch tool.'),
  sources: z
    .array(z.string())
    .describe('The sources where the search was taken.')
})

export const aiTools = {
  webSearch: {
    description:
      'Search in the web for relevant data related only to the user query.',
    parameters: z.object({
      query: z
        .string()
        .describe('The query to use to search for and return results.')
    }),
    execute: getWebSearchTool
  },
  chatbotMetadataExamples: {
    description:
      'Get the chatbot metadata for a given chatbot and user content for Retrieval-Augmented Generation and for your In-Context Learning of user base knowledge.',
    parameters: z.object({
      chatbot: z.object({
        chatbotId: z
          .number()
          .describe('The chatbot ID from 1 to 42. The ID will be given.'),
        categoryId: z
          .number()
          .describe(
            'The chatbot domain (category ID) from 1 to 13. The ID will be given.'
          )
      }),
      userContent: z
        .string()
        .describe('The user content to be used for the chatbot metadata.')
    }),
    execute: getChatbotMetadataTool
  }
}
