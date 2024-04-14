import { getChatbot, getBrowseThreads, getCategories } from '@/services/hasura'
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
  const categories = await getCategories()
  let chatbot, threads

  chatbot = await getChatbot({
    chatbotName: botNames.get(params.id),
    jwt: '',
    threads: true
  })
  if (!chatbot) throw new Error(`Chatbot ${botNames.get(params.id)} not found`)
  const chatbotName = botNames.get(params.id)
  threads = await getBrowseThreads({
    chatbotName,
    limit: 20
  })

  console.log(chatbot.categories)
  return (
    <div className=" container">
      <CategoryTabs categories={categories} />
      <SearchInput />
      <AccountDetails
        alt={chatbot.name}
        avatar={chatbot.avatar}
        chatbotName={chatbot.name}
        description={chatbot.description}
        href={`/b/${toSlug(chatbot.name)}`}
        threadNum={threads.length}
        category={chatbot.categories[0]?.category.name}
      />
      <div className="container">
        <ThreadList filter={{ chatbotName }} initialThreads={threads} />
      </div>
    </div>
  )
}
