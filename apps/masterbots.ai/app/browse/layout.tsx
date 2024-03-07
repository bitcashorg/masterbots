import { BrowseProvider } from '@/lib/hooks/use-browse'

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <BrowseProvider>
      { /* TODO: https://github.com/TheSGJ/nextjs-toploader/issues/66 */}
      {/* <NextTopLoader color="#1ED761" initialPosition={0.20} /> */}
      <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
        <section className="overflow-auto group scrollbar w-full">
          {children}
          <footer className="flex justify-center items-center opacity-50 h-[64px] whitespace-break-spaces text-xs font-semibold font-['Geist_Mono']">
            Robot avatars delivered by{' '}
            <a href="https://robohash.org" target="_blank" rel="noreferrer" className="text-link hover:underline focus-within:underline">
              robohash.org
            </a>
          </footer>
        </section>
      </main>
    </BrowseProvider>
  )
}
