import FooterCT from '@/components/layout/footer/footer-ct'
import NextTopLoader from 'nextjs-toploader'
import { Hero } from '@/components/layout/profile/hero'
import { ProfileSidebar } from '@/components/layout/profile/profile-page-sidebar'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ProfilePageLayout({ children }: ChatLayoutProps) {
  return (
    <main className=" flex flex-col overflow-auto">
      <NextTopLoader color="#1ED761" initialPosition={0.2} />
      <Hero />
      <div className="relative  flex h-screen ">
        <ProfileSidebar>{children}</ProfileSidebar>
      </div>
      <div className="layout-footer">
        <FooterCT />
      </div>
    </main>
  )
}
