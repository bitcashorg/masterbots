import { botNames } from '@/lib/constants/bots-names'
import { getKeyByValue } from '@/lib/utils'
import { getThreadsWithoutJWT } from '@/services/hasura'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const threads = await getThreadsWithoutJWT()

  return threads.map(thread => ({
    url: `${process.env.VERCEL_URL}/b/${getKeyByValue(botNames, thread.chatbot.name)}/${thread.threadId}`,
    lastModified: thread.updatedAt
  }))
}
