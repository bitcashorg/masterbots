'use client'

import { getChatbotMetadata } from '@/app/actions'
import { formatSystemPrompts } from '@/lib/actions'
import {
	examplesPrompt,
	followingQuestionsPrompt,
	setDefaultUserPreferencesPrompt,
	setOutputInstructionPrompt,
} from '@/lib/constants/prompts'
import {
	aiExampleClassification,
	processUserMessage,
} from '@/lib/helpers/ai-classification'

import {
	cleanPrompt,
	hasReasoning,
	verifyDuplicateMessage,
} from '@/lib/helpers/ai-helpers'
import {
	type FileAttachment,
	getUserIndexedDBKeys,
} from '@/lib/hooks/use-chat-attachments'
import { useContinueGeneration } from '@/lib/hooks/use-continue-generation'
import { useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useModel } from '@/lib/hooks/use-model'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { logErrorToSentry } from '@/lib/sentry'
import { generateUniqueSlug, getCanonicalDomain } from '@/lib/url'
import {
	createThread,
	deleteThread,
	getThread,
	saveNewMessage,
} from '@/services/hasura'
import type { SaveNewMessageParams } from '@/services/hasura/hasura.service.type'
import type {
	AiClientType,
	AiToolCall,
	ChatbotMetadataClassification,
	ChatbotMetadataExamples,
	SendMessageFromResponseMessageData,
} from '@/types/types'
import { type UseChatOptions, useChat } from '@ai-sdk/react'
import type * as OpenAi from 'ai'
import type {
	Message as AiMessage,
	ChatRequestOptions,
	CreateMessage,
} from 'ai'
import { throttle, uniqBy } from 'lodash'
import { appConfig } from 'mb-env'
import type { Chatbot, Message, Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { useParams, useSearchParams } from 'next/navigation'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from 'react'
import { useSetState } from 'react-use'
import { useSonner } from './useSonner'

export function useMBChat(): MBChatHookCallback {
	const context = useContext(MBChatContext)
	if (!context) {
		throw new Error('useMBChat must be used within a MBChatProvider')
	}
	return context
}

export function MBChatProvider({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession()
	const {
		isOpenPopup,
		activeThread,
		webSearch,
		loadingState,
		setWebSearch,
		setActiveThread,
		setIsNewResponse,
		setIsOpenPopup,
		setActiveTool,
		setLoadingState,
	} = useThread()
	const { activeChatbot, navigateTo } = useSidebar()
	const userContentRef = useRef<string>('')
	const randomThreadId = useRef<string>(crypto.randomUUID())
	const { isContinuousThread, setIsContinuousThread } = useThreadVisibility()
	const { customSonner } = useSonner()
	const { isPowerUp } = usePowerUp()
	const { setIsCutOff } = useContinueGeneration()
	const params = useParams<{ chatbot: string; threadSlug: string }>()
	const { selectedModel, clientType } = useModel()

	// const initialIsNewChat = Boolean(isContinuousThread || !activeThread?.messages.length)
	const [{ messagesFromDB, isNewChat }, setState] = useSetState<{
		isInitLoaded: boolean
		webSearch: boolean
		messagesFromDB: Message[]
		isNewChat: boolean
	}>({
		isInitLoaded: false,
		webSearch: false,
		messagesFromDB: activeThread?.messages || [],
		isNewChat: true,
	})
	const chatbotData = activeThread?.chatbot ?? (activeChatbot as Chatbot)
	const chatbotSystemPrompts: AiMessage[] = formatSystemPrompts(
		chatbotData?.prompts,
	)
	const userPreferencesPrompts: AiMessage[] = chatbotData
		? [setDefaultUserPreferencesPrompt(chatbotData)]
		: []
	/**
	 * @description
	 * Format all User prompts and AI 'assistant' messages.
	 * */
	const userAndAssistantMessages: AiMessage[] = activeThread
		? messagesFromDB.map((m) => ({
				...m,
				id: m.messageId,
				role: m.role as AiMessage['role'],
				content: m.content,
				createdAt: m.createdAt,
			}))
		: []
	/**
	 * @description
	 * Concatenate all Masterbots system prompts to pass it to chat context. This represents the initial/continuing state of the chat.
	 * The system prompts is the identify of each Masterbot and how this will interact with Users. Prompt order is important to provide a good user experience.
	 *
	 * **Prompt Formatting:**
	 *
	 * 1. Masterbot Expertise.
	 * 2. Masterbot Default or User Preferences Config. Instructions.
	 * 3. Masterbot Final Enhancer (IQ) Instructions.
	 * 4. Masterbot Output Instructions (Goes before appending the new message).
	 * 5. Masterbot Examples (Goes before appending the new message).
	 * */
	const systemPrompts: AiMessage[] =
		chatbotSystemPrompts.length && userPreferencesPrompts.length
			? [
					chatbotSystemPrompts[0],
					...userPreferencesPrompts,
					chatbotSystemPrompts[1],
				].filter((prompt) => prompt !== undefined)
			: []
	/**
	 * @description
	 * Concatenate all message to pass it to chat UI component. This list is the initial state of the chat UI and updates on every new message with `allMessages`.
	 *
	 * **Prompt Formatting:**
	 *
	 * 1. Masterbot Expertise.
	 * 2. Masterbot Default or User Preferences Config. Instructions.
	 * 3. Masterbot Final Enhancer (IQ) Instructions.
	 * 4. Masterbot Output Instructions.
	 * 5. Conversation between user and assistant.
	 * */
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const initialMessages: AiMessage[] = useMemo(
		() => systemPrompts.concat(userAndAssistantMessages),
		[activeChatbot, activeThread],
	)
	const threadId = isContinuousThread
		? randomThreadId.current
		: activeThread?.threadId || randomThreadId.current
	const chatbot = activeThread?.chatbot || activeChatbot

	const resolveThreadId = (params: {
		isContinuousThread: boolean
		randomThreadId: string
		threadId: string
		activeThreadId?: string
	}) => {
		const { isContinuousThread, randomThreadId, threadId, activeThreadId } =
			params
		if (isContinuousThread) return randomThreadId
		if (isNewChat) return threadId
		return activeThreadId
	}

	const searchParams = useSearchParams()
	const messageAttachments = useRef<FileAttachment[]>([])
	const clickedContentRef = useRef<string>('')
	const dbKeys = getUserIndexedDBKeys(session?.user?.id)
	const indexedDBActions = useIndexedDB(dbKeys)

	/**
	 * Custom function to check if the current URL has a specific search param. This has been created as this due to the fact that
	 * the `useSearchParams` hook does not update the URL when the page is reloaded and nextjs/react is unable to know the latest state
	 * even though that we pass it and check.
	 *
	 *
	 * @returns The check and params objects to check what are the current search params. It can be expanded in the future to check for more params.
	 */
	const getCurrentSearchParams = () => {
		const recentSearchParams = new URLSearchParams(window.location.search)
		const continuousThreadId = recentSearchParams.get('continuousThreadId')

		return {
			checks: {
				isContinuingThread: Boolean(continuousThreadId),
			},
			params: {
				continuousThreadId: continuousThreadId,
			},
		}
	}

	const useChatConfig: Partial<UseChatOptions> = {
		initialMessages,
		id: threadId,
		// TODO: Check this experimental feature: https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat#experimental_prepare-request-body
		// ? We might need it depending what the AI returns to us and what kind of data it has... this is might be useful for:
		// ? - Web Search (Tool + Global)
		// ? - Any additional tool with multiple steps or user decisions and react according to them...
		// experimental_prepareRequestBody
		body: {
			id: threadId,
			model: selectedModel,
			clientType,
			webSearch,
			isPowerUp,
		},
	}
	const {
		input,
		messages,
		isLoading,
		stop,
		append,
		reload,
		setInput,
		setMessages,
	} = useChat({
		...useChatConfig,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async onResponse(response: any) {
			if (response.status >= 400) {
				customSonner({ type: 'error', text: response.statusText })

				if (isNewChat) {
					await deleteThread({
						threadId,
						jwt: session?.user?.hasuraJwt,
						userId: session?.user.id,
					})
				}
			}
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async onFinish(message: OpenAi.Message, options: any) {
			try {
				if (appConfig.features.devMode) {
					customSonner({
						type: 'info',
						text: `Ai generation finished, reason: ${options.finishReason}`,
					})
				}
				const finalMessage = { ...message }

				//? Handle generated image files if present
				if (options.files && options.files.length > 0) {
					finalMessage.parts = options.files.map(
						(file: {
							base64: string
							uint8Array: Uint8Array
							mimeType: string
							fileName: string
						}) => ({
							type: 'file',
							data: file.base64,
							mimeType: file.mimeType,
						}),
					)
					if (appConfig.features.devMode) {
						customSonner({
							type: 'info',
							text: 'Generated image(s)',
						})
					}
				}

				//? Check if the generation was cut off
				const isCutOff = [
					'length',
					'content-filter',
					'error',
					'unknown',
				].includes(options.finishReason)
				setIsCutOff(isCutOff)
				if (isCutOff) {
					logErrorToSentry('Generation was cut off', {
						error: new Error(
							'The AI generation was cut off. Click on "Continue" to finish the response.',
						),
						message: 'Ai failed to finish generate the message.',
						level: 'warning',
						extra: {
							threadSlug: activeThread?.slug,
							userId: session?.user.id,
							chatbotName: activeChatbot?.name,
							attachments: messageAttachments.current,
						},
					})
					customSonner({
						type: 'continue',
						text: 'The AI generation was cut off. Click on "Continue" to finish the response.',
					})
				}
				if (options.finishReason === 'error') {
					logErrorToSentry('Error saving new message', {
						error: new Error('Error saving new message'),
						message: 'Failed to save the Masterbot message.',
						level: 'warning',
						extra: {
							threadSlug: activeThread?.slug,
							userId: session?.user.id,
							chatbotName: activeChatbot?.name,
							attachments: messageAttachments.current.map((att) => ({
								name: att.name,
								size: att.size,
								contentType: att.contentType,
							})),
						},
					})
					customSonner({
						type: 'error',
						text: 'Failed to finish communication with the Masterbot. Please try again.',
					})

					if (isNewChat) {
						await deleteThread({
							threadId: activeThread?.threadId,
							jwt: session?.user?.hasuraJwt,
							userId: session?.user.id,
						})
					}

					return
				}
				const aiChatThreadId = resolveThreadId({
					isContinuousThread,
					randomThreadId: randomThreadId.current,
					threadId,
					activeThreadId: activeThread?.threadId,
				})

				const userMessageId = crypto.randomUUID()
				const assistantMessageId = crypto.randomUUID()

				// Saving attachments to indexedDB and attaching them to the message
				const attachments = messageAttachments.current
				const newAttachments = attachments
					? attachments.map((attachment) => ({
							...attachment,
							// We make the relationship of the attachment with the user and assistant messages, making it flexible
							messageIds: [
								...(attachment?.messageIds || []),
								userMessageId,
								assistantMessageId,
							],
						}))
					: []

				for (const attachment of newAttachments) {
					try {
						indexedDBActions.updateItem(attachment.id, attachment)
					} catch (error) {
						console.error('Error saving attachment: ', error)
						indexedDBActions.addItem(attachment)
					}
				}
				messageAttachments.current = newAttachments

				const newBaseMessage: Partial<SaveNewMessageParams> = {
					threadId: aiChatThreadId ?? '',
					jwt: session?.user?.hasuraJwt,
				}

				const curatedPreUserMessageSlug = userContentRef.current
					.toLocaleLowerCase()
					.replace(
						/(explain more in-depth and in detail about |explain more in depth and in detail about |explain more in-depth about |explain more in depth about |can you provide a detailed explanation of )/g,
						'',
					)
				// ? assistant message with reasoning information
				const assistantMessageThinking = hasReasoning(finalMessage)
					? {
							thinking: finalMessage.parts?.find(
								(msg) => msg.type === 'reasoning',
							)?.reasoning,
						}
					: {}
				const uploadNewMessages = async () => {
					// Generate unique slugs for both messages
					const userMessageSlug = await generateUniqueSlug(
						curatedPreUserMessageSlug,
						'message',
					)
					const assistantMessageSlug = await generateUniqueSlug(
						message.content,
						'message',
					)

					// Create new messages and save them to the database
					const [
						newUserMessage,
						newAssistantMessage,
					]: Partial<SaveNewMessageParams>[] = [
						{
							...newBaseMessage,
							messageId: userMessageId,
							slug: userMessageSlug,
							role: 'user',
							model: selectedModel,
							content: userContentRef.current,
							createdAt: new Date().toISOString(),
						},
						{
							...newBaseMessage,
							...assistantMessageThinking,
							messageId: assistantMessageId,
							slug: assistantMessageSlug,
							role: 'assistant',
							model: selectedModel,
							content: finalMessage.content,
							createdAt: new Date(Date.now() + 1000).toISOString(),
							examples:
								finalMessage.parts?.filter((part) => part.type === 'file') ||
								[],
						},
					]

					return (await Promise.all([
						saveNewMessage(newUserMessage),
						saveNewMessage(newAssistantMessage),
					])) as Message[]
				}

				let newThreadMessages: Message[] = []

				try {
					newThreadMessages = await uploadNewMessages()
				} catch (error) {
					console.error('Error generating message slugs: ', error)

					// ? If the error is due to duplicate key value, we retry the upload one more time to do the recursive check again
					// ! This might be an edge case now that we use drizzle for this query, but it is still a good practice to handle this error
					if ((error as Error).message.includes('duplicate key value')) {
						await uploadNewMessages()
					}
				}

				setState({
					isNewChat: false,
				})

				const newSearchParams = new URLSearchParams(searchParams.toString())
				const { checks } = getCurrentSearchParams()

				if (checks.isContinuingThread) {
					// Remove continuousThreadId search param
					newSearchParams.delete('continuousThreadId')
					setIsContinuousThread(false)
				}

				throttle(async () => {
					const newThread = activeThread
						? {
								...activeThread,
								messages: [...activeThread.messages, ...newThreadMessages],
								metadata: newAttachments.length
									? {
											attachments: uniqBy(
												[
													...newAttachments,
													...(activeThread.metadata.attachments || []),
												],
												'id',
											),
										}
									: undefined,
							}
						: undefined
					const thread = await updateActiveThread(newThread)

					if (
						isNewChat ||
						isContinuousThread ||
						(thread.messages.length > 0 && thread.messages.length <= 2)
					) {
						// console.log('thread', thread)
						const canonicalDomain = getCanonicalDomain(
							activeChatbot?.name || 'blankbot',
						)
						navigateTo({
							urlType: 'threadUrl',
							shallow: true,
							navigationParams: {
								type: 'personal',
								category: activeChatbot?.categories[0].category.name || '',
								domain: canonicalDomain,
								chatbot: activeChatbot?.name || '',
								threadSlug: thread.slug,
							},
						})
					}

					setLoadingState('finished')
					setActiveTool(undefined)
					setIsNewResponse(false)
				}, 140)()
			} catch (error) {
				console.error('Error saving new message: ', error)
				logErrorToSentry('Error saving new message', {
					error,
					message: 'Failed to save the Masterbot message.',
					level: 'error',
					extra: {
						threadSlug: activeThread?.slug,
						userId: session?.user.id,
						chatbotName: activeChatbot?.name,
						attachments: messageAttachments.current,
					},
				})
				customSonner({
					type: 'error',
					text: 'Failed to save the Masterbot message. Please try again.',
				})

				if (isNewChat) {
					await deleteThread({
						threadId,
						jwt: session?.user?.hasuraJwt,
						userId: session?.user.id,
					})
				}
			} finally {
				// ? resetting refs
				clickedContentRef.current = ''
			}
		},
		// @ts-ignore
		onToolCall({ toolCall }: { toolCall: AiToolCall }) {
			console.log('Tool call:', toolCall)

			if (appConfig.features.devMode) {
				customSonner({
					type: 'info',
					text: `Tool call executed: ${toolCall.toolName}`,
				})
			}

			setActiveTool(toolCall as AiToolCall)
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async onError(error: any) {
			console.error('Error in chat: ', error)
			logErrorToSentry('Error in the chat', {
				error,
				message: 'Failed to complete chat.',
				level: 'error',
				extra: {
					threadSlug: activeThread?.slug,
					userId: session?.user.id,
					chatbotName: activeChatbot?.name,
					attachments: messageAttachments.current,
				},
			})
			customSonner({
				type: 'error',
				text: 'Failed to send message. Please try again.',
			})

			if (isNewChat) {
				await deleteThread({
					threadId,
					jwt: session?.user?.hasuraJwt,
					userId: session?.user.id,
				})
			}

			setLoadingState(undefined)
			setActiveTool(undefined)
			setIsNewResponse(false)

			clickedContentRef.current = ''
		},
	})

	/**
	 * @description
	 * All messages coming from DB and continuing the chat, omitting the system prompts to provide to the LLM context.
	 */
	const allMessages = uniqBy(
		(initialMessages as Array<Message & AiMessage>)
			?.concat(messages as Array<Message & AiMessage>)
			?.concat(
				activeThread?.messages?.map((msg) => ({
					...msg,
					id: msg.messageId,
					role: msg.role as 'data' | 'system' | 'user' | 'assistant',
				})) || [],
			),
		verifyDuplicateMessage,
	)
		.filter(Boolean)
		.filter((m) => m.role !== 'system')
		.sort((a, b) => {
			// Extract timestamps, defaulting to 0 if missing
			const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0
			const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0

			// If timestamps are different, use them for sorting (chronological order)
			if (timeA !== timeB) {
				return timeA - timeB
			}

			// If timestamps are the same or both missing:
			// 1. Find previous message(s) to determine conversation flow and
			// 2. Ensure assistant message appears after its corresponding user message
			if (a.role === 'assistant' && b.role === 'assistant') {
				// If both are assistant messages, maintain chronological order and
				// ensures multiple assistant messages appear in the correct sequence
				return timeA - timeB || 0
			}

			// Keep user messages before assistant messages when timestamps are identical
			if (a.role === 'user' && b.role === 'assistant') return -1
			if (a.role === 'assistant' && b.role === 'user') return 1

			// If both have the same role, maintain original order
			return 0
		})

	useEffect(() => {
		// Resetting the chat when the popup is closed
		if (!activeThread && !isOpenPopup) {
			resetState()
		}
		if (!isOpenPopup) {
			randomThreadId.current = crypto.randomUUID() //* Generates a new thread ID
		}
		if (!activeThread) return

		updateNewThread()
	}, [activeThread, isOpenPopup])

	const resetState = () => {
		setState({
			isInitLoaded: false,
			isNewChat: true,
			messagesFromDB: [],
		})
		setInput('')
		setMessages([])
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: not required
	useEffect(() => {
		// reset all states when unmounting the context hook
		return resetState
	}, [])

	const updateNewThread = () => {
		// console.log('activeThread.messages length --> ', activeThread?.messages)
		const isNewChatState = Boolean(
			!allMessages.length || !activeThread?.messages.length,
		)

		setState({
			isNewChat: isNewChatState,
		})

		return isNewChatState
	}

	const updateActiveThread = async (newThread?: Thread | null) => {
		let thread = newThread

		if (!thread) {
			thread = await getThread({
				threadId,
				isPersonal: true,
				jwt: session?.user?.hasuraJwt,
			})
		}
		if (thread) {
			setActiveThread(thread)
			setState({
				isNewChat: Boolean(!allMessages.length || !thread.messages.length),
				messagesFromDB: thread.messages,
			})
		}

		return thread as Thread
	}

	const tunningUserContent = async (
		userMessage: AiMessage | CreateMessage,
		thread: Thread,
	) => {
		setLoadingState('digesting')

		let previousAiUserMessages: AiMessage[] = []

		if (activeThread?.thread?.messages) {
			previousAiUserMessages = activeThread.thread.messages
				.map((msg) => ({
					id: msg.messageId,
					role: msg.role as AiMessage['role'],
					content: msg.content,
					createdAt: msg.createdAt,
				}))
				.filter((msg) => msg.role === 'user')
		}
		const userPrompt = {
			content: userMessage.content,
			allUserMessages: previousAiUserMessages.concat(allMessages),
		}
		const { content, error } = await processUserMessage(
			userPrompt,
			clientType as AiClientType,
			selectedModel,
		)

		// console.log('thread::tunninUserContent  --> ', thread)
		if (thread) {
			updateActiveThread({
				...thread,
				messages: thread.messages.filter(
					(m) => m.content !== userPrompt.content,
				),
			})
		}

		userContentRef.current = content
	}

	const isPreProcessing = Boolean(
		loadingState?.match(/processing|digesting|polishing/),
	)
	const formDisabled = !chatbot || isPreProcessing

	// we extend append function to add our system prompts
	const appendWithMbContextPrompts = async (
		userMessage: AiMessage | CreateMessage,
		chatRequestOptions?: ChatRequestOptions,
	): Promise<string | null | undefined> => {
		if (formDisabled) {
			console.info(
				'Form is disabled while processing, skipping submit of new message.',
			)
			return
		}
		if (!session?.user || !chatbot) {
			console.error('User is not logged in or session expired.')
			customSonner({
				type: 'error',
				text: 'Failed to start conversation. Please reload and try again.',
			})
			return
		}

		// * Loading: processing your request + opening pop-up...
		messageAttachments.current =
			(chatRequestOptions?.experimental_attachments || []) as FileAttachment[]
		setLoadingState('processing')
		setIsNewResponse(true)
		updateNewThread()

		const defaultUserMessage: Partial<Message> = {
			...userMessage,
			content: cleanPrompt(userMessage.content),
			slug: toSlug(userMessage.content),
			role: 'user',
			messageId: randomThreadId.current,
			createdAt: new Date().toISOString(),
			augmentedFrom: null,
			examples: [],
			threadId,
		}
		// ! Optimistic won't update on time due the ID's are not totally formed hence,
		// ! when it wants to attach related content it can't because the references doesn't exist
		// ! at the time we pre-populate information.
		// ! So, we need to wait for the response to be processed and then update the thread with the new message. (currently working)
		// We need a temporal state object that can be replaced with the real state object (like a ref) for the thread to be able to update it optimistically
		const optimisticThread: Thread = {
			...activeThread,
			threadId,
			chatbotId: chatbot?.chatbotId,
			chatbot,
			createdAt: new Date().toISOString(),
			isApproved: false,
			isBlocked: false,
			// @ts-ignore
			messages: uniqBy(
				[...allMessages, defaultUserMessage],
				verifyDuplicateMessage,
			),
			metadata: {
				attachments: uniqBy(
					[
						...(messageAttachments.current || []),
						...(activeThread?.metadata?.attachments || []),
					],
					'id',
				),
			},
			thread: isContinuousThread ? activeThread?.thread || null : null,
			userId: session?.user.id,
		}
		const thread = await updateActiveThread(optimisticThread)

		try {
			await tunningUserContent(userMessage, thread)
			// ! At this point, the UI respond and provides a feedback to the user... before it is now even showing the updated active thread, event though that it does update the active thread...
			// TODO: improve response velocity here (split this fn to yet another cb fn? 🤔)
		} catch (error) {
			console.error(
				'Error processing user message. Using og message. Error: ',
				error,
			)
		}

		if (!isOpenPopup) {
			setIsOpenPopup(true)
		}
		return await appendNewMessage(userMessage, chatRequestOptions)
	}

	const getMetadataLabels =
		// biome-ignore lint/correctness/useExhaustiveDependencies: I need to hear the chatbot and isPowerUp changes only
		useCallback(async (): Promise<ChatbotMetadataExamples> => {
			let chatMetadata: ChatbotMetadataClassification | undefined
			try {
				setLoadingState('polishing')
				// console.log('isPowerUp', isPowerUp)
				chatMetadata = await getChatbotMetadata(
					{
						chatbot: chatbot?.chatbotId as number,
						isPowerUp,
					},
					userContentRef.current,
					clientType as AiClientType,
				)
				// console.log('Full responses from ChatbotMetadata:', chatMetadata)

				// * Loading: Polishing Ai request... 'polishing'
			} catch (error) {
				console.error('Error getting chatbot metadata:', error)
				if (appConfig.features.devMode) {
					customSonner({ type: 'error', text: (error as Error)?.message })
				}
			}

			if (chatMetadata?.errors?.length && appConfig.features.devMode) {
				customSonner({
					type: 'error',
					text: `${chatMetadata.domainName}:\n${chatMetadata.errors.join('.\n')}`,
				})
			}

			return await aiExampleClassification({
				chatMetadata,
				customSonner,
			})
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [chatbot, isPowerUp])

	const appendAsContinuousThread = async (
		userMessage: AiMessage | CreateMessage,
	) => {
		const optimisticUserMessage = {
			...userMessage,
			id: randomThreadId.current,
		}

		await appendWithMbContextPrompts(optimisticUserMessage)

		return null
	}

	const sendMessageFromResponse = async (
		{ bulletContent, messageId }: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => {
		const fullMessage = bulletContent
		clickedContentRef.current = messageId

		await appendWithMbContextPrompts({
			id: threadId,
			content: fullMessage,
			role: 'user',
		}).finally(callback)
	}

	const toggleWebSearch = () => {
		setWebSearch(!webSearch)
	}

	const appendNewMessage = async (
		userMessage: AiMessage | CreateMessage,
		chatMessagesOptions?: ChatRequestOptions,
	) => {
		try {
			const chatbotMetadata = await getMetadataLabels()
			const {
				checks: { isContinuingThread },
				params: { continuousThreadId },
			} = getCurrentSearchParams()
			const isNewThread =
				((!allMessages.length && isNewChat) || isContinuingThread) && chatbot

			if (appConfig.features.devMode) {
				console.info(
					'Before appending a new message, we check the following to know if is new chat or not: ',
				)
				console.log('isNewChat guard --> ', isNewChat)
				console.log('allMessages --> ', allMessages)
				console.log('activeThread --> ', activeThread)
				console.log('isContinuousThread --> ', isContinuingThread)
				console.log(
					'isNewThread (combining set of conditions when threads are created and continuing conversation in the same user session) --> ',
					isNewThread,
				)
			}

			if (isNewThread) {
				const threadSlug = await generateUniqueSlug(userContentRef.current)

				await createThread({
					threadId,
					slug: threadSlug,
					chatbotId: chatbot.chatbotId,
					// TODO: Uncomment when model FE is ready. BE is ready. @bran18
					// model: selectedModel,
					parentThreadId: isContinuingThread
						? (continuousThreadId as string)
						: undefined,
					jwt: session?.user?.hasuraJwt,
				})
			}

			const chatMessagesToAppend = uniqBy(
				[
					...systemPrompts,
					setOutputInstructionPrompt(userContentRef.current),
					{
						id: `examples-${nanoid(10)}`,
						role: 'system' as 'data' | 'system' | 'user' | 'assistant',
						content: examplesPrompt(chatbotMetadata),
					},
				],
				verifyDuplicateMessage,
			)
			setMessages(chatMessagesToAppend)

			// What remedies are good for stress relieve?
			if (appConfig.features.devMode) {
				console.log('chatMessagesToAppend --> ', chatMessagesToAppend)
				console.log('Chatbot metadata --> ', chatbotMetadata)
			}

			let previousAiUserMessages: AiMessage[] = []

			if (activeThread?.thread?.messages) {
				previousAiUserMessages = activeThread.thread.messages
					.map((msg) => ({
						id: msg.messageId,
						role: msg.role as AiMessage['role'],
						content: msg.content,
						createdAt: msg.createdAt,
					}))
					.filter((msg) => msg.role === 'user')
			}

			setLoadingState('generating')
			const appendResponse = await append(
				{
					...userMessage,
					content:
						!allMessages.length && isNewChat && chatbot
							? userContentRef.current // improved user message
							: followingQuestionsPrompt(
									userContentRef.current,
									previousAiUserMessages.concat(
										allMessages,
									) as unknown as Message[],
									clickedContentRef.current,
								),
				},
				chatMessagesOptions,
			)

			return appendResponse
		} catch (error) {
			setLoadingState(undefined)
			stop()

			console.error('Error appending new message: ', error)
			customSonner({
				type: 'error',
				text: 'Failed to send the message to the Masterbot. Please try again.',
			})

			return null
		}
	}

	// console.log('loadingState --> ', loadingState)

	// ? return [state, actions]
	return (
		<MBChatContext.Provider
			value={[
				{
					input,
					isNewChat,
					webSearch,
					isLoading,
					allMessages: allMessages as OpenAi.UIMessage[],
					initialMessages: initialMessages as OpenAi.UIMessage[],
					newChatThreadId: threadId,
				},
				{
					appendWithMbContextPrompts,
					appendAsContinuousThread,
					sendMessageFromResponse,
					toggleWebSearch,
					setMessages,
					setInput,
					append,
					reload,
					stop,
				},
			]}
		>
			{children}
		</MBChatContext.Provider>
	)
}

const MBChatContext = createContext<MBChatHookCallback | undefined>(undefined)

export type MBChatHookConfig = {
	threadId?: string
	chatbot?: Chatbot
}

export type MBChatHookCallback = [MBChatHookState, MBChatHookActions]

export type MBChatHookState = {
	input: string
	isNewChat: boolean
	webSearch: boolean
	isLoading: boolean
	allMessages: OpenAi.UIMessage[]
	initialMessages: OpenAi.UIMessage[]
	newChatThreadId: string
}

export type MBChatHookActions = {
	appendWithMbContextPrompts: (
		userMessage: OpenAi.UIMessage | CreateMessage,
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>
	appendAsContinuousThread: (
		userMessage: OpenAi.UIMessage | CreateMessage,
	) => Promise<string | null | undefined>
	sendMessageFromResponse: (
		messageData: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => void
	append: (
		message: OpenAi.UIMessage | CreateMessage,
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>
	reload: (
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>
	stop: () => void
	toggleWebSearch: () => void
	setInput: React.Dispatch<React.SetStateAction<string>>
	setMessages: (messages: OpenAi.UIMessage[]) => void
}
