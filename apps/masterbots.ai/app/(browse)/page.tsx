import { Sidebar } from '@/components/layout/sidebar/sidebar'
import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'
import { getCategories } from '@/services/hasura'

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="flex w-full max-w-screen-lg px-4 pb-10 mx-auto">
      <Sidebar />
      {/* <BrowseCategoryTabs categories={categories} /> */}
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}


