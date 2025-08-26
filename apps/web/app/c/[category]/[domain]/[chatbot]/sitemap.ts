import { botNames } from '@/lib/constants/bots-names'
import { getKeyByValue } from '@/lib/utils'
import { getChatbots } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const chatbotNames = await botNames
	const chatbots = await getChatbots({ limit: chatbotNames.size })

	return chatbots.map((chatbot) => ({
		url: `${process.env.VERCEL_URL}/c/${toSlug(chatbot.categories[0].category.name)}/${getKeyByValue(botNames, chatbot.name)}`,
		lastModified: new Date(),
	}))
}
