import { getBrowseThreads, getUserInfoFromBrowse } from '@/services/hasura'
import ThreadList from '@/components/shared/thread-list'
import AccountDetails from '@/components/shared/account-details'

export default async function BotThreadsPage({
  params
}: {
  params: { slug: string }
}) {
  const user = await getUserInfoFromBrowse(params.slug)
  if (!user) return <div className="m-auto">No user found.</div>
  const threads = await getBrowseThreads({
    slug: params.slug,
    limit: 50
  })
  return (
    <div className="w-full py-5">
      <AccountDetails
        href={`/u/${params.slug}`}
        alt={user.username}
        username={user.username}
        avatar={user.profilePicture || ''}
        threadNum={threads.length} //TODO: get total number of thread. not the filter one
      />
      <div className="container">
        <ThreadList initialThreads={threads} filter={{ slug: params.slug }} />
      </div>
    </div>
  )
}
