import {
  getBrowseThreads,
  getCategories,
  getUserInfoFromBrowse
} from '@/services/hasura'
import { ThreadList } from '@/components/shared/thread-list'
import AccountDetails from '@/components/shared/account-details'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { SearchInput } from '@/components/shared/search-input'

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
    limit: 20
  })
  return (
    <div className="container">
      <CategoryTabs categories={categories} />
      <SearchInput />
      <AccountDetails
        alt={user.username}
        avatar={user.profilePicture || ''}
        href={`/u/${params.slug}`}
        threadNum={threads.length} //TODO: get total number of thread. not the filter one
        username={user.username}
      />
      <div className="container">
        <ThreadList initialThreads={threads} />
      </div>
    </div>
  )
}
