import { BotProfileThreadSection } from '@/components/routes/bot/bot-profile-thread-section'
import { BrowseThread } from '@/components/routes/browse/browse-thread'
import { ErrorComponent } from '@/components/shared/error'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMbMetadata } from '@/lib/metadata'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import {
	getBrowseThreads,
	getCategory,
	getChatbot,
	getThread,
} from '@/services/hasura'
import type { PageProps } from '@/types'
import type { Metadata } from 'next'

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	// Get base metadata from the shared function
	const baseMetadata = await generateMbMetadata(props)
	const params = await props.params
	// Add or override with your custom link tags
	const chatbotName = (await botNames).get(params.botSlug as string) || ''
	const topic = await getCategory({ chatbotName })
	const domain = getCanonicalDomain(chatbotName)
	return {
		...baseMetadata,
		alternates: {
			canonical: urlBuilders.threadQuestionUrl({
				type: 'public',
				category: topic.name,
				domain,
				chatbot: chatbotName,
				threadSlug: params.threadSlug as string,
				threadQuestionSlug: params.threadQuestionSlug as string,
			}),
			// TODO: Add languages when languages are enabled.
		},
	}
}

export default async function ChatbotThreadQuestionArticlePage(
	props: PageProps,
) {
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

	// return <BrowseThread thread={thread} />
	return (
		<BotProfileThreadSection
			threads={threads}
			count={count}
			chatbot={chatbot}
		/>
	)
}
