import FooterCT from '@/components/layout/footer-ct'
import { CategoryTabs } from '@/components/shared/category-tabs'
import { SearchInput } from '@/components/shared/search-input'
import { getCategories } from '../actions'

interface BrowseLayoutProps {
  children: React.ReactNode
  params: { category: string }
}

export default async function BrowseLayout({
  children,
  params
}: BrowseLayoutProps) {
  console.log('PARAMS!!', params)
  return (
    <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <section className="w-full overflow-auto group scrollbar">
        <div className="container">
          <CategoryTabs categories={await getCategories()} />
          <SearchInput />
          {children}
        </div>
        <FooterCT />
      </section>
    </main>
  )
}
