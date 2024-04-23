import { botNames } from '@/lib/bots-names'
import { ThreadList } from '@/components/shared/thread-list'
import AccountDetails from '@/components/shared/account-details'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { SearchInput } from '@/components/shared/search-input'
import { toSlug } from '@/lib/url'

export default async function BotThreadsPage({
  params
}: {
  params: { id: string }
}) {
  return (
    <div className="container ">
      <CategoryTabs categories={[]} />
      <SearchInput />
      {/* <AccountDetails
        alt={chatbot.name}
        avatar={chatbot.avatar}
        chatbotName={chatbot.name}
        description={chatbot.description}
        href={`/b/${toSlug(chatbot.name)}`}
        threadNum={threads.length}
        category={chatbot.categories[0]?.category.name}
      /> */}
      <div className="container">
        <ThreadList initialThreads={[]} />
      </div>
    </div>
  )
}
