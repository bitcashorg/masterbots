import type { Message } from 'ai'
import { isTokenExpired } from '@repo/mb-lib'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ChatChatbot } from '@/components/routes/c/chat-chatbot'
import ThreadPanel from '@/components/routes/c/thread-panel'
import { botNames } from '@/lib/bots-names'
import { getChatbot, getThreads, getUser } from '@/services/hasura'
import { createSupabaseServerClient } from '@/services/supabase'

export default async function BotThreadsPage({
  params,
  searchParams
}: {
  params: { chatbot: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user || !user.email) redirect(`/auth/sign-in?next=/${params.chatbot}`)
  const userProfile = await getUser({
    email: user.email,
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
  })

  if (!userProfile) redirect(`/auth/sign-in?next=/${params.chatbot}`)
  const jwt = cookies().get('hasuraJwt')?.value || ''

  // NOTE: maybe we should use same expiration time
  if (!jwt || isTokenExpired(jwt))
    redirect(`/auth/sign-in?next=/${params.chatbot}`)
  const chatbot = await getChatbot({
    chatbotName: botNames.get(params.chatbot),
    jwt
  })
  if (!chatbot)
    throw new Error(`Chatbot ${botNames.get(params.chatbot)} not found`)

  // session will always be defined
  const threads = await getThreads({
    chatbotName: botNames.get(params.chatbot),
    jwt,
    userId: userProfile.userId
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
    <>
      <ThreadPanel
        chatbot={chatbot.name}
        search={searchParams}
        threads={threads}
      />{' '}
      <ChatChatbot chatbot={chatbot} initialMessages={initialMessages} />
    </>
  )
}
