import { redirect } from 'next/navigation'
import { getChatbot } from '@/services/hasura'
import { botNames } from '@/lib/bots-names'
import { auth } from '@/auth'
import { isTokenExpired } from 'mb-lib'

export default async function ChatPage({ params }: ChatPageProps) {
  let session = null
  try {
    session = await auth()
  } catch (error) {
    console.error('Failed to authenticate user:', error)
  }
  // NOTE: maybe we should use same expiration time
  const jwt = session ? session.user?.hasuraJwt : null
  if (!jwt) {
    throw new Error('Session JWT is missing.')
  }
  if (isTokenExpired(jwt)) {
    redirect(`/sign-in`)
  }
  const category = params.category
  const chatbotName = botNames.get(params.chatbot)
  if (!chatbotName) {
    throw new Error(`Chatbot name for ${params.chatbot} not found`)
  }
  let chatbot = null
  try {
    chatbot = await getChatbot({ chatbotName, jwt })
  } catch (error) {
    console.error('Failed to fetch chatbot:', error)
  }
  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      /c/{category}/{chatbotName}
    </div>
  )
}

export interface ChatPageProps {
  params: {
    category: string
    chatbot: string
    threadId: string
  }
}
