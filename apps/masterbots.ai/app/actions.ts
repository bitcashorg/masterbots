'use server'

import { createSupabaseServerClient } from '@/services/supabase'
import { objectToCamel } from 'ts-case-convert'
import type { MB } from '@repo/supabase'
import { omit, uniq } from 'lodash'
import { getFirstMessages } from '@/lib/threads'

// TODO: move complex queries to postgres funciton, maybe even ts gen works

// Shared ThreadFull like filter for supabase queries
// It ensure you get the data you need to construct the ThreadFull object
// Important to select only the data you need, nothing more
const ThreadFullFilter = `
  *,
  message (id,content,role,created_at),
  chatbot (chatbot_id,name,avatar,prompt(*), chatbot_category(category(*))),
  user (user_id,username,avatar)
` as const

export async function getThreads():  Promise<MB.ThreadFull[]> {
  const supabase = await createSupabaseServerClient()

 let threadsQuery = supabase
    .from('thread')
    .select(ThreadFullFilter, { count: 'exact' });

  const { data, error, count } = await threadsQuery.range(30, 39)
  console.log('🤌🏻', count);

  if (error) return [];
  const filteredData = data.filter(thread => thread.message && thread.message.length > 0);
  return filteredData.map(createThreadFull);
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


export async function getThreadsLike({ query }: { query?: string }) {
  console.log('🧑🏻‍💻 get threads like', query)
  const supabase = await createSupabaseServerClient();

  // Fetch message IDs that match the content criteria and prioritize by role
  let messageResults = await supabase
    .from('message')
    .select('id, thread_id')  // Assuming messages have a 'thread_id' to link to their thread
    .filter('content', 'ilike', `%${query}%`)  // Using 'like' for content matching
    .order('role', { ascending: false })    // Order by role descending to prioritize 'user' over 'assistant'
    .in('role', ['user', 'assistant']);     // Ensure only 'user' and 'assistant' roles are considered

  if (messageResults.error || messageResults.data.length === 0) return [];


  // Map to thread IDs for the next query
  const threadIds = uniq(messageResults.data.map(msg => msg.thread_id))
    console.log('🙌🏻 threadIds', threadIds.length)

  // Fetch threads that have these message IDs
  const threadsQuery = supabase
    .from('thread')
    .select(ThreadFullFilter)
    // TODO: verify slicing doesnt affect priority
    .in('thread_id', threadIds.slice(0,20))

  const { data, error, count } = await threadsQuery;

  console.log('🤌🏻', error, count, data?.length)

  if (error) return [];

  return data.map(createThreadFull)
}

export async function searchThreads({ query }: { query?: string }):  Promise<MB.ThreadFull[]> {
  console.log('🧑🏻‍💻 search threads for', query)
  const supabase = await createSupabaseServerClient()

  // First, fetch message IDs that match the text search criteria
  const threadIds = await supabase
    .from('message')
    .select(`thread_id`)
    .filter('role', 'eq', 'user')
    .textSearch('content', query, {
      config: 'english',
      type: 'websearch'   // Using 'websearch' for more natural queries
    });

    console.log(threadIds.data?.length, threadIds?.data)

  if (threadIds.error || threadIds.data?.length === 0) return [];

  // Extract the message IDs to use in the main query
  const ids = threadIds.data.map(msg => msg.thread_id);

  // Now fetch threads that have these messages
  const threadsQuery = supabase
    .from('thread')
    .select(ThreadFullFilter, { count: 'exact' })
    .in('thread_id', ids.slice(0,20));

  const { data, error, count } = await threadsQuery
  console.log('🤌🏻', error, count, data?.length);

  if (error) return [];
  return data.map(createThreadFull)
}


export async function getMessagePairs(threadId: string) {
  console.log('get message pairs for', threadId)
  return [] as MB.MessagePair[]
}




