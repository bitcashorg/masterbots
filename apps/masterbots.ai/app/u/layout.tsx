import { BrowseProvider } from '@/lib/hooks/use-browse';
import NextTopLoader from 'nextjs-toploader';

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function ProfileLayout({ children }: BrowseLayoutProps) {
  return (
    <BrowseProvider>
      <NextTopLoader color="#1ED761" initialPosition={0.20} />
      <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
        <section className="w-full overflow-auto group scrollbar">
          {children}
        </section>
      </main>
    </BrowseProvider>
  )
}
