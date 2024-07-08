import { ChatLayoutSection } from '@/components/chat/chat-layout-section'
import { ResponsiveSidebar } from '@/components/sidebar-responsive'
import FooterCT from '@/components/footer-ct'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="relative flex flex-col h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <ResponsiveSidebar />
      <ChatLayoutSection>
        {children}
      </ChatLayoutSection>
      <div className="block lg:hidden">
        <FooterCT />
      </div>
    </main>
  )
}
