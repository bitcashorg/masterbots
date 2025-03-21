import { BrowseThreadBlog } from '@/components/routes/browse/browse-thread-blog'
import { ErrorComponent } from '@/components/shared/error'
import { botNames } from '@/lib/constants/bots-names'
import { generateMbMetadata } from '@/lib/metadata'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { getCategory, getThread } from '@/services/hasura'
import type { User } from 'mb-genql'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

interface ThreadPageProps {
	params: Promise<{
		userSlug: string
		category: string
		domain: string
		threadSlug: string
		chatbot: string
	}>
}

export default async function ThreadPage(props: ThreadPageProps) {
	const params = await props.params
	const thread = await getThread({
		threadSlug: params.threadSlug,
		jwt: '',
	})
	const session = await getServerSession()

	if (!thread) {
		return (
			<ErrorComponent message="The thread that you were looking for either doesn't exist or is not available." />
		)
	}

	const { threadId } = thread

	return (
		<BrowseThreadBlog
			threadId={threadId}
			user={session?.user as unknown as User}
		/>
	)
}

export async function generateMetadata(
	props: ThreadPageProps,
): Promise<Metadata> {
	// Get base metadata from the shared function
	const baseMetadata = await generateMbMetadata(props)
	const params = await props.params
	// Add or override with your custom link tags
	const chatbotName = (await botNames).get(params.chatbot as string) || ''
	const topic = await getCategory({ chatbotName })
	const domain = getCanonicalDomain(chatbotName)
	return {
		...baseMetadata,
		alternates: {
			canonical: urlBuilders.threadUrl({
				type: 'public',
				category: topic.name,
				domain,
				chatbot: chatbotName,
				threadSlug: params.threadSlug as string,
			}),
			// TODO: Add languages when languages are enabled.
		},
	}
}
