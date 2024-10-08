import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseCategoryTabs } from '@/components/routes/browse/browse-category-tabs'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { getCategories } from '@/services/hasura'
import { toSlug } from 'mb-lib'
import { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'

export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string }
}) {
  const categories = await getCategories()

  return (
    <div className="w-full max-w-screen-lg pb-10 mx-auto">
      <BrowseCategoryTabs
        initialCategory={params.category}
        categories={categories}
      />
      <BrowseSearchInput />
      <BrowseList />
    </div>
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
    description:
      'Browse our collection of chatbots and find the one that suits your needs.',
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
