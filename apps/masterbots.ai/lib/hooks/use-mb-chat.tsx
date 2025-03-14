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
	continueAIGeneration,
	shouldContinueGeneration,
} from '@/lib/helpers/ai-continue-generation'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import {
	type FileAttachment,
	getUserIndexedDBKeys,
} from '@/lib/hooks/use-chat-attachments'
import { useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useModel } from '@/lib/hooks/use-model'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import {
	createThread,
	deleteThread,
	doesMessageSlugExist,
	doesThreadSlugExist,
	getThread,
	saveNewMessage,
} from '@/services/hasura'
import type { SaveNewMessageParams } from '@/services/hasura/hasura.service.type'
import type {
	AiClientType,
	AiToolCall,
	ChatbotMetadataClassification,
	ChatbotMetadataExamples,
} from '@/types/types'
import type * as OpenAi from 'ai'
import type {
	Message as AiMessage,
	ChatRequestOptions,
	CreateMessage,
} from 'ai'
import { type UseChatOptions, useChat } from 'ai/react'
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
	// console.log('[HOOK] webSearch', webSearch)

	const params = useParams<{ chatbot: string; threadId: string }>()
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
		[activeChatbot],
	)
	const threadId = isContinuousThread
		? randomThreadId.current
		: params.threadId || activeThread?.threadId || randomThreadId.current
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
		if (params.threadId || isNewChat) return threadId
		return activeThreadId
	}

	const searchParams = useSearchParams()
	const messageAttachments = useRef<FileAttachment[]>([])
	const dbKeys = getUserIndexedDBKeys(session?.user?.id)
	const indexedDBActions = useIndexedDB(dbKeys)

	const useChatConfig: Partial<UseChatOptions> = {
		initialMessages,
		id: params.threadId || threadId,
		// TODO: Check this experimental feature: https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat#experimental_prepare-request-body
		// ? We might need it depending what the AI returns to us and what kind of data it has... this is might be useful for:
		// ? - Web Search (Tool + Global)
		// ? - Any additional tool with multiple steps or user decisions and react according to them...
		// experimental_prepareRequestBody
		body: {
			id: params.threadId || threadId,
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
		async onResponse(response: any) {
			if (response.status >= 400) {
				customSonner({ type: 'error', text: response.statusText })

				if (isNewChat) {
					await deleteThread({
						threadId: params?.threadId ?? activeThread?.threadId,
						jwt: session?.user?.hasuraJwt,
						userId: session?.user.id,
					})
				}
			}
		},
		async onFinish(message: OpenAi.Message, options: any) {
			try {
				if (appConfig.features.devMode) {
					customSonner({
						type: 'info',
						text: `Ai generation finished, reason: ${options.finishReason}`,
					})
				}

				//? Check if we should continue the generation based on the finish reason
				if (shouldContinueGeneration(options.finishReason)) {
					if (appConfig.features.devMode) {
						customSonner({
							type: 'info',
							text: `Generation was cut off (${options.finishReason}). Attempting to continue...`,
						})
					}

					//? Try to continue the AI generation
					const continuedContent = await continueAIGeneration(message, append, {
						setLoadingState,
						customSonner,
						devMode: appConfig.features.devMode,
						chatConfig: useChatConfig.body,
						maxAttempts: 2,
					})

					if (continuedContent) {
						// Override the message content with the continued content
						message.content = continuedContent
					}
				}

				if (options.finishReason === 'error') {
					customSonner({
						type: 'error',
						text: 'Failed to finish communication with the Masterbot. Please try again.',
					})

					if (isNewChat) {
						await deleteThread({
							threadId: params?.threadId ?? activeThread?.threadId,
							jwt: session?.user?.hasuraJwt,
							userId: session?.user.id,
						})
					}

					return
				}

				// Continue with your existing message saving logic
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

				// Check and get unique slugs for both messages
				let userMessageSlug = toSlug(curatedPreUserMessageSlug)
				let userSlugCheck = await doesMessageSlugExist(userMessageSlug)

				// If user message slug already exists, append a counter
				while (userSlugCheck.exists) {
					userMessageSlug = toSlug(
						`${curatedPreUserMessageSlug} ${userSlugCheck.sequence + 1}`,
					)
					userSlugCheck = await doesMessageSlugExist(userMessageSlug)
				}

				// We need to check for a unique slug for assistant message as well
				let assistantMessageSlug = toSlug(message.content)
				let assistantSlugCheck =
					await doesMessageSlugExist(assistantMessageSlug)

				// If assistant message slug already exists, append a counter
				while (assistantSlugCheck.exists) {
					assistantMessageSlug = toSlug(
						`${message.content} ${assistantSlugCheck.sequence + 1}`,
					)
					assistantSlugCheck = await doesMessageSlugExist(assistantMessageSlug)
				}

				const [
					newUserMessage,
					newAssistantMessage,
				]: Partial<SaveNewMessageParams>[] = [
					{
						...newBaseMessage,
						messageId: userMessageId,
						slug: userMessageSlug,
						role: 'user',
						content: userContentRef.current,
						createdAt: new Date().toISOString(),
					},
					{
						...newBaseMessage,
						messageId: assistantMessageId,
						slug: assistantMessageSlug,
						role: 'assistant',
						content: message.content,
						createdAt: new Date(Date.now() + 1000).toISOString(),
					},
				]
				await Promise.all([
					saveNewMessage(newUserMessage),
					saveNewMessage(newAssistantMessage),
				])

				setState({
					isNewChat: false,
				})

				if (isContinuousThread) {
					// Remove continuousThreadId search param
					const newSearchParams = new URLSearchParams(searchParams.toString())
					newSearchParams.delete('continuousThreadId')
					window.history.replaceState(
						null,
						'',
						`${window.location.pathname}?${newSearchParams.toString()}`,
					)

					setIsContinuousThread(false)
				}
				setIsNewResponse(false)
				setLoadingState('finished')
				setActiveTool(undefined)

				throttle(async () => {
					await updateActiveThread()
				}, 250)()
			} catch (error) {
				console.error('Error saving new message: ', error)
				customSonner({
					type: 'error',
					text: 'Failed to save the Masterbot message. Please try again.',
				})

				if (isNewChat) {
					await deleteThread({
						threadId: params?.threadId ?? activeThread?.threadId,
						jwt: session?.user?.hasuraJwt,
						userId: session?.user.id,
					})
				}
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
		async onError(error: any) {
			console.error('Error in chat: ', error)

			customSonner({
				type: 'error',
				text: 'Failed to send message. Please try again.',
			})
			setLoadingState(undefined)
			setActiveTool(undefined)
			setIsNewResponse(false)

			if (isNewChat) {
				await deleteThread({
					threadId: params?.threadId ?? activeThread?.threadId,
					jwt: session?.user?.hasuraJwt,
					userId: session?.user.id,
				})
			}
		},
	})

	/**
	 * @description
	 * All messages coming from DB and continuing the chat, omitting the system prompts to provide to the LLM context.
	 */
	const allMessages = uniqBy(
		initialMessages?.concat(messages).concat(
			activeThread?.messages?.map((msg) => ({
				...msg,
				id: msg.messageId,
				role: msg.role as 'data' | 'system' | 'user' | 'assistant',
			})) || [],
		),
		'content',
	)
		.filter(Boolean)
		.filter((m) => m.role !== 'system')

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

	const updateActiveThread = async (
		newThread?: Thread | null,
		clean?: boolean,
	) => {
		let thread = newThread

		if (!thread) {
			thread = await getThread({
				threadId: isContinuousThread ? randomThreadId.current : threadId,
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

		const userPrompt = cleanPrompt(userMessage.content)
		const { content, error } = await processUserMessage(
			userPrompt,
			clientType as AiClientType,
			selectedModel,
		)

		// console.log('thread::tunninUserContent  --> ', thread)
		if (thread) {
			updateActiveThread(
				{
					...thread,
					messages: thread.messages.filter((m) => m.content !== userPrompt),
				},
				true,
			)
		}

		userContentRef.current = content
	}

	// we extend append function to add our system prompts
	const appendWithMbContextPrompts = async (
		userMessage: AiMessage | CreateMessage,
		chatRequestOptions?: ChatRequestOptions,
	): Promise<string | null | undefined> => {
		if (!session?.user || !chatbot) {
			console.error('User is not logged in or session expired.')
			customSonner({
				type: 'error',
				text: 'Failed to start conversation. Please reload and try again.',
			})
			return
		}

		// * Loading: processing your request + opening pop-up...
		setLoadingState('processing')
		setIsNewResponse(true)
		updateNewThread()

		const defaultUserMessage: Partial<Message> = {
			content: cleanPrompt(userMessage.content),
			role: 'user',
			messageId: randomThreadId.current,
			createdAt: new Date().toISOString(),
			augmentedFrom: null,
			examples: [],
			threadId,
		}
		const optimisticThread: Thread = {
			threadId,
			chatbotId: chatbot?.chatbotId,
			chatbot,
			createdAt: new Date().toISOString(),
			isApproved: false,
			isBlocked: false,
			isPublic: activeChatbot?.name !== 'BlankBot',
			// @ts-ignore
			messages: uniqBy([...allMessages, defaultUserMessage], 'content'),
			thread: isContinuousThread ? activeThread?.thread || null : null,
			userId: session?.user.id,
		}

		const thread = await updateActiveThread(
			isNewChat || isContinuousThread ? optimisticThread : undefined,
		)

		if (!isOpenPopup) {
			setIsOpenPopup(true)
		}

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

		await appendNewMessage(userMessage, chatRequestOptions)
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

		navigateTo({
			urlType: 'threadUrl',
			shallow: true,
			navigationParams: {
				type: 'personal',
				category: activeChatbot?.categories[0].category.name || '',
				domain: activeChatbot?.metadata[0].domainName || '',
				chatbot: activeChatbot?.name || '',
				threadSlug: activeThread?.slug || '',
			},
		})

		return null
	}

	const sendMessageFromResponse = async (bulletContent: string) => {
		const fullMessage = bulletContent

		appendWithMbContextPrompts({
			id: params?.threadId || activeThread?.threadId,
			content: fullMessage,
			role: 'user',
		})
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
			// ? Hydration issues is causing the continuing thread to update until the 2nd attempt after it gets updated to false and the react state to get the latest searchParam in the client... These hydration issues might be related to the client components trying to update the state before the server response is ready or the client doesn't catch-up on time the react states... Maybe removing the hydration warning we might now... 🤔
			const recentSearchParams = new URLSearchParams(window.location.search)
			const isContinuingThread = recentSearchParams.has('continuousThreadId')

			if (appConfig.features.devMode) {
				console.info(
					'Before appending a new message, we check the following to know if is new chat or not: ',
				)
				console.log('isNewChat guard --> ', isNewChat)
				console.log('allMessages --> ', allMessages)
				console.log('activeThread --> ', activeThread)
				console.log('isContinuousThread --> ', isContinuingThread)
			}

			if (
				((!allMessages.length && isNewChat) || isContinuingThread) &&
				chatbot
			) {
				let slug = toSlug(userContentRef.current)
				let slugCheck = await doesThreadSlugExist(slug)

				while (slugCheck.exists) {
					slug = toSlug(`${userContentRef.current} ${slugCheck.sequence + 1}`)
					slugCheck = await doesThreadSlugExist(slug)
				}

				await createThread({
					threadId: threadId as string,
					slug,
					chatbotId: chatbot.chatbotId,
					parentThreadId: isContinuousThread ? threadId : undefined,
					jwt: session?.user?.hasuraJwt,
					isPublic: activeChatbot?.name !== 'BlankBot',
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
				'content',
			)
			setMessages(chatMessagesToAppend)

			// What remedies are good for stress relieve?
			if (appConfig.features.devMode) {
				console.log('chatMessagesToAppend --> ', chatMessagesToAppend)
				console.log('Chatbot metadata --> ', chatbotMetadata)
			}

			let previousAiUserMessages: AiMessage[] = []

			if (activeThread?.thread) {
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
			messageAttachments.current =
				chatMessagesOptions?.experimental_attachments as FileAttachment[]
			const appendResponse = await append(
				{
					...userMessage,
					content: isNewChat
						? userContentRef.current
						: followingQuestionsPrompt(
								userContentRef.current,
								previousAiUserMessages.concat(allMessages),
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
	sendMessageFromResponse: (bulletContent: string) => void
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
