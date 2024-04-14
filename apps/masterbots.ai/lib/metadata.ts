import { getThread } from '@/services/hasura';
import type { Metadata } from 'next';
import { format } from 'date-fns';
import { getThreadLink } from './threads';

export async function generateMbMetadata({
  params,
}): Promise<Metadata | undefined> {
  const thread = await getThread({threadId: params.threadId})
  if (!thread) return


   const firstQuestion=
      thread.messages.find(m => m.role === 'user')?.content || 'not found'
    const firstResponse =
      thread.messages.find(m => m.role === 'assistant')?.content || 'not found'

  const data = {
    title: firstQuestion,
    publishedAt: thread.updatedAt, // format(thread.updatedAt, 'MMMM dd, yyyy'),
    summary: firstResponse,
    image: `https://alpha.masterbots.ai/og?title=${encodeURIComponent(firstQuestion)}`,
    pathname: getThreadLink({thread:thread, chat:false})
  } 

  return {
    title:data.title,
    description:data.summary,
    openGraph: {
      title:data.title,
      description:data.summary,
      type: 'article',
      publishedTime: data.publishedAt,
      url: `https://alpha.masterbots.ai/${data.pathname}`,
      images: [
        {
          url: data.image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title:data.title,
      description:data.summary,
      images: [data.image],
    },
  };
}