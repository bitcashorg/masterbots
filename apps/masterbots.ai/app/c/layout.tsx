import { ResponsiveSidebar } from '@/components/routes/c/sidebar/sidebar-responsive'
import FooterCT from '@/components/layout/footer-ct'
import { createSupabaseServerClient } from '@/services/supabase'
import { redirect } from 'next/navigation'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // only logged in users can chat
  // we most redirect here to prevent layout flickering
  if (!user?.email) redirect(`/auth/sign-in`)

  return (
    <main className="relative flex flex-row h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <ResponsiveSidebar />
      <div className="mx-5 flex grow w-full">
        {children}
        <div className="block lg:hidden">
          <FooterCT />
        </div>
      </div>
    </main>
  )
}
