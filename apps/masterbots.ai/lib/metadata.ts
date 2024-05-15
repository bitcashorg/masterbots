import type { Metadata } from 'next'
import { getThreadLink } from './threads'
import { getThread } from '@/app/actions'

export async function generateMbMetadata({
  params
}): Promise<Metadata | undefined> {
  const thread = await getThread({ threadId: params.threadId })
  if (!thread) return

  const data = {
    title: thread.firstUserMessage.content,
    publishedAt: thread.updatedAt, // format(thread.updatedAt, 'MMMM dd, yyyy'),
    summary: thread.firstAssistantMessage.content,
    image: `https://alpha.masterbots.ai/og?threadId=${thread.threadId}`,
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
      url: `https://alpha.masterbots.ai/${data.pathname}`,
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
