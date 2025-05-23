import { BrowseThread } from '@/components/routes/browse/browse-thread'
import { ErrorComponent } from '@/components/shared/error'
import { botNames } from '@/lib/constants/bots-names'
import { generateMbMetadata } from '@/lib/metadata'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { getCategory, getThread } from '@/services/hasura'
import type { PageProps } from '@/types/types'
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
	const thread = await getThread({
		threadSlug: params.threadSlug,
		jwt: '',
	})

	if (!thread) {
		// create a 404 page and return to home page
		return (
			<ErrorComponent message="The thread that you were looking for either doesn't exist or is not available." />
		)
	}

	return <BrowseThread thread={thread} />
}
