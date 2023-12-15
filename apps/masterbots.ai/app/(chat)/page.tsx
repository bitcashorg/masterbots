import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import ThreadList from '@/components/thread-list'

export default function IndexPage() {
  const id = nanoid()

  // return <Chat id={id} />
  return (
    <div className="flex px-10 py-5">
      <ThreadList />
    </div>
  )
}
