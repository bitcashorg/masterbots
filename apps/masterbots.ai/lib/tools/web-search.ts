import { tool } from 'ai'
import { z } from 'zod'

export interface WebSearchResult {
	title: string
	url: string
	description: string
	thumbnail?: {
		src: string
	}
	profile: {
		name: string
	}
}

// Define the web search tool schema
export const webSearchTool = tool({
	description: 'Search the web for current information on a given topic',
	parameters: z.object({
		query: z.string().describe('The search query to execute'),
	}),
	execute: async ({ query }): Promise<WebSearchResult[]> => {
		try {
			// Call your web search API endpoint
			const response = await fetch('/api/web-search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query }),
			})

			if (!response.ok) {
				throw new Error(`Web search failed: ${response.statusText}`)
			}

			const data = await response.json()
			return data.results || []
		} catch (error) {
			console.error('Web search error:', error)
			return []
		}
	},
})

// Alternative implementation using WordWare flow
export const wordwareWebSearchTool = tool({
	description: 'Search the web using WordWare flow for current information',
	parameters: z.object({
		query: z.string().describe('The search query to execute'),
	}),
	execute: async ({ query }): Promise<WebSearchResult[]> => {
		try {
			const response = await fetch('/api/wordware/run', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					promptId: 'c290c3dd-12d7-4fd2-9e03-1608bb9f7c84', // webSearch flow ID
					inputs: { query },
				}),
			})

			if (!response.ok) {
				throw new Error(`WordWare web search failed: ${response.statusText}`)
			}

			const data = await response.json()
			return data.parsed || []
		} catch (error) {
			console.error('WordWare web search error:', error)
			return []
		}
	},
})
