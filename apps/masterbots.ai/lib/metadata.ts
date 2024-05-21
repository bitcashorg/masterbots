import type { Metadata } from 'next'
import { getThreadLink } from './threads'
import { getThread } from '@/app/actions';

export async function generateMbMetadata({
  params
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const threadId = params?.threadId
  const thread = await getThread({ threadId })
  if (!thread) return

  const firstQuestion = thread.firstMessage.content || 'not found'
  const firstResponse = thread.firstAnswer.content || 'not found'

  const data = {
    title: firstQuestion,
    publishedAt: thread.updatedAt, // format(thread.updatedAt, 'MMMM dd, yyyy'),
    summary: firstResponse,
    image: `${process.env.VERCEL_URL}/og?threadId=${thread.threadId}`,
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
      url: `${process.env.VERCEL_URL}${data.pathname}`,
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
