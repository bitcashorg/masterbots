import { authOptions } from '@/auth'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getCategories } from '@/services/hasura'
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

  return redirect(category ? `/${toSlug(category.name)}` : '/')
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
    ogImageUrl: `${process.env.BASE_URL}/api/og`,
    twitterCard: 'summary',
  }

  return generateMetadataFromSEO(seoData)
}
