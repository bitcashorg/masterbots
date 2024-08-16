import { ChatLayoutSection } from '@/components/chat/chat-layout-section'
import FooterCT from '@/components/footer-ct'
import { ResponsiveSidebar } from '@/components/sidebar-responsive'
import { appConfig } from 'mb-env'
import { redirect } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  if (!appConfig.devMode) {
    console.error('Dev Mode is disabled. No access to this page')
    redirect('/')
  }

  return (
    <main className="relative flex flex-col h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <NextTopLoader color="#1ED761" initialPosition={0.2} />
      <ResponsiveSidebar />
      <ChatLayoutSection>{children}</ChatLayoutSection>
      <div className="block lg:hidden">
        <FooterCT />
      </div>
    </main>
  )
}
