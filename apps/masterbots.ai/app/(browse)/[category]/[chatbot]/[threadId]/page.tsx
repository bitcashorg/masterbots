import { getThread } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'
import { redirect } from 'next/navigation'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: ChatPageProps) {
<<<<<<< HEAD:apps/masterbots.ai/app/(browse)/[category]/[chatbot]/[threadId]/page.tsx
  const thread = await getThread({ threadId: params.threadId })
  
  if (!thread) {
    redirect('/b')
  }

  redirect(`/b/${params.threadId.trim()}`)
=======
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })

  if (!thread) {
    throw new Error('The thread shared has not been found.')
  }

  redirect(`/b/${thread.chatbot.name}/${thread.threadId}`)
>>>>>>> main:apps/masterbots.ai/app/(browse)/[category]/[threadId]/page.tsx
}
