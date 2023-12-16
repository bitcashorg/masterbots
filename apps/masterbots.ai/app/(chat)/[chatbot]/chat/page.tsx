// this is route is for demo porpuses only

import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()

  if (!session?.user) redirect(`/sign-in?next=/`)

  return <Chat bot={params.chatbot} id={nanoid()} initialMessages={[]} />
}

export interface ChatPageProps {
  params: {
    chatbot: string
  }
}
