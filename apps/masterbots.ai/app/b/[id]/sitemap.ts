import { botNames } from '@/lib/bots-names'
import { getKeyByValue } from '@/lib/utils'
import { getChatbots } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const chatbots = await getChatbots({})
  return chatbots.map(chatbot => ({
    url: `${process.env.VERCEL_URL}/b/${getKeyByValue(botNames, chatbot.name)}`,
    lastModified: new Date()
  }))
}
