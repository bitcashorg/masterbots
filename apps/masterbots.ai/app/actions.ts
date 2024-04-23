'use server'
import { createSupabaseServerClient } from '@/services/supabase'
import { objectToCamel } from 'ts-case-convert'
import type { MB } from '@repo/supabase'
import { omit } from 'lodash'
import { getFirstMessages } from '@/lib/threads'

// Shared ThreadFull like filter for supabase queries
// It ensure you get the data you need to construct the ThreadFull object
// Important to select only the data you need, nothing more
const ThreadFullFilter = `
  *,
  message (id,content,role,created_at),
  chatbot (chatbot_id,name,avatar,prompt(*), chatbot_category(category(*))),
  user (user_id,username,avatar)
` as const

export async function getThreads({ query }: { query?: string }):  Promise<MB.ThreadFull[]> {
  const supabase = await createSupabaseServerClient()
  const threadsQuery = supabase.from('thread').select(ThreadFullFilter).range(0, 20)
  const { data, error } = await threadsQuery
  if (error) return []
  return data.map(createThreadFull)
}

export async function getThread({
  threadId
}: {
  threadId: string
}): Promise<MB.ThreadFull | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('thread').select(ThreadFullFilter).eq('thread_id', threadId)
  if (error) return null
  return createThreadFull(data)
}

// transfer supabase query data into ThreadFull object
function createThreadFull(threadData: any, messageCount = 0) {
  return objectToCamel({
    // we only return question and frist answer on collection queries
    // full list of messages are queries when viewing individual threads only
    ...omit(threadData, 'message', 'chatbot'),
    ...getFirstMessages(threadData.message),
    chatbot: {
      ...omit(threadData.chatbot, 'chatbot_category'),
      catogories: threadData.chatbot.chatbot_category.category
    },
    messageCount
  }) as unknown as MB.ThreadFull
}

export async function getMessagePairs(threadId: string) {
  console.log('get message pairs for', threadId)
  return [] as MB.MessagePair[]
}

// if (query) {
//   supaQuery = supaQuery
//     .filter('message.role', 'neq', 'system')
//     .textSearch('message.content', query.toString())
// }


