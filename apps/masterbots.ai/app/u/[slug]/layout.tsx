import { Hero } from '@/components/layout/profile/hero'
import { ProfileSidebar } from '@/components/layout/profile/profile-page-sidebar'
import NextTopLoader from 'nextjs-toploader'

interface ProfileLayoutProps {
  children: React.ReactNode
}

export default async function ProfilePageLayout({ children }: ProfileLayoutProps) {
  return (
    <main className="flex flex-col p-0">
      <NextTopLoader color="#1ED761" initialPosition={0.2} />
      <Hero />
      <ProfileSidebar>
        <div className="px-4 md:px-10 h-full">
          {children}
        </div>
      </ProfileSidebar>
    </main >
  )
}
