'use client'

import { useSession } from 'next-auth/react'
import { useCallback, useRef } from 'react'

interface CachedPrompt {
	id: string
	content: string
	timestamp: number
	userId: string
	threadId: string
	status: 'pending' | 'sent' | 'failed'
	retryCount: number
}

interface ServerCacheActions {
	cachePrompt: (content: string, threadId: string) => string
	getCachedPrompt: (promptId: string) => CachedPrompt | undefined
	markPromptAsSent: (promptId: string) => void
	markPromptAsFailed: (promptId: string) => void
	getFailedPrompts: () => CachedPrompt[]
	retryFailedPrompts: () => CachedPrompt[]
	clearCache: () => void
	clearExpiredCache: () => void
}

const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours
const STORAGE_KEY = 'mb_server_cache'

export function useServerCache(): ServerCacheActions {
	const { data: session } = useSession()
	const cacheRef = useRef<Map<string, CachedPrompt>>(new Map())

	// Initialize cache from localStorage
	const initializeCache = useCallback(() => {
		if (typeof window === 'undefined' || !session?.user?.id) return

		try {
			const stored = localStorage.getItem(`${STORAGE_KEY}_${session.user.id}`)
			if (stored) {
				const cachedData = JSON.parse(stored) as CachedPrompt[]
				const now = Date.now()

				// Filter out expired entries
				const validEntries = cachedData.filter(
					(entry) => now - entry.timestamp < CACHE_EXPIRY_MS,
				)

				cacheRef.current = new Map(
					validEntries.map((entry) => [entry.id, entry]),
				)
			}
		} catch (error) {
			console.error('Failed to initialize server cache:', error)
		}
	}, [session?.user?.id])

	// Persist cache to localStorage
	const persistCache = useCallback(() => {
		if (typeof window === 'undefined' || !session?.user?.id) return

		try {
			const entries = Array.from(cacheRef.current.values())
			localStorage.setItem(
				`${STORAGE_KEY}_${session.user.id}`,
				JSON.stringify(entries),
			)
		} catch (error) {
			console.error('Failed to persist server cache:', error)
		}
	}, [session?.user?.id])

	const cachePrompt = useCallback(
		(content: string, threadId: string): string => {
			if (!session?.user?.id) return ''

			initializeCache()

			const promptId = `cache_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
			const cachedPrompt: CachedPrompt = {
				id: promptId,
				content,
				timestamp: Date.now(),
				userId: session.user.id,
				threadId,
				status: 'pending',
				retryCount: 0,
			}

			cacheRef.current.set(promptId, cachedPrompt)
			persistCache()

			return promptId
		},
		[session?.user?.id, initializeCache, persistCache],
	)

	const getCachedPrompt = useCallback(
		(promptId: string): CachedPrompt | undefined => {
			initializeCache()
			return cacheRef.current.get(promptId)
		},
		[initializeCache],
	)

	const markPromptAsSent = useCallback(
		(promptId: string) => {
			const prompt = cacheRef.current.get(promptId)
			if (prompt) {
				cacheRef.current.set(promptId, { ...prompt, status: 'sent' })
				persistCache()
			}
		},
		[persistCache],
	)

	const markPromptAsFailed = useCallback(
		(promptId: string) => {
			const prompt = cacheRef.current.get(promptId)
			if (prompt) {
				cacheRef.current.set(promptId, {
					...prompt,
					status: 'failed',
					retryCount: prompt.retryCount + 1,
				})
				persistCache()
			}
		},
		[persistCache],
	)

	const getFailedPrompts = useCallback((): CachedPrompt[] => {
		initializeCache()
		return Array.from(cacheRef.current.values()).filter(
			(prompt) => prompt.status === 'failed',
		)
	}, [initializeCache])

	const retryFailedPrompts = useCallback((): CachedPrompt[] => {
		const failedPrompts = getFailedPrompts()

		// Mark failed prompts as pending for retry
		for (const prompt of failedPrompts) {
			cacheRef.current.set(prompt.id, { ...prompt, status: 'pending' })
		}

		persistCache()
		return failedPrompts
	}, [getFailedPrompts, persistCache])

	const clearCache = useCallback(() => {
		cacheRef.current.clear()
		if (typeof window !== 'undefined' && session?.user?.id) {
			localStorage.removeItem(`${STORAGE_KEY}_${session.user.id}`)
		}
	}, [session?.user?.id])

	const clearExpiredCache = useCallback(() => {
		initializeCache()
		const now = Date.now()

		for (const [id, prompt] of cacheRef.current.entries()) {
			if (now - prompt.timestamp >= CACHE_EXPIRY_MS) {
				cacheRef.current.delete(id)
			}
		}

		persistCache()
	}, [initializeCache, persistCache])

	return {
		cachePrompt,
		getCachedPrompt,
		markPromptAsSent,
		markPromptAsFailed,
		getFailedPrompts,
		retryFailedPrompts,
		clearCache,
		clearExpiredCache,
	}
}
