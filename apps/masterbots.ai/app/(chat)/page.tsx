import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import ThreadPanel from '@/components/thread-panel'

export default function IndexPage() {
  const id = nanoid()

  // return <Chat id={id} />
  return <ThreadPanel />
}
