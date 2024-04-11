import FooterCT from '@/components/layout/footer-ct'

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <section className="w-full overflow-auto group scrollbar">
        {children}
        <FooterCT />
      </section>
    </main>
  )
}
