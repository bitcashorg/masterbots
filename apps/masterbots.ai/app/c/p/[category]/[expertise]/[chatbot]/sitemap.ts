import { botNames } from '@/lib/constants/bots-names'
import { getKeyByValue } from '@/lib/utils'
import { getChatbots } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const chatbots = await getChatbots({})

  return chatbots.map(chatbot => ({
    // TODO: updatge expertise parameter
    url: `${process.env.VERCEL_URL}/c/p/${toSlug(chatbot.categories[0].category.name)}/expertise/${getKeyByValue(botNames, chatbot.name)}`,
    lastModified: new Date()
  }))
}
