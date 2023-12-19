import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Chat } from '@/components/chat'
import { nanoid } from '@/lib/utils'

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()

  if (!session) redirect(`/sign-in?next=/chat/${params.id}`)

  return <Chat id={nanoid()} initialMessages={[]} bot={'bot'} />
}

export interface ChatPageProps {
  params: {
    id: string
  }
}
