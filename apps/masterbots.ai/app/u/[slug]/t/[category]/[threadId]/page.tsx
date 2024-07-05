import { ChatPageProps } from '@/app/c/[category]/[chatbot]/page'

export default async function ChatPage({ params }: ChatPageProps) {
  return (
    <div className="max-w-screen-lg pb-10 mx-auto w-full">
      /u/[slug]/t/{params.category}/{params.threadId}
    </div>
  )
}
