import { getChatbotMetadataLabels, improveMessage } from '@/app/actions'
import { formatSystemPrompts } from '@/lib/actions'
import {
  type ChatbotMetadataExamples,
  type ExampleMetadata,
  type GetChatbotMetadataLabels,
  examplesPrompt,
  finalIndicationPrompt,
  followingQuestionsPrompt,
  setDefaultUserPreferencesPrompt,
} from '@/lib/constants/prompts'
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
import type { AiClientType, AiToolCall } from '@/types/types'
import type { Message as AiMessage, ChatRequestOptions, CreateMessage } from 'ai'
import { useChat } from 'ai/react'
import { uniqBy } from 'lodash'
import type { Chatbot, Message, Thread } from 'mb-genql'

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

  const chatbotSystemPrompts: AiMessage[] = formatSystemPrompts(
    (activeThread?.chatbot ?? (activeChatbot as Chatbot) ?? chatbotProps)?.prompts,
  )

  const userPreferencesPrompts: AiMessage[] = activeThread
    ? [setDefaultUserPreferencesPrompt(activeThread.chatbot)]
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
  const initialMessages: AiMessage[] = chatbotSystemPrompts
    .concat(userPreferencesPrompts)
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

  const { input, messages, isLoading, stop, append, reload, setInput, setMessages } = useChat({
    initialMessages,
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

        return stop()
      }

      await Promise.all([
        saveNewMessage({
          role: 'user',
          threadId: aiChatThreadId ?? '',
          content: userContentRef.current,
          jwt: session?.user?.hasuraJwt,
        }),
        // ? Adding a delay to securely keep the order of messages
        delayFetch(),
        saveNewMessage({
          role: 'assistant',
          threadId: aiChatThreadId,
          content: message.content,
          jwt: session?.user?.hasuraJwt,
        }),
      ])

      return stop()
    },
    onToolCall({ toolCall }: any) {
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

      return stop()
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
  ) => {
    if (!session?.user || !chatbot) {
      console.error('User is not logged in or session expired.')
      customSonner({
        type: 'error',
        text: 'Failed to start conversation. Please reload and try again.',
      })
      return
    }

    setIsNewResponse(true)

    if (isNewChat) {
      const optimisticThread: Thread = {
        threadId,
        chatbotId: chatbot?.chatbotId,
        chatbot,
        createdAt: new Date().toISOString(),
        isApproved: false,
        isBlocked: false,
        isPublic: activeChatbot?.name !== 'BlankBot',
        messages: [
          // @ts-ignore
          {
            messageId: userMessage.id,
            createdAt: new Date().toISOString(),
            role: userMessage.role,
            content: userMessage.content,
          },
        ],
        userId: session?.user.id,
      }

      updateActiveThread(optimisticThread)
    }

    try {
      // * Loading: processing your request + opening pop-up...
      setLoadingState('processing')
      await tunningUserContent(userMessage)

      // ! At this point, the UI respond and provides a feedback to the user... before it is now even showing the updated active thread, event though that it does update the active thread...
      // TODO: improve response velocity here (split this fn to yet another cb fn? 🤔)
      setIsOpenPopup(true)
    } catch (error) {
      console.error('Error processing user message. Using og message. Error: ', error)
    } finally {
      await appendNewMessage(userMessage)
    }
  }

  const getMetadataLabels = async (): Promise<ChatbotMetadataExamples> => {
    let chatMetadata: GetChatbotMetadataLabels | undefined
    const defaultMetadata: ChatbotMetadataExamples = {
      tagExamples: [],
      categoryExamples: [],
      domainExamples: [],
    }
    try {
      chatMetadata = await getChatbotMetadataLabels(
        {
          // ! domain should have a relationship to the chatbot... currently isn't...
          domain: chatbot?.categories[0].categoryId as number,
          chatbot: chatbot?.chatbotId as number,
          category: chatbot?.categories[0].categoryId as number,
        },
        userContentRef.current,
        clientType as AiClientType,
      )
      console.log('Full responses from getChatbotMetadataLabels:', chatMetadata)

      // * Loading: Polishing Ai request... 'polishing'
      setLoadingState('polishing')
    } catch (error) {
      console.error('Error getting chatbot metadata labels:', error)
    }

    const tagExamples = []
    const categoryExamples = []
    let domainExamples: ExampleMetadata[] = []
    // * Getting the user labelling the thread (categories, sub-category, etc.)
    try {
      if (
        !chatMetadata ||
        (chatMetadata &&
          (!chatMetadata?.domain ||
            !chatMetadata?.tags ||
            !chatMetadata?.category ||
            !chatMetadata?.subCategory))
      ) {
        customSonner({ type: 'error', text: 'Error fetching chatbot metadata labels.' })
        return defaultMetadata
      }

      domainExamples = (await fetchDomainExamples(chatMetadata.domain)) ?? []
      console.log('Domain examples:', domainExamples)
      const domainTags = (await fetchDomainTags(chatMetadata.domain)) ?? []
      console.log('Domain tags:', domainTags)

      if (!domainExamples.length && !domainTags) {
        customSonner({ type: 'error', text: 'Error fetching domain examples or tags.' })
        return defaultMetadata
      }

      console.log('Domain tags length:', Object.keys(domainTags || {}).length)

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

      for (const example of domainExamples) {
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
          if (
            example.category === chatMetadata.category &&
            example.subcategory === chatMetadata.subCategory
          ) {
            categoryExamples.push(example)
            usedPrompts.push(example.prompt)
          }
        } else {
          break
        }
      }

      console.log('Tag examples length:', tagExamples.length)
      console.log('Category examples length:', categoryExamples.length)

      console.log('Tag examples:', tagExamples)
      console.log('Category examples:', categoryExamples)
    } catch (error) {
      console.error('Error getting chatbot metadata labels:', error)
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

  const allMessages = uniqBy(initialMessages?.concat(messages), 'content').filter(
    (m) => m.role !== 'system',
  )

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

        // * Loading: Here is the information you need... 'finish'
        const thread = await getThread({
          threadId: threadId as string,
          jwt: session?.user?.hasuraJwt,
        })

        updateActiveThread(thread)
      }

      // if (chatbotMetadata) {
      //   await append(
      //     {
      //       role: 'system',
      //       content:
      //         "Refer to the examples below to craft responses to the user's queries. Provide answers directly, omitting any labels like 'Questions', 'Answers', or 'Examples.' " +
      //         `## EXAMPLES:
      //         ${chatbotMetadata?.tagExamples
      //           .map(
      //             (e, index) => `**Example #${index + 1}:**
      //           Question: ${e.prompt}
      //           Answer: ${e.response}
      //           `,
      //           )
      //           .join(', ')}`,
      //     },
      //     // ? Provide chat attachments here...
      //     // {
      //     //   experimental_attachments: [],
      //     // }
      //   )
      // }
      console.log('Thread ID: ', threadId)
      console.log('initialMessages: ', initialMessages)
      const appendResponse = await append(
        {
          ...userMessage,
          content: isNewChat
            ? userContentRef.current
            : examplesPrompt(chatbotMetadata) +
              followingQuestionsPrompt(userContentRef.current, messages) +
              finalIndicationPrompt(),
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
      // ? temp ignore...
      // @ts-ignore
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
