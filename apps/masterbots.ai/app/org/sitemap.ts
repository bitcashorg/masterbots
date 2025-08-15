import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { getAllChatbots, getCategories } from '@/services/hasura'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Adding main routes
	const chatbots = await getAllChatbots()
	const categories = await getCategories()

	// Use urlBuilders for chatbot profile URLs
	const chatbotUrls = chatbots.map((chatbot) => ({
		url: urlBuilders.profilesUrl({ type: 'chatbot', chatbot: chatbot.name }),
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.8,
	})) as MetadataRoute.Sitemap

	// Use urlBuilders for category URLs
	const personalCategoryUrls = categories.map((category) => ({
		url: urlBuilders.topicThreadListUrl({
			type: 'personal',
			category: category.name,
		}),
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.6,
	})) as MetadataRoute.Sitemap

	const publicCategoryUrls = categories.map((category) => ({
		url: urlBuilders.topicThreadListUrl({
			type: 'public',
			category: category.name,
		}),
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.8,
	})) as MetadataRoute.Sitemap

	// Use urlBuilders for nested URLs
	const publicNestedUrls = categories.flatMap((category) =>
		category.chatbots.map(({ chatbot }) => ({
			url: urlBuilders.chatbotThreadListUrl({
				type: 'public',
				category: category.name,
				domain: getCanonicalDomain(chatbot.name),
				chatbot: chatbot.name,
			}),
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		})),
	) as MetadataRoute.Sitemap

	const personalNestedUrls = categories.flatMap((category) =>
		category.chatbots.map(({ chatbot }) => ({
			url: urlBuilders.chatbotThreadListUrl({
				type: 'personal',
				category: category.name,
				domain: getCanonicalDomain(chatbot.name),
				chatbot: chatbot.name,
			}),
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		})),
	) as MetadataRoute.Sitemap

	const categoryUrls = [...personalCategoryUrls, ...publicCategoryUrls]

	const baseUrl = process.env.BASE_URL || ''
	return [
		{
			url: `${baseUrl}`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${baseUrl}/c`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/wordware`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		...chatbotUrls,
		...categoryUrls,
		...publicNestedUrls,
		...personalNestedUrls,
	]
}
