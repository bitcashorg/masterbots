import { getThread } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'
import { redirect } from 'next/navigation'

export { /* @next-codemod-error `generateMbMetadata` export is re-exported. Check if this component uses `params` or `searchParams`*/
generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage(props: ChatPageProps) {
  const params = await props.params;
  const thread = await getThread({ threadSlug: params.threadSlug, domain: params.domain })

  if (!thread) {
    redirect('/b')
  }

  redirect(`/b/${params.chatbot}/${params.threadSlug}`)
}
