import { BrowseThread } from '@/components/routes/browse/browse-thread'
import { ErrorComponent } from '@/components/shared/error'
import { botNames } from '@/lib/constants/bots-names'
import { generateMbMetadata } from '@/lib/metadata'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { getCategory, getThread } from '@/services/hasura'
import type { PageProps } from '@/types/types'
import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

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

	return (
		<>
			<div className="max-w-[600px] mx-auto mb-4">
				<Link
					href="/"
					className="flex items-center leading-none gap-2 text-white/80 dark:text-[#09090BC3] hover:text-white dark:hover:text-[#09090B]"
				>
					<ChevronLeft className="size-4" />
					<span>Back </span>
				</Link>
			</div>
			{/* <BrowseThread thread={thread} /> */}
		</>
	)
}
