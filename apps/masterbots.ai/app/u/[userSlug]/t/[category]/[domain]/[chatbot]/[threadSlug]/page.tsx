import { BrowseThreadBlog } from '@/components/routes/browse/browse-thread-blog'
import { ErrorComponent } from '@/components/shared/error'
import { botNames } from '@/lib/constants/bots-names'
import { generateMbMetadata } from '@/lib/metadata'
import { getCanonicalDomain, urlBuilders } from '@/lib/url'
import { getCategory, getThread } from '@/services/hasura'
import { ChevronLeft } from 'lucide-react'
import type { User } from 'mb-genql'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

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
	const { chatbot: chatBotName, category, chatbot } = params
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
	const profileUrl = `/u/${params.userSlug}/t/${category}/${getCanonicalDomain(chatBotName)}/${chatbot}`

	return (
		<div className="w-full">
			<div className="sticky top-0 lg:p-10  mt-4 ml-2 lg:mt-0 pb-0 mx-auto bg-gray-50 dark:bg-zinc-900 z-10">
				<Link
					href={profileUrl}
					className="flex items-center leading-none gap-2 dark:text-white/80 text-[#09090BC3] dark:hover:text-white hover:text-[#09090B]"
				>
					<ChevronLeft className="size-4" />
					<span>Back </span>
				</Link>
			</div>
			<BrowseThreadBlog
				threadId={threadId}
				user={session?.user as unknown as User}
			/>
		</div>
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
