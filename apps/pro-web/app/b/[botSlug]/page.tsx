import { BotProfileThreadSection } from '@/components/routes/bot/bot-profile-thread-section'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { getBrowseThreads, getChatbot } from '@/services/hasura'
import type { PageProps } from '@/types'
import type { Metadata } from 'next'

export default async function BotThreadsPage(props: PageProps) {
	const params = await props.params
	const chatbotName = (await botNames).get(params.botSlug as string)

	const chatbot = await getChatbot({
		chatbotName,
		jwt: '',
		threads: true,
	})
	if (!chatbot) throw new Error(`Chatbot ${chatbotName} not found`)

	// session will always be defined
	const { threads, count } = await getBrowseThreads({
		chatbotName,
		limit: PAGE_SIZE,
	})

	return (
		<BotProfileThreadSection
			threads={threads}
			count={count}
			chatbot={chatbot}
		/>
	)
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const params = await props.params
	const chatbotName = (await botNames).get(params.botSlug as string)
	const chatbot = await getChatbot({
		chatbotName,
		jwt: '',
		threads: true,
	})

	if (!chatbot) {
		return {
			title: 'Bot Not Found',
			description: 'The requested bot could not be found.',
		}
	}

	const seoData = {
		title: chatbot?.name || '',
		description: chatbot?.description || '',
		ogType: 'website',
		ogImageUrl: `${process.env.BASE_URL || ''}/api/og?chatbotId=${chatbot.chatbotId}`,
		twitterCard: 'summary_large_image',
	}
	const domain = getCanonicalDomain(chatbotName as string)
	return {
		...(await generateMetadataFromSEO(seoData, params)),
		alternates: {
			canonical: urlBuilders.chatbotThreadListUrl({
				type: 'org',
				category: chatbot.categories?.[0]?.category?.name || 'AI',
				domain,
				chatbot: chatbotName as string,
			}),
			// TODO: Add languages when languages are enabled.
		},
	}
}
