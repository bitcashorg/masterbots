import { getThreadLink } from '@/lib/threads'
import { getThread } from '@/services/hasura'
import type { Thread } from 'mb-genql'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

type OgType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'

type TwitterCard = 'summary' | 'summary_large_image' | 'player' | 'app'

interface PageSEO {
  title: string
  description: string
  ogType: string
  ogImageUrl?: string
  twitterCard: string
}

export const generateMetadataFromSEO = (pageSeo: PageSEO): Metadata => {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') || ''
  const currentUrl = process.env.VERCEL_URL + pathname
  const ogImageUrlDefault = '/masterbots_og.png'

  return {
    title: pageSeo.title || '',
    description: pageSeo.description || '',
    openGraph: {
      type: pageSeo.ogType as OgType,
      title: pageSeo.title,
      description: pageSeo.description,
      url: currentUrl,
      images: pageSeo.ogImageUrl ? [{ url: pageSeo.ogImageUrl }] : [ogImageUrlDefault],
    },
    twitter: {
      card: pageSeo.twitterCard as TwitterCard,
      site: currentUrl,
      title: pageSeo.title,
      description: pageSeo.description,
      images: pageSeo.ogImageUrl ? [pageSeo.ogImageUrl] : [ogImageUrlDefault],
    },
  }
}

export async function generateMbMetadata({
  params,
}: {
  params: any
}): Promise<Metadata | undefined> {
  let thread: Thread | undefined
  let data = {
    title: 'not found',
    publishedAt: new Date().toISOString(),
    summary: 'not found',
    image: `${process.env.BASE_URL}/api/og?threadId=1`,
    pathname: '#',
  }

  try {
    const threadId = params?.threadId
    thread = (await getThread({ threadId, jwt: '' })) as Thread

    const firstQuestion = thread?.messages.find((m) => m.role === 'user')?.content || 'not found'

    const firstResponse =
      thread?.messages.find((m) => m.role === 'assistant')?.content || 'not found'

    const firstResponseTruncated =
      firstResponse.length > 200 ? firstResponse.slice(0, 200) : firstResponse

    data = {
      title: firstQuestion,
      publishedAt: thread?.updatedAt, // format(thread?.updatedAt, 'MMMM dd, yyyy'),
      summary: firstResponseTruncated,
      image: `${process.env.BASE_URL}/api/og?threadId=${thread?.threadId}`,
      pathname: getThreadLink({ thread, chat: false }),
    }
  } catch (error) {
    console.error('Error in getThread', error)
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
      url: process.env.BASE_URL + data.pathname,
      images: [
        {
          url: data.image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      site: '@masterbotsai',
      description: data.summary,
      images: [data.image],
    },
  }
}

export const defaultContent = {
  thread: {
    chatbot: {
      name: 'Masterbots',
      avatar: null,
      categories: [{ category: { name: 'AI' } }],
    },
  },
  question:
    'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
  answer:
    'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
  username: 'Masterbots',
  user_avatar: '',
  isLightTheme: false,
}
