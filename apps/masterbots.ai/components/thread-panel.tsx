import { ChatSearchInput } from '@/components/chat-search-input'
import ThreadList from '@/components/thread-list'
import { Thread } from 'mb-genql'

export default async function ThreadPanel({
  chatbot,
  threads
}: {
  chatbot?: string
  threads: Thread[]
  search?: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="flex flex-col pb-[150px]">
      <div className="flex justify-between px-10 py-5">
        <ChatSearchInput />
      </div>

      <div className="flex px-10 py-5">
        <ThreadList threads={threads} />
      </div>
    </div>
  )
}
