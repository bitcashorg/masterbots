import ThreadPanel from '@/components/thread-panel'
import MbChat from '@/components/mb-chat'

export default function BotThreadsPage({
  params,
  searchParams
}: {
  params: { chatbot: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div>
      <ThreadPanel chatbot={params.chatbot} search={searchParams} />{' '}
      <MbChat bot={'HealthBot'} />
    </div>
  )
}
