import { getBrowseThreads, getCategories, getThreads, getUserByUsername } from "@/services/hasura"
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
 let threads: any = []
  const categories = await getCategories()
  const category = categories.find(
    category => toSlug(category.name) === params.category
  )
   const { user, error } =  await getUserByUsername({username: params.slug});

  if (!category) return <div>No category found</div>
  if (!user) return <div>No user found</div>

 
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
