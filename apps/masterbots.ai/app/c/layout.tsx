import { ChatLayoutSection } from '@/components/routes/c/chat-layout-section'
import { ResponsiveSidebar } from '@/components/routes/c/sidebar/sidebar-responsive'
import FooterCT from '@/components/layout/footer-ct'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="relative flex flex-col h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <ResponsiveSidebar />
      {/* <ChatLayoutSection>{children}</ChatLayoutSection> */}
      <div className="block lg:hidden">
        <FooterCT />
      </div>
    </main>
  )
}
