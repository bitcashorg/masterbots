'use client'

import { getChatbotMetadata } from '@/app/actions'
import { formatSystemPrompts } from '@/lib/actions'
import {
  examplesPrompt,
  followingQuestionsPrompt,
  setDefaultUserPreferencesPrompt,
} from '@/lib/constants/prompts'
import { useModel } from '@/lib/hooks/use-model'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import {
  createThread,
  deleteThread,
  getMessages,
  getThread,
  saveNewMessage
} from '@/services/hasura'
import type {
  AiClientType,
  AiToolCall,
  ChatbotMetadataClassification,
  ChatbotMetadataExamples,
} from '@/types/types'
import type { Message as AiMessage, ChatRequestOptions, CreateMessage } from 'ai'
import { type UseChatOptions, useChat } from 'ai/react'
import { uniqBy } from 'lodash'
import type { Chatbot, Message, Thread } from 'mb-genql'

import { aiExampleClassification, processUserMessage } from '@/lib/helpers/ai-classification'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import type { SaveNewMessageParams } from '@/services/hasura/hasura.service.type'
import { appConfig } from 'mb-env'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useRef } from 'react'
import { useAsync, useSetState } from 'react-use'
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
    loadingState,
    webSearch,
    setWebSearch,
    setActiveThread,
    setIsNewResponse,
    setIsOpenPopup,
    setActiveTool,
    setLoadingState,
  } = useThread()
  const { activeChatbot } = useSidebar()
  const router = useRouter()
  const userContentRef = useRef<string>('')
  const randomThreadId = useRef<string>(crypto.randomUUID())
  const [{ messagesFromDB, isInitLoaded, /* isNewChat */ }, setState] = useSetState<{
    isInitLoaded: boolean
    webSearch: boolean
    messagesFromDB: Message[]
    // isNewChat: boolean
  }>({
    isInitLoaded: false,
    webSearch: false,
    messagesFromDB: [] as Message[],
    // isNewChat: Boolean(!activeThread || activeThread && activeThread.messages.length <= 1),
  })
  const isNewChat = Boolean(!activeThread || (activeThread && activeThread.messages.length <= 1))
  const { customSonner } = useSonner()
  const { isContinuousThread } = useThreadVisibility()
  // console.log('[HOOK] webSearch', webSearch)

  const params = useParams<{ chatbot: string; threadId: string }>()
  const { selectedModel, clientType } = useModel()

  const chatbotData = activeThread?.chatbot ?? (activeChatbot as Chatbot)
  const chatbotSystemPrompts: AiMessage[] = formatSystemPrompts(chatbotData?.prompts)
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
   * Concatenate all message to pass it to chat component.
   *
   * **Prompt Formatting:**
   *
   * 1. Chatbot Config.
   * 2. Chatbot System Prompts (IQ, Expertise).
   * 3. Conversation between user and assistant.
   * */
  const initialMessages: AiMessage[] = userPreferencesPrompts
    .concat(chatbotSystemPrompts)
    .concat(userAndAssistantMessages)

  const threadId = activeThread?.threadId || randomThreadId.current
  const chatbot = activeThread?.chatbot || activeChatbot

  const resolveThreadId = (params: {
    isContinuousThread: boolean
    randomThreadId: string
    threadId: string
    activeThreadId?: string
  }) => {
    const { isContinuousThread, randomThreadId, threadId, activeThreadId } = params
    if (isContinuousThread) return randomThreadId
    if (params.threadId || isNewChat) return threadId
    return activeThreadId
  }
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
    },
  }
  const { input, messages, isLoading, stop, append, reload, setInput, setMessages } = useChat({
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
    async onFinish(message: any, options: any) {
      setLoadingState('finished')
      setActiveTool(undefined)
      setIsNewResponse(false)

      const aiChatThreadId = resolveThreadId({
        isContinuousThread,
        randomThreadId: randomThreadId.current,
        threadId,
        activeThreadId: activeThread?.threadId,
      })

      if (options.finishReason === 'error') {
        customSonner({ type: 'error', text: 'Failed to send message. Please try again.' })

        if (isNewChat) {
          await deleteThread({
            threadId: params?.threadId ?? activeThread?.threadId,
            jwt: session?.user?.hasuraJwt,
            userId: session?.user.id,
          })
        }
      }

      const newBaseMessage: Partial<SaveNewMessageParams> = {
        threadId: aiChatThreadId ?? '',
        jwt: session?.user?.hasuraJwt,
      }
      const newUserMessage: Partial<SaveNewMessageParams> = {
        ...newBaseMessage,
        role: 'user',
        content: userContentRef.current,
        createdAt: new Date().toISOString(),
      }
      const newAssistantMessage: Partial<SaveNewMessageParams> = {
        ...newBaseMessage,
        role: 'assistant',
        content: message.content,
        createdAt: new Date(Date.now() + 1000).toISOString(),
      }

      await Promise.all([
        saveNewMessage(newUserMessage),
        // ? Adding a delay to securely keep the order of messages
        saveNewMessage(newAssistantMessage),
        // delayFetch(),
        // fetchMessages(),
      ])

      // router.push(
      //   `/c/${toSlug(activeThread?.chatbot.categories[0].category.name as string)}/${toSlug(activeThread?.chatbot.name as string)}/${activeThread?.threadId}`,
      //   {
      //     scroll: false,
      //   },
      // )
    },
    // @ts-ignore
    onToolCall({ toolCall }: { toolCall: AiToolCall }) {
      console.log('Tool call:', toolCall)

      if (appConfig.features.devMode) {
        customSonner({ type: 'info', text: `Tool call executed: ${toolCall.toolName}` })
      }

      setActiveTool(toolCall as AiToolCall)
    },
    async onError(error: any) {
      console.error('Error in chat: ', error)

      customSonner({ type: 'error', text: 'Failed to send message. Please try again.' })
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
   * All messages coming from DB and continuing the chat, omitting the system prompts.
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
  ).filter((m) => m.role !== 'system')

  //* Updates the thread ID when popup is closed
  useEffect(() => {
    if (isOpenPopup) return
    randomThreadId.current = crypto.randomUUID() //* Generates a new thread ID
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopup])

  // * Loading: getting the the information right... 'digesting'
  // ? fetch messages from db on active thread change
  const { loading } = useAsync(async () => {
    if (
      (activeThread?.chatbot?.prompts?.length || activeThread?.chatbot?.name === 'BlankBot') &&
      !isInitLoaded &&
      !loading
    ) {
      // ? Rendering 3 times on first load... 🤔
      await fetchMessages()
    }
  }, [activeThread?.chatbot])

  // biome-ignore lint/correctness/useExhaustiveDependencies: only activeThread is needed
  useEffect(() => {
    if (!activeThread && !isOpenPopup) {
      setState({ messagesFromDB: [], isInitLoaded: false })
    }
  }, [activeThread, isOpenPopup])

  // reset all states when unmounting the context hook
  // biome-ignore lint/correctness/useExhaustiveDependencies: not required
  useEffect(() => {
    return () => {
      setState({
        isInitLoaded: false,
        webSearch: false,
        messagesFromDB: [],
      })
      setInput('')
      setMessages([])
    }
  }, [])

  const fetchMessages = async () => {
    setState({ isInitLoaded: true })
    try {
      const messagesFromDB = await getMessages({
        threadId,
        jwt: session?.user?.hasuraJwt,
      })

      if (messagesFromDB) {
        setState({ messagesFromDB })
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
      customSonner({ type: 'error', text: 'Failed to load messages. Please try again.' })
    }
  }

  const updateActiveThread = async (newThread?: Thread, clean?: boolean) => {
    let thread = newThread

    if (!thread) {
      thread = await getThread({
        threadId,
        jwt: session?.user?.hasuraJwt,
      })
    } else {
      const newAllMessages = uniqBy(
        allMessages?.concat(
          (newThread?.messages || []).map((m) => ({
            id: m.messageId,
            role: m.role as AiMessage['role'],
            content: m.content,
            createdAt: m.createdAt || new Date().toISOString(),
          })),
        ),
        'content',
      )
      // .filter((m) => m.role !== 'system')
      // console.log('newAllMessages ---> ', newAllMessages)
      setMessages(newAllMessages)
    }

    if (thread) {
      setActiveThread(thread)
      setState({
        messagesFromDB: thread.messages,
      })
    }

    return thread
  }

  const tunningUserContent = async (userMessage: AiMessage | CreateMessage, thread: Thread) => {
    setLoadingState('digesting')

    const { content, error } = await processUserMessage(
      cleanPrompt(userMessage.content),
      clientType as AiClientType,
      selectedModel,
    )

    // console.log('thread::tunninUserContent  --> ', thread)
    if (thread) {
      updateActiveThread({
        ...thread,
        messages: thread.messages.filter((m) => m.content !== userMessage.content)
      }, true)
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

    const defaultUserMessage: Partial<Message> = {
      content: userMessage.content,
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
      userId: session?.user.id,
    }

    const thread = await updateActiveThread(!activeThread || isNewChat ? optimisticThread : undefined)

    if (!isOpenPopup) {
      setIsOpenPopup(true)
    }
    setIsNewResponse(true)

    try {
      await tunningUserContent(userMessage, thread)
      // ! At this point, the UI respond and provides a feedback to the user... before it is now even showing the updated active thread, event though that it does update the active thread...
      // TODO: improve response velocity here (split this fn to yet another cb fn? 🤔)
    } catch (error) {
      console.error('Error processing user message. Using og message. Error: ', error)
    }

    await appendNewMessage(userMessage, thread)
  }

  const getMetadataLabels = async (): Promise<ChatbotMetadataExamples> => {
    let chatMetadata: ChatbotMetadataClassification | undefined
    try {
      setLoadingState('polishing')
      chatMetadata = await getChatbotMetadata(
        {
          chatbot: chatbot?.chatbotId as number,
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

    if (chatMetadata?.errors?.length) {
      customSonner({
        type: 'error',
        text: `${chatMetadata.domainName}:\n${chatMetadata.errors.join('.\n')}`,
      })
    }

    return await aiExampleClassification({
      chatMetadata,
      customSonner,
    })
  }

  const appendAsContinuousThread = async (userMessage: AiMessage | CreateMessage) => {
    const optimisticUserMessage = { ...userMessage, id: randomThreadId.current }
    const message = followingQuestionsPrompt(userMessage.content, messages)
    userContentRef.current = userMessage.content

    const createdThread = await createThread({
      threadId: randomThreadId.current as string,
      parentThreadId: activeThread?.threadId,
      chatbotId: chatbot ? chatbot?.chatbotId : 0,
      jwt: session?.user?.hasuraJwt,
      isPublic: activeChatbot?.name !== 'BlankBot',
    })

    // ? Will this update the chat accordantly?... Maybe 🤔
    if (createdThread) {
      await append({
        ...optimisticUserMessage,
        content: message,
      })

      router.push(`/${chatbot?.name?.trim().toLowerCase()}/${randomThreadId.current}`, {
        scroll: false,
      })

      router.refresh()
    }

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

  const appendNewMessage = async (userMessage: AiMessage | CreateMessage, thread: Thread) => {

    try {
      const chatbotMetadata = await getMetadataLabels()
      const isUpdatedThreadNewChat = Boolean(!thread || (thread && thread.messages.length <= 1))

      if (isUpdatedThreadNewChat) {
        const newChatMessages = uniqBy(
          [
            {
              id: 'examples-' + nanoid(10),
              role: 'system' as 'data' | 'system' | 'user' | 'assistant',
              content: examplesPrompt(chatbotMetadata),
            },
            ...initialMessages,
            ...allMessages,
          ],
          'content',
        )
        setMessages(newChatMessages)

        if (appConfig.features.devMode) {
          console.log('newChatMessages --> ', newChatMessages)
          console.log('Chatbot metadata --> ', chatbotMetadata)
        }
      }
      // What remedies are good for stress relieve?
      if (appConfig.features.devMode && !isUpdatedThreadNewChat) {
        console.log('allMessages --> ', allMessages)
        console.log('Chatbot metadata --> ', chatbotMetadata)
      }


      if (isUpdatedThreadNewChat && chatbot) {
        await createThread({
          threadId: threadId as string,
          chatbotId: chatbot.chatbotId,
          jwt: session?.user?.hasuraJwt,
          isPublic: activeChatbot?.name !== 'BlankBot',
        })
      }

      setLoadingState('generating')
      const appendResponse = await append(
        {
          ...userMessage,
          content: isNewChat
            ? userContentRef.current
            : followingQuestionsPrompt(userContentRef.current, messages),
        },
        // ? Provide chat attachments here...
        // {
        //   experimental_attachments: [],
        // }
      )

      return appendResponse
    } catch (error) {
      setLoadingState(undefined)
      stop()

      console.error('Error appending new message: ', error)

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
          allMessages,
          initialMessages,
          isLoadingMessages: loading,
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
  allMessages: AiMessage[]
  isLoadingMessages: boolean
  initialMessages: AiMessage[]
  newChatThreadId: string
}

export type MBChatHookActions = {
  appendWithMbContextPrompts: (
    userMessage: AiMessage | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>
  appendAsContinuousThread: (
    userMessage: AiMessage | CreateMessage,
  ) => Promise<string | null | undefined>
  sendMessageFromResponse: (bulletContent: string) => void
  append: (
    message: AiMessage | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>
  reload: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  stop: () => void
  toggleWebSearch: () => void
  setInput: React.Dispatch<React.SetStateAction<string>>
  setMessages: (messages: AiMessage[]) => void
}
