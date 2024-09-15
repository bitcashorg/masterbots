import BrowseList from '@/components/routes/browse/browse-list'
import { BrowseSearchInput } from '@/components/routes/browse/browse-search-input'

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-5 pt-5 w-full max-w-screen-lg px-4 pb-10 mx-auto">
      {/* <BrowseCategoryTabs categories={categories} /> */}
      <BrowseSearchInput />
      <BrowseList />
    </div>
  )
}


