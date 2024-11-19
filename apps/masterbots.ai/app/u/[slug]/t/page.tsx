import { UserThreadList } from "@/components/routes/profile/user-thread-list";
import type { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'
import {  getUserInfoFromBrowse } from '@/services/hasura'
export default async function ProfilePage() {
    return <UserThreadList  />
 }

 export async function generateMetadata({
    params
  }: {
    params: { slug: string }
  }): Promise<Metadata> {
    const user = await getUserInfoFromBrowse(params.slug)
  
    const seoData = {
      title: user?.username || '',
      description: user?.username || '',
      ogType: 'website',
      ogImageUrl: user?.profilePicture || '',
      twitterCard: 'summary_large_image'
    }
  
    return generateMetadataFromSEO(seoData)
  }
  