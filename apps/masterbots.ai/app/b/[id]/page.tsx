import { getChatbot, getBrowseThreads, getCategories } from '@/services/hasura'
import { botNames } from '@/lib/bots-names'
import ThreadList from '@/components/shared/thread-list'
import AccountDetails from '@/components/shared/account-details'
import { CategoryTabs } from '@/components/shared/category-tabs/category-tabs'
import { BrowseInput } from '@/components/shared/browse-input'

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

  return (
    <div className=" container">
      <CategoryTabs categories={categories} />
      <BrowseInput />
      <AccountDetails
        href={`/b/${chatbot.name.toLowerCase()}`}
        alt={chatbot.name}
        chatbotName={chatbot.name}
        avatar={chatbot.avatar}
        description={chatbot.description}
        threadNum={threads.length}
      />
      <div className="container">
        <ThreadList initialThreads={threads} filter={{ chatbotName }} />
      </div>
    </div>
  )
}
