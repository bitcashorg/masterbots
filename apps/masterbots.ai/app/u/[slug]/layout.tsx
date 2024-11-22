import FooterCT from '@/components/layout/footer/footer-ct'
import NextTopLoader from 'nextjs-toploader'
import { Hero } from '@/components/layout/profile/hero'
import { ProfileSidebar } from '@/components/layout/profile/profile-page-sidebar'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ProfilePageLayout({ children }: ChatLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col p-0">
    <NextTopLoader color="#1ED761" initialPosition={0.2} />
    <Hero />
    <div className="flex-grow">
      <div className="relative flex min-h-[calc(100vh-4rem)]">
        <ProfileSidebar>
          <div className="relative h-full z-0">
            {children}     
            <div className="sticky bottom-0 w-full  left-0 z-50  dark:bg-black bg-white">
              <FooterCT  className='flex justify-start items-center  text-center'/>
            </div>
          </div>
        </ProfileSidebar>
      </div>
    </div>
  </main>
  )
}
