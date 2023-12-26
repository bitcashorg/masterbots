import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Chat } from '@/components/chat'
import { getThread } from '@/services/db'
import { nanoid } from '@/lib/utils'

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()
  const thread = await getThread({ threadId: params.threadId })

  //TODO: handle threadId not found

  if (!session) redirect(`/sign-in?next=/${params.threadId}/${params.threadId}`)

  return <Chat id={nanoid()} initialMessages={[]} bot={params.chatbot} />
}

export interface ChatPageProps {
  params: {
    threadId: number
    chatbot: string
  }
}
