import type { ChatPageProps } from '@/types/types'
import { toSlug } from 'mb-lib'
import { redirect } from 'next/navigation'

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function ChatPage({ params }: ChatPageProps) {

  redirect(`/b/${toSlug(params.chatbot || '')}/${params.threadId.trim()}`)
}
