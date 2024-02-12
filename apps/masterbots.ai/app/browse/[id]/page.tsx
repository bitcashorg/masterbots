import { getChatbot, getBrowseThreads } from '@/services/hasura'
import { botNames } from '@/lib/bots-names'
import { useSession } from 'next-auth/react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { isTokenExpired } from 'mb-lib'
import BrowseListItem from '@/components/browse-list-item'
import { Thread } from 'mb-genql'
import BrowseChatbotDetails from '@/components/browse-chatbot-details'

export default async function BotThreadsPage({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await auth()
  // NOTE: maybe we should use same expiration time
  const jwt = session!.user.hasuraJwt
  if (!jwt || isTokenExpired(jwt)) {
    redirect(`/sign-in`)
  }
  let chatbot, threads
  if (searchParams?.type === 'user') {
    threads = await getBrowseThreads({
      userId: params.id
    })
  } else {
    chatbot = await getChatbot({
      chatbotName: botNames.get(params.id),
      jwt: session!.user.hasuraJwt,
      threads: true
    })
    if (!chatbot)
      throw new Error(`Chatbot ${botNames.get(params.id)} not found`)

    // session will always be defined
    threads = await getBrowseThreads({
      chatbotName: botNames.get(params.id)
    })
  }

  return (
    <div className="w-full py-5">
      {chatbot ? <BrowseChatbotDetails chatbot={chatbot} /> : ''}
      <div className="max-w-2xl px-4 mx-auto mt-8 flex gap-y-4 flex-col">
        {threads &&
          threads.map((thread: Thread, key) => (
            <BrowseListItem thread={thread} key={key} />
          ))}
      </div>
    </div>
  )
}
