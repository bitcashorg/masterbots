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
				...(enableCache
					? {
							// Add a header to indicate cache should be used
							'X-Enable-GraphQL-Cache': 'true',
							// Add a header for cache TTL (in milliseconds)
							'X-GraphQL-Cache-TTL': cacheTTL.toString(),
							'cache-time': new Date().getTime().toString(),
						}
					: {}),
			}

			// Create a unique key for this request
			// And get both key formats
			const localCacheKey = getCacheKey(operation, jwt || '')
			const swCacheKey = createSwCacheKey(operation)

			if (debug) {
				console.log(
					'\n ==> GraphQL Query : \n',
					JSON.stringify(
						(operation as GraphqlOperation).query.replaceAll('"', ''),
					),
				)
			}

			// Always track in-flight requests to deduplicate them
			// This is important even with SW cache since SW doesn't deduplicate concurrent requests
			const existingRequest = inflightRequests.get(swCacheKey)
			if (existingRequest) {
				console.log('Returning existing in-flight request')
				return existingRequest
			}

			// Create an AbortController
			const controller = new AbortController()

			// In browser environments with SW support, we can rely more on the SW cache
			// but still need in-memory for in-flight request deduplication
			const fetchPromise = fetch(endpoints[env || 'prod'], {
				method: 'POST',
				headers,
				body: JSON.stringify(operation),
				signal: controller.signal,
				...config,
			})
				.then((response) => response.json())
				.then((data) => {
					// Only cache in-memory if service worker is not available
					if (
						enableCache &&
						(typeof navigator === 'undefined' ||
							!('serviceWorker' in navigator))
					) {
						// Store in local cache using our local cache key
						responseCache.set(localCacheKey, {
							data,
							timestamp: Date.now(),
						})
					}
					// Always remove from in-flight requests
					inflightRequests.delete(swCacheKey)
					return data
				})
				.catch((error) => {
					// Remove from in-flight requests on error
					inflightRequests.delete(swCacheKey)
					console.error('Error in graphql fetcher', error)
					throw error
				})

			// Track this request to prevent duplicates
			inflightRequests.set(swCacheKey, fetchPromise)

			return fetchPromise
		},
	})

	return {
		subscribe,
		...client,
		clearCache: () => {
			// Clear local in-memory cache
			responseCache.clear()

			// Clear service worker cache
			if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.active?.postMessage({
						type: 'INVALIDATE_CACHE',
					})
				})
			}
		},

		invalidateCache: (operation?: GraphqlOperation | GraphqlOperation[]) => {
			if (!operation) return
			// Create a cache key that exactly matches the service worker's format
			const swCacheKey = createSwCacheKey(operation)

			// For local cache, use the same format as getCacheKey
			const localCacheKey = getCacheKey(operation, jwt || '')

			// Clear local cache
			responseCache.delete(localCacheKey)

			// Clear service worker cache for this query with the correct key format
			if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.active?.postMessage({
						type: 'INVALIDATE_CACHE',
						key: swCacheKey,
					})
				})
			}
		},
	}
}

// Improved hash function - replace current one
function hashCode(str: string): number {
	// djb2 hash algorithm - matches the service worker implementation
	let hash = 5381

	for (let i = 0; i < str.length; i++) {
		// (hash * 33) ^ char
		hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
	}

	// Convert to unsigned 32-bit integer - matches SW implementation
	return hash >>> 0
}

// Generate a unique key for caching based on the operation and auth
function getCacheKey(
	operation: GraphqlOperation | GraphqlOperation[],
	authToken: string,
): string {
	// Include a hash of the auth token to invalidate cache when auth changes
	const authHash = authToken ? String(hashCode(authToken)) : 'noauth'

	if (Array.isArray(operation)) {
		// For batched operations - also create SW-compatible key format
		const query = operation.map((op) => op.query).join('')
		const variables = operation.map((op) => op.variables || {})
		return `${authHash}:batch:${hashCode(query)}:${JSON.stringify(variables)}`
	}
	// For single operations - create SW-compatible key format
	const query = operation.query
	const variables = operation.variables || {}
	return `${authHash}:${hashCode(query)}:${JSON.stringify(variables)}`
}

// Add helper function to create service worker compatible keys
function createSwCacheKey(
	operation: GraphqlOperation | GraphqlOperation[],
): string {
	if (Array.isArray(operation)) {
		// Format matches the service worker's batch operation key format
		const query = operation.map((op) => op.query).join('')
		const variables = operation.map((op) => op.variables || {})
		return `graphql_batch_${hashCode(query)}_${JSON.stringify(variables)}`
	}
	// Format matches the service worker's single operation key format
	return `graphql_${hashCode(operation.query)}_${JSON.stringify(operation.variables || {})}`
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
