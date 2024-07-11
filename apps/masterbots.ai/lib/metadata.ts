import { getThread } from '@/services/hasura'
import type { Metadata } from 'next'
import { getThreadLink } from './threads'

export async function generateMbMetadata({
  params
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const threadId = params?.threadId
  const thread = await getThread({ threadId, jwt: '' })
  if (!thread) return

  const firstQuestion =
    thread.messages.find(m => m.role === 'user')?.content || 'not found'
  const firstResponse =
    thread.messages.find(m => m.role === 'assistant')?.content || 'not found'

  const data = {
    title: firstQuestion,
    publishedAt: thread.updatedAt, // format(thread.updatedAt, 'MMMM dd, yyyy'),
    summary: firstResponse,
    image: `${process.env.BASE_URL}/api/og?threadId=${thread.threadId}`,
    pathname: getThreadLink({ thread: thread, chat: false })
  }


  return {
    title: data.title,
    description: data.summary,
    openGraph: {
      locale: 'en_US',
      title: data.title,
      description: data.summary,
      type: 'article',
      publishedTime: data.publishedAt,
      url:process.env.BASE_URL+data.pathname,
      images: [
        {
          url: data.image
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      site: '@masterbotsai',
      description: data.summary,
      images: [data.image]
    }
  }
}
