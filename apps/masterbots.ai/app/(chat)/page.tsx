import MbChat from '@/components/mb-chat'
import ThreadPanel from '@/components/thread-panel'

export default function IndexPage() {
  return (
    <div>
      <ThreadPanel />
      <MbChat bot={'HealthBot'} />
    </div>
  )
}
