import { ChatLayoutSection } from '@/components/chat-layout-section'
import { ResponsiveSidebar } from '@/components/sidebar-responsive'
import FooterCT from '@/components/footer-ct'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      {/* TODO: https://github.com/TheSGJ/nextjs-toploader/issues/66 */}
      {/* <NextTopLoader color="#1ED761" initialPosition={0.20} /> */}
      <ResponsiveSidebar />
      <ChatLayoutSection>{children}</ChatLayoutSection>
      <FooterCT />

    </main>
  )
}
