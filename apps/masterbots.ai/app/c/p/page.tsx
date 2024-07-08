import { auth } from '@/auth'
import ChatThreadListPanel from '@/components/chat/chat-thread-list-panel'
import ThreadPanel from '@/components/thread-panel'
import { getThreads } from '@/services/hasura'
import { isTokenExpired } from 'mb-lib'
import { redirect } from 'next/navigation'
import Subscription from '@/components/subscription'
import { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'

export default async function IndexPage() {
  const session = await auth()

  // NOTE: maybe we should use same expiration time
  const jwt = session?.user?.hasuraJwt

  if (!jwt || isTokenExpired(jwt)) {
    redirect('/sign-in')
  }

  const threads = await getThreads({
    jwt,
    userId: session!.user.id
  })

  const user = {
    email: session.user.email || '',
    name: session.user.name || ''
  }

  return (
    <>
      <ThreadPanel threads={threads} />
      <ChatThreadListPanel />
      <Subscription user={user} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = {
    title: 'Pro page',
    description: 'Pro page',
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
