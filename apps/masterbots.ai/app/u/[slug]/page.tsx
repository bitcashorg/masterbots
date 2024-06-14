import { getBrowseThreads, getUserInfoFromBrowse } from '@/services/hasura'
import BrowseUserDetails from '@/components/browse-user-details'
import BrowseSpecificThreadList from '@/components/browse-specific-thread-list'

const PAGE_SIZE = 50

export default async function BotThreadsPage({
  params
}: {
  params: { slug: string }
}) {
  const user = await getUserInfoFromBrowse(params.slug)
  if (!user) return <div className="m-auto">No user found.</div>
  
  const threads = await getBrowseThreads({
    slug: params.slug,
    limit: PAGE_SIZE
  })
  return (
    <div className="w-full py-5">
      <BrowseUserDetails user={threads?.[0].user} />
      <BrowseSpecificThreadList
        initialThreads={threads}
        PAGE_SIZE={PAGE_SIZE}
        query={{
          slug: params.slug
        }}
        pageType="user"
      />
    </div>
  )
}
