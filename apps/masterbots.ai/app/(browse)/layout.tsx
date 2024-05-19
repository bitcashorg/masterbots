import FooterCT from '@/components/layout/footer-ct'
import { CategoryTabs } from '@/components/shared/category-tabs'
import { SearchInput } from '@/components/shared/search-input'
import { getCategories } from '../actions'

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
  const categories = await getCategories()
  return (
    <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <section className="w-full overflow-auto group scrollbar">
        <div className="container">
          <CategoryTabs categories={categories} />
          <SearchInput />
          {children}
        </div>
        <FooterCT />
      </section>
    </main>
  )
}
