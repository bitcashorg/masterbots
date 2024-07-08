import BrowseList from '@/components/browse-list'
import { BrowseCategoryTabs } from '@/components/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse-search-input'
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
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
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
    description: category?.name || '',
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
