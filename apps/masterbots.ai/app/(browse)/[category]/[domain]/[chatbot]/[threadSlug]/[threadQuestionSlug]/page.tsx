import { getThread } from '@/services/hasura'
import type { ChatPageProps } from '@/types/types'
import { toSlug } from 'mb-lib'
import { redirect } from 'next/navigation'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ThreadQuestionSlugPage({ params }: ChatPageProps) {
  // TODO: update getThread to get the slug
  const thread = await getThread({ threadSlug: params.threadSlug })
  
  if (!thread) {
    return redirect('/b')
  }

  if (!params.threadSlug) {
    return redirect(`/b/${toSlug(thread.chatbot.name)}}`)
  }

  if (!params.threadQuestionSlug) {
    return redirect(`/b/${params.threadSlug.trim()}`)
  }

  return redirect(`/b/${params.threadSlug.trim()}`)
}
