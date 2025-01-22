import { authOptions } from '@/auth'
import { AdminModeToggle } from '@/components/routes/chat/admin-mode-toggle'
import ChatThreadListPanel from '@/components/routes/chat/chat-thread-list-panel'
import ThreadPanel from '@/components/routes/thread/thread-panel'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { getThreads } from '@/services/hasura'
import { decodeToken, isTokenExpired, validateJwtSecret } from 'mb-lib'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { isAdminOrModeratorRole , RoleTypes} from  '@/lib/utils'
export default async function IndexPage() {
  const session = await getServerSession(authOptions)

  // NOTE: maybe we should use same expiration time
  const jwt = session?.user?.hasuraJwt

  if (!jwt || isTokenExpired(jwt)) {
    redirect('/auth/signin')
  }

  const role = session.user.role as RoleTypes;
  return (
    <>
    {
     isAdminOrModeratorRole(role) && (
          <div className='flex justify-center'>
           <AdminModeToggle />
         </div>
      )
    }
      <ThreadPanel  />
      <ChatThreadListPanel />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = {
    title: 'Chat page',
    description:
      'Welcome to the chatbot page. Interact with our AI-powered chatbot and get answers to your questions.',
    ogType: 'website',
    ogImageUrl: `${process.env.BASE_URL || ''}/api/og`,
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
