import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { getAllChatbots, getCategories } from '@/services/hasura'
import type { MetadataRoute } from 'next'

export default async function robots(): Promise<MetadataRoute.Robots> {
	// Adding main routes
	// TODO: domain and slugify thread titles + thread inner questions
	const chatbots = await getAllChatbots()
	const categories = await getCategories()
	// Use urlBuilders for chatbot profile URLs
	const chatbotUrls = chatbots.map((chatbot) =>
		urlBuilders.profilesUrl({ type: 'chatbot', chatbot: chatbot.name }),
	)

	// Use urlBuilders for category URLs
	const personalCategoryUrls = categories.map((category) =>
		urlBuilders.topicThreadListUrl({
			type: 'personal',
			category: category.name,
		}),
	)

	const publicCategoryUrls = categories.map((category) =>
		urlBuilders.topicThreadListUrl({ type: 'public', category: category.name }),
	)

	// Use urlBuilders for nested URLs
	const publicNestedUrls = categories.flatMap((category) =>
		category.chatbots.map(({ chatbot }) =>
			urlBuilders.chatbotThreadListUrl({
				type: 'public',
				category: category.name,
				domain: getCanonicalDomain(chatbot.name),
				chatbot: chatbot.name,
			}),
		),
	)

	const personalNestedUrls = categories.flatMap((category) =>
		category.chatbots.map(({ chatbot }) =>
			urlBuilders.chatbotThreadListUrl({
				type: 'personal',
				category: category.name,
				domain: getCanonicalDomain(chatbot.name),
				chatbot: chatbot.name,
			}),
		),
	)

	const personalPublicThreadsWildcards = personalNestedUrls.map(
		(url) => `${url}/*`,
	)
	const publicPublicThreadsWildcards = publicNestedUrls.map((url) => `${url}/*`)
	const chatbotProfilesWildcards = chatbotUrls.map((url) => `${url}/*`)

	const baseUrl = process.env.BASE_URL || ''
	return {
		rules: {
			userAgent: '*',
			allow: [
				...personalNestedUrls,
				...publicNestedUrls,
				...personalCategoryUrls,
				...publicCategoryUrls,
				...chatbotUrls,
				...personalPublicThreadsWildcards,
				...publicPublicThreadsWildcards,
				...chatbotProfilesWildcards,
			],
			disallow: '/c/p',
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	}
}
