import { getBrowseThreads, getCategories, getThreads, getUserBySlug } from "@/services/hasura"
import { toSlug } from "mb-lib"
import { authOptions } from '@/auth'
import { getServerSession } from "next-auth"
import { Thread } from "mb-genql"
import UserThreadPanel from "@/components/routes/thread/user-thread-panel"

export default async function BrowseCategoryPage({
  params
}: {
  params: { category: string, slug: string }
}) {

  
  const session = await getServerSession(authOptions)
 let threads: Thread[] = []
  const categories = await getCategories()
  const category = categories.find(
    category => toSlug(category.name) === params.category
  )
  
  const slug = params.slug
   const { user, error } =  await getUserBySlug({
    slug, 
    jwt: session?.user.slug === slug ? session?.user.hasuraJwt : undefined
   });

  if (!category) return <div className="text-center p-4">Category '{params.category}' not found</div>
  if (error) return <div className="text-center p-4">Error loading profile: {error}</div>
  if (!user) return <div className="text-center p-4">User '{params.slug}' not found</div>
 
  if(session?.user?.id !== user?.userId){
    const list = await getBrowseThreads({ userId: user.userId, categoryId: category?.categoryId });
    threads = list || []
  }else{
    const list  = await  getThreads({jwt: session?.user?.hasuraJwt as string, userId: user.userId, categoryId: category?.categoryId})
    threads = list || []
  }
  
  
  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      <UserThreadPanel  threads={threads} page="profile" />
    </div>
  )
}
