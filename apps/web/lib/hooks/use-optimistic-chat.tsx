'use client'

import { useThread } from '@/lib/hooks/use-thread'
import type { AiMessage } from 'ai'
import type { Message, Thread } from 'mb-genql'
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSetState } from 'react-use'
import { useSonner } from './useSonner'

export interface PendingMessage {
	id: string
	content: string
	role: 'user' | 'assistant'
	createdAt: string
	status: 'optimistic' | 'sending' | 'sent' | 'failed'
	retryCount: number
	originalInput?: string
	error?: string
	threadId: string
	isOptimistic: boolean
}

export interface OptimisticChatState {
	pendingMessages: PendingMessage[]
	isOptimisticUpdate: boolean
	cachedInputs: Map<string, string>
	optimisticMessages: (Message & { id: string })[]
}

export interface OptimisticChatActions {
	addOptimisticMessage: (content: string, threadId: string) => string
	markMessageAsSending: (messageId: string) => void
	markMessageAsSent: (messageId: string, serverMessage?: Message) => void
	markMessageAsFailed: (messageId: string, error: string) => void
	retryMessage: (messageId: string) => Promise<void>
	removeOptimisticMessage: (messageId: string) => void
	updateOptimisticMessageContent: (
		messageId: string,
		newContent: string,
	) => void
	cacheUserInput: (input: string, messageId?: string) => string
	getCachedInput: (messageId: string) => string | undefined
	clearCachedInput: (messageId: string) => void
	getPendingMessage: (messageId: string) => PendingMessage | undefined
	hasPendingMessages: () => boolean
	clearPendingMessages: () => void
	getMergedMessages: (
		dbMessages: (Message & { id?: string })[],
	) => (Message & { id: string })[]
	registerRetryCallback: (
		messageId: string,
		callback: () => Promise<void>,
	) => void
}

export function useOptimisticChat(): [
	OptimisticChatState,
	OptimisticChatActions,
] {
	const { activeThread, setActiveThread } = useThread()
	const { customSonner } = useSonner()

	const [state, setState] = useSetState<OptimisticChatState>({
		pendingMessages: [],
		isOptimisticUpdate: false,
		cachedInputs: new Map<string, string>(),
		optimisticMessages: [],
	})

	const retryCallbacks = useRef<Map<string, () => Promise<void>>>(new Map())

	const addOptimisticMessage = useCallback(
		(content: string, threadId: string): string => {
			const messageId = `opt_${nanoid()}`
			const now = new Date().toISOString()

			const pendingMessage: PendingMessage = {
				id: messageId,
				content,
				role: 'user',
				createdAt: now,
				status: 'optimistic',
				retryCount: 0,
				threadId,
				isOptimistic: true,
			}

			// Create optimistic message for immediate UI display
			const optimisticUIMessage: Message = {
				id: messageId, // Add id property for AI SDK compatibility
				messageId,
				content,
				role: 'user',
				createdAt: now,
				threadId,
				model: '',
				slug: '',
				augmentedFrom: null,
				examples: null,
				thinking: null,
				shortLink: null,
				isContinued: null,
				message: null,
				messages: [],
				messagesAggregate: {
					__typename: 'MessageAggregate',
					aggregate: null,
					nodes: [],
				},
				messageTypeEnum: {
					__typename: 'MessageTypeEnum',
					value: 'user',
					messages: [],
					messagesAggregate: {
						__typename: 'MessageAggregate',
						aggregate: null,
						nodes: [],
					},
				},
				modelType: null,
				prompt: null,
				thinkingTraces: null,
				thread: null,
				__typename: 'Message',
			} as Message & { id: string }

			setState((prev) => ({
				pendingMessages: [...prev.pendingMessages, pendingMessage],
				isOptimisticUpdate: true,
				optimisticMessages: [
					...prev.optimisticMessages,
					optimisticUIMessage as Message & { id: string },
				],
			}))

			// Immediately update the thread with optimistic message for instant UI feedback
			if (activeThread) {
				const updatedThread: Thread = {
					...activeThread,
					messages: [...activeThread.messages, optimisticUIMessage],
				}

				setActiveThread(updatedThread)
			}

			return messageId
		},
		[activeThread, setActiveThread, setState],
	)

	const markMessageAsSending = useCallback(
		(messageId: string) => {
			setState((prev) => ({
				pendingMessages: prev.pendingMessages.map((msg) =>
					msg.id === messageId ? { ...msg, status: 'sending' as const } : msg,
				),
			}))
		},
		[setState],
	)

	const markMessageAsSent = useCallback(
		(messageId: string, serverMessage?: Message) => {
			console.log('OptimisticChat markMessageAsSent called:', {
				messageId,
				serverMessage: serverMessage
					? {
							id: serverMessage.messageId,
							content: `${serverMessage.content.substring(0, 50)}...`,
						}
					: null,
				currentOptimisticMessages: state.optimisticMessages.map((m) => ({
					id: m.messageId,
					content: `${m.content.substring(0, 50)}...`,
				})),
			})

			setState((prev) => {
				const updatedPendingMessages = prev.pendingMessages.filter(
					(msg) => msg.id !== messageId,
				)
				const updatedOptimisticMessages = prev.optimisticMessages.filter(
					(msg) => msg.messageId !== messageId,
				)

				console.log('OptimisticChat markMessageAsSent: updated state:', {
					removedPendingMessages:
						prev.pendingMessages.length - updatedPendingMessages.length,
					removedOptimisticMessages:
						prev.optimisticMessages.length - updatedOptimisticMessages.length,
				})

				return {
					pendingMessages: updatedPendingMessages,
					isOptimisticUpdate: updatedPendingMessages.length > 0,
					optimisticMessages: updatedOptimisticMessages,
				}
			})

			// Replace optimistic message with server message in thread
			if (activeThread && serverMessage) {
				const updatedMessages = activeThread.messages.map((msg) =>
					msg.messageId === messageId ? serverMessage : msg,
				)

				setActiveThread({
					...activeThread,
					messages: updatedMessages,
				})
			}
		},
		[activeThread, setActiveThread, setState, state.optimisticMessages],
	)

	const markMessageAsFailed = useCallback(
		(messageId: string, error: string) => {
			setState((prev) => ({
				pendingMessages: prev.pendingMessages.map((msg) =>
					msg.id === messageId
						? {
								...msg,
								status: 'failed' as const,
								error,
								retryCount: msg.retryCount + 1,
							}
						: msg,
				),
			}))

			// Show error notification with retry option
			customSonner({
				type: 'error',
				text: `Failed to send message: ${error}`,
			})
		},
		[setState, customSonner],
	)

	const retryMessage = useCallback(
		async (messageId: string): Promise<void> => {
			const pendingMessage = state.pendingMessages.find(
				(msg) => msg.id === messageId,
			)
			if (!pendingMessage) return

			const retryCallback = retryCallbacks.current.get(messageId)
			if (retryCallback) {
				setState((prev) => ({
					pendingMessages: prev.pendingMessages.map((msg) =>
						msg.id === messageId ? { ...msg, status: 'sending' as const } : msg,
					),
				}))

				try {
					await retryCallback()
				} catch (error) {
					markMessageAsFailed(messageId, (error as Error).message)
				}
			}
		},
		[state.pendingMessages, setState, markMessageAsFailed],
	)

	const removeOptimisticMessage = useCallback(
		(messageId: string) => {
			setState((prev) => {
				const updatedPendingMessages = prev.pendingMessages.filter(
					(msg) => msg.id !== messageId,
				)
				const updatedOptimisticMessages = prev.optimisticMessages.filter(
					(msg) => msg.messageId !== messageId,
				)

				return {
					pendingMessages: updatedPendingMessages,
					isOptimisticUpdate: updatedPendingMessages.length > 0,
					optimisticMessages: updatedOptimisticMessages,
				}
			})

			// Remove from thread messages as well
			if (activeThread) {
				const updatedMessages = activeThread.messages.filter(
					(msg) => msg.messageId !== messageId,
				)
				setActiveThread({
					...activeThread,
					messages: updatedMessages,
				})
			}

			// Clear retry callback
			retryCallbacks.current.delete(messageId)
		},
		[activeThread, setActiveThread, setState],
	)

	const updateOptimisticMessageContent = useCallback(
		(messageId: string, newContent: string) => {
			setState((prev) => {
				const updatedPendingMessages = prev.pendingMessages.map((msg) =>
					msg.id === messageId ? { ...msg, content: newContent } : msg,
				)
				const updatedOptimisticMessages = prev.optimisticMessages.map((msg) =>
					msg.messageId === messageId ? { ...msg, content: newContent } : msg,
				)

				return {
					pendingMessages: updatedPendingMessages,
					optimisticMessages: updatedOptimisticMessages,
				}
			})

			// Update thread messages as well
			if (activeThread) {
				const updatedMessages = activeThread.messages.map((msg) =>
					msg.messageId === messageId ? { ...msg, content: newContent } : msg,
				)
				setActiveThread({
					...activeThread,
					messages: updatedMessages,
				})
			}
		},
		[activeThread, setActiveThread, setState],
	)

	const cacheUserInput = useCallback(
		(input: string, messageId?: string): string => {
			const id = messageId || nanoid()
			setState((prev) => ({
				cachedInputs: new Map(prev.cachedInputs).set(id, input),
			}))
			return id
		},
		[setState],
	)

	const getCachedInput = useCallback(
		(messageId: string): string | undefined => {
			return state.cachedInputs.get(messageId)
		},
		[state.cachedInputs],
	)

	const clearCachedInput = useCallback(
		(messageId: string) => {
			setState((prev) => {
				const newCachedInputs = new Map(prev.cachedInputs)
				newCachedInputs.delete(messageId)
				return { cachedInputs: newCachedInputs }
			})
		},
		[setState],
	)

	const getPendingMessage = useCallback(
		(messageId: string): PendingMessage | undefined => {
			return state.pendingMessages.find((msg) => msg.id === messageId)
		},
		[state.pendingMessages],
	)

	const hasPendingMessages = useCallback((): boolean => {
		return state.pendingMessages.length > 0
	}, [state.pendingMessages])

	const clearPendingMessages = useCallback(() => {
		setState({
			pendingMessages: [],
			isOptimisticUpdate: false,
			optimisticMessages: [],
		})
		retryCallbacks.current.clear()
	}, [setState])

	// Merge optimistic and DB messages for UI display
	const getMergedMessages = useCallback(
		(
			dbMessages: (Message & { id?: string })[],
		): (Message & { id: string })[] => {
			// Helper function to normalize content for comparison (same logic as verifyDuplicateMessage)
			const normalizeContent = (content: string) => {
				return content
					.trim()
					.toLowerCase()
					.replace(/[^\w\s]/g, '') // Remove punctuation
					.replace(/\s+/g, ' ') // Normalize whitespace
			}

			// Ensure all DB messages have id property for compatibility
			const dbMessagesWithId = dbMessages.map((msg) => ({
				...msg,
				id: msg.id || msg.messageId,
			}))

			// Create sets for deduplication using normalized content
			const optimisticMessageIds = new Set(
				state.optimisticMessages.map((m) => m.messageId),
			)
			const optimisticMessageContents = new Set(
				state.optimisticMessages.map((m) => normalizeContent(m.content)),
			)

			console.log('OptimisticChat getMergedMessages: deduplication info:', {
				dbMessagesCount: dbMessagesWithId.length,
				optimisticMessagesCount: state.optimisticMessages.length,
				optimisticMessageIds: Array.from(optimisticMessageIds),
				optimisticNormalizedContents: Array.from(optimisticMessageContents),
				dbMessageContents: dbMessagesWithId.map((msg) => ({
					id: msg.messageId,
					original: `${msg.content.substring(0, 50)}...`,
					normalized: `${normalizeContent(msg.content).substring(0, 50)}...`,
				})),
			})

			// Filter out DB messages that have optimistic counterparts
			// Check both by ID and by normalized content to prevent duplicates
			const filteredDbMessages = dbMessagesWithId.filter((msg) => {
				const hasOptimisticId = optimisticMessageIds.has(msg.messageId)
				const normalizedDbContent = normalizeContent(msg.content)
				const hasOptimisticContent =
					optimisticMessageContents.has(normalizedDbContent)

				if (hasOptimisticId || hasOptimisticContent) {
					console.log('OptimisticChat: Filtering out duplicate DB message:', {
						messageId: msg.messageId,
						content: `${msg.content.substring(0, 50)}...`,
						normalizedContent: `${normalizedDbContent.substring(0, 50)}...`,
						hasOptimisticId,
						hasOptimisticContent,
					})
				}

				// Only include DB message if it doesn't match any optimistic message
				return !hasOptimisticId && !hasOptimisticContent
			})

			// Combine and sort by creation time
			const allMessages = [...filteredDbMessages, ...state.optimisticMessages]
			console.log('OptimisticChat getMergedMessages: final result:', {
				filteredDbMessagesCount: filteredDbMessages.length,
				totalMergedCount: allMessages.length,
			})

			return allMessages.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			)
		},
		[state.optimisticMessages],
	)

	// Register retry callback
	const registerRetryCallback = useCallback(
		(messageId: string, callback: () => Promise<void>) => {
			retryCallbacks.current.set(messageId, callback)
		},
		[],
	)

	// Auto-cleanup expired optimistic messages
	useEffect(() => {
		const cleanup = () => {
			const now = Date.now()
			const fiveMinutesAgo = now - 5 * 60 * 1000 // 5 minutes

			setState((prev) => {
				const validMessages = prev.optimisticMessages.filter((msg) => {
					const messageTime = new Date(msg.createdAt).getTime()
					return messageTime > fiveMinutesAgo
				})

				const validPending = prev.pendingMessages.filter((msg) => {
					const messageTime = new Date(msg.createdAt).getTime()
					return messageTime > fiveMinutesAgo
				})

				if (
					validMessages.length !== prev.optimisticMessages.length ||
					validPending.length !== prev.pendingMessages.length
				) {
					return {
						optimisticMessages: validMessages,
						pendingMessages: validPending,
						isOptimisticUpdate: validPending.length > 0,
					}
				}

				return {}
			})
		}

		// Run cleanup every minute
		const interval = setInterval(cleanup, 60000)
		return () => clearInterval(interval)
	}, [setState])

	return [
		state,
		{
			addOptimisticMessage,
			markMessageAsSending,
			markMessageAsSent,
			markMessageAsFailed,
			retryMessage,
			removeOptimisticMessage,
			updateOptimisticMessageContent,
			cacheUserInput,
			getCachedInput,
			clearCachedInput,
			getPendingMessage,
			hasPendingMessages,
			clearPendingMessages,
			getMergedMessages,
			registerRetryCallback,
		},
	]
}
