import { BrowseThreadBlog } from '@/components/routes/browse/browse-thread-blog'
import { getThread } from '@/services/hasura'
import type { User } from 'mb-genql'
import { getServerSession } from 'next-auth'

import { generateMbMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export async function generateMetadata(
	props: ThreadPageProps,
): Promise<Metadata> {
	// Get base metadata from the shared function
	const baseMetadata = await generateMbMetadata(props)
	const params = await props.params
	// Add or override with your custom link tags
	return {
		...baseMetadata,
		alternates: {
			canonical: `/${Object.keys(params).join('/')}`,
			// TODO: Add languages when languages are enabled.
		},
	}
}

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
		domain: params.domain,
		jwt: '',
	})
	const session = await getServerSession()

	if (!thread) {
		return <div>Thread not found</div>
	}
	const { threadId } = thread

	return (
		<BrowseThreadBlog
			threadId={threadId}
			user={session?.user as unknown as User}
		/>
	)
}
