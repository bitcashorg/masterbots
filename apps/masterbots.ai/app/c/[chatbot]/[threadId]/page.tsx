import { nanoid, type Message } from 'ai'
import { isTokenExpired } from '@repo/mb-lib'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getThread, getUser } from '@/services/hasura'
import { createSupabaseServerClient } from '@/services/supabase'
import { MbChat } from '@/components/shared/chat'

export default async function ChatPage({
  params
}: {
  params: { chatbot: string; threadId: string }
}) {
  const redirecPath = `/auth/sign-in?next=/c/${params.chatbot}/${params.threadId}`
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user?.email) redirect(redirecPath)

  // TODO: remove hasura fetching in favor of supabase server client
  const userProfile = await getUser({
    email: user.email,
    adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
  })

  if (!userProfile) redirect(redirecPath)
  const jwt = cookies().get('hasuraJwt').value || ''
  if (!jwt || isTokenExpired(jwt)) redirect(redirecPath)

  console.log('getting thread id', params.threadId)
  const thread = await getThread({ threadId: params.threadId })
  console.log(thread.chatbot.name)

  if (!thread) return <div>Thread not found</div>

  // format all chatbot prompts as chatgpt 'system' messages
  const chatbotSystemPrompts: Message[] = thread.chatbot?.prompts.map(
    ({ prompt }) => ({
      id: prompt.promptId.toString(),
      role: 'system',
      content: prompt.content,
      createdAt: new Date()
    })
  )

  const userPreferencesPrompts: Message[] = [
    {
      id: nanoid(),
      role: 'system',
      content:
        `Your response tone will be ${thread.chatbot.defaultTone}. ` +
        `Your response length will be ${thread.chatbot.defaultLength}. ` +
        `Your response format will be ${thread.chatbot.defaultType}. ` +
        `Your response complexity level will be ${thread.chatbot.defaultComplexity}.` +
        'Your response will be generated in the same language as user input.',
      createdAt: new Date()
    }
  ]

  // concatenate all message to pass it to chat component
  const initialMessages: Message[] = chatbotSystemPrompts.concat(
    userPreferencesPrompts
  )

  return <MbChat thread={thread} initialMessages={initialMessages} />
}
