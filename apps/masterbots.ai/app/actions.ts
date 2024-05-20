'use server'
import type * as AI from 'ai'
import { objectToCamel } from 'ts-case-convert'
import type { MB } from '@repo/supabase'
import { createSupabaseServerClient } from '@/services/supabase'
import { createMessagePairs } from '@/lib/threads'
import { getErrorMessage } from '@repo/mb-lib'
import { appConfig } from '@/lib/config'

export async function getThreads({
  categoryId,
  page = 1
}: {
  categoryId?: number
  page?: number
}): Promise<GetThreadsResult> {
  const supabase = await createSupabaseServerClient()
  const limit = appConfig.limit
  const from = (page - 1) * limit
  const to = from + limit - 1

  console.log('page ', page, ' from ', from, ' to ', to)

  let threadsQuery = supabase
    .from('thread_full')
    .select('*', { count: 'exact' })

  if (categoryId) {
    threadsQuery = threadsQuery.contains('category_ids', categoryId.toString())
  }

  const { data, error, count } = await threadsQuery.range(from, to)

  if (error) return { data: [], error: getErrorMessage(error) }

  return {
    data: data.map(createThreadFull),
    meta: {
      count,
      pages: Math.ceil(count / limit),
      limit
    }
  }
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

  return createThreadFull(data[0])
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

interface ActionResult {
  error?: string
  data?: any
  meta?: {
    count: number
    pages: number
    limit: number
  }
  success?: boolean
}

interface GetThreadsResult extends ActionResult {
  data: MB.ThreadFull[]
}
