import { authOptions } from '@/auth'
import ChatThreadListPanel from '@/components/routes/chat/chat-thread-list-panel'
import ThreadPanel from '@/components/routes/thread/thread-panel'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getCategories, getThreads } from '@/services/hasura'
import { isTokenExpired, toSlug } from 'mb-lib'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function ChatCategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const session = await getServerSession(authOptions)

  // NOTE: maybe we should use same expiration time
  const jwt = session?.user?.hasuraJwt

  if (!jwt || isTokenExpired(jwt)) {
    redirect('/auth/signin')
  }

  const categories = await getCategories()
  const category = categories.find((category) => toSlug(category.name) === params.category)

  const threads = await getThreads({
    jwt,
    userId: session?.user.id,
    categoryId: category?.categoryId,
  })

  return (
    <>
      <ThreadPanel threads={threads} />
      <ChatThreadListPanel />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const categories = await getCategories()
  const category = categories.find((category) => toSlug(category.name) === params.category)

  const seoData = {
    title: category?.name || '',
    description: `Please select a bot from the ${category?.name} category to start the conversation.`,
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary',
  }

  return generateMetadataFromSEO(seoData)
}
