import type { Thread } from '@repo/mb-genql'
import UserThreadPanel from '@/components/c/thread-panel/user-thread-panel'

export default async function ThreadPanel({
  chatbot,
  threads
}: {
  chatbot?: string
  threads: Thread[]
  search?: Record<string, string | string[] | undefined>
}) {
  return <UserThreadPanel chatbot={chatbot} threads={threads} />
}
