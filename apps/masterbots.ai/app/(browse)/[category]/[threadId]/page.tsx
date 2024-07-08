import { redirect } from 'next/navigation'
import { getThread } from '@/services/hasura'
import { ChatPageProps } from '@/app/c/[category]/[chatbot]/page'
import { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'

export default async function ChatPage({ params }: ChatPageProps) {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })
  redirect(`/b/${thread.chatbot.name}/${thread.threadId}`)
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const thread = await getThread({
    threadId: params.threadId,
    jwt: ''
  })

  const firstQuestion =
    thread.messages.find(m => m.role === 'user')?.content || 'not found'
  const firstResponse =
    thread.messages.find(m => m.role === 'assistant')?.content || 'not found'

  const seoData = {
    title: firstQuestion,
    description: firstResponse,
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
