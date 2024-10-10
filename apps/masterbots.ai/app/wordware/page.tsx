import { authOptions } from '@/auth'
import { generateMetadataFromSEO } from '@/lib/metadata'
import { isTokenExpired } from 'mb-lib'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import {WordwareChat} from '@/components/shared/wordware-chat';

export default async function IndexPage() {
  const session = await getServerSession(authOptions)

  // NOTE: maybe we should use same expiration time
  const jwt = session?.user?.hasuraJwt

  if (!jwt || isTokenExpired(jwt)) {
    redirect('/auth/signin')
  }


  return (
    <>
      <WordwareChat />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seoData = {
    title: 'Wordware page',
    description:
      'Welcome to the chatbot page. Interact with our AI-powered chatbot and get answers to your questions.',
    ogType: 'website',
    ogImageUrl: '',
    twitterCard: 'summary'
  }

  return generateMetadataFromSEO(seoData)
}
