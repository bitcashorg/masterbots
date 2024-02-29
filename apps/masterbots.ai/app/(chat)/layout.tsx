import { ChatLayoutSection } from '@/components/chat-layout-section'
import { ResponsiveSidebar } from '@/components/sidebar-responsive'
import { ThreadPopup } from '@/components/thread-popup'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      {/* TODO: https://github.com/TheSGJ/nextjs-toploader/issues/66 */}
      {/* <NextTopLoader color="#1ED761" initialPosition={0.20} /> */}
      <ResponsiveSidebar />
      <ChatLayoutSection>
        {children}
        <ThreadPopup />
      </ChatLayoutSection>
    </main>
  )
}
