import { ResponsiveSidebar } from '@/components/routes/c/sidebar/sidebar-responsive'
import FooterCT from '@/components/layout/footer-ct'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="relative flex flex-row h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <ResponsiveSidebar />
      <div className="mx-5 flex grow w-full">
        {children}
        <div className="block lg:hidden">
          <FooterCT />
        </div>
      </div>
    </main>
  )
}
