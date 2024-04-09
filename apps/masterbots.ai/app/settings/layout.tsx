import AccountDetails from '@/components/shared/account-details'
import { UserProfile } from '@/hooks/use-global-store'
import { getBrowseThreads, getUserInfoFromBrowse } from '@/services/hasura'
import { createSupabaseServerClient } from '@/services/supabase'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function getCookieData(): Promise<{ userProfile: UserProfile }> {
  const userProfile = cookies().get('userProfile')?.value || null
  return new Promise(resolve =>
    setTimeout(() => {
      resolve({ userProfile: JSON.parse(userProfile) as UserProfile })
    }, 1000)
  )
}

export default async function SettingsLayout({
  children
}: SettingsLayoutProps) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (!user || !user.email) redirect(`/auth/sign-in`)
  const { userProfile } = await getCookieData()

  const threads = await getBrowseThreads({
    userId: userProfile.userId,
    limit: 20
  })
  return (
    <main className="flex flex-col min-h-screen container">
      {/* <AccountDetails
        href={`/u/${userProfile.username}`}
        alt={userProfile.username}
        username={userProfile.username}
        avatar={userProfile.image || ''}
        threadNum={threads.length} //TODO: get total number of thread. not the filter one
      /> */}
      <div className="py-12 px-6">
        <div className="space-y-0.5 mb-10 pb-10 border-b-[1px] dark:border-mirage border-gray-300">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="flex min-w-[150px]">
            <nav aria-label="Sidebar" className="space-y-1">
              <div className="space-y-3">
                <Link
                  className="block text-base font-medium text-gray-300 hover:text-white"
                  href="/settings"
                >
                  Profile
                </Link>
                <Link
                  className="block text-base font-medium text-gray-300 hover:text-white"
                  href="/settings/appereance"
                >
                  Appareance
                </Link>
                {/* Add more links as needed */}
              </div>
            </nav>
          </div>
          <div className="flew grow space-y-6">{children}</div>
        </div>
      </div>
    </main>
  )
}

interface SettingsLayoutProps {
  children: React.ReactNode
  params: { category: string }
}
