import { authOptions } from '@/auth'
import { WordwareChat } from '@/components/shared/wordware-chat'
import { generateMetadataFromSEO } from '@/lib/metadata'
import type { PageProps } from '@/types'
import { isTokenExpired } from 'mb-lib'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function IndexPage() {
	const session = await getServerSession(authOptions)

	// NOTE: maybe we should use same expiration time
	const jwt = session?.user?.hasuraJwt

	if (!jwt || isTokenExpired(jwt)) {
		redirect('/auth/signin')
	}

	return (
		<>
			<WordwareChat />
		</>
	)
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const params = await props.params
	const seoData = {
		title: 'Wordware page',
		description:
			'Welcome to the chatbot page. Interact with our AI-powered chatbot and get answers to your questions.',
		ogType: 'website',
		ogImageUrl: '',
		twitterCard: 'summary',
	}

	return await generateMetadataFromSEO(seoData, params)
}
