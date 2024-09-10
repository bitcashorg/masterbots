import ChatThreadListPanel from '@/components/routes/chat/chat-thread-list-panel'
import ThreadPanel from '@/components/routes/thread/thread-panel'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getThreads } from '@/services/hasura'
import { isTokenExpired } from 'mb-lib'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/auth'

export default async function IndexPage() {
  const session = await getServerSession(authOptions)

  // NOTE: maybe we should use same expiration time
  const jwt = session?.user?.hasuraJwt

  if (!jwt || isTokenExpired(jwt)) {
    redirect('/auth/signin')
  }

  const threads = await getThreads({
    jwt,
    userId: session!.user.id
  })

  return (
    <>
      <ThreadPanel threads={threads} />
      <ChatThreadListPanel />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = {
    title: 'Chat page',
    description: 'Chat page',
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
