import {
	type Client as WsClient,
	createClient as createWsClient,
} from 'graphql-ws'
import { type MbEnv, endpoints } from 'mb-env'
import { type Client, createClient } from '../generated'
import type { GraphqlOperation } from '../generated/runtime'

export * from '../generated'

// Cache for storing responses
const responseCache = new Map<
	string,
	{ data: Record<string, unknown>; timestamp: number }
>()
// Track in-flight requests to avoid duplicates
const inflightRequests = new Map<string, Promise<Record<string, unknown>>>()

// Default cache TTL (5 minutes)
const DEFAULT_CACHE_TTL = 5 * 60 * 1000
const DEFAULT_ENABLE_CACHE = process.env.ENABLE_GRAPHQL_CACHE === 'true'

// Server side client
export function createMbClient({
	config,
	jwt,
	env,
	adminSecret,
	debug,
	cacheTTL = DEFAULT_CACHE_TTL,
	enableCache = DEFAULT_ENABLE_CACHE,
}: GraphQLSdkProps = {}): MbClient {
	const { subscribe } = createWsClient({
		url: endpoints[env || 'prod'].replace('http', 'ws'),
	})

	const client = createClient({
		fetcher: async (operation: GraphqlOperation | GraphqlOperation[]) => {
			const headers = {
				'Cache-Control': 'no-cache',
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
				...(adminSecret ? { 'x-hasura-admin-secret': adminSecret } : {}),
			}

			// Create a unique key for this request
			const cacheKey = getCacheKey(operation, jwt || '')

			if (debug) {
				console.log(
					'\n ==> GraphQL Query : \n',
					JSON.stringify(
						(operation as GraphqlOperation).query.replaceAll('"', ''),
					),
				)
			}

			// If caching is enabled, check for cached response or in-flight request
			if (enableCache) {
				// Check if we have a cached response that's still valid
				const cachedResponse = responseCache.get(cacheKey)
				if (
					cachedResponse &&
					Date.now() - cachedResponse.timestamp < cacheTTL
				) {
					return cachedResponse.data
				}

				// Check if there's already an in-flight request for this query
				const existingRequest = inflightRequests.get(cacheKey)
				if (existingRequest) {
					console.log('returning existing request')
					return existingRequest
				}
			}

			// Create the fetch request
			// Create an AbortController based on the operation.query
			const controller = new AbortController()

			// const timeoutId = setTimeout(() => {
			// 	controller.abort();
			// }, cacheTTL);

			// Fetch the data
			const fetchPromise = fetch(endpoints[env || 'prod'], {
				method: 'POST',
				headers,
				body: JSON.stringify(operation),
				signal: controller.signal,
				...config,
			})
				.then((response) => response.json())
				.then((data) => {
					// Cache the successful response if caching is enabled
					if (enableCache) {
						responseCache.set(cacheKey, {
							data,
							timestamp: Date.now(),
						})
						// Remove from in-flight requests
						inflightRequests.delete(cacheKey)
					}
					return data
				})
				.catch((error) => {
					// Remove from in-flight requests on error
					if (enableCache) {
						inflightRequests.delete(cacheKey)
					}
					console.error('Error in graphql fetcher', error)
					throw error
				})
			// .finally(() => {
			// 	clearTimeout(timeoutId);
			// })

			// Track this request if caching is enabled
			if (enableCache) {
				inflightRequests.set(cacheKey, fetchPromise)
			}

			return fetchPromise
		},
	})

	return {
		subscribe,
		...client,
		clearCache: () => {
			responseCache.clear()
		},
		invalidateCache: (operation?: GraphqlOperation | GraphqlOperation[]) => {
			if (operation) {
				const cacheKey = getCacheKey(operation, jwt || '')
				responseCache.delete(cacheKey)
			} else {
				responseCache.clear()
			}
		},
	}
}

// Generate a unique key for caching based on the operation and auth
function getCacheKey(
	operation: GraphqlOperation | GraphqlOperation[],
	authToken: string,
): string {
	// Include variables and query in the key
	const operationString = JSON.stringify(operation)
	// Include a hash of the auth token to invalidate cache when auth changes
	const authHash = authToken ? String(hashCode(authToken)) : 'noauth'
	return `${authHash}:${operationString}`
}

// Simple hash function for strings
function hashCode(str: string): number {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash // Convert to 32bit integer
	}
	return hash
}

export interface MbClient extends Client {
	subscribe: WsClient['subscribe']
	clearCache: () => void
	invalidateCache: (operation?: GraphqlOperation | GraphqlOperation[]) => void
}

type GraphQLSdkProps = {
	config?: RequestInit
	jwt?: string
	env?: MbEnv
	adminSecret?: string
	debug?: boolean
	cacheTTL?: number
	enableCache?: boolean
}
