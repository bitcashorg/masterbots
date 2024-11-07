import { botNames } from '@/lib/constants/bots-names'
import { getKeyByValue } from '@/lib/utils'
import { getChatbots } from '@/services/hasura'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const chatbots = await getChatbots({})
  return chatbots.map(chatbot => ({
    url: `${process.env.VERCEL_URL}/b/${getKeyByValue(botNames, chatbot.name)}`,
    lastModified: new Date()
  }))
}
