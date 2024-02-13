import UserThreadPanel from '@/components/thread-panel/user-thread-panel'
import { Thread } from 'mb-genql'

export default async function ThreadPanel({
  chatbot,
  threads,
}: {
  chatbot?: string
  threads: Thread[]
  search?: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="flex flex-col pb-[150px]">
      <UserThreadPanel chatbot={chatbot} threads={threads} />
    </div>
  )
}
