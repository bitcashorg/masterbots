import { getThreadsWithoutJWT } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const threads = await getThreadsWithoutJWT()

  return threads.map(thread => ({
    url: `${process.env.VERCEL_URL}/${toSlug(thread.chatbot.categories[0].category.name)}/${thread.threadId}`,
    lastModified: thread.updatedAt
  }))
}
