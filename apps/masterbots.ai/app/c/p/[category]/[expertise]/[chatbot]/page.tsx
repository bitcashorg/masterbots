import { auth } from '@/auth'
import { ChatChatbot } from '@/components/chat/chat-chatbot'
import ThreadPanel from '@/components/thread-panel'
import { botNames } from '@/lib/bots-names'
import { getChatbot, getThreads } from '@/services/hasura'
import { Message } from 'ai'
import { isTokenExpired } from 'mb-lib'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'
import { formatSystemPrompts } from '@/lib/actions'

export default async function BrowseProBotPage({
  params,
  searchParams
}: {
  params: { category: string; expertise: string; chatbot: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await auth()
  // NOTE: maybe we should use same expiration time
  const jwt = session ? session.user?.hasuraJwt : null
  if (!jwt) {
    throw new Error('Session JWT is missing.')
  }
  if (isTokenExpired(jwt)) {
    redirect(`/sign-in`)
  }
  const chatbotName = botNames.get(params.chatbot)
  if (!chatbotName) {
    throw new Error(`Chatbot name for ${params.chatbot} not found`)
  }
  const chatbot = await getChatbot({ chatbotName, jwt })

  if (!chatbot)
    throw new Error(`Chatbot ${botNames.get(params.chatbot)} not found`)

  // session will always be defined

  const userId = session?.user?.id
  if (!userId) {
    throw new Error('User ID is missing.')
  }
  const threads = await getThreads({ chatbotName, jwt, userId })

  // format all chatbot prompts as chatgpt 'system' messages
  const chatbotSystemPrompts: Message[] = formatSystemPrompts(chatbot.prompts)

  const userPreferencesPrompts: Message[] = [
    {
      id: nanoid(),
      role: 'system',
      content:
        `Your response tone will be ${chatbot.defaultTone}. ` +
        `Your response length will be ${chatbot.defaultLength}. ` +
        `Your response format will be ${chatbot.defaultType}. ` +
        `Your response complexity level will be ${chatbot.defaultComplexity}.` +
        `Your response will be generated in the same language as user input.`,
      createdAt: new Date()
    }
  ]

  // concatenate all message to pass it to chat component
  const initialMessages: Message[] = chatbotSystemPrompts.concat(
    userPreferencesPrompts
  )

  return (
    <>
      <ThreadPanel
        threads={threads}
        chatbot={chatbot.name}
        search={searchParams}
      />{' '}
      <ChatChatbot initialMessages={initialMessages} chatbot={chatbot} />
    </>
  )
}
