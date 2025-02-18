import { redirect } from 'next/navigation'
import { getThreads } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: ChatPageProps) {
  // const thread = await getThreads({
  //   chatbotName: params.threadId,
  //   jwt: '',
  //   userId: '',
  // })
  // console.log({
  //   params,
  //   thread,
  // })
  redirect(`/b/${params.threadId}}`)
}
