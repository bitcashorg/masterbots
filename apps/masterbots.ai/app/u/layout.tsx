import FooterCT from '@/components/layout/footer/footer-ct';
import { ChatLayoutSection } from '@/components/routes/chat/chat-layout-section';
import { ThreadPopup } from '@/components/routes/thread/thread-popup';
import { BrowseProvider } from '@/lib/hooks/use-browse';
import NextTopLoader from 'nextjs-toploader';
import { ProfileLayoutSection } from '@/components/routes/profile/layout-section';

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function ProfileLayout({ children }: BrowseLayoutProps) {
  return (
    <BrowseProvider>
      <NextTopLoader color="#1ED761" initialPosition={0.20} />
      <ProfileLayoutSection>
        {children}
      </ProfileLayoutSection>
    </BrowseProvider>
  )
}
