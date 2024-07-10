import { getCategories, getThreads } from '@/services/hasura'
import { isTokenExpired, toSlug } from 'mb-lib'
import { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { auth } from '@/auth'
import ChatThreadListPanel from '@/components/chat/chat-thread-list-panel'
import ThreadPanel from '@/components/thread-panel'
import { redirect } from 'next/navigation'

export default async function ChatCategoryPage() {
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

  return (
    <>
      <ThreadPanel threads={threads} />
      <ChatThreadListPanel />
    </>
  )
}

export async function generateMetadata({
  params
}: {
  params: { category: string }
}): Promise<Metadata> {
  const categories = await getCategories()
  const category = categories.find(
    category => toSlug(category.name) === params.category
  )

  const seoData = {
    title: category?.name || '',
    description: category?.name || '',
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
