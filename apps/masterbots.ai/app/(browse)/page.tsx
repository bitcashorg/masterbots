import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseCategoryTabs } from '@/components/routes/browse/browse-category-tabs'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { getCategories } from '@/services/hasura'
import { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="w-full max-w-screen-lg px-4 pb-10 mx-auto">
      <BrowseCategoryTabs categories={categories} />
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = {
    title: 'Browse page',
    description: 'Browsing categories',
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
