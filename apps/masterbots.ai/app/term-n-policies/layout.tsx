interface TermPoliciesLayoutProps {
  children: React.ReactNode
}

export default async function TermPoliciesLayout({ children }: TermPoliciesLayoutProps) {
  return (
      <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
        <section className="overflow-auto group scrollbar w-full px-8 md:px-0">
          {children}
          <footer className="flex justify-center items-center opacity-50 h-[64px] ">
            <span className="font-['Geist'] text-centerb  items-center font-normal md:text-[20px]  text-md  ">Robot avatars delivered by{' '}
            <a href="https://robohash.org" target="_blank" rel="noreferrer" className="text-primary  underline focus-within:underline">
              robohash.org
            </a>
            {' '}
            {' • '}
            <a href="https://robohash.org" target="_blank" rel="noreferrer" className="text-primary  underline focus-within:underline">
            terms & policies
            </a>
            </span>
          </footer>
        </section>
      </main>
  )
}
