import { BrowseThread } from '@/components/routes/browse/browse-thread'
import { getThread } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'
import type { Metadata } from 'next'

import { generateMbMetadata } from '@/lib/metadata'
import type { AppLinks } from 'next/dist/lib/metadata/types/extra-types'

export async function generateMetadata(
	props: ChatPageProps,
): Promise<Metadata> {
	// Get base metadata from the shared function
	const baseMetadata = await generateMbMetadata(props)
	const params = await props.params

	// Add or override with your custom link tags
	return {
		...baseMetadata,
		appLinks: [
			...((baseMetadata?.appLinks || []) as AppLinks[]),
			{
				rel: 'canonical',
				href: `${process.env.BASE_URL}/${Object.keys(params).join('/')}`,
			},
		] as AppLinks,
	}
}

export default async function ChatbotThreadArticlePage(props: ChatPageProps) {
	const params = await props.params
	const thread = await getThread({
		threadSlug: params.threadSlug,
		domain: params.domain,
		jwt: '',
	})

	if (!thread) {
		throw new Error('Bot Thread not found')
	}

	return <BrowseThread thread={thread} />
}
