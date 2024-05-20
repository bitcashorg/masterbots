'use server'
import type * as AI from 'ai'
import { objectToCamel } from 'ts-case-convert'
import type { MB } from '@repo/supabase'
import { createSupabaseServerClient } from '@/services/supabase'
import { createMessagePairs } from '@/lib/threads'

export async function getThreads({
  categoryId
}: {
  categoryId?: number
}): Promise<MB.ThreadFull[]> {
  const supabase = await createSupabaseServerClient()

  let threadsQuery = supabase.from('thread_full').select('*')

  // if (categoryId) {
  //   threadsQuery = threadsQuery.contains('chatbot->categories', [
  //     { category_id: categoryId }
  //   ])
  // }

  const { data, error } = await threadsQuery.range(0, 19)

  if (error) return []

  return data.map(createThreadFull)
}

export async function getThread({
  threadId
}: {
  threadId: string
}): Promise<MB.ThreadFull | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('thread_full')
    .select('*')
    .eq('thread_id', threadId)

  if (error) return null

  return createThreadFull(data)
}

export async function getCategories(): Promise<MB.Category[] | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('category').select('*')

  if (error) return null
  return objectToCamel(data)
}

export async function getMessagePairs(threadId: string) {
  console.log('get message pairs for', threadId)
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .eq('thread_id', threadId)
  if (error) return null

  return createMessagePairs(data as AI.Message[])
}

// ================= utils =================
function createThreadFull(threadData: any, messageCount = 0) {
  return objectToCamel({
    ...threadData,
    messageCount
  }) as unknown as MB.ThreadFull
}
