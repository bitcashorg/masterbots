import ThreadPanel from '@/components/thread-panel'

export default function BotThreadsPage({
  params,
  searchParams
}: {
  params: { chatbot: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <ThreadPanel chatbot={params.chatbot} search={searchParams} />
}
