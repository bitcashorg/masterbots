'use server'

import { objectToCamel } from 'ts-case-convert'
import type { MB } from '@repo/supabase'
import { uniq } from 'lodash'
import { createSupabaseServerClient } from '@/services/supabase'

export async function getThreads({
  categoryId
}: {
  categoryId?: number
}): Promise<MB.ThreadFull[]> {
  console.log('getThreads categoryId', categoryId)
  const supabase = await createSupabaseServerClient()

  let threadsQuery = supabase.from('thread_full').select('*')

  // if (categoryId) {
  //   threadsQuery = threadsQuery.contains('chatbot->categories', [
  //     { category_id: categoryId }
  //   ])
  // }

  const { data, error } = await threadsQuery.range(0, 19)
  console.log('🤌🏻', data)

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
  // const message = await supabase
  //   .from('message')
  //   .select('*')
  //   .eq('thread_id', threadId)
  if (error) return null
  // data.messages = message.data
  return createThreadFull(data)
}

// transfer supabase query data into ThreadFull object
function createThreadFull(threadData: any, messageCount = 0) {
  // console.log('THREAD DATA', threadData)
  return objectToCamel({
    ...threadData,
    messageCount
  }) as unknown as MB.ThreadFull
}

export async function getThreadsLike({ query }: { query?: string }) {
  console.log('🧑🏻‍💻 get threads like', query)
  const supabase = await createSupabaseServerClient()

  // Fetch message IDs that match the content criteria and prioritize by role
  const messageResults = await supabase
    .from('message')
    .select('id, thread_id') // Assuming messages have a 'thread_id' to link to their thread
    .filter('content', 'ilike', `%${query}%`) // Using 'like' for content matching
    .order('role', { ascending: false }) // Order by role descending to prioritize 'user' over 'assistant'
    .in('role', ['user', 'assistant']) // Ensure only 'user' and 'assistant' roles are considered

  if (messageResults.error || messageResults.data.length === 0) return []

  // Map to thread IDs for the next query
  const threadIds = uniq(messageResults.data.map(msg => msg.thread_id))
  console.log('🙌🏻 threadIds', threadIds.length)

  // Fetch threads that have these message IDs
  const threadsQuery = supabase
    .from('thread_full')
    .select('*')
    // TODO: verify slicing doesnt affect priority
    .in('thread_id', threadIds.slice(0, 20))

  const { data, error, count } = await threadsQuery

  console.log('🤌🏻', error, count, data?.length)

  if (error) return []

  return data.map(createThreadFull)
}

export async function searchThreads({
  query
}: {
  query?: string
}): Promise<MB.ThreadFull[]> {
  console.log('🧑🏻‍💻 search threads for', query)
  const supabase = await createSupabaseServerClient()

  // First, fetch message IDs that match the text search criteria
  const threadIds = await supabase
    .from('message')
    .select(`thread_id`)
    .filter('role', 'eq', 'user')
    .textSearch('content', query, {
      config: 'english',
      type: 'websearch' // Using 'websearch' for more natural queries
    })

  console.log(threadIds.data?.length, threadIds?.data)

  if (threadIds.error || threadIds.data?.length === 0) return []

  // Extract the message IDs to use in the main query
  const ids = threadIds.data.map(msg => msg.thread_id)

  // Now fetch threads that have these messages
  const threadsQuery = supabase
    .from('thread_full')
    .select('*', { count: 'exact' })
    .in('thread_id', ids.slice(0, 20))

  const { data, error, count } = await threadsQuery
  console.log('🤌🏻', error, count, data?.length)

  if (error) return []
  return data.map(createThreadFull)
}

export async function getMessagePairs(threadId: string) {
  console.log('get message pairs for', threadId)
  return [] as MB.MessagePair[]
}

export async function getCategories(): Promise<MB.Category[] | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('category').select('*')

  if (error) return null
  return objectToCamel(data)
}
