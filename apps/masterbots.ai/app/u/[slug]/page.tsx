import {
  getBrowseThreads,
  getCategories,
  getUserInfoFromBrowse
} from '@/services/hasura'
import ThreadList from '@/components/shared/thread-list'
import AccountDetails from '@/components/shared/account-details'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { BrowseInput } from '@/components/shared/browse-input'

export default async function BotThreadsPage({
  params
}: {
  params: { slug: string }
}) {
  const categories = await getCategories()
  const user = await getUserInfoFromBrowse(params.slug)
  if (!user) return <div className="m-auto">No user found.</div>
  const threads = await getBrowseThreads({
    slug: params.slug,
    limit: 25
  })
  return (
    <div className="container">
      <CategoryTabs categories={categories} />
      <BrowseInput />
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
