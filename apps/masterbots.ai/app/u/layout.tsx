import FooterCT from '@/components/footer-ct';
import { BrowseProvider } from '@/lib/hooks/use-browse';
import NextTopLoader from 'nextjs-toploader';

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <BrowseProvider>
      <NextTopLoader color="#1ED761" initialPosition={0.20} />
      <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
        <section className="overflow-auto group scrollbar w-full">
          {children}
          <FooterCT />
        </section>
      </main>
    </BrowseProvider>
  )
}
