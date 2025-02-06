import { getChatbotMetadata, improveMessage } from '@/app/actions'
import { formatSystemPrompts } from '@/lib/actions'
import { followingQuestionsPrompt, setDefaultUserPreferencesPrompt } from '@/lib/constants/prompts'
import { useModel } from '@/lib/hooks/use-model'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { useThread } from '@/lib/hooks/use-thread'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { delayFetch } from '@/lib/utils'
import {
  createThread,
  deleteThread,
  fetchDomainExamples,
  fetchDomainTags,
  getMessages,
  getThread,
  saveNewMessage,
} from '@/services/hasura'
import type {
  AiClientType,
  AiToolCall,
  ChatbotMetadataClassification,
  ChatbotMetadataExamples,
  ExampleMetadata,
} from '@/types/types'
import type { Message as AiMessage, ChatRequestOptions, CreateMessage } from 'ai'
import { type UseChatOptions, useChat } from 'ai/react'
import { uniqBy } from 'lodash'
import type { Chatbot, Message, Thread } from 'mb-genql'

import { appConfig } from 'mb-env'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useAsync, useSetState } from 'react-use'
import { useSonner } from './useSonner'

export function useMBChat(config?: MBChatHookConfig): MBChatHookCallback {
  const { threadId: threadIdProps, chatbot: chatbotProps } = config ?? {}
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
  const { activeChatbot } = useSidebar()
  const router = useRouter()
  const userContentRef = useRef<string>('')
  const randomThreadId = useRef<string>(crypto.randomUUID())
  const [{ messagesFromDB, isInitLoaded }, setState] = useSetState<{
    isInitLoaded: boolean
    webSearch: boolean
    messagesFromDB: Message[]
  }>({
    isInitLoaded: false,
    webSearch: false,
    messagesFromDB: [] as Message[],
  })
  const { customSonner } = useSonner()
  const { isContinuousThread } = useThreadVisibility()
  // console.log('[HOOK] webSearch', webSearch)

  const params = useParams<{ chatbot: string; threadId: string }>()
  const { selectedModel, clientType } = useModel()

  const chatbotData = activeThread?.chatbot ?? (activeChatbot as Chatbot) ?? chatbotProps
  const chatbotSystemPrompts: AiMessage[] = formatSystemPrompts(chatbotData?.prompts)
  const userPreferencesPrompts: AiMessage[] = chatbotData
    ? [setDefaultUserPreferencesPrompt(chatbotData)]
    : []
  // format all user prompts and chatgpt 'assistant' messages
  const userAndAssistantMessages: AiMessage[] = activeThread
    ? messagesFromDB.map((m) => ({
        id: m.messageId,
        role: m.role as AiMessage['role'],
        content: m.content,
        createdAt: m.createdAt,
      }))
    : []
  // concatenate all message to pass it to chat component
  const initialMessages: AiMessage[] = userPreferencesPrompts
    .concat(chatbotSystemPrompts)
    .concat(userAndAssistantMessages)

  // ? Prompt formatting:
  // 1. SYSTEM
  // 2. CHATBOT CONFIG
  // 3. THREAD MESSAGES

  const isNewChat = Boolean(!params.threadId && !activeThread)
  const threadId = threadIdProps || activeThread?.threadId || randomThreadId.current
  const chatbot = chatbotProps || activeThread?.chatbot || activeChatbot

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
    // initialMessages,
    id: params.threadId || isNewChat ? threadId : activeThread?.threadId,
    // TODO: Check this experimental feature: https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat#experimental_prepare-request-body
    // ? We might need it depending what the AI returns to us and what kind of data it has... this is might be useful for:
    // ? - Web Search (Tool + Global)
    // ? - Any additional tool with multiple steps or user decisions and react according to them...
    // experimental_prepareRequestBody
    body: {
      id: params.threadId || isNewChat ? threadId : activeThread?.threadId,
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
      setLoadingState(undefined)
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

      await Promise.all([
        saveNewMessage({
          role: 'user',
          threadId: aiChatThreadId ?? '',
          content: userContentRef.current,
          jwt: session?.user?.hasuraJwt,
        }),
        // ? Adding a delay to securely keep the order of messages
        delayFetch(500),
        saveNewMessage({
          role: 'assistant',
          threadId: aiChatThreadId,
          content: message.content,
          jwt: session?.user?.hasuraJwt,
        }),
      ])
    },
    // @ts-ignore
    onToolCall({ toolCall }: { toolCall: AiToolCall }) {
      console.log('Tool call:', toolCall)
      customSonner({ type: 'info', text: `Tool call executed: ${toolCall.toolName}` })
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
  }, [activeThread])

  // biome-ignore lint/correctness/useExhaustiveDependencies: only activeThread is needed
  useEffect(() => {
    if (!activeThread) {
      setState({ messagesFromDB: [], isInitLoaded: false })
    }
  }, [activeThread])

  const updateActiveThread = (newThread?: Thread) => {
    if (!newThread) {
      setMessages([])
      return setActiveThread(null)
    }

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
    ).filter((m) => m.role !== 'system')

    setMessages(newAllMessages)
    allMessages.concat(newAllMessages)
    setActiveThread(newThread)
  }

  const tunningUserContent = async (userMessage: AiMessage | CreateMessage) => {
    setLoadingState('digesting')

    const { content, error } = await processUserMessage(
      userMessage.content,
      clientType as AiClientType,
      selectedModel,
    )

    userContentRef.current = content
    setLoadingState(error ? undefined : 'generating')
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

    if (isNewChat) {
      const defaultUserMessage: Partial<Message> = {
        content: userMessage.content,
        role: 'user',
        messageId: randomThreadId.current,
        createdAt: new Date().toISOString(),
        augmentedFrom: null,
        examples: [],
        threadId: threadId,
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
        messages: [defaultUserMessage],
        userId: session?.user.id,
      }

      updateActiveThread(optimisticThread)
    }

    setIsNewResponse(true)
    setIsOpenPopup(true)

    try {
      await tunningUserContent(userMessage)
      // ! At this point, the UI respond and provides a feedback to the user... before it is now even showing the updated active thread, event though that it does update the active thread...
      // TODO: improve response velocity here (split this fn to yet another cb fn? 🤔)
    } catch (error) {
      console.error('Error processing user message. Using og message. Error: ', error)
    } finally {
      await appendNewMessage(userMessage)
    }
  }

  const getMetadataLabels = async (): Promise<ChatbotMetadataExamples> => {
    let chatMetadata: ChatbotMetadataClassification | undefined
    const defaultMetadata: ChatbotMetadataExamples = {
      tagExamples: [],
      categoryExamples: [],
      domainExamples: [],
    }
    try {
      chatMetadata = await getChatbotMetadata(
        {
          chatbot: chatbot?.chatbotId as number,
        },
        userContentRef.current,
        clientType as AiClientType,
      )
      console.log('Full responses from ChatbotMetadata:', chatMetadata)

      // * Loading: Polishing Ai request... 'polishing'
      setLoadingState('polishing')
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

    const tagExamples = []
    const categoryExamples = []
    const domainExamples: ExampleMetadata[] = []
    // * Getting the user labelling the thread (categories, sub-category, etc.)
    try {
      if (
        !chatMetadata ||
        (chatMetadata &&
          (!chatMetadata?.domainName || !chatMetadata?.tags || !chatMetadata?.categories.length))
      ) {
        return defaultMetadata
      }

      const domainExampleResponse = (await fetchDomainExamples(chatMetadata)) ?? []
      const domainTags = (await fetchDomainTags(chatMetadata)) ?? []

      // console.log('Domain examples --> ', domainExampleResponse)
      // console.log('Domain tags --> ', domainTags)

      if (!domainExampleResponse.length && !domainTags) {
        customSonner({ type: 'error', text: 'Error fetching domain examples or tags.' })
        return defaultMetadata
      }

      // console.log('Domain tags length:', Object.keys(domainTags || {}).length)

      // * NOTE: ****************************************************************************************
      // the domainTags keys are tag ids, the values are an object with the name and frequency of the tag
      // every example has a list of tags (tag ids); these match the domainTags object keys
      // the chat metadata has a tags field as well; this is a list of tags (tag names)
      // i need to go through the list of examples
      // for each i need to get the list of tag ids and use teh domainTags object to get their names
      // then i need to check if the name is in the chat metadata tags list
      // i need to take a cumulative sum of 1-the frequency of the tag in the domainTags object
      // i need to store this cumulative sum in the example object
      // ************************************************************************************************

      for (const example of domainExampleResponse) {
        let cumulativeSum = 0
        for (const tagId of example.tags) {
          try {
            // @ts-ignore
            const tagName = domainTags[tagId]?.name
            if (!chatMetadata.tags.length) {
              break
            }
            if (chatMetadata.tags.includes(tagName)) {
              // @ts-ignore
              cumulativeSum += 1 - domainTags[tagId]?.frequency
              const exampleIndex = domainExampleResponse.findIndex(
                (e) => e.exampleId === example.exampleId,
              )
              // grab the exampleIndex to push it into a new array
              if (exampleIndex !== -1) {
                domainExamples.push({ ...example, cumulativeSum })
              }
            }
          } catch (error) {
            console.log('Error:', error)
            console.log('Tag id:', tagId)
          }
        }
        example.cumulativeSum = cumulativeSum
      }

      // now i need to sort the examples by the cumulative sum, in descending order
      domainExamples.sort((a, b) => (b?.cumulativeSum || 0) - (a?.cumulativeSum || 0))
      console.log('Sorted domain examples:', domainExamples)

      // then i need to take the top 3 examples
      // however, i do not want to take examples that have the same prompt
      const usedPrompts: string[] = []
      for (const example of domainExamples) {
        if (usedPrompts.includes(example.prompt)) {
          continue
        }
        if (tagExamples.length < 3) {
          tagExamples.push(example)
          usedPrompts.push(example.prompt)
        } else if (categoryExamples.length < 3) {
          for (const categories of chatMetadata.categories) {
            for (const category of Object.keys(categories)) {
              if (example.category === category) {
                categoryExamples.push(example)
                usedPrompts.push(example.prompt)
              }
            }
          }
        } else {
          break
        }
      }
    } catch (error) {
      console.error('getMetadataLabels: Error getting chatbot metadata labels -->', error)
    }

    return {
      tagExamples,
      categoryExamples,
      domainExamples,
    }
  }

  const appendAsContinuousThread = async (userMessage: AiMessage | CreateMessage) => {
    const optimisticUserMessage = { ...userMessage, id: randomThreadId.current }
    const message = followingQuestionsPrompt(userMessage.content, messages.concat(allMessages))
    userContentRef.current = userMessage.content

    const createdThread = await createThread({
      threadId: randomThreadId.current as string,
      parentThreadId: activeThread?.threadId,
      chatbotId: chatbot ? chatbot?.chatbotId : 0,
      jwt: session?.user?.hasuraJwt,
      isPublic: activeChatbot?.name !== 'BlankBot',
    })

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

  const fetchMessages = async () => {
    setState({ isInitLoaded: true })
    try {
      const messagesFromDB = await getMessages({
        threadId: activeThread?.threadId,
      })
      setState({
        messagesFromDB,
      })
      setMessages(chatbotSystemPrompts)
    } catch (error) {
      console.error('Error fetching messages:', error)
      customSonner({ type: 'error', text: 'Failed to load messages. Please try again.' })
    }
  }

  const sendMessageFromResponse = async (bulletContent: string) => {
    const fullMessage = bulletContent

    appendWithMbContextPrompts({
      id: params?.threadId || activeThread?.threadId,
      content: fullMessage,
      role: 'user',
    })
  }

  const allMessages = uniqBy(
    initialMessages?.concat(messages),
    // .concat(
    //   activeThread?.messages?.map((msg) => ({
    //     ...msg,
    //     id: msg.messageId,
    //     role: msg.role as 'data' | 'system' | 'user' | 'assistant',
    //   })) || [],
    // )
    'content',
  ).filter((m) => m.role !== 'system')

  const toggleWebSearch = () => {
    setWebSearch(!webSearch)
  }

  const appendNewMessage = async (userMessage: AiMessage | CreateMessage) => {
    setLoadingState('generating')

    try {
      const chatbotMetadata = await getMetadataLabels()

      console.log('Chatbot metadata: ', chatbotMetadata)

      if (isNewChat && chatbot) {
        await createThread({
          threadId: threadId as string,
          chatbotId: chatbot.chatbotId,
          jwt: session?.user?.hasuraJwt,
          isPublic: activeChatbot?.name !== 'BlankBot',
        })
      }

      if (chatbot && (isNewChat || !activeThread)) {
        // * Loading: Here is the information you need... 'finish'
        const thread = await getThread({
          threadId: threadId as string,
          jwt: session?.user?.hasuraJwt,
        })

        updateActiveThread(thread)
      }

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

      setLoadingState('finished')
      return appendResponse
    } catch (error) {
      setLoadingState(undefined)
      stop()

      console.error('Error appending new message: ', error)

      return null
    }
  }

  // ? return [state, actions]
  return [
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
  ]
}

async function processUserMessage(
  content: string,
  clientType: AiClientType,
  model: string,
): Promise<{ content: string; error?: Error }> {
  try {
    const improved = await improveMessage(content, clientType, model)

    const processedContent =
      improved.translatedText || improved.improvedText || improved.originalText

    return { content: processedContent }
  } catch (error) {
    console.error('Error processing message:', error)
    return { content, error: error as Error }
  }
}

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
