import { ResponsiveSidebar } from '@/components/routes/c/sidebar/sidebar-responsive'
import FooterCT from '@/components/layout/footer-ct'
import { createSupabaseServerClient } from '@/services/supabase'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // NOTE: avoiding this redirect on porpuse to be able to redirect to original request after login
  //       see code in page.tsx, moved ResponsiveSidebar to pages.tsx to prevent flickering
  // if (!user?.email) redirect(`/auth/sign-in`)

  return (
    <main className="relative flex flex-row h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      {
        // prevent layout flickering
        user?.email ? <ResponsiveSidebar /> : null
        // <div className="border border-green-500 border-dashed w-[300px]"></div>
      }

      <div className="mx-5 flex flex-col grow w-full">
        <div className="grow">{children}</div>
        <div className="block lg:hidden">
          <FooterCT />
        </div>
      </div>
    </main>
  )
}
