import { PAGE_SIZE } from '@/lib/constants/hasura'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getCategories, getThreads } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export default async function BrowseDomainPage({
  params
}: {
  params: { category: string, domain: string }
}) {
  const categories = await getCategories()
  const category = categories.find((category) => toSlug(category.name) === params.category)
  const threads = await getThreads({
    categoryId: category?.categoryId,
    limit: PAGE_SIZE,
    jwt: '',
  })

  // redirect to homepage if category not found
  return redirect(category ? `/${toSlug(category.name)}` : '/')
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
    description: `Browse the threads and find the one that suits your needs, from the ${category?.name} category`,
    ogType: 'website',
    ogImageUrl: `${process.env.BASE_URL}/api/og`,
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
