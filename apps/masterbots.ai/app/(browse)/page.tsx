import BrowseList from '@/components/browse-list'
import { BrowseCategoryTabs } from '@/components/browse-category-tabs'
import { BrowseSearchInput } from '@/components/browse-search-input'
import { getCategories } from '@/services/hasura'
import { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="max-w-screen-lg px-4 pb-10 mx-auto w-full">
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
