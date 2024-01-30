import { ResponsiveSidebar } from '@/components/sidebar-responsive'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      { /* TODO: https://github.com/TheSGJ/nextjs-toploader/issues/66 */}
      {/* <NextTopLoader color="#1ED761" initialPosition={0.20} /> */}
      <ResponsiveSidebar />
      <section className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out lg:pl-[250px] xl:pl-[300px]">
        {children}
      </section>
    </main>
  )
}
