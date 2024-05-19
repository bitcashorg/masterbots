import { objectToCamel } from 'ts-case-convert'
import { omit } from 'lodash'
import { ThreadList } from '@/components/shared/thread-list'
import AccountDetails from '@/components/shared/account-details'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { SearchInput } from '@/components/shared/search-input'
import { createSupabaseServerClient } from '@/services/supabase'

async function getUserWithThreads(username: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('account')
    .select(`*, thread(*, message (id,content,role,created_at))`)
    .eq('username', username)
    .single()

  if (error) return null

  return {
    ...objectToCamel(omit(data, 'thread')),
    threads: objectToCamel(data.thread)
  }
}

export default async function BotThreadsPage({ params }: BotPageParams) {
  const user = await getUserWithThreads(params.username)
  if (!user) return <div className="m-auto">No user found.</div>
  return (
    <div className="container">
      <CategoryTabs categories={[]} />
      <SearchInput />
      <AccountDetails
        alt={user.username}
        avatar={user.avatar || ''} // TODO: default avatar
        href={`/u/${user.username}`}
        threadNum={0} //TODO: get total number of thread. not the filtered one
        username={user.username}
      />
      <div className="container">
        <ThreadList initialThreads={[]} />
      </div>
    </div>
  )
}

type BotPageParams = {
  params: { username: string }
}
