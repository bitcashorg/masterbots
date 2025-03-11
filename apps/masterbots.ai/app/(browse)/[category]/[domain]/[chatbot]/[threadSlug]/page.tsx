import { getThread } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'
import { redirect } from 'next/navigation'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: ChatPageProps) {
  const thread = await getThread({ threadSlug: params.threadSlug, domain: params.domain })
  
  if (!thread) {
    redirect('/b')
  }

  redirect(`/b/${params.chatbot}/${params.threadSlug}`)
}
