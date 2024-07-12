import { getThread } from '@/services/hasura'
import type { Metadata } from 'next'
import { getThreadLink } from './threads'
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
  | undefined

type TwitterCard =
  | 'summary'
  | 'summary_large_image'
  | 'player'
  | 'app'
  | undefined

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
  return {
    title: pageSeo.title || '',
    description: pageSeo.description || '',
    openGraph: {
      type: pageSeo.ogType as OgType,
      title: pageSeo.title,
      description: pageSeo.description,
      url: currentUrl,
      images: pageSeo.ogImageUrl ? [{ url: pageSeo.ogImageUrl }] : []
    },
    twitter: {
      card: pageSeo.twitterCard as TwitterCard,
      site: currentUrl,
      title: pageSeo.title,
      description: pageSeo.description,
      images: pageSeo.ogImageUrl ? [pageSeo.ogImageUrl] : []
    }
  }
}

export async function generateMbMetadata({
  params
}: {
  params: any
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
