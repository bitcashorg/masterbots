import FooterCT from '@/components/layout/footer/footer-ct'
import { ResponsiveSidebar } from '@/components/layout/sidebar/sidebar-responsive'
import { ChatLayoutSection } from '@/components/routes/chat/chat-layout-section'
import NextTopLoader from 'nextjs-toploader'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="relative flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      <NextTopLoader color="#1ED761" initialPosition={0.2} />
      <ResponsiveSidebar />
      <ChatLayoutSection>{children}</ChatLayoutSection>
      <div className="group w-full overflow-auto animate-in duration-300 ease-in-out relative lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)] px-4 md:px-10 lg:ml-[250px] xl:ml-[300px] ">
        <FooterCT />
      </div>
    </main>
  )
}
