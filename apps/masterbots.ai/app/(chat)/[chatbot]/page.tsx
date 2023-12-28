import ThreadPanel from '@/components/thread-panel'
import { getChatbot, getThreads } from '@/services/db'
import { botNames } from '@/lib/bots-names'
import { nanoid } from 'nanoid'
import { Message } from 'ai'
import crypto from 'crypto'
import { Chat } from '@/components/chat'

export default async function BotThreadsPage({
  params,
  searchParams
}: {
  params: { chatbot: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const chatbot = await getChatbot({
    chatbotName: botNames.get(params.chatbot)
  })
  if (!chatbot)
    throw new Error(`Chatbot ${botNames.get(params.chatbot)} not found`)

  const threads = await getThreads({
    chatbotName: botNames.get(params.chatbot)
  })

  const newThreadId = crypto.randomUUID()

  // format all chatbot prompts as chatgpt 'system' messages
  const chatbotSystemPrompts: Message[] = chatbot.prompts.map(({ prompt }) => ({
    id: prompt.promptId.toString(),
    role: 'system',
    content: prompt.content,
    createdAt: new Date()
  }))

  const userPreferencesPrompts: Message[] = [
    {
      id: nanoid(),
      role: 'system',
      content:
        `Your response tone will be ${chatbot.defaultTone}. ` +
        `Your response length will be ${chatbot.defaultLength}. ` +
        `Your response format will be ${chatbot.defaultType}. ` +
        `Your response complexity level will be ${chatbot.defaultComplexity}.`,
      createdAt: new Date()
    }
  ]

  // concatenate all message to pass it to chat component
  const initialMessages: Message[] = chatbotSystemPrompts.concat(
    userPreferencesPrompts
  )

  return (
    <div>
      <ThreadPanel
        threads={threads}
        chatbot={params.chatbot}
        search={searchParams}
      />{' '}
      <Chat
        initialMessages={initialMessages}
        chatbot={chatbot}
        threadId={newThreadId}
      />
    </div>
  )
}
