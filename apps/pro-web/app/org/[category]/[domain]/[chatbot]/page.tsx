import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getBrowseThreads, getChatbot } from '@/services/hasura'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export default async function BrowseCategoryChatbotPage(props: {
	params: Promise<{ category: string; chatbot: string }>
}) {
	const params = await props.params
	const chatbotName = (await botNames).get(params.chatbot)
	if (!chatbotName) {
		console.error(`Chatbot name ${chatbotName} not found`)
		return notFound()
	}
	const chatbot = await getChatbot({ chatbotName, jwt: '' })

	if (!chatbot) {
		console.error(`Chatbot ${chatbotName} not found`)
		return notFound()
	}

	const { threads, count } = await getBrowseThreads({
		chatbotName,
		limit: PAGE_SIZE,
	})

	return (
		<BrowseList
			categoryId={chatbot.categories[0].categoryId}
			chatbot={chatbot}
			initialThreads={threads}
			initialCount={count}
		/>
	)
}

export async function generateMetadata(props: {
	params: Promise<{ chatbot: string }>
}): Promise<Metadata> {
	const params = await props.params
	const chatbotName = (await botNames).get(params.chatbot)
	const chatbot = await getChatbot({ chatbotName, jwt: '' })

	const seoData = {
		title: chatbotName || '',
		description: chatbot.description || '',
		ogType: 'website',
		ogImageUrl: `${process.env.BASE_URL}/api/og?chatbotId=${chatbot.chatbotId}`,
		twitterCard: 'summary',
	}

	return await generateMetadataFromSEO(seoData, params)
}
