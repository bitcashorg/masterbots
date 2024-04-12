import { nanoid, type Message } from 'ai'
import { isTokenExpired } from '@repo/mb-lib'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { botNames } from '@/lib/bots-names'
import {
  getBrowseThreads,
  getChatbot,
  getThread,
  getUser
} from '@/services/hasura'
import { createSupabaseServerClient } from '@/services/supabase'
import { ThreadList } from '@/components/shared/thread-list'
import { NewChatInput } from '@/components/routes/c/new-chat'
import { ChatSearchInput } from '@/components/routes/c/chat-search-input'

export default async function ChatListPage({
  params,
  searchParams
}: {
  params: { chatbot: string; threadId: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user.email) redirect(`/auth/sign-in?next=/c/${params.chatbot}`)
  const userProfile = await getUser({
    email: user.email,
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
  })

  if (!userProfile) redirect(`/auth/sign-in?next=/c/${params.chatbot}`)
  const jwt = cookies().get('hasuraJwt').value || ''

  // NOTE: maybe we should use same expiration time
  if (!jwt || isTokenExpired(jwt))
    redirect(`/auth/sign-in?next=/c/${params.chatbot}`)
  const chatbot = await getChatbot({
    chatbotName: botNames.get(params.chatbot),
    jwt
  })
  if (!chatbot)
    throw new Error(`Chatbot ${botNames.get(params.chatbot)} not found`)

  // session will always be defined
  const threads = await getBrowseThreads({
    chatbotName: botNames.get(params.chatbot),
    userId: userProfile.userId
  })

  // format all chatbot prompts as chatgpt 'system' messages
  const chatbotSystemPrompts: Message[] = chatbot.prompts.map(({ prompt }) => ({
    id: prompt.promptId.toString(),
    role: 'system',
    content: prompt.content,
    createdAt: new Date()
  }))

  const currentThread = params.threadId
    ? await getThread({ threadId: params.threadId })
    : null

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
      {/* <ChatSearchInput /> */}
      <ThreadList
        chat
        currentThread={currentThread}
        dialog
        filter={{ slug: userProfile.slug, chatbotName: chatbot.name }}
        initialThreads={threads}
      />
      <NewChatInput
        chatbot={chatbot}
        id={crypto.randomUUID()}
        initialMessages={initialMessages}
      />
    </>
  )
}
