import { botNames } from '@/lib/bots-names'
import { getKeyByValue } from '@/lib/utils'
import { getChatbots, getThreadsWithoutJWT } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const chatbots = await getChatbots({})

  return chatbots.map(chatbot => ({
    url: `${process.env.VERCEL_URL}/c/${toSlug(chatbot.categories[0].category.name)}/${getKeyByValue(botNames, chatbot.name)}`,
    lastModified: new Date()
  }))
}
