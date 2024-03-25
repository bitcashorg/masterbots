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
          <footer className="flex justify-center items-center opacity-50 h-[64px] ">
            <span className="font-['Geist'] text-centerb  items-center font-normal text-[24px]  ">Robot avatars delivered by{' '}
            <a href="https://robohash.org" target="_blank" rel="noreferrer" className="text-primary  underline focus-within:underline">
              robohash.org
            </a>
            {' '}
            {' • '}
            <a href="/term-n-policies" target="_blank" rel="noreferrer" className="text-primary  underline focus-within:underline">
            terms & policies
            </a>
            </span>
          </footer>
        </section>
      </main>
    </BrowseProvider>
  )
}
