import { auth } from '@/auth'
import { ChatChatbot } from '@/components/chat-chatbot'
import ThreadPanel from '@/components/thread-panel'
import { botNames } from '@/lib/bots-names'
import { getChatbot, getThreads } from '@/services/hasura'
import { Message } from 'ai'
import { isTokenExpired } from 'mb-lib'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'

export default async function BotThreadsPage({
  params,
  searchParams
}: {
  params: { chatbot: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await auth()
  // NOTE: maybe we should use same expiration time
  const jwt = session!.user.hasuraJwt
  if (!jwt || isTokenExpired(jwt)) {
    redirect(`/sign-in`)
  }
  const chatbot = await getChatbot({
    chatbotName: botNames.get(params.chatbot),
    jwt: session!.user.hasuraJwt
  })
  if (!chatbot)
    throw new Error(`Chatbot ${botNames.get(params.chatbot)} not found`)

  // session will always be defined
  const threads = await getThreads({
    chatbotName: botNames.get(params.chatbot),
    jwt: session!.user.hasuraJwt,
    userId: session!.user.id
  })

  // format all chatbot prompts as chatgpt 'system' messages
  const chatbotSystemPrompts: Message[] = chatbot.prompts.map(({ prompt }) => ({
    id: prompt.promptId.toString(),
    role: 'system',
    content: prompt.content,
    createdAt: new Date()
  }))

  const userPreferencesPrompts: Message[] = [
    {
      id: nanoid(),
      role: 'system',
      content:
        `Your response tone will be ${chatbot.defaultTone}. ` +
        `Your response length will be ${chatbot.defaultLength}. ` +
        `Your response format will be ${chatbot.defaultType}. ` +
        `Your response complexity level will be ${chatbot.defaultComplexity}.` +
        'Your response will be generated in the same language as user input.',
      createdAt: new Date()
    }
  ]

  // concatenate all message to pass it to chat component
  const initialMessages: Message[] = chatbotSystemPrompts.concat(
    userPreferencesPrompts
  )

  return (
    <div>
      <ThreadPanel
        threads={threads}
        chatbot={chatbot.name}
        search={searchParams}
      />{' '}
      <ChatChatbot initialMessages={initialMessages} chatbot={chatbot} />
    </div>
  )
}
