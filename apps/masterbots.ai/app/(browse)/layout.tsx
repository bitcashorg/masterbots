import FooterCT from '@/components/footer-ct';
import { BrowseProvider } from '@/lib/hooks/use-browse';

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <BrowseProvider>
      { /* TODO: https://github.com/TheSGJ/nextjs-toploader/issues/66 */}
      {/* <NextTopLoader color="#1ED761" initialPosition={0.20} /> */}
      <main className="flex flex-col w-full h-[calc(100vh-theme(spacing.16))]">
        <section className="overflow-auto group scrollbar w-full">
          {children}
          <FooterCT fixed />
        </section>
      </main>
    </BrowseProvider>
  )
}
