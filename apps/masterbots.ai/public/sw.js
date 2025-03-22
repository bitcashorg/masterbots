// GraphQL Cache Service Worker

// Default cache TTL (5 minutes)
const CONFIG_CACHE_TTL = 5 * 60 * 1000
const CACHE_NAME = 'graphql-cache-v1'
const DEBUG = false

// Helper to log only in debug mode
function log(...args) {
	if (DEBUG) console.log('[GraphQL Cache SW]', ...args)
}

self.addEventListener('install', (event) => {
	log('Service Worker installing')
	self.skipWaiting() // Activate worker immediately
})

self.addEventListener('activate', (event) => {
	log('Service Worker activated')
	event.waitUntil(clients.claim()) // Take control of clients immediately
})

// Function to create a cache key from a request
// Update createCacheKey function
function createCacheKey(request) {
	return request
		.clone()
		.text()
		.then((body) => {
			try {
				const data = JSON.parse(body)

				// Get auth hash from header if present
				const authHash = request.headers.get('X-GraphQL-Auth-Hash') || 'noauth'

				if (!Array.isArray(data)) {
					return `graphql_${hashCode(data.query)}_${JSON.stringify(data.variables || {})}_${authHash}`
				}

				return `graphql_batch_${hashCode(data.map((op) => op.query).join(''))}_${JSON.stringify(
					data.map((op) => op.variables || {}),
				)}_${authHash}`
			} catch (e) {
				log('Error parsing request body', e)
				return `graphql_${request.url}`
			}
		})
}

// Simple hash function
function hashCode(str) {
	let hash = 5381
	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
	}
	return hash >>> 0 // Convert to unsigned 32-bit integer
}

// Check if a request is a GraphQL query (not a mutation)
function isGraphQLQuery(body) {
	try {
		const data = JSON.parse(body)
		if (Array.isArray(data)) {
			// Batched queries - check if all are queries
			return data.every(
				(op) =>
					op.query &&
					!op.query.includes('mutation') &&
					op.query.trim().startsWith('query'),
			)
		}
		// Single query
		return (
			data.query &&
			!data.query.includes('mutation') &&
			data.query.trim().startsWith('query')
		)
	} catch (e) {
		return false
	}
}

// Main fetch event handler
self.addEventListener('fetch', (event) => {
	// Do cache if feature is enabled
	if (!event.request.headers.get('X-Enable-GraphQL-Cache')) {
		return
	}

	// Only handle POST requests to GraphQL endpoints
	if (
		event.request.method !== 'POST' ||
		(!event.request.url.includes('/graphql') &&
			!event.request.url.includes('/v1/graphql'))
	) {
		return
	}

	event.respondWith(
		(async () => {
			// Clone the request to read the body
			const requestClone = event.request.clone()
			const body = await requestClone.text()

			// Only cache GraphQL queries, not mutations
			if (!isGraphQLQuery(body)) {
				log('Skipping non-query GraphQL request')
				return fetch(event.request)
			}

			const cacheKey = await createCacheKey(event.request)
			const cache = await caches.open(CACHE_NAME)

			// Check if we have a cached response
			const cachedResponse = await cache.match(cacheKey)
			if (cachedResponse) {
				log('Cache hit for', cacheKey)

				// Check cache age (TTL = 5 minutes)
				const cacheTime = cachedResponse.headers.get('cache-time')
				const ttlHeaders = event.request.headers.get('X-GraphQL-Cache-TTL')
				const ttl = ttlHeaders
					? Number.parseInt(customTtl, 10)
					: CONFIG_CACHE_TTL

				if (cacheTime && Date.now() - Number.parseInt(cacheTime) < ttl) {
					log('Using cached response')
					return cachedResponse
				}

				log('Cache expired, fetching new data')
			} else {
				log('Cache miss for', cacheKey)
			}

			// If no cache or expired, fetch from network
			try {
				const response = await fetch(event.request)

				// Only cache successful responses
				if (response.ok) {
					log('Caching response for', cacheKey)

					// We need to clone the response because it's a stream
					const responseToCache = response.clone()

					// Create a new response with cache-time header
					const headers = new Headers(responseToCache.headers)
					headers.append('cache-time', Date.now().toString())

					const cachedResponse = new Response(await responseToCache.blob(), {
						status: responseToCache.status,
						statusText: responseToCache.statusText,
						headers: headers,
					})

					// Store in cache
					cache.put(cacheKey, cachedResponse)
				}

				return response
			} catch (error) {
				log('Network error, using cached response if available')

				// If network fails but we have cache, use it regardless of age
				if (cachedResponse) {
					log('Returning expired cache due to network error')
					return cachedResponse
				}

				// If all else fails, throw the error
				throw error
			}
		})(),
	)
})

// Listen for cache invalidation messages
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'INVALIDATE_CACHE') {
		log('Invalidating cache', event.data)

		if (event.data.key) {
			// Invalidate specific key
			caches.open(CACHE_NAME).then((cache) => {
				cache.delete(event.data.key).then((success) => {
					log(`Cache key ${event.data.key} deleted: ${success}`)
				})
			})
		} else {
			// Invalidate all cache
			caches.delete(CACHE_NAME).then((success) => {
				log(`Cache ${CACHE_NAME} deleted: ${success}`)
			})
		}
	}
})
