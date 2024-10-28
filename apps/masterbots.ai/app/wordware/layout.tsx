import FooterCT from '@/components/layout/footer/footer-ct'
import { ResponsiveSidebar } from '@/components/layout/sidebar/sidebar-responsive'
import { ChatLayoutSection } from '@/components/routes/chat/chat-layout-section'
import { appConfig } from 'mb-env'
import { redirect } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  if (!appConfig.devMode) {
    console.error('Navigation to WordWare is disabled. No access to this page')
    redirect('/')
  }

  return (
    <main className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      <NextTopLoader color="#1ED761" initialPosition={0.2} />
      <ResponsiveSidebar />
      <ChatLayoutSection>{children}</ChatLayoutSection>
      <div className="layout-footer">
        <FooterCT />
      </div>
    </main>
  )
}
