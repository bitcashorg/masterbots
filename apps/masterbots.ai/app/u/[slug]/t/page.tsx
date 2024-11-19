import { UserThreadList } from "@/components/routes/profile/user-thread-list";
import type { Metadata } from 'next'
import { generateMetadataFromSEO } from '@/lib/metadata'
import {  getUserInfoFromBrowse } from '@/services/hasura'
import { authOptions } from '@/auth'
import { getServerSession } from "next-auth"
import { getBrowseThreads, getThreads, getUserBySlug} from "@/services/hasura";
import { Thread, User } from "mb-genql";

export default async function ProfilePage({ params }: { params: { slug: string } }) {

  let threads: Thread[] = []
  const slug = params.slug

  const session = await getServerSession(authOptions)

  const { user, error } =  await getUserBySlug({
    slug, 
    isSameUser: session?.user.slug === slug
   });

   if (error) return <div className="text-center p-4">Error loading profile: <strong>{error}</strong></div>
   if (!user) return <div className="text-center p-4">User <strong>{params.slug}</strong> not found</div>
  
   
  if(user && session?.user.slug === slug){
    threads = await  getThreads({jwt: session?.user?.hasuraJwt as string, userId: user?.userId });
  }else{
    threads = await getBrowseThreads({ userId: user?.userId });   
  }
  
  return <UserThreadList user={user as User} threads={threads} />
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
  