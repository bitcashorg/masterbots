import { getModelClient } from '@/lib/ai/get-model-client'
import { getModelClientType } from '@/lib/helpers/ai-helpers'
import type { AiClientType } from '@/types/types'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { generateObject, generateText } from 'ai'
import { z } from 'zod'

const searchResultSchema = z.object({
	url: z.string(),
	title: z.string(),
	description: z.string(),
	content: z.string(),
})

const webSearchSchema = z.object({
	searchResults: z.array(searchResultSchema),
	summary: z
		.string()
		.describe('A concise summary of the search results relevant to the query'),
	sources: z.array(z.string()).describe('The URLs of the sources used'),
})

// Schema for web search queries
const searchQuerySchema = z.object({
	queries: z.array(z.string()).describe('Array of optimized search queries'),
})

// Schema for web search results
const webSearchResultSchema = z.object({
	searchResults: z
		.string()
		.describe('The search results after calling the webSearch tool'),
	sources: z
		.array(z.string())
		.describe('The sources where the search was taken'),
})

export type WebSearchResult = z.infer<typeof searchResultSchema>
export type WebSearchResponse = z.infer<typeof webSearchSchema>

export interface WebSearchAgentConfig {
	model?: string
	clientType?: AiClientType
	maxRetries?: number
	searchApiKey?: string
	searchEngineId?: string
}

export class WebSearchAgent {
	private config: Required<WebSearchAgentConfig>

	constructor(config: WebSearchAgentConfig = {}) {
		this.config = {
			model: config.model || 'gpt-4o-mini',
			clientType:
				config.clientType || getModelClientType(config.model || 'gpt-4o-mini'),
			maxRetries: config.maxRetries || 3,
			searchApiKey:
				config.searchApiKey || process.env.GOOGLE_SEARCH_API_KEY || '',
			searchEngineId:
				config.searchEngineId || process.env.GOOGLE_SEARCH_ENGINE_ID || '',
		}
	}

	/**
	 * Generate optimized search queries from user input
	 */
	async generateSearchQueries(userQuery: string): Promise<string[]> {
		try {
			const client = getModelClient({
				model: this.config.model,
				clientType: this.config.clientType,
			})

			const { object } = await generateObject({
				model: client,
				schema: searchQuerySchema,
				prompt: `Generate 2-3 optimized search queries for the following user question. 
        Make the queries specific and likely to return relevant results from a search engine.
        
        User question: ${userQuery}`,
			})

			return object.queries
		} catch (error) {
			console.error('Error generating search queries:', error)
			return [userQuery] // Fallback to original query
		}
	}

	/**
	 * Perform web search using Google Custom Search API
	 */
	async performWebSearch(query: string): Promise<WebSearchResult[]> {
		if (!this.config.searchApiKey || !this.config.searchEngineId) {
			console.warn('Google Search API credentials not configured')
			return []
		}

		try {
			const searchUrl = new URL('https://www.googleapis.com/customsearch/v1')
			searchUrl.searchParams.set('key', this.config.searchApiKey)
			searchUrl.searchParams.set('cx', this.config.searchEngineId)
			searchUrl.searchParams.set('q', query)
			searchUrl.searchParams.set('num', '10')

			const response = await fetch(searchUrl.toString())
			if (!response.ok) {
				throw new Error(`Search API returned ${response.status}`)
			}

			const data = await response.json()

			return (data.items || []).map((item: Record<string, unknown>) => ({
				title: item.title,
				url: item.link,
				content: item.snippet,
				profile: {
					name: item.displayLink || new URL(item.link as string).hostname,
				},
				thumbnail:
					(item.pagemap as Record<string, unknown>)?.cse_thumbnail &&
					Array.isArray(
						(item.pagemap as Record<string, unknown>).cse_thumbnail,
					) &&
					(
						(item.pagemap as Record<string, unknown>).cse_thumbnail as Array<
							Record<string, unknown>
						>
					)[0]
						? {
								src: (
									(item.pagemap as Record<string, unknown>)
										.cse_thumbnail as Array<Record<string, unknown>>
								)[0].src,
							}
						: undefined,
			}))
		} catch (error) {
			console.error('Error performing web search:', error)
			return []
		}
	}

	/**
	 * Search and synthesize results using LLM
	 */
	async searchAndSynthesize(userQuery: string): Promise<{
		searchResults: string
		sources: string[]
		rawResults: WebSearchResult[]
	}> {
		try {
			// Generate optimized search queries
			const queries = await this.generateSearchQueries(userQuery)

			// Perform searches for all queries
			const allResults: WebSearchResult[] = []
			for (const query of queries) {
				const results = await this.performWebSearch(query)
				allResults.push(...results)
			}

			// Remove duplicates based on URL
			const uniqueResults = allResults.filter(
				(result, index, self) =>
					index === self.findIndex((r) => r.url === result.url),
			)

			if (uniqueResults.length === 0) {
				return {
					searchResults: 'No search results found for the given query.',
					sources: [],
					rawResults: [],
				}
			}

			// Synthesize results using LLM
			const client = getModelClient({
				model: this.config.model,
				clientType: this.config.clientType,
			})

			const searchContext = uniqueResults
				.slice(0, 10) // Limit to top 10 results
				.map(
					(result, index) =>
						`[${index + 1}] ${result.title}\nURL: ${result.url}\nContent: ${result.content}\n`,
				)
				.join('\n')

			const { object } = await generateObject({
				model: client,
				schema: webSearchResultSchema,
				prompt: `You are a helpful assistant that synthesizes web search results to answer user questions.

User question: ${userQuery}

Search results:
${searchContext}

Please provide a comprehensive answer based on the search results. Include relevant information from multiple sources when possible. Be factual and cite the sources appropriately.`,
			})

			return {
				searchResults: object.searchResults,
				sources: object.sources,
				rawResults: uniqueResults.slice(0, 10),
			}
		} catch (error) {
			console.error('Error in searchAndSynthesize:', error)
			return {
				searchResults:
					'An error occurred while searching and processing the results.',
				sources: [],
				rawResults: [],
			}
		}
	}

	/**
	 * Simple web search method for tool integration
	 */
	async search(query: string): Promise<WebSearchResult[]> {
		const queries = await this.generateSearchQueries(query)
		const allResults: WebSearchResult[] = []

		for (const searchQuery of queries) {
			const results = await this.performWebSearch(searchQuery)
			allResults.push(...results)
		}

		// Remove duplicates and return top 5
		const uniqueResults = allResults.filter(
			(result, index, self) =>
				index === self.findIndex((r) => r.url === result.url),
		)

		return uniqueResults.slice(0, 5)
	}
}
